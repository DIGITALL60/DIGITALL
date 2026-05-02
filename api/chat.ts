import type { VercelRequest, VercelResponse } from "@vercel/node";
import { GoogleGenAI } from "@google/genai";

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

type ChatRole = "user" | "assistant";
interface IncomingMessage {
  role: ChatRole;
  content: string;
}

function sanitizeMessages(input: unknown): IncomingMessage[] | null {
  if (!Array.isArray(input)) return null;
  const out: IncomingMessage[] = [];
  for (const m of input) {
    if (
      m &&
      typeof m === "object" &&
      "role" in (m as Record<string, unknown>) &&
      "content" in (m as Record<string, unknown>)
    ) {
      const role = (m as { role: unknown }).role;
      const content = (m as { content: unknown }).content;
      if (
        (role === "user" || role === "assistant") &&
        typeof content === "string"
      ) {
        const trimmed = content.trim();
        if (trimmed.length === 0) continue;
        if (trimmed.length > 2000) continue;
        out.push({ role, content: trimmed });
      }
    }
  }
  if (out.length === 0) return null;
  return out.slice(-20);
}

const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ reply: FALLBACK_REPLY, error: "method_not_allowed" });
    return;
  }

  const messages = sanitizeMessages(
    (req.body as { messages?: unknown } | null)?.messages,
  );

  if (!messages) {
    res.status(400).json({ reply: FALLBACK_REPLY, error: "invalid_messages" });
    return;
  }

  if (!ai) {
    res.status(200).json({ reply: FALLBACK_REPLY });
    return;
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
}
