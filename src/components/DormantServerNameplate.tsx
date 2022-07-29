import { DateTime } from 'luxon';

import { Typography } from './Typography';
import { Clock } from './Clock';

import { useSubscriptions } from '../services/payment/hooks';
import { Subscription } from '../services/payment/types';
import { useSession } from '../services/user/hooks';
import { DormantServer, Background } from '../services/server/types';

import { StarIcon } from '@heroicons/react/solid';

type DormantServerNameplateProps = {
  server: DormantServer;
};

export const DormantServerNameplate = ({ server }: DormantServerNameplateProps): JSX.Element => {
  const { data: session } = useSession();

  let subscriptions: Subscription[] | undefined;
  if (session) {
    const { data } = useSubscriptions();
    subscriptions = data;
  }

  const subscription = subscriptions?.find(
    (subscription: Subscription) => subscription.serverId === server.id && subscription.status === 'paid',
  );

  return (
    <figure className="relative">
      <div
        className={`${
          BackgroundImage[server.background]
        } bg-cover bg-no-repeat aspect-[2/1] rounded-sm shadow-lg shadow-slate-500`}
      />
      <div className="absolute inset-0 p-4 w-full h-full grid grid-cols-2 text-white">
        <span className="col-start-1 col-span-full">
          <Typography size="4xl">{server.name}</Typography>
          {session && subscription && <StarIcon className="ml-4 w-7 text-red-500" />}
        </span>
        <div className="col-start-2 justify-self-end self-end text-2xl">
          <Clock initial={DateTime.fromISO(server.startsAt.toString()).diffNow()} direction="-" tooltip="Countdown" />
        </div>
      </div>
    </figure>
  );
};

const BackgroundImage: Record<Background, string> = {
  airport: 'bg-airport-nameplate brightness-90',
  beachLighthouse: 'bg-beach-lighthouse-nameplate brightness-[.6]',
  bigOilNight: 'bg-big-oil-night-nameplate brightness-90',
  forest: 'bg-forest-nameplate brightness-[.6]',
  islandLighthouse: 'bg-island-lighthouse-nameplate brightness-[.6]',
  junkyard: 'bg-junkyard-nameplate brightness-[.6]',
  mountainNight: 'bg-mountain-night-nameplate',
  oxum: 'bg-oxum-nameplate brightness-75',
  sewerNight: 'bg-sewer-night-nameplate',
  towerNight: 'bg-tower-night-nameplate',
};
