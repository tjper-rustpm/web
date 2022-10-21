import { Tooltip } from './Tooltip';
import { StarIcon } from '@heroicons/react/24/solid';

import { useSubscriptions } from '../services/payment/hooks';
import { Subscription } from '../services/payment/types';

interface SubscriptionStarProps {
  serverId: string;
}

export const SubscriptionStar = ({ serverId }: SubscriptionStarProps): JSX.Element | null => {
  const { data: subscriptions } = useSubscriptions();

  const subscription = subscriptions?.find(
    (subscription: Subscription) => subscription.serverId === serverId && subscription.status === 'paid',
  );

  return subscription ? (
    <Tooltip content={<p className="font-sans text-md min-w-max">VIP access</p>} position="bottom">
      <StarIcon className="w-7 text-red-500" />
    </Tooltip>
  ) : null;
};
