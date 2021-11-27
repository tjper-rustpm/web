import { LoadingCard } from '../../components/Card/LoadingCard';

import { useEffect, useState } from 'react';
import { useRouter } from '../../router/router';

import { useVerifyEmail } from '../../services/user/hooks';
import { VerifyEmailArgs } from '../../services/user/types';

interface VerifyEmailProps {
  className?: string;
}

const VerifyEmail = ({ className }: VerifyEmailProps): JSX.Element => {
  const router = useRouter<VerifyEmailArgs>();
  const verifyEmail = useVerifyEmail();

  const [text, setText] = useState<string>('Verifying your email.');
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('success');

  // if (!router.query.hash) {
  //   router.push('/servers');
  // }

  useEffect(() => {
    if (typeof router.query.hash === 'string') {
      verifyEmail.mutate({ hash: router.query.hash });
      setText('Verified!');
      setStatus('success');
    }
  }, [router.query.hash]);

  return <LoadingCard className={className} text={text} status={status} />;
};

export default VerifyEmail;
