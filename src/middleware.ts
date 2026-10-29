import { defineMiddleware } from 'astro:middleware';
import {
  createCartServerHandlers,
  createPredictiveSearchServerHandlers,
  createShopifyRequestContext,
  createStorefrontClient,
  handleShopifyRedirects,
  handleShopifyRoutes,
} from '@shopify/hydrogen';
import { routeTemplates } from './lib/route-templates';

const cartHandlers = createCartServerHandlers();
const predictiveSearchHandlers = createPredictiveSearchServerHandlers();

export const onRequest = defineMiddleware(async (context, next) => {
  const requestContext = createShopifyRequestContext({
    request: context.request,
    i18n: { country: 'CA', language: 'EN' },
  });

  const storefrontClient = createStorefrontClient({
    type: 'public',
    requestContext,
    config: {
      storeDomain: import.meta.env.PUBLIC_STORE_DOMAIN,
      publicStorefrontToken: import.meta.env.PUBLIC_STOREFRONT_API_TOKEN,
    },
  });

  // Hydrogen-owned routes (SFAPI proxy, /cart.js, /checkout, /api/cart,
  // /.well-known/ucp, ?variant= redirects, ...) resolve before Astro routing.
  const shopifyRoute = handleShopifyRoutes({
    request: context.request,
    requestContext,
    storefrontClient,
    routeTemplates,
    handlers: [cartHandlers, predictiveSearchHandlers],
  });
  if (shopifyRoute) return shopifyRoute;

  context.locals.storefront = storefrontClient;

  const response = await next();

  // Only after Astro 404s: /admin, Shopify URL redirects, standard-route redirects.
  if (response.status === 404) {
    const redirect = await handleShopifyRedirects({
      request: context.request,
      storefrontClient,
      routeTemplates,
    });
    if (redirect) return redirect;
  }

  requestContext.applyResponseHeaders(response.headers);
  return response;
});
