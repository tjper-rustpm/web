import React from 'react';

import { Button } from '../components/Button';
import { Divider } from '../components/Divider';
import { InputField } from '../components/InputField';

import { Form, Formik } from 'formik';
import * as yup from 'yup';

import { useLogoutAll, useUser, useResendVerificationEmail, useUpdateUserPassword } from '../services/user/hooks';
import { toast } from 'react-hot-toast';

export function Authentication(): JSX.Element {
  const { data: user } = useUser();
  const updateUserPassword = useUpdateUserPassword();
  const logoutAll = useLogoutAll();
  const resendVerificationEmail = useResendVerificationEmail();

  const onLogoutAll = () => {
    logoutAll.mutate(undefined, {
      onSuccess: () => {
        toast.success('All user sessions ended!');
      },
      onError: (error: Error) => {
        toast.error(error.message);
      },
    });
  };

  const onResendVerificationEmail = () => {
    resendVerificationEmail.mutate(undefined, {
      onSuccess: () => {
        toast.success('Verification email sent!');
      },
      onError: (error: Error) => {
        toast.error(error.message);
      },
    });
  };

  return (
    <div>
      <div>
        <Formik
          initialValues={{
            currentPassword: '',
            newPassword: '',
            confirmNewPassword: '',
          }}
          validationSchema={yup.object().shape({
            currentPassword: yup
              .string()
              .min(8)
              .max(64)
              .matches(/[a-z]+/, 'at least one lower-case letter is required')
              .matches(/[A-Z]+/, 'at least one upper-case letter is required')
              .matches(/[\d]+/, 'at least one number is required')
              .required('password is required'),
            newPassword: yup
              .string()
              .min(8)
              .max(64)
              .matches(/[a-z]+/, 'at least one lower-case letter is required')
              .matches(/[A-Z]+/, 'at least one upper-case letter is required')
              .matches(/[\d]+/, 'at least one number is required')
              .required('password is required'),
            confirmNewPassword: yup
              .string()
              .test('passwords-match', 'passwords must match', function (value) {
                return this.parent.newPassword === value;
              })
              .required('password confirmation is required'),
          })}
          onSubmit={(values, formikHelpers) => {
            updateUserPassword.mutate(
              { currentPassword: values.currentPassword, newPassword: values.newPassword },
              {
                onSuccess: () => {
                  toast.success('Password updated!');
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
            <Form>
              <h3 className="mb-4 text-2xl">Update Password</h3>
              <div className="mb-4">
                <InputField name="currentPassword" label="Current Password" type="password" />
                <InputField name="newPassword" label="New Password" type="password" />
                <InputField name="confirmNewPassword" label="Confirm New Password" type="password" />
              </div>
              <Button slate loading={isSubmitting} type="submit">
                Update Password
              </Button>
            </Form>
          )}
        </Formik>
      </div>
      {user && user.verifiedAt == undefined ? (
        <React.Fragment>
          <Divider />
          <div>
            <h3 className="my-4 text-2xl">Resend Email Verification</h3>
            <p className="font-sans my-4 text-md">
              Pressing the button below will send an email to the user allowing them to verify they have access to the
              email associated with the account.
            </p>
            <Button slate loading={resendVerificationEmail.isLoading} onClick={onResendVerificationEmail}>
              Resend Email Verification
            </Button>
          </div>
        </React.Fragment>
      ) : null}
      <Divider />
      <div>
        <h3 className="my-4 text-2xl">Logout All Active Sessions</h3>
        <p className="font-sans my-4 text-md">
          Pressing the button below will logout all active sessions associated with this user.
        </p>
        <Button slate loading={logoutAll.isLoading} onClick={onLogoutAll}>
          Logout
        </Button>
      </div>
    </div>
  );
}
