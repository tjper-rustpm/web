import styled from 'styled-components';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { StyledIconBase } from '@styled-icons/styled-icon';
import { PersonCircle } from '@styled-icons/bootstrap/PersonCircle';

import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import PasswordField from '../../components/PasswordField/PasswordField';
import TextField from '../../components/TextField/TextField';

import { useCreateUser } from '../../services/user/hooks';
import { useRouter } from '../../router/router';
import { toast } from 'react-hot-toast';

interface SignUpProps {
  className?: string;
}

const SignUp = ({ className }: SignUpProps): JSX.Element => {
  const router = useRouter();
  const createUser = useCreateUser();

  const formik = useFormik<{ email: string; password: string; confirmPassword: string }>({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
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
      confirmPassword: yup
        .string()
        .test('passwords-match', 'passwords must match', function (value) {
          return this.parent.password === value;
        })
        .required('password confirmation is required'),
    }),
    onSubmit: async (values) => {
      createUser.mutate(
        { email: values.email, password: values.password },
        {
          onSuccess: () => {
            toast.success('User account created!');
            router.push('/login');
          },
          onError: (error: Error) => {
            toast.error(error.message);
          },
        },
      );
    },
  });

  return (
    <StyledSignUp className={className}>
      <form className="signup__form" onSubmit={formik.handleSubmit}>
        <Header className="signup__header">
          <h4 className="signup__header--title">Sign Up</h4>
          <PersonCircle className="signup__header--icon" />
        </Header>
        <TextField
          className="signup__email"
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
          className="signup__password"
          id="password"
          name="password"
          label="password"
          value={formik.values.password}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <PasswordField
          className="signup__confirm-password"
          id="confirmPassword"
          name="confirmPassword"
          label="confirm password"
          value={formik.values.confirmPassword}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
          helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
        />
        <Button
          className="signup__submit"
          type="submit"
          color="green"
          disabled={!formik.dirty || !formik.isValid || createUser.isLoading}
          loading={createUser.isLoading && !formik.isValidating}
        >
          Sign Up
        </Button>
        <Footer>
          <span className="signup__already-have-account--title">Already have an account?</span>
          <Button
            className="signup__already-have-account--link"
            type="button"
            color="green"
            onClick={(): void => {
              router.push('/login');
            }}
          >
            Login
          </Button>
        </Footer>
      </form>
    </StyledSignUp>
  );
};

export default SignUp;

const StyledSignUp = styled(Card)`
  width: 92%;
  margin: auto;

  & > .signup__form {
    .signup__email,
    .signup__password {
      margin-bottom: 2rem;
    }
    .signup__confirm-password {
      margin-bottom: 4rem;
    }
    .signup__submit {
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

  & > .signup__header--title {
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

  & > .signup__already-have-account--title {
    margin-right: 3rem;
  }
  & > .signup__already-have-account--link {
    flex-grow: 1;
    & > .MuiButtonBase-root {
      padding: 1rem;
    }
  }
`;
