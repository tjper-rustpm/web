export interface StripeBillingDashboardArgs {
  returnUrl: string;
}

export interface StripeCheckoutArgs {
  serverId: string;
  steamId: string;
  cancelUrl: string;
  successUrl: string;
  priceId: Price;
}

export declare type Price = 'price_1KLJWjCEcXRU8XL2TVKcLGUO';

export interface Redirect {
  url: string;
}