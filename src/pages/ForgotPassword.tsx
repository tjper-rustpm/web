import { Card } from '../components/Card';
import { InputField } from '../components/InputField';
import { Button } from '../components/Button';

import { MailIcon, QuestionMarkCircleIcon } from '@heroicons/react/outline';

import { Formik, Form } from 'formik';
import * as yup from 'yup';

import { useForgotPassword } from '../services/user/hooks';
import { toast } from 'react-hot-toast';

export function ForgotPassword(): JSX.Element {
  const forgotPassword = useForgotPassword();

  return (
    <Card>
      <Formik
        initialValues={{
          email: '',
        }}
        validationSchema={yup.object().shape({
          email: yup.string().email('enter a valid email').required('email is required'),
        })}
        onSubmit={async (values) => {
          forgotPassword.mutate(values, {
            onSuccess: () => {
              toast.success('An email to reset your password has been sent.');
            },
            onError: (error: Error) => {
              toast.error(error.message);
            },
          });
        }}
      >
        <Form>
          <div className="inline-flex items-center mb-8">
            <h2 className="mr-3 text-3xl">Reset Password</h2>
            <QuestionMarkCircleIcon className="w-7" />
          </div>
          <div className="mb-4">
            <InputField name="email" label="Email" type="text" />
          </div>
          <Button>
            <div className="inline-flex items-center">
              <MailIcon className="w-4 h-4 mr-2" />
              Reset Password
            </div>
          </Button>
        </Form>
      </Formik>
    </Card>
  );
}
