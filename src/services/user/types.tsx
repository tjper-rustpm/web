import { DateTime } from 'luxon';

export interface User {
  id: string;
  email: string;
  verifiedAt: DateTime;
  updatedAt: DateTime;
  createdAt: DateTime;
}

export interface CreateUserArgs {
  email: string;
  password: string;
}

export interface LoginUserArgs {
  email: string;
  password: string;
}

export interface VerifyEmailArgs {
  hash: string;
}
