import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { InputField } from '../components/InputField';

import { FingerPrintIcon } from '@heroicons/react/outline';

import { Formik, Form } from 'formik';
import * as yup from 'yup';

import { useResetPassword } from '../services/user/hooks';
import { useRouter } from '../router/router';
import { toast } from 'react-hot-toast';

export function ResetPassword(): JSX.Element {
  const resetPassword = useResetPassword();

  const router = useRouter<{ hash: string }>();

  if (!router.query.hash) {
    router.push('/servers');
  }

  return (
    <Card>
      <Formik
        initialValues={{
          password: '',
          confirmPassword: '',
        }}
        validationSchema={yup.object().shape({
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
        })}
        onSubmit={async (values) => {
          resetPassword.mutate(
            { hash: router.query.hash as string, password: values.password },
            {
              onSuccess: () => {
                toast.success('Password has been updated.');
              },
              onError: (error: Error) => {
                toast.error(error.message);
              },
            },
          );
        }}
      >
        {({ isSubmitting }: { isSubmitting: boolean }) => (
          <Form>
            <div className="inline-flex items-center mb-8">
              <h2 className="mr-3 text-3xl">Reset Password</h2>
              <FingerPrintIcon className="w-7" />
            </div>
            <div className="mb-4">
              <InputField name="password" label="Password" type="password" />
              <InputField name="confirmPassword" label="Confirm Password" type="password" />
            </div>
            <Button slate type="submit" loading={isSubmitting}>
              Reset
            </Button>
          </Form>
        )}
      </Formik>
    </Card>
  );
}
