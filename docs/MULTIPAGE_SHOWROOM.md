# Multipage Showroom

Punto Clave uses a focused landing page and separate public destinations instead of placing the full commercial journey on one scrolling page.

## Public routes

- `/`: visual landing with the 3D product hero and links to the primary destinations.
- `/productos`: complete catalog, category filters, stock, Stripe actions, WhatsApp and product-detail links.
- `/como-comprar`: buying journey and routes to self-service or WhatsApp assistance.
- `/pago-seguro`: Stripe Checkout and SPEI information.
- `/producto/[slug]`: individual product experience with structured data and checkout actions.

## Compatibility

Legacy home fragments are upgraded client-side because URL fragments never reach the server:

- `/#productos` redirects to `/productos`.
- `/#como-funciona` redirects to `/como-comprar`.
- `/#pago` redirects to `/pago-seguro`.
- Existing product fragments continue redirecting to `/producto/[slug]`.

## Shared UI

Public pages reuse the header, mobile menu, announcement rail, footer, icon set and reveal behavior from `components/showroom`. Admin and hosted Stripe Checkout remain outside this presentation layer.

## Invariants

- Product data continues to come from the existing catalog/database adapter.
- Stripe API contracts and credentials are unchanged.
- Admin routes and SQLite schema are unchanged.
- Product JSON-LD, metadata, robots and sitemap remain active.
