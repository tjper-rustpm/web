import { DateTime } from 'luxon';

import { Clock } from './Clock';
import { Tooltip } from './Tooltip';
import { Typography } from './Typography';
import { SubscriptionStar } from './SubscriptionStar';

import GroupIcon from '@material-ui/icons/Group';
import LinearScaleIcon from '@material-ui/icons/LinearScale';

import { useSession } from '../services/user/hooks';
import { LiveServer, Background } from '../services/server/types';

type LiveServerNameplateProps = {
  server: LiveServer;
};

export const LiveServerNameplate = ({ server }: LiveServerNameplateProps): JSX.Element => {
  const { data: session } = useSession();

  return (
    <figure className="relative">
      <div
        className={`${
          BackgroundImage[server.background]
        } bg-cover bg-no-repeat aspect-[2/1] rounded-sm shadow-lg shadow-slate-500`}
      />
      <div className="absolute inset-0 p-4 w-full h-full grid grid-cols-2 text-white">
        <div className="col-start-1 col-span-4">
          <div className="flex items-center gap-3">
            <Typography size="4xl">{server.name}</Typography>
            {session && (
              <Tooltip content={<p className="font-sans text-md min-w-max">VIP access</p>} position="bottom">
                <SubscriptionStar serverId={server.id} />
              </Tooltip>
            )}
          </div>
          <div className="w-min">
            <Tooltip content={<p className="font-sans text-md min-w-max">IP Address</p>} position="bottom">
              <Typography size="xl">{server.elasticIP}</Typography>
            </Tooltip>
          </div>
        </div>
        <div className="col-start-5 justify-self-end flex relative w-4 h-4">
          <span className="animate-pulse w-full h-full bg-red-500 rounded-full" />
        </div>
        <div className="self-end space-y-2 w-min">
          {server.activePlayers > 0 && (
            <Tooltip content={<p className="font-sans text-md min-w-max">Active Players</p>}>
              <div className="flex items-center space-x-2">
                <GroupIcon />
                <Typography size="lg">{server.activePlayers}</Typography>
              </div>
            </Tooltip>
          )}
          {server.queuedPlayers > 0 && (
            <Tooltip content={<p className="font-sans text-md min-w-max">Queued Players</p>}>
              <div className="flex items-center space-x-2">
                <LinearScaleIcon />
                <Typography size="lg">{server.queuedPlayers}</Typography>
              </div>
            </Tooltip>
          )}
        </div>
        <div className="col-start-5 justify-self-end self-end text-2xl">
          <Clock
            initial={DateTime.fromISO(server.createdAt.toString()).diffNow().negate()}
            direction="+"
            tooltip="Uptime"
          />
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
