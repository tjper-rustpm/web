import { useQuery, UseQueryResult, useMutation, UseMutationResult } from 'react-query';
import axios from 'axios';

import { User, LoginUserArgs, CreateUserArgs, VerifyEmailArgs } from './types';

export function useMe(): UseQueryResult<User, Error> {
  return useQuery('me', () => {
    axios.get<User>('/user-api/v1/user').then((res) => res.data);
  });
}

export function useLogoutUser(): UseMutationResult<void, Error, void> {
  return useMutation<void, Error>(async () => {
    await axios.post<void>('/user-api/v1/user/logout');
    return;
  });
}

export function useCreateUser(): UseMutationResult<User, Error, CreateUserArgs> {
  return useMutation<User, Error, CreateUserArgs>(async (args) => {
    return axios.post<User>('/user-api/v1/user', args).then((res) => res.data);
  });
}

export function useLoginUser(): UseMutationResult<User, Error, LoginUserArgs> {
  return useMutation<User, Error, LoginUserArgs>(async (args) => {
    return axios.post<User>('/user-api/v1/user/login', args).then((res) => res.data);
  });
}

export function useVerifyEmail(): UseMutationResult<void, Error, VerifyEmailArgs> {
  return useMutation<void, Error, VerifyEmailArgs>(async (args) => {
    return axios.post<void>('/user-api/v1/user/verify-email', args).then((res) => res.data);
  });
}

export function useResendVerificationEmail(): UseMutationResult<void, Error, void> {
  return useMutation<void, Error>(async () => {
    await axios.post<void>('/user-api/v1/user/resend-verification-email');
    return;
  });
}
