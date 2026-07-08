# Propuesta: URLs SEO Por Producto

## Objetivo

Crear paginas indexables por producto sin romper el checkout actual de Stripe.

## Estructura Recomendada

```text
/producto/[slug]
```

Ejemplos:

```text
/producto/iphone-17
/producto/iphone-17-pro-max-256gb
/producto/sonos-era-100
```

## Generacion Estatica

- Crear `app/producto/[slug]/page.tsx`.
- Usar `generateStaticParams()` para leer el catalogo y generar un slug por producto.
- Mantener `getProductById()` para compra/stock y agregar `slug` persistente en la tabla `products`.
- Usar `generateMetadata()` por producto para servir Open Graph y Twitter Card estrictamente individuales.
- Reutilizar `getProductJsonLd()` y `getProductMetadata()` desde `lib/seo.ts`.

## Modelo De Datos

Agregar columna:

```sql
ALTER TABLE products ADD COLUMN slug TEXT UNIQUE;
```

Backfill inicial:

```text
iphone-17-espectacolor -> iphone-17
iphone-17-pro-max -> iphone-17-pro-max-256gb
iphone-16 -> iphone-16
sonos-era-100 -> sonos-era-100
```

## Sitemap

Cuando se apruebe esta estructura, `app/sitemap.ts` debe incluir:

```text
https://puntoclaveshop.com.mx/producto/[slug]
```

por cada producto activo y visible.

## Checkout

La pagina de producto debe conservar el CTA actual:

```text
/checkout/product/[productId]
```

Ese endpoint debe seguir siendo solo una redireccion a Stripe, no una pagina SEO.

## Decision Pendiente

Antes de implementar, confirmar:

- Si el slug debe salir del nombre o ser editable en admin.
- Si productos sin stock deben seguir indexados o salir del sitemap.
- Si se debe redirigir `/#producto-id` hacia `/producto/[slug]` cuando exista la pagina nueva.
