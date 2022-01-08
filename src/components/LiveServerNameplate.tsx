import { DateTime } from 'luxon';

import { Tooltip } from './Tooltip';

import GroupIcon from '@material-ui/icons/Group';
import LinearScaleIcon from '@material-ui/icons/LinearScale';

import { useCount } from '../hooks/useCount';
import { LiveServer, Background } from '../services/server/types';

type LiveServerNameplateProps = {
  server: LiveServer;
};

export const LiveServerNameplate = ({ server }: LiveServerNameplateProps): JSX.Element => {
  const count = useCount({
    initial: DateTime.fromISO(server.createdAt.toString()).diffNow().negate(),
  });
  const countTooltip = 'Countdown';

  return (
    <figure
      className={`${
        BackgroundImage[server.background]
      } bg-cover bg-no-repeat aspect-[2/1] grid grid-cols-5 rounded-sm shadow-lg shadow-slate-500 p-4 max-w-xl text-white`}
    >
      <span className="col-start-1 col-span-4">
        <h3 className="text-4xl">{server.name}</h3>
        <div className="w-min">
          <Tooltip content={<h5>IP Address</h5>} position="bottom">
            <h4>{server.elasticIP}</h4>
          </Tooltip>
        </div>
      </span>
      <div className="col-start-5 justify-self-end flex relative w-4 h-4">
        <span className="animate-pulse w-full h-full bg-red-500 rounded-full" />
      </div>
      <div className="self-end space-y-2 w-min">
        <Tooltip content={<p className="w-20">Active Players</p>}>
          <div className="flex items-center space-x-2">
            <GroupIcon />
            <span>{server.activePlayers}</span>
          </div>
        </Tooltip>
        <Tooltip content={<p className="w-24">Queued Players</p>}>
          <div className="flex items-center space-x-2">
            <LinearScaleIcon />
            <span>{server.queuedPlayers}</span>
          </div>
        </Tooltip>
      </div>
      <div className="col-start-5 justify-self-end self-end text-2xl">
        <Tooltip content={countTooltip} position="top">
          {count.toFormat('hh:mm:ss')}
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
