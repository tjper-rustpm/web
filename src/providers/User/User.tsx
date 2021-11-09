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

export function useVerifyEmail(): VerifyEmailFunc {
  const service = useUserService();
  return service.verifyEmail;
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
type VerifyEmailFunc = (hash: string) => Promise<User | undefined>;

export interface UserService {
  useMe(): User | undefined;
  logoutUser: LogoutUserFunc;
  createUser: CreateUserFunc;
  loginUser: LoginUserFunc;
  verifyEmail: VerifyEmailFunc;
}

export interface User {
  id: string;
  email: string;
  verifiedAt: DateTime;
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
interface CreateUserResult {
  createUser: { user: User };
}
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
interface LoginUserResult {
  loginUser: { user: User };
}
interface LoginUserArgs {
  email: string;
  password: string;
}

const LOGOUT_USER_MUTATION = gql`
  mutation {
    logoutUser
  }
`;

const VERIFY_EMAIL_MUTATION = gql`
  mutation VerifyEmail($hash: String!) {
    verifyEmail(input: { hash: $hash }) {
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
interface VerifyEmailResult {
  verifyEmail: { user: User };
}
export interface VerifyEmailArgs {
  hash: string;
}

const ME_QUERY = gql`
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
  const [createUserMutation] = useMutation<CreateUserResult, CreateUserArgs>(CREATE_USER);
  const [loginUserMutation] = useMutation<LoginUserResult, LoginUserArgs>(LOGIN_USER);
  const [verifyEmailMutation] = useMutation<VerifyEmailResult, VerifyEmailArgs>(VERIFY_EMAIL_MUTATION);

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
    } catch (e: unknown) {
      if (e instanceof ApolloError) {
        enqueueSnackbar(`${e.message}; please contact support.`, { variant: 'error' });
      }
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
      user = result.data.createUser.user;
      enqueueSnackbar('Account created.', { variant: 'info' });
    } catch (e) {
      if (e instanceof ApolloError) {
        enqueueSnackbar(`${e.message}; please contact support.`, { variant: 'error' });
      }
    }
    return user;
  };

  const loginUser = async ({ email, password }: { email: string; password: string }): Promise<User | undefined> => {
    let user: User | undefined;
    try {
      client.resetStore();
      const result = await loginUserMutation({ variables: { email: email, password: password } });
      if (result.data == null) {
        throw new Error('unable to login user; please contact support');
      }
      user = result.data.loginUser.user;
      setMe(user);

      enqueueSnackbar('Welcome!', { variant: 'success' });
      if (user.verifiedAt == null) {
        enqueueSnackbar('Please verify your email.', { variant: 'info' });
      }
    } catch (e) {
      if (e instanceof ApolloError) {
        enqueueSnackbar(`${e.message}; please contact support.`, { variant: 'error' });
      }
    }
    return user;
  };

  const verifyEmail = async (hash: string): Promise<User | undefined> => {
    let user: User | undefined;
    try {
      const result = await verifyEmailMutation({ variables: { hash: hash } });
      if (result.data == null) {
        throw new Error('unable to verify email; please contact support');
      }

      user = result.data.verifyEmail.user;
      enqueueSnackbar(`${user.email} verified!`, { variant: 'success' });
    } catch (e) {
      if (e instanceof ApolloError) {
        enqueueSnackbar(`${e.message}; please contact support.`, { variant: 'error' });
      }
    }
    return user;
  };

  return {
    useMe: useMe,
    logoutUser: logoutUser,
    createUser: createUser,
    loginUser: loginUser,
    verifyEmail: verifyEmail,
  };
}
