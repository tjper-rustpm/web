import { Link } from 'react-router-dom';

import { ScheduleV2 } from '../../components/Schedule';

import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { DormantServerNameplate } from '../../components/DormantServerNameplate';
import { LiveServerNameplate } from '../../components/LiveServerNameplate';
import { Tooltip } from '../../components/Tooltip';
import { Spinner } from '../../components/Spinner';
import { Typography } from '../../components/Typography';

import { AnyServer, Tag } from '../../services/server/types';
import { useServers } from '../../services/server/hooks';

import { Subscription } from '../../services/payment/types';
import { useSubscriptions } from '../../services/payment/hooks';

import {
  CalendarIcon,
  CalendarDaysIcon,
  ExclamationCircleIcon,
  GlobeAmericasIcon,
  MapIcon,
  PlayIcon,
  ScaleIcon,
  StarIcon,
  UserGroupIcon,
  FingerPrintIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

/**
 * Servers is a component responsible for Rustpm's servers.
 */
const Servers = (): JSX.Element => {
  const { data, isLoading, error } = useServers();
  const { data: subscriptions } = useSubscriptions();

  if (isLoading || !data) {
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

  const servers = data.map((server: AnyServer) => {
    let nameplate: JSX.Element;
    const buttons: JSX.Element[] = [];

    const subscription = subscriptions?.find(
      (subscription: Subscription) => subscription.serverId === server.id && subscription.status === 'paid',
    );

    const capacityAvailable = server.subscriptions?.activeSubscriptions < server.subscriptions?.subscriptionLimit;

    if (capacityAvailable && !subscription) {
      buttons.push(
        <Link to={`../vip/${server.subscriptions.id}`} className="w-full">
          <Button slate>
            <span className="flex items-center justify-center space-x-2">
              <StarIcon className="h-6" />
              <Typography size="xl">VIP</Typography>
            </span>
          </Button>
        </Link>,
      );
    }

    switch (server.kind) {
      case 'live':
        nameplate = <LiveServerNameplate server={server} />;

        buttons.push(
          <Button slate>
            <a href={`steam://connect/${server.elasticIP}:28015`}>
              <span className="flex items-center justify-center space-x-2">
                <PlayIcon className="h-6" />
                <Typography size="xl">Join</Typography>
              </span>
            </a>
          </Button>,
        );

        break;
      case 'dormant':
        nameplate = <DormantServerNameplate server={server} />;
        break;
    }

    return (
      <Card key={server.id} padding="compact">
        <div className="space-y-7">
          {nameplate}
          {buttons.length > 0 && (
            <div className="flex space-x-4 w-11/12 m-auto">
              {buttons.map((button: JSX.Element, index: number) => (
                <span key={index.toString()} className="w-full">
                  {button}
                </span>
              ))}
            </div>
          )}
          <ScheduleV2 schedule={server.events} />
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-4 pb-4">
            {server.tags.map((tag: Tag) => (
              <div key={tag.id}>
                <Tooltip content={<p className="font-sans text-md min-w-max">{tag.description}</p>} position="top">
                  <div className="flex items-center pl-3 pr-4 space-x-3 bg-slate-600 font-thin text-lg text-white rounded-3xl h-8 shadow-lg shadow-slate-500">
                    <div className="h-5">{TagIconComponent[tag.icon]}</div>
                    <Typography size="xl">{tag.value}</Typography>
                  </div>
                </Tooltip>
              </div>
            ))}
          </div>
        </div>
      </Card>
    );
  });

  return <div className="m-auto md:w-5/6 3xl:w-1/2 flex flex-wrap gap-y-16">{servers}</div>;
};

export default Servers;

const TagIconComponent: Record<string, JSX.Element> = {
  userGroup: <UserGroupIcon className="h-full" />,
  map: <MapIcon className="h-full" />,
  globe: <GlobeAmericasIcon className="h-full" />,
  calendarDay: <CalendarIcon className="h-full" />,
  calendarWeek: <CalendarDaysIcon className="h-full" />,
  calendarEvent: <CalendarIcon className="h-full" />,
  games: <ScaleIcon className="h-full" />,
  fingerPrint: <FingerPrintIcon className="h-full" />,
  clock: <ClockIcon className="h-full" />,
};
