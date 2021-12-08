import { Card } from '../../styles/Card';
import TextField from '../../components/TextField/TextField';
import Button from '../../components/Button/Button';

import { Help } from '@styled-icons/entypo/Help';

import { useFormik } from 'formik';
import * as yup from 'yup';
import { useForgotPassword } from '../../services/user/hooks';
import { toast } from 'react-hot-toast';

interface ForgotPasswordProps {
  className?: string;
}

export default function ForgotPassword({ className }: ForgotPasswordProps): JSX.Element {
  const forgotPassword = useForgotPassword();

  const formik = useFormik<{ email: string }>({
    initialValues: {
      email: '',
    },
    validationSchema: yup.object().shape({
      email: yup.string().email('enter a valid email').required('email is required'),
    }),
    onSubmit: async (values) => {
      forgotPassword.mutate(values, {
        onSuccess: () => {
          toast.success('An email to reset your password has been sent.');
        },
        onError: (error: Error) => {
          toast.error(error.message);
        },
      });
    },
  });
  return (
    <Card className={className}>
      <form onSubmit={formik.handleSubmit}>
        <div className="signup__header">
          <h4>Forgot Password</h4>
          <Help />
        </div>
        <TextField
          id="email"
          name="email"
          label="email"
          value={formik.values.email}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <Button
          className="signup__submit"
          type="submit"
          color="green"
          disabled={!formik.dirty || !formik.isValid || forgotPassword.isLoading}
          loading={forgotPassword.isLoading && !formik.isValidating}
        >
          Sign Up
        </Button>
      </form>
    </Card>
  );
}
