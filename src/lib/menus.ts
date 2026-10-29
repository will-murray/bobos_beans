import { gql } from '@shopify/hydrogen';
import type { StorefrontClient } from '@shopify/hydrogen';

export const MENUS_QUERY = gql(`
  query Menus {
    main: menu(handle: "main-menu") { items { id title url } }
    footer: menu(handle: "footer") { items { id title url } }
  }
`);

export interface MenuLink {
  id: string;
  title: string;
  href: string;
}

/** Convert Shopify's absolute menu URLs (https://bobosbeans.ca/...) to same-origin paths. */
function toHref(url: string | null | undefined): string {
  if (!url) return '/';
  try {
    const u = new URL(url);
    return `${u.pathname}${u.search}${u.hash}`;
  } catch {
    return url;
  }
}

export async function fetchMenus(storefront: StorefrontClient) {
  const { data } = await storefront.graphql(MENUS_QUERY);
  const map = (items?: Array<{ id: string; title: string; url?: string | null }> | null): MenuLink[] =>
    (items ?? []).map((i) => ({ id: i.id, title: i.title, href: toHref(i.url) }));
  return { main: map(data?.main?.items), footer: map(data?.footer?.items) };
}
