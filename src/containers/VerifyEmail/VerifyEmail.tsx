import styled from 'styled-components';

import Card from '../../components/Card/Card';

import { useEffect, useState } from 'react';
import { useRouter } from '../../router/router';

import { useVerifyEmail } from '../../services/user/use';
import { VerifyEmailArgs } from '../../services/user/types';

interface VerifyEmailProps {
  className?: string;
}

const VerifyEmail = ({ className }: VerifyEmailProps): JSX.Element => {
  const router = useRouter<VerifyEmailArgs>();
  const verifyEmail = useVerifyEmail();

  const [status, setStatus] = useState<string>('verifying ...');

  useEffect(() => {
    if (typeof router.query.hash === 'string') {
      verifyEmail(router.query.hash);
      setStatus('verified!');
    }
  }, [router.query.hash]);

  return <StyledCard className={className}>{status}</StyledCard>;
};

export default VerifyEmail;

const StyledCard = styled(Card)``;
