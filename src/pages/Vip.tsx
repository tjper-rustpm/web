import { useState } from 'react';

import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { InputField } from '../components/InputField';
import { Spinner } from '../components/Spinner';
import { Typography } from '../components/Typography';

import { SteamIDLink } from '../links/ext';

import { Link, Redirect } from 'react-router-dom';
import { useRouter } from '../router/router';

import { useSession } from '../services/user/hooks';
import { useStripeCheckout, useStripeSubscriptionCheckout } from '../services/payment/hooks';
import { Price, Redirect as PaymentRedirect } from '../services/payment/types';
import { useServers } from '../services/server/hooks';
import { AnyServer } from '../services/server/types';

import { ExclamationCircleIcon, StarIcon } from '@heroicons/react/24/solid';
import { ReactComponent as PoweredByStripe } from '../imgs/stripe/white.svg';

import { RadioGroup } from '@headlessui/react';

import * as yup from 'yup';
import { Field, FieldProps, Form, Formik } from 'formik';
import { toast } from 'react-hot-toast';
import { oops } from '../errors/errors';

export const Vip = (): JSX.Element => {
  const router = useRouter<VipQueryArgs>();
  const checkout = useStripeCheckout();
  const subscriptionCheckout = useStripeSubscriptionCheckout();

  const { data: session } = useSession();
  const { data, isLoading, error } = useServers();

  const [plan, setPlan] = useState<Plan>('one time');
  const [checkoutEnabled, setCheckoutEnabled] = useState<boolean>(true);
  const handlePlanChange = (plan: Plan) => {
    setPlan(plan);
    if (plan === 'monthly subscription' && !session) {
      setCheckoutEnabled(false);
    } else if (plan === 'one time') {
      setCheckoutEnabled(true);
    }
  };

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
          <ExclamationCircleIcon className="h-10 text-red-400 mr-3" />
          <Typography size="4xl">Error!</Typography>
        </div>
        <p className="font-sans">
          An unexpected error has occurred and is being followed up on by our team. We apologize for this inconvenience,
          in the meantime, please try again. If the issue persists please check our Discord for more details.
        </p>
      </Card>
    );
  }

  const server = data.find((server: AnyServer) => server.id === router.query.serverID);
  if (server == undefined) {
    return <Redirect to="/servers" />;
  }

  const checkedStyle = 'border-neutral-400 bg-slate-100';
  const defaultStyle = 'border-neutral-200 bg-slate-200';
  const radioGroups = [
    { value: 'one time', title: 'Five Day', details: 'One time - $5.00' },
    { value: 'monthly subscription', title: 'Monthly', details: 'Subscription - $10.00 / month' },
  ];

  return (
    <Card>
      <Formik
        initialValues={{
          plan: plan,
          steamId: '',
        }}
        validationSchema={yup.object().shape({
          plan: yup.string().oneOf(['one time', 'monthly subscription']),
          steamId: yup.string().length(17).required('Steam ID is required'),
        })}
        onSubmit={(values, formikHelpers) => {
          let mutate = checkout.mutate;
          let priceId: Price = 'price_1LyigBCEcXRU8XL2L6eMGz6Y';
          switch (plan) {
            case 'one time':
              break;
            case 'monthly subscription':
              mutate = subscriptionCheckout.mutate;
              priceId = 'price_1KLJWjCEcXRU8XL2TVKcLGUO';
              break;
            default:
              oops();
              return;
          }

          mutate(
            {
              serverId: router.query.serverID as string,
              steamId: values.steamId,
              cancelUrl: `${window.location.origin}/servers`,
              successUrl: `${window.location.origin}/servers`,
              priceId: priceId,
            },
            {
              onSuccess: (data: PaymentRedirect) => {
                toast.success('Navigating to Stripe checkout.');
                window.location.href = data.url;
              },
              onError: (error) => {
                formikHelpers.setSubmitting(false);
                if (error?.response?.status === 409) {
                  toast.success('VIP access has already been granted to this Steam ID.');
                  return;
                }
                oops();
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
            <div className="flex items-center mb-6">
              <Typography size="4xl">VIP</Typography>
              <StarIcon className="ml-4 w-7 text-red-500" />
            </div>
            <div className="font-sans text-md text-center px-8 mb-8">
              <p>Becoming a VIP of {server.name} allows you to bypass the player queue when joining.</p>
            </div>
            <div className="mb-4">
              <RadioGroup
                className="mb-6"
                value={plan}
                onChange={(plan: Plan) => {
                  setPlan(plan);
                  handlePlanChange(plan);
                }}
              >
                <RadioGroup.Label>
                  <div className="text-slate-700 mx-2 mb-2">
                    <Typography size="2xl">Plan</Typography>
                  </div>
                </RadioGroup.Label>
                {radioGroups.map((option) => {
                  return (
                    <Field key={option.value} name="plan">
                      {({ field }: FieldProps) => (
                        <RadioGroup.Option {...field} value={option.value}>
                          {({ checked }) => (
                            <div
                              className={`flex justify-between mb-2 p-2 border rounded ${
                                checked ? checkedStyle : defaultStyle
                              }`}
                            >
                              <div>
                                <Typography size="lg">{option.title}</Typography>
                                <div className="font-sans text-sm">{option.details}</div>
                              </div>
                              {checked && <StarIcon className="w-5 text-red-500" />}
                            </div>
                          )}
                        </RadioGroup.Option>
                      )}
                    </Field>
                  );
                })}
                {plan === 'monthly subscription' && !session && (
                  <p className="font-sans text-sm text-center">
                    Must{' '}
                    <Link className="font-sans text-sm underline font-semibold decoration-slate-400" to="/login">
                      login
                    </Link>{' '}
                    to create a subscription.
                  </p>
                )}
              </RadioGroup>
              <div>
                <InputField
                  name="steamId"
                  label="Steam ID"
                  labelSize="2xl"
                  help={
                    <a href={SteamIDLink} className="font-sans text-sm underline font-semibold decoration-slate-400">
                      How to find my Steam ID?
                    </a>
                  }
                  type="text"
                />
              </div>
            </div>
            <div>
              <Button disabled={!checkoutEnabled} slate loading={isSubmitting} type="submit">
                <div className="flex items-center space-x-3 w-max m-auto">
                  <Typography>Checkout</Typography>
                  <PoweredByStripe className="w-28" />
                </div>
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Card>
  );
};

interface VipQueryArgs {
  serverID: string;
}

declare type Plan = 'one time' | 'monthly subscription';
