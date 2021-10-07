import React, { useState } from 'react';
import { DateTime } from 'luxon';

import { useSnackbar } from 'notistack';
import { ApolloError, gql, useApolloClient, useMutation, useQuery } from '@apollo/client';

const UserServiceContext = React.createContext<UserService | undefined>(undefined);

export interface UserServiceProviderProps {
  children: React.ReactNode;
}
export function UserServiceProvider({ children }: UserServiceProviderProps): JSX.Element {
  const user = useUserServiceProvider();
  return <UserServiceContext.Provider value={user}>{children}</UserServiceContext.Provider>;
}

export function useMe(): User | undefined {
  const service = useUserService();
  return service.useMe();
}

export function useLogoutUser(): LogoutUserFunc {
  const service = useUserService();
  return service.logoutUser;
}

export function useCreateUser(): CreateUserFunc {
  const service = useUserService();
  return service.createUser;
}

export function useLoginUser(): CreateUserFunc {
  const service = useUserService();
  return service.loginUser;
}

export function useUserService(): UserService {
  const user = React.useContext(UserServiceContext);
  if (user === undefined) {
    throw new Error('useUser must be called within child component fo UserProvider');
  }
  return user;
}

type LogoutUserFunc = () => Promise<boolean>;
type CreateUserFunc = ({ email, password }: { email: string; password: string }) => Promise<User | undefined>;
type LoginUserFunc = CreateUserFunc;

export interface UserService {
  useMe(): User | undefined;
  logoutUser: LogoutUserFunc;
  createUser: CreateUserFunc;
  loginUser: LoginUserFunc;
}

export interface User {
  id: string;
  email: string;
  verifiedAt: DateTime | undefined;
  updatedAt: DateTime;
  createdAt: DateTime;
}

const CREATE_USER = gql`
  mutation CreateUser($email: String!, $password: String!) {
    createUser(input: { email: $email, password: $password }) {
      user {
        id
        email
        verifiedAt
        updatedAt
        createdAt
      }
    }
  }
`;

interface CreateUserArgs {
  email: string;
  password: string;
}

const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(input: { email: $email, password: $password }) {
      user {
        id
        email
        verifiedAt
        updatedAt
        createdAt
      }
    }
  }
`;
interface LoginUserArgs {
  email: string;
  password: string;
}

export const LOGOUT_USER_MUTATION = gql`
  mutation {
    logoutUser
  }
`;

export const ME_QUERY = gql`
  query Me {
    me {
      id
      email
      role
      verifiedAt
      updatedAt
      createdAt
    }
  }
`;
export interface FetchMeResult {
  user: User | undefined;
  loading: boolean;
}

function useUserServiceProvider(): UserService {
  const client = useApolloClient();
  const { enqueueSnackbar } = useSnackbar();

  const [me, setMe] = useState<User | undefined>(undefined);

  const [logoutUserMutation] = useMutation<boolean>(LOGOUT_USER_MUTATION);
  const [createUserMutation] = useMutation<User, CreateUserArgs>(CREATE_USER);
  const [loginUserMutation] = useMutation<User, LoginUserArgs>(LOGIN_USER);

  const useMe = (): User | undefined => {
    useQuery<User>(ME_QUERY, {
      onError: (error: ApolloError): void => {
        if (error.message === 'unauthenticated') {
          return;
        }
        enqueueSnackbar(`${error.message} ; please contact support.`, { variant: 'error' });
      },
      errorPolicy: 'all',
      onCompleted: (data: User): void => {
        setMe(data);
      },
    });
    return me;
  };

  const logoutUser = async (): Promise<boolean> => {
    let success = false;
    try {
      client.resetStore();
      setMe(undefined);

      const result = await logoutUserMutation();
      if (result.data == null) {
        throw new Error('unable to logout user; please contact support');
      }
      success = result.data;
      enqueueSnackbar('You have logged out of your account', { variant: 'info' });
    } catch (e) {
      enqueueSnackbar(`${e.message}; please contact support.`, { variant: 'error' });
    }
    return success;
  };

  const createUser = async ({ email, password }: { email: string; password: string }): Promise<User | undefined> => {
    let user: User | undefined;
    try {
      const result = await createUserMutation({ variables: { email: email, password: password } });
      if (result.data == null) {
        throw new Error('unable to create user; please contact support');
      }
      user = result.data;
      enqueueSnackbar('Account created.', { variant: 'info' });
    } catch (e) {
      enqueueSnackbar(`${e.message}; please contact support.`, { variant: 'error' });
    }
    return user;
  };

  const loginUser = async ({ email, password }: { email: string; password: string }): Promise<User | undefined> => {
    let user: User | undefined;
    try {
      client.resetStore();
      const result = await loginUserMutation({ variables: { email: email, password: password } });
      if (result.data === null || result.data === undefined) {
        throw new Error('unable to login user; please contact support');
      }
      user = result.data;
      setMe(user);

      enqueueSnackbar('Welcome!', { variant: 'success' });
      if (user.verifiedAt === undefined) {
        enqueueSnackbar('Please check your email in order to verify your account.', { variant: 'info' });
      }
    } catch (e) {
      enqueueSnackbar(`${e.message}; please contact support.`, { variant: 'error' });
    }
    return user;
  };

  return {
    useMe: useMe,
    logoutUser: logoutUser,
    createUser: createUser,
    loginUser: loginUser,
  };
}
