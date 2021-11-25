import React, { useState } from 'react';

import { useSnackbar } from 'notistack';

import { useQuery, UseQueryResult, useMutation, UseMutationResult } from 'react-query';
import axios from 'axios';

import { User, LoginUserArgs, CreateUserArgs, VerifyEmailArgs } from './types';

const me = async () => {
  const { data } = await axios.get<User>('http://localhost:8000/user-api/v1/user');
  return data;
};

export function useMe(): UseQueryResult<User, Error> {
  return useQuery('me', () => me());
}

const logoutUser = async () => {
  const { data } = await axios.post<null>('http://localhost:8000/user-api/v1/user/logout');
  return data;
};

export function useLogoutUser(): UseMutationResult<null, Error, null> {
  return useMutation('logout', logoutUser);
}

const createUser = async (args: CreateUserArgs) => {
  const { data } = await axios.post<User>('http://localhost:8000/user-api/v1/user', args);
  return data;
};

export function useCreateUser(): UseMutationResult<User, Error, CreateUserArgs> {
  return useMutation('create user', createUser);
}

const loginUser = async (args: LoginUserArgs) => {
  const { data } = await axios.post<User>('http://localhost:8000/user-api/v1/user/login', args);
  return data;
};

export function useLoginUser(): UseMutationResult<User, Error, LoginUserArgs> {
  return useMutation('login user', loginUser);
}

const verifyEmail = async (args: VerifyEmailArgs) => {
  const { data } = await axios.post<null>('http://localhost:8000/user-api/v1/user/verify-email', args);
  return data;
};

export function useVerifyEmail(): UseMutationResult<null, Error, VerifyEmailArgs> {
  return useMutation('verify email', verifyEmail);
}

const resendVerificationEmail = async () => {
  const { data } = await axios.post<null>('http://localhost:8000/user-api/v1/user/resend-verification-email');
  return data;
};

export function useResendVerificationEmail(): UseMutationResult<null, Error, null> {
  return useMutation('resend verification email', resendVerificationEmail);
}
