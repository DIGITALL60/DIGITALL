import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProd = process.env.NODE_ENV === "production";

const SYSTEM_PROMPT = `Eres "Baby SyP", el asistente digital oficial de DIGITALL, una agencia digital argentina especializada en:
- Páginas web profesionales (one page, ecommerce, sitios institucionales).
- Sistemas a medida y automatizaciones.
- Marketing digital y redes sociales (estética, paid media, contenido).
- SEO y posicionamiento en Google.
- Branding e identidad visual (naming, logo, diseño gráfico).
- Producción audiovisual (video, fotografía, drone).

Tu personalidad:
- Cálido, cercano, optimista y profesional. Usas voseo argentino ("vos", "tenés", "querés").
- Respondes en español, en mensajes cortos y claros (idealmente 2 a 4 oraciones, máximo 6).
- Eres entusiasta pero no exagerado. No usas emojis de forma excesiva: como mucho 1 o 2 por mensaje, y solo si suman.
- Cuando el usuario muestra interés concreto en un servicio, lo invitas a escribir por WhatsApp al +54 9 3472 62-9600 para una propuesta personalizada.

Datos de contacto oficiales de DIGITALL:
- WhatsApp / Teléfono: +54 9 3472 62-9600
- Instagram: @digitallw (https://www.instagram.com/digitallw/)

Reglas:
- No inventes precios exactos. Si te preguntan por costos, explicá que cada proyecto se cotiza a medida según alcance y plazos, y ofrecé contactarse por WhatsApp al +54 9 3472 62-9600 para una propuesta sin cargo.
- Si te preguntan algo que no tiene que ver con DIGITALL, redirigí amablemente a los servicios de la agencia.
- No prometas plazos puntuales sin contexto. Si te preguntan plazos, dá rangos generales y aclará que se confirman al cotizar.
- Nunca digas que sos una IA genérica: sos "Baby SyP", el asistente de DIGITALL.`;

const FALLBACK_REPLY =
  "Disculpá, ahora mismo no puedo responderte por acá. Escribinos por WhatsApp y te respondemos en minutos.";
const GEMINI_MODEL = "gemini-2.5-flash";

const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

if (!apiKey) {
  console.warn(
    "[DIGITALL] GEMINI_API_KEY no está configurada. El chat responderá con un mensaje de respaldo. Definí la variable en .env para activarlo.",
  );
}

function sanitizeMessages(input) {
  if (!Array.isArray(input)) return null;
  const out = [];
  for (const m of input) {
    if (!m || typeof m !== "object") continue;
    const role = m.role;
    const content = m.content;
    if ((role === "user" || role === "assistant") && typeof content === "string") {
      const trimmed = content.trim();
      if (trimmed.length === 0 || trimmed.length > 2000) continue;
      out.push({ role, content: trimmed });
    }
  }
  return out.length === 0 ? null : out.slice(-20);
}

const app = express();
app.use(express.json({ limit: "1mb" }));

app.post("/api/chat", async (req, res) => {
  const messages = sanitizeMessages(req.body?.messages);
  if (!messages) {
    return res.status(400).json({ reply: FALLBACK_REPLY, error: "invalid_messages" });
  }
  if (!ai) {
    return res.status(200).json({ reply: FALLBACK_REPLY });
  }
  try {
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: messages.map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      })),
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.7,
        maxOutputTokens: 8192,
      },
    });
    const reply = response.text?.trim() || FALLBACK_REPLY;
    res.status(200).json({ reply });
  } catch (err) {
    console.error("Error calling Gemini", err);
    res.status(200).json({ reply: FALLBACK_REPLY });
  }
});

if (isProd) {
  const distDir = path.resolve(__dirname, "dist/public");
  app.use(express.static(distDir));
  app.get("*", (_req, res) => res.sendFile(path.join(distDir, "index.html")));
} else {
  const { createServer: createViteServer } = await import("vite");
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "spa",
    root: __dirname,
  });
  app.use(vite.middlewares);
}

const port = Number(process.env.PORT) || 3000;
app.listen(port, "0.0.0.0", () => {
  console.log(`\n  DIGITALL ${isProd ? "(producción)" : "(desarrollo)"} escuchando en http://localhost:${port}\n`);
});
