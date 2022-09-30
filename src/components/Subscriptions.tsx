import { Button } from '../components/Button';
import { Typography } from '../components/Typography';

import { useStripeBillingDashboard, useSubscriptions } from '../services/payment/hooks';
import { Redirect as PaymentRedirect } from '../services/payment/types';
import { toast } from 'react-hot-toast';
import { oops } from '../errors/errors';

export function Subscriptions(): JSX.Element {
  const { data: subscriptions } = useSubscriptions();

  const stripeBillingDashboard = useStripeBillingDashboard();

  const onStripeBillingDashboard = () => {
    stripeBillingDashboard.mutate(
      { returnUrl: `${window.location.origin}/profile` },
      {
        onSuccess: (data: PaymentRedirect) => {
          toast.success('Navigating to Stripe Dashboard.');
          window.location.href = data.url;
        },
        onError: () => {
          oops();
        },
      },
    );
  };

  return (
    <div className="h-60">
      <Typography size="2xl">Subscriptions</Typography>
      {subscriptions ? (
        <>
          <p className="font-sans my-4 text-md">
            Rustpm uses Stripe to manage subscriptions. Press the button below to be routed to your Stripe billing
            dashboard.
          </p>
          <Button slate onClick={onStripeBillingDashboard}>
            Stripe Billing Dashboard
          </Button>
        </>
      ) : (
        <p className="font-sans my-4 text-md">
          Rustpm uses Stripe to manage subscriptions. You currently do not have any active subscriptions.
        </p>
      )}
    </div>
  );
}
