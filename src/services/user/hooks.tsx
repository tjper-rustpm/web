import { useQuery, UseQueryResult, useMutation, UseMutationResult, useQueryClient } from 'react-query';
import { client, AxiosError } from '../../axios/axios';

import {
  User,
  Session,
  LoginUserArgs,
  CreateUserArgs,
  VerifyEmailArgs,
  ForgotPasswordArgs,
  ResetPasswordArgs,
  UpdateUserPasswordArgs,
} from './types';

export function useSession(): UseQueryResult<Session, Error> {
  return useQuery('session', async ({ signal }) => {
    const res = await client.get<User>('/user-api/v1/user/session', { signal });
    return res.data;
  });
}

export function useUser(): UseQueryResult<User, Error> {
  return useQuery('user', async ({ signal }) => {
    const res = await client.get<User>('/user-api/v1/user', { signal });
    return res.data;
  });
}

export function useLogoutUser(): UseMutationResult<void, Error, void> {
  const queryClient = useQueryClient();

  return useMutation<void, Error>(
    async () => {
      await client.post<void>('/user-api/v1/user/logout');
      return;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('session');
        queryClient.invalidateQueries('user');
      },
    },
  );
}

export function useCreateUser(): UseMutationResult<User, Error, CreateUserArgs> {
  return useMutation<User, Error, CreateUserArgs>(async (args) => {
    return client.post<User>('/user-api/v1/user', args).then((res) => res.data);
  });
}

export function useLoginUser(): UseMutationResult<User, Error, LoginUserArgs> {
  const queryClient = useQueryClient();

  return useMutation<User, Error, LoginUserArgs>(
    async (args) => {
      const res = await client.post<User>('/user-api/v1/user/login', args);
      return res.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('session');
        queryClient.invalidateQueries('user');
      },
    },
  );
}

export function useVerifyEmail(): UseMutationResult<void, AxiosError, VerifyEmailArgs> {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, VerifyEmailArgs>(
    async (args) => {
      return client.post<void>('/user-api/v1/user/verify-email', args).then((res) => res.data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('user');
      },
    },
  );
}

export function useResendVerificationEmail(): UseMutationResult<void, Error, void> {
  return useMutation<void, Error>(async () => {
    await client.post<void>('/user-api/v1/user/resend-verification-email');
  });
}

export function useForgotPassword(): UseMutationResult<void, Error, ForgotPasswordArgs> {
  return useMutation<void, Error, ForgotPasswordArgs>(async (args) => {
    await client.post<void>('/user-api/v1/user/forgot-password', args);
  });
}

export function useResetPassword(): UseMutationResult<void, Error, ResetPasswordArgs> {
  return useMutation<void, Error, ResetPasswordArgs>(async (args) => {
    await client.post<void>('/user-api/v1/user/reset-password', args);
  });
}

export function useUpdateUserPassword(): UseMutationResult<User, Error, UpdateUserPasswordArgs> {
  return useMutation<User, Error, UpdateUserPasswordArgs>(async (args) => {
    return client.post<User>('/user-api/v1/user/update-password', args).then((res) => res.data);
  });
}

export function useLogoutAll(): UseMutationResult<void, Error, void> {
  const queryClient = useQueryClient();

  return useMutation<void, Error>(
    async () => {
      await client.post<void>('/user-api/v1/user/logout-all');
      return;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('session');
        queryClient.invalidateQueries('user');
      },
    },
  );
}
