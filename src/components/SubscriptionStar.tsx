import { useSubscriptions } from '../services/payment/hooks';
import { Subscription } from '../services/payment/types';
import { StarIcon } from '@heroicons/react/solid';

interface SubscriptionStarProps {
  serverId: string;
}

export const SubscriptionStar = ({ serverId }: SubscriptionStarProps): JSX.Element | null => {
  const { data: subscriptions } = useSubscriptions();

  const subscription = subscriptions?.find(
    (subscription: Subscription) => subscription.serverId === serverId && subscription.status === 'paid',
  );

  if (!subscription) {
    return null;
  }

  return <StarIcon className="ml-4 w-7 text-red-500" />;
};
