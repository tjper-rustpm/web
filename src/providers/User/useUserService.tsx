import React, { useState } from 'react';

import { useSnackbar } from 'notistack';
import { ApolloError, useApolloClient, useMutation, useQuery } from '@apollo/client';

import {
  UserService,
  User,
  LoginUserResult,
  LoginUserArgs,
  LogoutUserFunc,
  CreateUserFunc,
  CreateUserResult,
  CreateUserArgs,
  VerifyEmailFunc,
  VerifyEmailArgs,
  ResendEmailVerificationFunc,
} from './types';

import {
  LOGOUT_USER_MUTATION,
  CREATE_USER_MUTATION,
  LOGIN_USER_MUTATION,
  VERIFY_EMAIL_MUTATION,
  RESEND_EMAIL_VERIFICATION_MUTATION,
  ME_QUERY,
} from './gql';

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

export function useResendEmailVerification(): ResendEmailVerificationFunc {
  const service = useUserService();
  return service.resendEmailVerification;
}

export function useUserService(): UserService {
  const user = React.useContext(UserServiceContext);
  if (user === undefined) {
    throw new Error('useUser must be called within child component fo UserProvider');
  }
  return user;
}

function useUserServiceProvider(): UserService {
  const client = useApolloClient();
  const { enqueueSnackbar } = useSnackbar();

  const [me, setMe] = useState<User | undefined>(undefined);

  const [logoutUserMutation] = useMutation<boolean>(LOGOUT_USER_MUTATION);
  const [createUserMutation] = useMutation<CreateUserResult, CreateUserArgs>(CREATE_USER_MUTATION);
  const [loginUserMutation] = useMutation<LoginUserResult, LoginUserArgs>(LOGIN_USER_MUTATION);
  const [verifyEmailMutation] = useMutation<boolean, VerifyEmailArgs>(VERIFY_EMAIL_MUTATION);
  const [resendEmailVerificationMutation] = useMutation<boolean>(RESEND_EMAIL_VERIFICATION_MUTATION);

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
        enqueueSnackbar('Please verify your email. Click to resend your verification email.', { variant: 'info' });
      }
    } catch (e) {
      if (e instanceof ApolloError) {
        enqueueSnackbar(`${e.message}; please contact support.`, { variant: 'error' });
      }
    }
    return user;
  };

  const verifyEmail = async (hash: string): Promise<boolean> => {
    let success = false;
    try {
      const result = await verifyEmailMutation({ variables: { hash: hash } });
      if (result.data == null) {
        throw new Error('unable to verify email; please contact support');
      }

      success = result.data;
      enqueueSnackbar('Email verified!', { variant: 'success' });
    } catch (e) {
      if (e instanceof ApolloError) {
        enqueueSnackbar(`${e.message}; please contact support.`, { variant: 'error' });
      }
    }
    return success;
  };

  const resendEmailVerification = async (): Promise<boolean> => {
    let success = false;
    try {
      const result = await resendEmailVerificationMutation();
      if (result.data == null) {
        throw new Error('unable to resend email verification');
      }
      success = result.data;
      enqueueSnackbar('Please check your email in order to verify your account.', { variant: 'error' });
    } catch (e: unknown) {
      if (e instanceof ApolloError) {
        enqueueSnackbar(`${e.message}; please contact support.`, { variant: 'error' });
      }
    }
    return success;
  };

  return {
    useMe: useMe,
    logoutUser: logoutUser,
    createUser: createUser,
    loginUser: loginUser,
    verifyEmail: verifyEmail,
    resendEmailVerification: resendEmailVerification,
  };
}
