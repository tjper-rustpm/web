import { useRouter } from '../router/router';
import { Card } from '../components/Card';
import { ExclamationCircleIcon, CheckIcon } from '@heroicons/react/24/solid';

export const VipStatus = (): JSX.Element => {
  const router = useRouter<{ current: string }>();
  let status = router.query.current;

  if (status != 'success' && status != 'cancelled') {
    status = 'error';
  }

  setTimeout(() => {
    router.push('/servers');
  }, 3000);

  return (
    <Card>
      <div className="my-4">
        {status === 'error' && <ExclamationCircleIcon className="animate-bounce m-auto w-14 h-14 text-yellow-400" />}
        {status === 'success' && <CheckIcon className="animate-bounce m-auto w-14 h-14 text-emerald-400" />}
        {status === 'cancelled' && (
          <ExclamationCircleIcon className="animate-bounce m-auto w-14 h-14 text-yellow-400" />
        )}
        <p className="my-6 text-xl text-center">
          {status === 'error' && 'VIP status unknown! Please contact support in Discord.'}
          {status === 'success' && 'Payment successful! Returning to home.'}
          {status === 'cancelled' && 'Payment cancelled. Returning to home.'}
        </p>
      </div>
    </Card>
  );
};
