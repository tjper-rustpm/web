import * as yup from 'yup';

import { LockOpenIcon, UserCircleIcon, QuestionMarkCircleIcon } from '@heroicons/react/outline';

import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Divider } from '../components/Divider';
import { InputField } from '../components/InputField';

import { useLoginUser } from '../services/user/hooks';
import { User } from '../services/user/types';

import { Form, Formik } from 'formik';
import { Link } from 'react-router-dom';

import { useRouter } from '../router/router';
import { toast } from 'react-hot-toast';

export const SignIn = (): JSX.Element => {
  const router = useRouter();
  const loginUser = useLoginUser();

  return (
    <Card>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={yup.object().shape({
          email: yup.string().email('enter a valid email').required('email is required'),
          password: yup
            .string()
            .min(8)
            .max(64)
            .matches(/[a-z]+/, 'at least one lower-case letter is required')
            .matches(/[A-Z]+/, 'at least one upper-case letter is required')
            .matches(/[\d]+/, 'at least one number is required')
            .required('password is required'),
        })}
        onSubmit={(values, formikHelpers) => {
          loginUser.mutate(
            { email: values.email, password: values.password },
            {
              onSuccess: (data: User) => {
                toast.success('Successfully logged-in!');
                if (!data.verifiedAt) {
                  toast('Please verify your email.', { icon: '⚠️' });
                }
                router.push('/servers');
              },
              onError: (error: Error) => {
                toast.error(error.message);
              },
              onSettled: () => {
                formikHelpers.setSubmitting(false);
              },
            },
          );
        }}
      >
        {({ isSubmitting }: { isSubmitting: boolean }) => (
          <Form className="mb-6">
            <div className="flex items-center mb-8">
              <h2 className="mr-3 text-3xl">Login</h2>
              <LockOpenIcon className="w-7" />
            </div>
            <div className="mb-4">
              <InputField name="email" label="Email" type="text" />
              <InputField name="password" label="Password" type="password" />
            </div>
            <div>
              <Button slate loading={isSubmitting} type="submit">
                <div className="flex items-center w-max m-auto">
                  <LockOpenIcon className="w-5 mr-2" /> Log In
                </div>
              </Button>
            </div>
          </Form>
        )}
      </Formik>
      <Divider />
      <div className="flex flex-wrap items-center w-full">
        <span className="mr-4 text-md">Need to create an account?</span>
        <div className="grow">
          <Link to="/signup">
            <Button>
              <div className="flex items-center w-max m-auto">
                <UserCircleIcon className="w-5 mr-2" />
                Sign Up
              </div>
            </Button>
          </Link>
        </div>
      </div>
      <Divider />
      <div className="flex flex-wrap items-center w-full">
        <span className="mr-4 text-md">Forgot your password?</span>
        <div className="grow">
          <Link to="/forgot-password">
            <Button>
              <div className="flex items-center w-max m-auto">
                <QuestionMarkCircleIcon className="w-5 mr-2" />
                Forgot Password
              </div>
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};
