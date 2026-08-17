# La Pachamama

Proyecto editable para que continúes programándolo vos. La web muestra productos regionales y deriva las consultas a WhatsApp; no procesa compras ni envíos.

## Dónde editar

- `app/page.tsx`: portada, textos y enlaces principales.
- `app/productos/page.tsx`: categorías, productos, precios y número de WhatsApp.
- `app/globals.css` y `app/regional.css`: colores, tipografía, distribución y paisajes.
- Ejecutá `npm run dev` para ver los cambios mientras programás.

Los productos están agrupados en el objeto `data` al comienzo de `app/productos/page.tsx`, para que puedas cambiarlos sin tocar el componente de tarjeta.

Las fotografías muestran la Quebrada de las Conchas, Salta (Lifesan), y las Ruinas de Quilmes, Tucumán (Ruarte). Ambas provienen de Wikimedia Commons bajo licencia CC BY-SA 3.0.

---

# vinext-starter

A clean full-stack starter running on
[vinext](https://github.com/cloudflare/vinext), with optional Cloudflare D1 and
Drizzle support.

## Prerequisites

- Node.js `>=22.13.0`

## Quick Start

```bash
npm install
npm run dev
npm run build
```

This starter does not use `wrangler.jsonc`.

## Included Shape

- edit site code under `app/`
- `.openai/hosting.json` declares optional Sites D1 and R2 bindings
- `vite.config.ts` simulates declared bindings for local development
- `db/schema.ts` starts intentionally empty
- `examples/d1/` contains an optional D1 example surface
- `drizzle.config.ts` supports local migration generation when needed

## Workspace Auth Headers

Signed-in visitors receive both `oai-authenticated-user-id` and `oai-authenticated-user-email`. Private Sites require every visitor to sign in; public Sites may also have anonymous visitors, for whom neither header is present.

The user ID is stable for the same user on the same Site and different across Sites. Email and name are intended for display or contact purposes.

SIWC-authenticated workspace sites may also receive
`oai-authenticated-user-full-name` when the user's SIWC profile has a non-empty
`name` claim. The full-name value is percent-encoded UTF-8 and is accompanied by
`oai-authenticated-user-full-name-encoding: percent-encoded-utf-8`.

Treat the full name as optional and fall back to email when it is absent:

```tsx
import { headers } from "next/headers";

export default async function Home() {
  const requestHeaders = await headers();
  const userId = requestHeaders.get("oai-authenticated-user-id");
  const email = requestHeaders.get("oai-authenticated-user-email");
  const encodedFullName = requestHeaders.get("oai-authenticated-user-full-name");
  const fullName =
    encodedFullName &&
    requestHeaders.get("oai-authenticated-user-full-name-encoding") ===
      "percent-encoded-utf-8"
      ? decodeURIComponent(encodedFullName)
      : null;

  const displayName = fullName ?? email;
  // ...
}
```

## Optional Dispatch-Owned ChatGPT Sign-In

Import the ready-to-use helpers from `app/chatgpt-auth.ts` when the site needs
optional or required ChatGPT sign-in:

- Use `getChatGPTUser()` for optional signed-in UI.
- Use `requireChatGPTUser(returnTo)` for server-rendered pages that should send
  anonymous visitors through Sign in with ChatGPT.
- Use `chatGPTSignInPath(returnTo)` and `chatGPTSignOutPath(returnTo)` for
  browser links or actions.
- Pass a same-origin relative `returnTo` path for the destination after sign-in
  or sign-out. The helper validates and safely encodes it.
- Mark protected pages with `export const dynamic = "force-dynamic"` because
  they depend on per-request identity headers.

Dispatch owns `/signin-with-chatgpt`, `/signout-with-chatgpt`, `/callback`, the
OAuth cookies, and identity header injection. Do not implement app routes for
those reserved paths. Routes that do not import and call the helper remain
anonymous-compatible.

SIWC establishes identity only; it does not prove workspace membership. Use the
Sites hosting platform's access policy controls for workspace-wide restrictions,
or enforce explicit server-side membership or allowlist checks.

Use SIWC for account pages, user-specific dashboards, saved records, and write
actions tied to the current ChatGPT user. Leave public content anonymous.

## Useful Commands

- `npm run dev`: start local development
- `npm run build`: verify the vinext build output
- `npm test`: build the starter and verify its rendered loading skeleton
- `npm run db:generate`: generate Drizzle migrations after schema changes

## Learn More

- [vinext Documentation](https://github.com/cloudflare/vinext)
- [Drizzle D1 Guide](https://orm.drizzle.team/docs/get-started/d1-new)

---

## Instrucciones rápidas de mantenimiento (específicas de La Pachamama)

- Productos y categorías
  - Archivo principal de datos: `data/products.ts`.
  - Cada categoría es una clave del objeto y contiene arrays de productos:
    `["Nombre","Descripción","$ Precio","Imagen URL o /images/archivo.jpg"]`.
  - Para agregar una categoría, añadila como nueva clave en `data/products.ts`.

- Fotografías
  - Colocá imágenes en `public/images/` y referencialas como `/images/tu-imagen.jpg`.
  - El logo oficial está en `public/images/logo-la-pachamama.jpeg`.

- Número de WhatsApp
  - Archivo: `app/config.ts`.
  - Modificá `WHATSAPP_NUMBER` (ej: `5493811234567`) y `WHATSAPP_DISPLAY` (ej: `+54 9 381 123 4567`).

- Textos de la portada
  - Archivo: `app/components/Hero.tsx` (editá el `h1` y el `p`).

- Estilos y paleta
  - `app/globals.css` contiene la paleta, reglas responsivas y el estilo del menú móvil.

- Accesibilidad y comportamiento del menú móvil
  - `app/components/Header.tsx` implementa el menú móvil accesible: `Escape` cierra, el botón tiene `aria-expanded` y `aria-controls`, y el menú se cierra al elegir un enlace.

Si querés que haga cambios adicionales (migrar imágenes locales, extracción de configuración, animaciones más complejas), decime y lo implemento.
