import { DateTime } from 'luxon';

import { Tooltip } from './Tooltip';
import { Typography } from './Typography';

import { useCount } from '../hooks/useCount';
import { DormantServer, Background } from '../services/server/types';

type DormantServerNameplateProps = {
  server: DormantServer;
};

export const DormantServerNameplate = ({ server }: DormantServerNameplateProps): JSX.Element => {
  const count = useCount({
    direction: '-',
    initial: DateTime.fromISO(server.startsAt.toString()).diffNow(),
  });

  return (
    <figure
      className={`${
        BackgroundImage[server.background]
      } bg-cover bg-no-repeat aspect-[2/1] grid grid-cols-2 rounded-sm shadow-lg shadow-slate-500 p-4 max-w-xl text-white`}
    >
      <span className="col-start-1 col-span-full">
        <Typography size="4xl">{server.name}</Typography>
      </span>
      <div className="col-start-2 justify-self-end self-end text-2xl">
        <Tooltip content="Countdown" position="top">
          <Typography size="2xl">{count.toFormat('hh:mm:ss')}</Typography>
        </Tooltip>
      </div>
    </figure>
  );
};

const BackgroundImage: Record<Background, string> = {
  airport: 'bg-airport-nameplate',
  beachLighthouse: 'bg-beach-lighthouse-nameplate',
  bigOilNight: 'bg-big-oil-nigh-nameplate',
  forest: 'bg-forest-nameplate',
  islandLighthouse: 'bg-island-lighthouse-nameplate',
  junkyard: 'bg-junkyard-nameplate',
  mountainNight: 'bg-mountain-night-nameplate',
  oxum: 'bg-oxum-nameplate',
  sewerNight: 'bg-sewer-night-nameplate',
  towerNight: 'bg-tower-night-nameplate',
};
