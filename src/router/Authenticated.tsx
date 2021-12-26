import React from 'react';

import { useRouter } from './router';
import { useMe } from '../services/user/hooks';

interface AuthenticatedProps {
  fallback: string;
  children: JSX.Element;
}

export const Authenticated = ({ children, fallback }: AuthenticatedProps): JSX.Element => {
  const router = useRouter();
  const { data: user } = useMe();

  if (!user) {
    router.push(fallback);
  }
  return <React.Fragment>{children}</React.Fragment>;
};
