# Auvelle — Per-Product Online Store 2.0 Templates

This theme adds a **dedicated OS 2.0 product template for every product** in the
Auvelle catalogue. Each template recreates the original landing-page-style
product design (gallery + buy box, benefits, before/after, how-it-works,
comparison table, frequently-bought-together, reviews, guarantee, FAQ) and is
**fully editable in the Shopify Theme Editor**.

No product data is hardcoded. Title, price, compare-at price, description,
images, media gallery and variants all render from the live Shopify
`product` object. Only marketing copy (benefit text, FAQ, comparison rows,
etc.) is stored as editable section/block settings inside each template JSON.

## Products & templates

| Product | Handle | Template file |
|---|---|---|
| Radiance Glow Drops | `radiance-glow-drops` | `templates/product.radiance-glow-drops.json` |
| Lumière Soleil SPF 50 | `lumiere-soleil-spf-50` | `templates/product.lumiere-soleil-spf-50.json` |
| Bronze Mist | `bronze-mist` | `templates/product.bronze-mist.json` |
| Application Set | `application-set` | `templates/product.application-set.json` |

`templates/product.json` remains as the default fallback template.

## How to assign a template

1. In Shopify admin go to **Products → [product]**.
2. In the **Theme template** card (right column), pick the matching template,
   e.g. `radiance-glow-drops`.
3. Save. The product now renders its dedicated design.

> Shopify maps `product.<suffix>.json` to the dropdown entry `<suffix>`.

## Reusable product sections (added)

| Section | Type | Design component | Editable blocks |
|---|---|---|---|
| Product buy box | `main-product` | `.pdp` gallery + ATC | Assurance badges |
| Product benefits | `product-benefits` | `.ben-grid` | Benefit (icon/title/text) |
| How it works | `product-how` | `.steps` | Step (image/title/text) |
| Comparison table | `product-comparison` | `.cmp` | Feature row (label + competitor toggle) |
| Frequently bought together | `product-fbt` | `.fbt` | Product (dynamic product picker) |
| Product FAQ | `product-faq` | `.faq` accordion | Question/answer |

Reused from the existing theme: `before-after`, `testimonials`, `guarantee`,
`trustoo-reviews`.

## Dynamic data notes

- **Prices** in the buy box and Frequently-Bought-Together total come from the
  selected variant — never typed in.
- **Subtitle / badge / rating / review count** prefer product metafields
  (`custom.subtitle`, `custom.badge`, `custom.rating`, `custom.review_count`,
  `custom.scarcity`) and fall back to editable section settings.
- **Frequently bought together** uses product pickers; the "Add all to bag"
  button posts every selected variant to `/cart/add.js` in one request
  (handled in `assets/theme.js`).

## CSS / JS

- All product-page styling lives in `assets/theme.css` (existing design system
  plus a small `PRODUCT TEMPLATE SECTIONS` block at the end).
- `assets/theme.js` handles the FAQ accordion, gallery thumbnails, variant
  selection, before/after sliders, sticky ATC, and the new multi-item
  Frequently-Bought-Together add-to-cart.
