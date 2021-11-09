import { DateTime } from 'luxon';

export type LogoutUserFunc = () => Promise<boolean>;
export type CreateUserFunc = ({ email, password }: { email: string; password: string }) => Promise<User | undefined>;
export type LoginUserFunc = CreateUserFunc;
export type VerifyEmailFunc = (hash: string) => Promise<boolean>;
export type ResendEmailVerificationFunc = () => Promise<boolean>;

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

export interface CreateUserResult {
  createUser: { user: User };
}
export interface CreateUserArgs {
  email: string;
  password: string;
}

export interface LoginUserResult {
  loginUser: { user: User };
}
export interface LoginUserArgs {
  email: string;
  password: string;
}

export interface VerifyEmailArgs {
  hash: string;
}

export interface FetchMeResult {
  user: User | undefined;
  loading: boolean;
}
