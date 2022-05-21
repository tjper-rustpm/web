import { Button } from '../components/Button';
import { Typography } from '../components/Typography';

import { useStripeBillingDashboard } from '../services/payment/hooks';
import { toast } from 'react-hot-toast';

export function Subscriptions(): JSX.Element {
  const stripeBillingDashboard = useStripeBillingDashboard();

  const onStripeBillingDashboard = () => {
    stripeBillingDashboard.mutate(
      { returnUrl: 'https://localhost:8000/profile' },
      {
        onSuccess: () => {
          toast.success('Navigating to Stripe Dashboard.');
        },
        onError: (error: Error) => {
          toast.error(error.message);
        },
      },
    );
  };

  return (
    <div className="h-60">
      <Typography size="2xl">Subscriptions</Typography>
      <p className="font-sans my-4 text-md">
        Rustpm uses Stripe to manage subscriptions. Press the button below to be routed to your Stripe billing
        dashboard.
      </p>
      <Button slate onClick={onStripeBillingDashboard}>
        Stripe Billing Dashboard
      </Button>
    </div>
  );
}
