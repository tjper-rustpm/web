import { Button } from '../components/Button';
import { Typography } from '../components/Typography';
import { ReactComponent as PoweredByStripe } from '../imgs/stripe/white.svg';

import { useStripeBillingDashboard, useSubscriptions } from '../services/payment/hooks';
import { Redirect as PaymentRedirect } from '../services/payment/types';
import { toast } from 'react-hot-toast';
import { oops } from '../errors/errors';

export function Subscriptions(): JSX.Element {
  const { data: subscriptions } = useSubscriptions();
  const subscriptionsExist = subscriptions && subscriptions?.length > 0 ? true : false;

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
      <p className="font-sans my-4 text-md">
        Rustpm uses Stripe to manage subscriptions.
        {subscriptionsExist
          ? ' Press the button below to be routed to your billing dashboard.'
          : ' You currently do not have any active subscriptions.'}
      </p>
      <Button slate disabled={!subscriptionsExist} onClick={onStripeBillingDashboard}>
        <div className="flex items-center space-x-3 w-max m-auto">
          <Typography>Billing Dashboard</Typography>
          <PoweredByStripe className="w-28" />
        </div>
      </Button>
    </div>
  );
}
