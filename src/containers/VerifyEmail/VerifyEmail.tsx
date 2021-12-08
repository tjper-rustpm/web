import { LoadingCard } from '../../components/LoadingCard/LoadingCard';

import { useEffect, useState } from 'react';
import { useRouter } from '../../router/router';
import { toast } from 'react-hot-toast';

import { useVerifyEmail } from '../../services/user/hooks';
import { VerifyEmailArgs } from '../../services/user/types';

interface VerifyEmailProps {
  className?: string;
}

const VerifyEmail = ({ className }: VerifyEmailProps): JSX.Element => {
  const router = useRouter<VerifyEmailArgs>();
  const verifyEmail = useVerifyEmail();

  const [text, setText] = useState<string>('Verifying ...');
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  if (!router.query.hash) {
    router.push('/servers');
  }

  useEffect(() => {
    if (typeof router.query.hash === 'string') {
      verifyEmail.mutate(
        { hash: router.query.hash },
        {
          onSuccess: () => {
            setText('Verified! Returning to home.');
            setStatus('success');
            setTimeout(() => {
              toast.success('Email verified!');
              router.push('/servers');
            }, 2000);
          },
          onError: () => {
            setText('Unable to verify. Returning to home.');
            setStatus('error');
            setTimeout(() => {
              router.push('/servers');
            }, 2000);
          },
        },
      );
    }
  }, [router.query.hash]);

  return <LoadingCard className={className} text={text} status={status} />;
};

export default VerifyEmail;
