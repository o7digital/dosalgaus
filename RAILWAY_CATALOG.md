The US storefront reads PostgreSQL on Railway. Public products and categories use
`storefront_catalog_products` and `storefront_catalog_categories` with `store_id = 'US'`.
WooCommerce remains the order and payment backend; its US product and variation IDs
are preserved in the public snapshot.

MX imports awaiting US pricing and shipping are held separately in
`storefront_catalog_imports` (`target_store = 'US'`). Their admin listings have no US
WooCommerce ID. They cannot appear in public product searches, detail pages,
categories, or the sitemap. Existing US listings are matched by SKU and retained.
MX prices, approval flags and shipping quotes are preserved as source evidence,
never treated as US decisions.

Required server configuration: `DATABASE_URL`, `DATABASE_SSL=true`,
`DATABASE_POOL_MAX=3`, a private `CATALOG_SYNC_SECRET` and `CRON_SECRET`. Keep
`NEXT_PUBLIC_STORE_CURRENCY=USD`. All connection strings and sync secrets belong
in local/Vercel environment configuration, never in Git.

Refresh published US WooCommerce products with `POST /api/catalog/sync` and
`Authorization: Bearer <CATALOG_SYNC_SECRET>`. Empty upstream snapshots are
rejected, and replacing a snapshot never deletes pending market imports.
Vercel refreshes the published snapshot hourly using the authenticated cron route.

The initial snapshot can be seeded with
`node scripts/seed-railway-catalog.mjs <private-snapshot.json>` using the configured
database connection. Its JSON must contain `market: "US"`, `products` and
`categories`; prices must already be the final US storefront values.

Before publishing an imported product, validate its USD price and US delivery,
create or match its product and variations in US WooCommerce, and refresh the
public snapshot. Never reuse source MX commerce IDs as US IDs.
