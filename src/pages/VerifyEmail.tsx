import { Card } from '../components/Card';
import { Spinner } from '../components/Spinner';

import { ExclamationIcon, CheckIcon } from '@heroicons/react/solid';

import { useEffect, useState } from 'react';
import { useRouter } from '../router/router';
import { toast } from 'react-hot-toast';

import { useVerifyEmail } from '../services/user/hooks';
import { VerifyEmailArgs } from '../services/user/types';

export const VerifyEmail = (): JSX.Element => {
  const router = useRouter<VerifyEmailArgs>();
  const verifyEmail = useVerifyEmail();

  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('success');

  if (!router.query.hash) {
    router.push('/servers');
  }

  useEffect(() => {
    if (typeof router.query.hash === 'string') {
      verifyEmail.mutate(
        { hash: router.query.hash },
        {
          onSuccess: () => {
            setStatus('success');
            setTimeout(() => {
              toast.success('Email verified!');
              router.push('/servers');
            }, 2000);
          },
          onError: () => {
            setStatus('error');
            setTimeout(() => {
              router.push('/servers');
            }, 2000);
          },
        },
      );
    }
  }, [router.query.hash]);

  return (
    <Card>
      <div className="my-4">
        {status === 'loading' && (
          <div className="m-auto w-12 h-12">
            <Spinner />
          </div>
        )}
        {status === 'success' && <CheckIcon className="m-auto w-14 h-14 text-emerald-400" />}
        {status === 'error' && <ExclamationIcon className="animate-bounce m-auto w-14 h-14 text-yellow-400" />}
        <p className="my-6 text-xl text-center">
          {status === 'loading' && 'Verifying your email.'}
          {status === 'success' && 'Verified! Returning to home.'}
          {status === 'error' && 'Unable to verify. Returning to home.'}
        </p>
      </div>
    </Card>
  );
};

export default VerifyEmail;
