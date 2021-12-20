import { Button } from '../components/Button';
import { Divider } from '../components/Divider';
import { InputField } from '../components/InputField';

import { Form, Formik } from 'formik';
import * as yup from 'yup';

export function Authentication(): JSX.Element {
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
                return this.parent.password === value;
              })
              .required('password confirmation is required'),
          })}
          onSubmit={async (values) => {
            alert(`password changing old: ${values.currentPassword} new: ${values.newPassword}`);
          }}
        >
          <Form>
            <h3 className="mb-4 text-2xl">Change Password</h3>
            <div className="mb-4">
              <InputField name="currentPassword" label="Current Password" type="password" />
              <InputField name="newPassword" label="New Password" type="password" />
              <InputField name="confirmNewPassword" label="Confirm New Password" type="password" />
            </div>
            <Button>Change Password</Button>
          </Form>
        </Formik>
      </div>
      <Divider />
      <div>
        <h3 className="my-4 text-2xl">Logout All Active Sessions</h3>
        <p className="my-4 text-md">
          Pressing the button below will logout all active sessions associated with this user.
        </p>
        <Button>Logout</Button>
      </div>
    </div>
  );
}
