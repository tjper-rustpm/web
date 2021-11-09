import { gql } from '@apollo/client';

export const CREATE_USER_MUTATION = gql`
  mutation CreateUser($email: String!, $password: String!) {
    createUser(input: { email: $email, password: $password }) {
      user {
        id
        email
        verifiedAt
        updatedAt
        createdAt
      }
    }
  }
`;

export const LOGIN_USER_MUTATION = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(input: { email: $email, password: $password }) {
      user {
        id
        email
        verifiedAt
        updatedAt
        createdAt
      }
    }
  }
`;

export const LOGOUT_USER_MUTATION = gql`
  mutation {
    logoutUser
  }
`;

export const VERIFY_EMAIL_MUTATION = gql`
  mutation VerifyEmail($hash: String!) {
    verifyEmail(input: { hash: $hash })
  }
`;

export const RESEND_EMAIL_VERIFICATION_MUTATION = gql`
  mutation {
    resendEmailVerification
  }
`;

export const ME_QUERY = gql`
  query Me {
    me {
      id
      email
      role
      verifiedAt
      updatedAt
      createdAt
    }
  }
`;
