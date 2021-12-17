import Button from '../../components/Button/Button';
import { Card } from '../../styles/Card';
import PasswordField from '../../components/PasswordField/PasswordField';
import { Password as PasswordIcon } from '@styled-icons/material/Password';

import { useFormik } from 'formik';
import * as yup from 'yup';

import { useChangePassword } from '../../services/user/hooks';
import { useRouter } from '../../router/router';
import { toast } from 'react-hot-toast';

interface FormValues {
  password: string;
  confirmPassword: string;
}

interface ChangePasswordProps {
  className?: string;
}

export default function ChangePassword({ className }: ChangePasswordProps): JSX.Element {
  const changePassword = useChangePassword();

  const router = useRouter<{ hash: string }>();

  if (!router.query.hash) {
    router.push('/servers');
  }

  const formik = useFormik<FormValues>({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: yup.object().shape({
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
      changePassword.mutate(
        { hash: router.query.hash as string, password: values.password },
        {
          onSuccess: () => {
            toast.success('Password has been changed.');
          },
          onError: (error: Error) => {
            toast.error(error.message);
          },
        },
      );
    },
  });
  return (
    <Card className={className}>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <h4>Change Password</h4>
          <PasswordIcon />
        </div>
        <PasswordField
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
          disabled={!formik.dirty || !formik.isValid || changePassword.isLoading}
          loading={changePassword.isLoading && !formik.isValidating}
        >
          Sign Up
        </Button>
      </form>
    </Card>
  );
}
