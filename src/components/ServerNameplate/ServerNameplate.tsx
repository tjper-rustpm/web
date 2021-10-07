import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { DateTime, Duration } from 'luxon';

import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import GroupIcon from '@material-ui/icons/Group';
import LinearScaleIcon from '@material-ui/icons/LinearScale';

import Tooltip from '../Tooltip/Tooltip';

import airport from '../../images/nameplates/airport.png';
import beachLighthouse from '../../images/nameplates/beachLighthouse.png';
import bigOilNight from '../../images/nameplates/bigOilNight.png';
import forest from '../../images/nameplates/forest.png';
import islandLighthouse from '../../images/nameplates/islandLighthouse.png';
import junkyard from '../../images/nameplates/junkyard.png';
import mountainNight from '../../images/nameplates/mountainNight.png';
import oxum from '../../images/nameplates/oxum.png';
import sewerNight from '../../images/nameplates/sewerNight.png';
import towerNight from '../../images/nameplates/towerNight.png';

import { Server, Background } from '../../providers/Server/Server';

// ServerNameplateProps is used to pass critical and variable information to
// ServerNameplate component.
type ServerNameplateProps = {
  className?: string;
  server: Server;
};

// ServerNameplate displays critical server information. ServerNameplate
// expects ServerNameplateProps to be passed.
const ServerNameplate = ({ className, server }: ServerNameplateProps): JSX.Element => {
  let count: Duration;

  let ipComponent: JSX.Element | null = null;
  let recordComponent: JSX.Element | null = null;
  let activePlayersComponent: JSX.Element | null = null;
  let queuedPlayersComponent: JSX.Element | null = null;
  let countComponent: JSX.Element | null = null;
  if (server.__typename === 'LiveServer') {
    count = useCount({ initial: DateTime.fromISO(server.createdAt.toString()).diffNow().negate() });

    ipComponent = (
      <span className="server-nameplate__ip">
        <Tooltip title="IP Address" aria-label="ip-address" placement="left">
          <h4>{server.definition.elasticIP}</h4>
        </Tooltip>
      </span>
    );
    recordComponent = <FiberManualRecordIcon className="server-nameplate__live" />;
    activePlayersComponent = (
      <div className="server-nameplate__players">
        <Tooltip title="Active Players" placement="left" aria-label="active-players">
          <div className="server-nameplate__players--value">
            <GroupIcon />
            <span>{server.activePlayers}</span>
          </div>
        </Tooltip>
      </div>
    );
    queuedPlayersComponent = (
      <div className="server-nameplate__queue">
        <Tooltip title="Queued Players" placement="left" aria-label="queued-players">
          <div className="server-nameplate__queue--value">
            <LinearScaleIcon />
            <span>{server.queuedPlayers}</span>
          </div>
        </Tooltip>
      </div>
    );
    countComponent = (
      <div className="server-nameplate__countdown">
        <Tooltip title="Uptime" aria-label="uptime" placement="left">
          <span className="server-nameplate__countdown--value">{count.toFormat('hh:mm:ss')}</span>
        </Tooltip>
      </div>
    );
  } else if (server.__typename === 'DormantServer') {
    count = useCount({ direction: '-', initial: DateTime.fromISO(server.startsAt.toString()).diffNow() });
    countComponent = (
      <div className="server-nameplate__countdown">
        <Tooltip title="Launch Countdown" aria-label="launch countdown" placement="left">
          <span className="server-nameplate__countdown--value">{count.toFormat('hh:mm:ss')}</span>
        </Tooltip>
      </div>
    );
  }

  return (
    <Figure className={className} background={server.definition.background}>
      <span className="server-nameplate__name">
        <Tooltip title="Server Name" aria-label="server-name" placement="left">
          <h3>{server.definition.name}</h3>
        </Tooltip>
      </span>
      {ipComponent}
      {recordComponent}
      {activePlayersComponent}
      {queuedPlayersComponent}
      {countComponent}
    </Figure>
  );
};

export default ServerNameplate;

interface CountDownArgs {
  direction?: '+' | '-';
  rate?: number;
  initial: Duration;
}
const useCount = ({ direction = '+', rate = 1000, initial }: CountDownArgs): Duration => {
  const [count, setCount] = useState<Duration>(initial);
  useEffect(() => {
    setTimeout(() => {
      if (direction === '+') {
        setCount(count.plus(rate));
      } else if (direction === '-') {
        setCount(count.minus(rate));
      }
    }, rate);
  }, [count]);
  return count;
};

const BackgroundImage: Record<Background, string> = {
  AIRPORT: airport,
  BEACH_LIGHTHOUSE: beachLighthouse,
  BIG_OIL_NIGHT: bigOilNight,
  FOREST: forest,
  ISLAND_LIGHTHOUSE: islandLighthouse,
  JUNKYARD: junkyard,
  MOUNTAIN_NIGHT: mountainNight,
  OXUM: oxum,
  SEWER_NIGHT: sewerNight,
  TOWER_NIGHT: towerNight,
};

// FigureProps are styling related props for the ServerNameplate's figure.
interface FigureProps {
  readonly background: Background;
}
// Figure is a styled figure component.
const Figure = styled.figure<FigureProps>`
  display: grid;
  grid-template-columns: repeat(5, [col-start] 1fr [col-end]);
  grid-template-rows: repeat(5, [row-start] 1fr [row-end]);

  height: 20rem;
  padding: 0.8rem 1.3rem;

  font-weight: 600;
  color: ${(props): string => props.theme.colors.bravo};
  background-image: url(${(props): string => BackgroundImage[props.background]});
  background-size: cover;
  box-shadow: 0.1vw 0.1vw 1rem 0 ${(props): string => props.theme.shadows.light};

  transition: all 0.3s;
  & > * {
    transition: all 0.3s;
  }

  & .server-nameplate__name {
    grid-row: row-start 1 / span 1;
    grid-column: col-start 1 / -1;
    h3 {
      display: inline;
    }

    font-size: 3.2rem;
  }
  & .server-nameplate__ip {
    font-size: 1.4rem;
    h4 {
      display: inline;
    }
  }
  & .server-nameplate__live {
    grid-row: row-start 1 / span 1;
    grid-column: col-start 5 / -1;
    align-self: start;
    justify-self: end;
    font-size: 2.2rem;
    color: ${(props): string => props.theme.colors.alpha};
  }
  & .server-nameplate__countdown {
    grid-row: row-start 2 / -1;
    grid-column: col-start 3 / -1;

    justify-self: end;
    align-self: end;
    display: flex;
    font-size: 3rem;

    &--seperator {
      color: ${(props): string => props.theme.colors.alpha};
      transform: translateY(-1rem);
    }
  }
  & .server-nameplate__players,
  & .server-nameplate__queue {
    grid-column: col-start 1 / span 1;
    align-self: end;
    font-size: 1.8rem;

    .MuiSvgIcon-root {
      color: ${(props): string => props.theme.colors.alpha};
      font-size: 2.2rem;
      margin-right: 0.75rem;
    }
    &--value {
      display: flex;
      align-items: center;
      flex-shrink: 1;
    }
  }
  & .server-nameplate__players {
    grid-row: row-start 4 / span 1;
  }
  & .server-nameplate__queue {
    grid-row: row-start 5 / span 1;
  }

  &:hover {
    box-shadow: 0.3rem 0.3rem 1.2rem 0 ${(props): string => props.theme.shadows.dark};
    padding: 1rem 1.5rem;

    & > .server-nameplate__name {
      font-size: 3.4rem;
    }
    & > .server-nameplate__ip {
      font-size: 1.6rem;
    }
    & > .server-nameplate__countdown {
      font-size: 3.2rem;
    }
    & > .server-nameplate__players,
    & > .server-nameplate__queue,
    & > .server-nameplate__live {
      font-size: 2rem;
    }
    .MuiSvgIcon-root {
      font-size: 2.4rem;
    }
  }
`;
