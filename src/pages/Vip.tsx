import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Divider } from '../components/Divider';
import { DormantServerNameplate } from '../components/DormantServerNameplate';
import { InputField } from '../components/InputField';
import { LiveServerNameplate } from '../components/LiveServerNameplate';
import { Spinner } from '../components/Spinner';
import { Typography } from '../components/Typography';

import { Redirect } from 'react-router-dom';
import { useRouter } from '../router/router';

import { useSession } from '../services/user/hooks';
import { useStripeCheckout } from '../services/payment/hooks';
import { Redirect as PaymentRedirect } from '../services/payment/types';
import { useServers } from '../services/server/hooks';
import { AnyServer } from '../services/server/types';

import { ExclamationIcon, StarIcon } from '@heroicons/react/solid';
import { ReactComponent as PoweredByStripe } from '../imgs/stripe/white.svg';

import * as yup from 'yup';
import { Form, Formik } from 'formik';
import { toast } from 'react-hot-toast';

export const Vip = (): JSX.Element => {
  const router = useRouter<VipQueryArgs>();
  const checkout = useStripeCheckout();

  const { data: session } = useSession();
  const { data, isLoading, error } = useServers();

  if (!router.query.serverID) {
    return <Redirect to="/servers" />;
  }

  if (!data || isLoading) {
    return (
      <div className="h-16 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Spinner />
      </div>
    );
  }
  if (error) {
    return (
      <Card>
        <div className="flex items-center mb-6">
          <ExclamationIcon className="h-10 text-red-400 mr-3" />
          <Typography size="4xl">Error!</Typography>
        </div>
        <p className="font-sans">
          An unexpected error has occurred and is being followed up on by our team. We apologize for this inconvenience,
          in the meantime, please try again. If the issue persists please check our Discord for more details.
        </p>
      </Card>
    );
  }

  let nameplate: JSX.Element;

  const server = data.find((server: AnyServer) => server.id === router.query.serverID);
  if (server == undefined) {
    return <Redirect to="/servers" />;
  }

  switch (server.kind) {
    case 'live':
      nameplate = <LiveServerNameplate server={server} />;
      break;
    case 'dormant':
      nameplate = <DormantServerNameplate server={server} />;
      break;
  }

  return (
    <Card>
      <Formik
        initialValues={{
          steamId: '',
        }}
        validationSchema={yup.object().shape({
          steamId: yup.string().length(17).required('Steam ID is required'),
        })}
        onSubmit={(values, formikHelpers) => {
          checkout.mutate(
            {
              serverId: router.query.serverID as string,
              steamId: values.steamId,
              cancelUrl: 'http://localhost:8000/servers',
              successUrl: 'http://localhost:8000/servers',
              priceId: 'price_1KLJWjCEcXRU8XL2TVKcLGUO',
            },
            {
              onSuccess: (data: PaymentRedirect) => {
                toast.success('Navigating to Stripe checkout.');
                window.location.href = data.url;
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
            <div className="flex items-center mb-6 justify-between">
              <div className="flex items-center">
                <Typography size="4xl">VIP</Typography>
                <StarIcon className="ml-4 w-7 text-red-500" />
              </div>
              <div>
                <Typography size="3xl">$10 / Month</Typography>
              </div>
            </div>
            {nameplate}
            <div className="font-sans text-center text-md mt-10 mb-2 px-8">
              <p className="mb-6">{server.description}</p>
              <p>Becoming a VIP of {server.name} allows you to bypass the player queue when joining.</p>
            </div>
            <Divider />
            <div className="mb-4">
              <InputField name="steamId" label="Steam ID" type="text" />
            </div>
            <div>
              <Button disabled={!session} slate loading={isSubmitting} type="submit">
                <div className="flex items-center space-x-3 w-max m-auto">
                  <Typography>Checkout</Typography>
                  <PoweredByStripe className="w-28" />
                </div>
              </Button>
            </div>
            {!session && (
              <p className="font-sans font-bold text-center text-md mt-4">Sign up or Log in before becoming a VIP.</p>
            )}
          </Form>
        )}
      </Formik>
    </Card>
  );
};

interface VipQueryArgs {
  serverID: string;
}
