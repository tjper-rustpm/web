import { DateTime } from 'luxon';

export interface StripeBillingDashboardArgs {
  returnUrl: string;
}

export interface StripeCheckoutArgs {
  serverId: string;
  steamId: string;
  cancelUrl: string;
  successUrl: string;
  priceId: string;
}

export interface Redirect {
  url: string;
}

export interface Subscription {
  id: string;
  serverId: string;
  status: Status;
  createdAt: DateTime;
}

export declare type Status = 'unknown' | 'paid' | 'payment_failed' | 'inactive';
