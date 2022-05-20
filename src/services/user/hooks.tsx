import { useQuery, UseQueryResult, useMutation, UseMutationResult, useQueryClient } from 'react-query';
import axios from 'axios';

import {
  User,
  Session,
  LoginUserArgs,
  CreateUserArgs,
  VerifyEmailArgs,
  ForgotPasswordArgs,
  ChangePasswordArgs,
  UpdateUserPasswordArgs,
} from './types';

export function useSession(): UseQueryResult<Session, Error> {
  return useQuery('session', async () => {
    const res = await axios.get<User>('/user-api/v1/user/session');
    return res.data;
  });
}

export function useUser(): UseQueryResult<User, Error> {
  return useQuery('user', async () => {
    const res = await axios.get<User>('/user-api/v1/user');
    return res.data;
  });
}

export function useLogoutUser(): UseMutationResult<void, Error, void> {
  const queryClient = useQueryClient();

  return useMutation<void, Error>(
    async () => {
      await axios.post<void>('/user-api/v1/user/logout');
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
    return axios.post<User>('/user-api/v1/user', args).then((res) => res.data);
  });
}

export function useLoginUser(): UseMutationResult<User, Error, LoginUserArgs> {
  const queryClient = useQueryClient();

  return useMutation<User, Error, LoginUserArgs>(
    async (args) => {
      const res = await axios.post<User>('/user-api/v1/user/login', args);
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

export function useVerifyEmail(): UseMutationResult<void, Error, VerifyEmailArgs> {
  const queryClient = useQueryClient();

  return useMutation<void, Error, VerifyEmailArgs>(
    async (args) => {
      return axios.post<void>('/user-api/v1/user/verify-email', args).then((res) => res.data);
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
    await axios.post<void>('/user-api/v1/user/resend-verification-email');
  });
}

export function useForgotPassword(): UseMutationResult<void, Error, ForgotPasswordArgs> {
  return useMutation<void, Error, ForgotPasswordArgs>(async (args) => {
    await axios.post<void>('/user-api/v1/user/forgot-password', args);
  });
}

export function useChangePassword(): UseMutationResult<void, Error, ChangePasswordArgs> {
  return useMutation<void, Error, ChangePasswordArgs>(async (args) => {
    await axios.post<void>('/user-api/v1/user/change-password', args);
  });
}

export function useUpdateUserPassword(): UseMutationResult<User, Error, UpdateUserPasswordArgs> {
  return useMutation<User, Error, UpdateUserPasswordArgs>(async (args) => {
    return axios.post<User>('/user-api/v1/user/update-password', args).then((res) => res.data);
  });
}

export function useLogoutAll(): UseMutationResult<void, Error, void> {
  const queryClient = useQueryClient();

  return useMutation<void, Error>(
    async () => {
      await axios.post<void>('/user-api/v1/user/logout-all');
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
