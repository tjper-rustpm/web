import { useMutation, UseMutationResult, useQuery, UseQueryResult } from 'react-query';
import axios from 'axios';

import { Redirect, StripeBillingDashboardArgs, StripeCheckoutArgs, Subscription } from './types';

export function useSubscriptions(): UseQueryResult<Subscription[], Error> {
  return useQuery('subscriptions', async () => {
    const res = await axios.get<Subscription[]>('/payment-api/v1/subscriptions');
    return res.data;
  });
}

export function useStripeBillingDashboard(): UseMutationResult<Redirect, Error, StripeBillingDashboardArgs> {
  return useMutation<Redirect, Error, StripeBillingDashboardArgs>(async (args) => {
    const res = await axios.post<Redirect>('/payment-api/v1/billing', args);
    return res.data;
  });
}

export function useStripeCheckout(): UseMutationResult<Redirect, Error, StripeCheckoutArgs> {
  return useMutation<Redirect, Error, StripeCheckoutArgs>(async (args) => {
    const res = await axios.post<Redirect>('/payment-api/v1/checkout', args);
    return res.data;
  });
}
