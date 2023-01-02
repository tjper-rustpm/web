import { DateTime } from 'luxon';

import { Background } from '../services/server/types';

import Logo from '../components/Logo/Logo';
import { Card } from '../components/Card';
import { DormantServerNameplate } from '../components/DormantServerNameplate';
import { LiveServerNameplate } from '../components/LiveServerNameplate';
import { Typography } from '../components/Typography';

import { DiscordLink, FacepunchLink, RustLink } from '../links/ext';

export const Faq = (): JSX.Element => {
  const example = {
    id: 'example-id',
    name: 'US - Example',
    background: 'forest' as Background,
    elasticIP: '124.241.20.1',
    activePlayers: 190,
    queuedPlayers: 12,
    createdAt: DateTime.local(),
    startsAt: DateTime.local().plus({ hours: 2 }),
  };
  const faqs = [
    {
      question: <p>How can I tell if a server is online or offline?</p>,
      answer: (
        <div>
          <p className="mb-4">
            An online server is characterized by a red flashing circle in the top-right indicating the server is active.
            In the top-left corner, the server&apos;s name and IP address may be found. The current number of active and
            queued players may be found in the bottom-left. In the bottom-right, the amount of time the server has been
            online is presented.
          </p>
          <p className="mb-2">
            An offline server shows the server name and a countdown until the server will be online.
          </p>
        </div>
      ),
      example: (
        <div className="mt-6 mb-4 flex flex-wrap justify-around gap-6">
          <div className="max-w-md w-full">
            <span className="p-2">
              <Typography size="2xl">Online</Typography>
            </span>
            <LiveServerNameplate server={example} />
          </div>
          <div className="max-w-md w-full">
            <span className="p-2">
              <Typography size="2xl">Offline</Typography>
            </span>
            <DormantServerNameplate server={example} />
          </div>
        </div>
      ),
    },
    {
      question: <p>How should I contact support?</p>,
      answer: (
        <p>
          Contact support by submitting a ticket in our{' '}
          <a href={DiscordLink} className="underline font-semibold decoration-slate-400">
            Discord
          </a>{' '}
          server.
        </p>
      ),
    },
    {
      question: (
        <p>
          Are you associated with the developers of{' '}
          <a href={RustLink} className="underline font-semibold decoration-slate-400">
            Rust
          </a>
          ,{' '}
          <a href={FacepunchLink} className="underline font-semibold decoration-slate-400">
            Facepunch
          </a>
          ?
        </p>
      ),
      answer: (
        <p>
          No, we are passionate players and developers who enjoy Rust and want to provide servers that are more
          accessible to people with time constraints.
        </p>
      ),
    },
    {
      question: <p>Why are user accounts necessary?</p>,
      answer: (
        <p>
          VIP packages will be offered via subscriptions and one-time purchases in the future. In order for a user to
          purchase a subscription and to manage it, it is necessary to associate a user account with the subscription.
        </p>
      ),
    },
  ];
  return (
    <div className="max-w-screen-lg mx-auto">
      <div className="flex justify-center items-center mb-6">
        <span className="mr-4">
          <Logo size="large" />
        </span>
        <span className="mb-14">
          <Typography size="4xl">FAQ</Typography>
        </span>
      </div>
      <div className="flex flex-col space-y-8">
        {faqs.map((faq, index) => {
          return (
            <div key={index}>
              <Card size="5xl">
                <p className="flex w-full mb-2 text-slate-900 font-sans font-medium">
                  <span className="text-2xl mr-2 tracking-wider">Q:</span>
                  <span className="mt-1.5 w-full">{faq.question}</span>
                </p>
                <p className="flex w-full text-slate-500 font-sans">
                  <span className="text-2xl mr-2 tracking-wider">A:</span>
                  <p className="mt-1.5 w-full">{faq.answer}</p>
                </p>
                {faq.example}
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};
