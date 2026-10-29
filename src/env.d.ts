/// <reference types="astro/client" />
import type { StorefrontClient } from '@shopify/hydrogen';

interface ImportMetaEnv {
  readonly PUBLIC_STORE_DOMAIN: string;
  readonly PUBLIC_STOREFRONT_API_TOKEN?: string;
  readonly PRIVATE_STOREFRONT_API_TOKEN?: string;
  readonly PUBLIC_STOREFRONT_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare global {
  namespace App {
    interface Locals {
      storefront: StorefrontClient;
    }
  }
}
