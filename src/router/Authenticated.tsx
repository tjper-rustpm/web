import { Route } from 'react-router-dom';

import { SignIn } from '../pages/SignIn';
import { useSession } from '../services/user/hooks';

interface AuthenticatedProps {
  path: string;
  children: JSX.Element;
}

export const Authenticated = ({ children, ...rest }: AuthenticatedProps): JSX.Element => {
  const { data: session } = useSession();

  return <Route {...rest}>{session ? children : <SignIn />}</Route>;
};
