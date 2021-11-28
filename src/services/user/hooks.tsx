import { useQuery, UseQueryResult, useMutation, UseMutationResult, useQueryClient } from 'react-query';
import axios from 'axios';

import { User, LoginUserArgs, CreateUserArgs, VerifyEmailArgs } from './types';

export function useMe(): UseQueryResult<User, Error> {
  return useQuery(
    'me',
    async () => {
      const res = await axios.get<User>('/user-api/v1/user');
      return res.data;
    },
    {
      retry: 1,
    },
  );
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
        queryClient.resetQueries(['me']);
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
      onSuccess: (data: User) => {
        queryClient.setQueryData(['me'], data);
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
        queryClient.invalidateQueries(['me']);
      },
    },
  );
}

export function useResendVerificationEmail(): UseMutationResult<void, Error, void> {
  return useMutation<void, Error>(async () => {
    await axios.post<void>('/user-api/v1/user/resend-verification-email');
    return;
  });
}
