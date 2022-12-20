import { Link } from 'react-router-dom';

import { ScheduleV2 } from './Schedule';

import { Button } from './Button';
import { Card } from './Card';
import { DormantServerNameplate } from './DormantServerNameplate';
import { LiveServerNameplate } from './LiveServerNameplate';
import { Tooltip } from './Tooltip';
import { Typography } from './Typography';

import { AnyServer, Tag } from '../services/server/types';

import {
  CalendarIcon,
  CalendarDaysIcon,
  GlobeAmericasIcon,
  MapIcon,
  PlayIcon,
  ScaleIcon,
  StarIcon,
  UserGroupIcon,
  FingerPrintIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

interface ServerProps {
  server: AnyServer;
  vipNav?: boolean;
  joinNav?: boolean;
}

export const Server = (props: ServerProps): JSX.Element => {
  const { server, vipNav = false, joinNav = false } = props;

  let nameplate: JSX.Element;
  const buttons: JSX.Element[] = [];

  const capacityAvailable = server.subscriptions?.activeSubscriptions < server.subscriptions?.subscriptionLimit;

  if (capacityAvailable && vipNav) {
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

  if (server.kind == 'live' && joinNav) {
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
};

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
