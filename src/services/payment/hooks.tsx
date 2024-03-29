import { useMutation, UseMutationResult, useQuery, UseQueryResult } from 'react-query';
import { client } from '../../axios/axios';
import { AxiosError } from 'axios';

import { Redirect, StripeBillingDashboardArgs, StripeCheckoutArgs, Subscription } from './types';

export function useSubscriptions(): UseQueryResult<Subscription[], Error> {
  return useQuery('subscriptions', async ({ signal }) => {
    const res = await client.get<Subscription[]>('/payment-api/v1/subscriptions', { signal });
    return res.data;
  });
}

export function useStripeBillingDashboard(): UseMutationResult<Redirect, Error, StripeBillingDashboardArgs> {
  return useMutation<Redirect, Error, StripeBillingDashboardArgs>(async (args) => {
    const res = await client.post<Redirect>('/payment-api/v1/billing', args);
    return res.data;
  });
}

export function useStripeCheckout(): UseMutationResult<Redirect, AxiosError, StripeCheckoutArgs> {
  return useMutation<Redirect, AxiosError, StripeCheckoutArgs>(async (args) => {
    const res = await client.post('/payment-api/v1/checkout', args);
    return res.data;
  });
}

export function useStripeSubscriptionCheckout(): UseMutationResult<Redirect, AxiosError, StripeCheckoutArgs> {
  return useMutation<Redirect, AxiosError, StripeCheckoutArgs>(async (args) => {
    const res = await client.post('/payment-api/v1/subscription/checkout', args);
    return res.data;
  });
}
