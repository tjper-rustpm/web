import styled from 'styled-components';
import * as yup from 'yup';

import { StyledIconBase } from '@styled-icons/styled-icon';
import { PersonCircle } from '@styled-icons/bootstrap/PersonCircle';

import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import PasswordField from '../../components/PasswordField/PasswordField';
import TextField from '../../components/TextField/TextField';

import { useFormik } from 'formik';
import { useLoginUser } from '../../services/user/use';
import { useRouter } from '../../router/router';

interface FormValues {
  email: string;
  password: string;
}

type SignInProps = {
  className?: string;
};

const SignIn = ({ className }: SignInProps): JSX.Element => {
  const router = useRouter();
  const loginUser = useLoginUser();

  const formik = useFormik<FormValues>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: yup.object().shape({
      email: yup.string().email('enter a valid email').required('email is required'),
      password: yup
        .string()
        .min(8)
        .max(64)
        .matches(/[a-z]+/, 'at least one lower-case letter is required')
        .matches(/[A-Z]+/, 'at least one upper-case letter is required')
        .matches(/[\d]+/, 'at least one number is required')
        .required('password is required'),
    }),
    onSubmit: async (values) => {
      await loginUser({ email: values.email, password: values.password });
      router.push('/servers');
    },
  });
  return (
    <StyledSignIn className={className}>
      <form className="signin__form" onSubmit={formik.handleSubmit}>
        <Header className="signin__header">
          <h4 className="signin__header--title">Login</h4>
          <PersonCircle className="signin__header--icon" />
        </Header>
        <TextField
          className="signin__email"
          id="email"
          name="email"
          label="email"
          value={formik.values.email}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <PasswordField
          className="signin__password"
          id="password"
          name="password"
          label="password"
          value={formik.values.password}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button
          className="signin__submit"
          type="submit"
          color="green"
          disabled={!formik.dirty || !formik.isValid || formik.isSubmitting}
          loading={formik.isSubmitting && !formik.isValidating}
        >
          Login
        </Button>
        <Footer>
          <span className="signin__create-account--title">Need to create an account?</span>
          <Button
            className="signin__create-account--link"
            type="button"
            color="green"
            onClick={(): void => {
              router.push('/signup');
            }}
          >
            Sign Up
          </Button>
        </Footer>
      </form>
    </StyledSignIn>
  );
};

export default SignIn;

const StyledSignIn = styled(Card)`
  width: 92%;
  margin: auto;

  & > .signin__form {
    .signin__email {
      margin-bottom: 2rem;
    }
    .signin__password {
      margin-bottom: 4rem;
    }
    .signin__submit {
      margin: auto;
      margin-bottom: 3rem;
      & .MuiButtonBase-root {
        background-color: ${(props): string => props.theme.colors.golf.light};
      }
    }
  }
`;

const Header = styled.div`
  height: 5rem;
  display: flex;
  align-items: center;
  margin-bottom: 2.2rem;

  & > .signin__header--title {
    margin-right: 2rem;
  }
  ${StyledIconBase} {
    height: 40%;
  }
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  margin: auto;

  font-size: 1.6rem;
  padding: 3rem;
  border-top: 0.1rem solid ${(props): string => props.theme.colors.charlie};

  & > .signin__create-account--title {
    margin-right: 3rem;
  }
  & > .signin__create-account--link {
    flex-grow: 1;
    & > .MuiButtonBase-root {
      padding: 1rem;
    }
  }
`;
