import { DateTime } from 'luxon';

export interface Session {
  id: string;
  user: {
    id: string;
    email: string;
    role: string;
  };
  absoluteExpiration: DateTime;
  lastActivityAt: DateTime;
  createdAt: DateTime;
}

export interface User {
  id: string;
  role: string;
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

export interface ForgotPasswordArgs {
  email: string;
}

export interface ResetPasswordArgs {
  hash: string;
  password: string;
}

export interface UpdateUserPasswordArgs {
  currentPassword: string;
  newPassword: string;
}
