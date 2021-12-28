import React from 'react';

import { useRouter } from './router';
import { useSession } from '../services/user/hooks';

interface AuthenticatedProps {
  fallback: string;
  children: JSX.Element;
}

export const Authenticated = ({ children, fallback }: AuthenticatedProps): JSX.Element => {
  const router = useRouter();
  const { data: session } = useSession();

  if (!session) {
    router.push(fallback);
  }
  return <React.Fragment>{children}</React.Fragment>;
};
