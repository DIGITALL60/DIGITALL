# DIGITALL — Sitio web oficial

Sitio web de la agencia digital DIGITALL, con chatbot **Baby SyP** integrado (Google Gemini).
Stack: **React 19 + Vite 7 + Tailwind 4 + Express + Google Gemini**.

---

## 🚀 Instalación local

```bash
npm install
cp .env.example .env
# Editá .env y poné tu GEMINI_API_KEY (https://aistudio.google.com/app/apikey)
npm run dev
```

Luego abrí <http://localhost:3000>.

### Comandos disponibles

| Comando         | Qué hace                                                    |
| --------------- | ----------------------------------------------------------- |
| `npm run dev`   | Levanta Vite + Express en modo desarrollo en `:3000`        |
| `npm run build` | Compila el frontend a `dist/public/`                        |
| `npm start`     | Sirve la build en producción con Express en `:3000`         |

---

## ☁️ Deploy en Vercel

1. Subí el proyecto a un repo de GitHub.
2. En Vercel, **New Project → Import** ese repo.
3. **Framework Preset:** `Other` (ya está configurado en `vercel.json`).
4. En **Environment Variables** agregá:
   - `GEMINI_API_KEY` = tu API key de Google AI Studio.
5. Deploy.

Vercel detecta automáticamente:
- `vite build` → output a `dist/public` (frontend estático).
- `api/chat.ts` → función serverless del chatbot en `/api/chat`.

> No hace falta tocar nada más. El `server.js` solo se usa en local; en Vercel se usan las funciones serverless de `/api`.

---

## 📁 Estructura

```
digitall/
├── api/
│   └── chat.ts          # Endpoint serverless del chatbot (Vercel)
├── public/              # Assets estáticos (favicon, og:image, robots, sitemap)
├── src/
│   ├── components/      # UI components (shadcn/ui + custom)
│   ├── hooks/
│   ├── lib/
│   ├── pages/
│   │   └── home.tsx     # Página principal
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css        # Tailwind + tokens de diseño
├── index.html           # Entry HTML con meta SEO completas
├── server.js            # Servidor Express para desarrollo/standalone local
├── vite.config.ts
├── vercel.json
├── tsconfig.json
└── package.json
```

---

## 🤖 Chatbot Baby SyP

El chatbot usa el modelo `gemini-2.5-flash` de Google.
- **En local:** lo sirve `server.js` en `/api/chat`.
- **En Vercel:** lo sirve la función serverless `api/chat.ts` en la misma ruta.

Sin la `GEMINI_API_KEY` definida, el chat responde con un mensaje de respaldo invitando a escribir por WhatsApp.

---

## 📞 Contacto DIGITALL

- WhatsApp: **+54 9 3472 62-9600**
- Instagram: [@digitallw](https://www.instagram.com/digitallw/)
- Web: <https://digitall.com.ar>
