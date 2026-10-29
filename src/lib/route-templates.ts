import { createShopifyRouteTemplates } from '@shopify/hydrogen';

/**
 * Shopify standard storefront routes are handled at their default paths so the
 * rebuilt site keeps the exact URL structure of the current bobosbeans.ca
 * Shopify theme (see docs/url-map.md). Only `productInCollection` is set: it
 * canonicalizes the collection-scoped product URL Shopify themes generate
 * (/collections/:collectionHandle/products/:productHandle) to the product page.
 */
export const routeTemplates = createShopifyRouteTemplates({
  productInCollection: '/products/:productHandle',
});
