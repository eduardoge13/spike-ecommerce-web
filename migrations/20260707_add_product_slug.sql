-- Add editable product slugs for /producto/[slug].
-- Run once on existing SQLite databases before enforcing the unique index.

ALTER TABLE products ADD COLUMN slug TEXT;

WITH generated_slugs AS (
  SELECT
    id,
    COALESCE(
      NULLIF(slug, ''),
      lower(
        trim(
          replace(
            replace(
              replace(
                replace(
                  replace(
                    replace(
                      replace(
                        replace(name, ' ', '-'),
                        '/', '-'
                      ),
                      '.', ''
                    ),
                    ',', ''
                  ),
                  '(', ''
                ),
                ')', ''
              ),
              '--', '-'
            ),
            '--', '-'
          ),
          '-'
        )
      )
    ) AS base_slug
  FROM products
),
numbered_slugs AS (
  SELECT
    id,
    base_slug,
    row_number() OVER (PARTITION BY base_slug ORDER BY id) AS slug_rank
  FROM generated_slugs
)
UPDATE products
SET slug = (
  SELECT
    CASE
      WHEN slug_rank = 1 THEN base_slug
      ELSE base_slug || '-' || slug_rank
    END
  FROM numbered_slugs
  WHERE numbered_slugs.id = products.id
)
WHERE slug IS NULL OR slug = '';

CREATE UNIQUE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
