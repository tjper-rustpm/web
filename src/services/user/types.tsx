import { DateTime } from 'luxon';

export interface UserService {
  useMe(): User | undefined;
  logoutUser: LogoutUserFunc;
  createUser: CreateUserFunc;
  loginUser: LoginUserFunc;
  verifyEmail: VerifyEmailFunc;
  resendEmailVerification: ResendEmailVerificationFunc;
}

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
