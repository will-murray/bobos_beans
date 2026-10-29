import { formatMoney, type MoneyV2 } from '@shopify/hydrogen';

// Single-market Canadian storefront; revisit the locale if markets are added.
export function formatPrice(money: MoneyV2, locale = 'en-CA'): string {
  return formatMoney(money, { locale }).toString();
}
