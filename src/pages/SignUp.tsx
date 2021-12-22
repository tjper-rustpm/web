import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Divider } from '../components/Divider';
import { InputField } from '../components/InputField';

import { LockOpenIcon, UserCircleIcon } from '@heroicons/react/outline';

import { Link } from 'react-router-dom';
import { Form, Formik } from 'formik';
import * as yup from 'yup';

import { useCreateUser } from '../services/user/hooks';
import { useRouter } from '../router/router';
import { toast } from 'react-hot-toast';

export const SignUp = (): JSX.Element => {
  const router = useRouter();
  const createUser = useCreateUser();

  return (
    <Card>
      <Formik
        initialValues={{
          email: '',
          password: '',
          confirmPassword: '',
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
          confirmPassword: yup
            .string()
            .test('passwords-match', 'passwords must match', function (value) {
              return this.parent.password === value;
            })
            .required('password confirmation is required'),
        })}
        onSubmit={async (values) => {
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
        }}
      >
        <Form className="mb-6">
          <div className="inline-flex items-center mb-8">
            <h2 className="mr-3 text-3xl">Sign Up</h2>
            <UserCircleIcon className="w-7" />
          </div>

          <div className="mb-4">
            <InputField name="email" label="Email" type="text" />
            <InputField name="password" label="Password" type="password" />
            <InputField name="confirmPassword" label="Confirm Password" type="password" />
          </div>
          <Button slate>
            <div className="inline-flex items-center">
              <UserCircleIcon className="w-4 h-4 mr-2" />
              Sign Up
            </div>
          </Button>
        </Form>
      </Formik>
      <Divider />
      <div className="inline-flex items-center w-full">
        <span className="mr-4">Already have an account?</span>
        <div className="grow">
          <Link to="/login">
            <Button>
              <div className="inline-flex items-center">
                <LockOpenIcon className="w-4 h-4 mr-2" />
                Login
              </div>
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};
