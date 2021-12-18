import styled from 'styled-components';

import { StyledIconBase } from '@styled-icons/styled-icon';
import { VipCrown } from '@styled-icons/remix-line/VipCrown';
import { Mouse2 } from '@styled-icons/bootstrap/Mouse2';
import { Map } from '@styled-icons/bootstrap/Map';
import { Globe } from '@styled-icons/entypo/Globe';
import { UserGroup } from '@styled-icons/heroicons-solid/UserGroup';
import { CalendarDay } from '@styled-icons/bootstrap/CalendarDay';
import { CalendarWeek } from '@styled-icons/bootstrap/CalendarWeek';
import { CalendarEvent } from '@styled-icons/bootstrap/CalendarEvent';
import { Games } from '@styled-icons/fluentui-system-regular/Games';

import Button from '../../components/Button/Button';
import { Card } from '../../components/Card';
import Schedule from '../../components/Schedule/Schedule';
import ServerNameplate from '../../components/ServerNameplate/ServerNameplate';
import Tooltip from '../../components/Tooltip/Tooltip';

import { Server, Tag } from '../../services/server/types';
import { useServers } from '../../services/server/hooks';

/**
 * Servers is a component responsible for Rustpm's servers.
 */
const Servers = (): JSX.Element => {
  const { data, isLoading, error } = useServers();

  if (isLoading) {
    return <Wrapper>Loading ...</Wrapper>;
  }
  if (error) {
    return <Wrapper>Error ...</Wrapper>;
  }
  return (
    <Wrapper>
      {data &&
        data.map((server: Server) => (
          <ServerCard key={server.id}>
            <ServerNameplate className="server__server-nameplate" server={server} />
            <Schedule className="server__schedule" schedule={server.definition.schedule} />
            <Button className="server__join" color="green" size="compact">
              <Mouse2 className="server__join-icon" />
              <span className="server__join-title">Join</span>
            </Button>
            <Button className="server__membership" color="green" size="compact">
              <VipCrown className="server__membership-icon" />
              <span className="server__membership-title">Membership</span>
            </Button>
            <div className="server__tags">
              {server.definition.tags.map((tag: Tag) => (
                <Tooltip key={tag.id} title={tag.description} placement="top">
                  <div className="server__tag">
                    <span className="server__tag-icon">{TagIconComponent[tag.icon]}</span>
                    <span className="server__tag-value">{tag.value}</span>
                  </div>
                </Tooltip>
              ))}
            </div>
          </ServerCard>
        ))}
    </Wrapper>
  );
};

export default Servers;

const TagIconComponent: Record<string, JSX.Element> = {
  USER_GROUP: <UserGroup />,
  MAP: <Map />,
  GLOBE: <Globe />,
  CALENDAR_DAY: <CalendarDay />,
  CALENDAR_WEEK: <CalendarWeek />,
  CALENDAR_EVENT: <CalendarEvent />,
  GAMES: <Games />,
};

const Wrapper = styled.div`
  & .server:not(:last-child) {
    margin-bottom: 5rem;
  }
`;
const ServerCard = styled(Card)`
  .server__server-nameplate {
    margin-bottom: 2.5rem;
  }

  .server__membership {
    margin-bottom: 4rem;
  }
  .server__join {
    margin-bottom: 2rem;
  }

  .server__membership,
  .server__join {
    margin-left: auto;
    margin-right: auto;
  }

  .server__tags {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 0.7rem 0;

    .server__tag {
      display: flex;
      align-items: center;

      height: 4.2rem;
      padding: 0 1.25rem;
      margin: 0.6rem 0.6rem;

      color: ${(props): string => props.theme.colors.bravo};
      background-color: ${(props): string => props.theme.colors.kilo};
      border-radius: 2rem;

      &-icon {
        height: 100%;
        margin-right: 1.2rem;

        ${StyledIconBase} {
          height: 60%;
        }
      }
      &-value {
        transition: all 0.2s;
        font-size: 1.6rem;
      }
    }
    & .server__tag:hover {
      background-color: ${(props): string => props.theme.colors.echo};
      transform: scale(1.1);
    }
  }
`;
