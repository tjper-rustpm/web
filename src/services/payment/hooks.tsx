import { useMutation, UseMutationResult } from 'react-query';
import axios from 'axios';

import { StripeBillingDashboardArgs } from './types';

export function useStripeBillingDashboard(): UseMutationResult<void, Error, StripeBillingDashboardArgs> {
  return useMutation<void, Error, StripeBillingDashboardArgs>(async (args) => {
    await axios.post<void>('/payment-api/v1/billing', args);
  });
}
