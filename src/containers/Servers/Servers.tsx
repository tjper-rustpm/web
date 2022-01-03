import { VipCrown } from '@styled-icons/remix-line/VipCrown';
import { Mouse2 } from '@styled-icons/bootstrap/Mouse2';

import { CalendarIcon, GlobeIcon, MapIcon, ScaleIcon, UserGroupIcon } from '@heroicons/react/outline';

import Schedule from '../../components/Schedule/Schedule';
import ServerNameplate from '../../components/ServerNameplate/ServerNameplate';
import { Card } from '../../components/Card';

import { Server, Tag } from '../../services/server/types';
import { useServers } from '../../services/server/hooks';

/**
 * Servers is a component responsible for Rustpm's servers.
 */
const Servers = (): JSX.Element => {
  const { data, isLoading, error } = useServers();

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  if (error) {
    return <div>Error ...</div>;
  }
  return (
    <div className="space-y-16">
      {data &&
        data.map((server: Server) => (
          <Card key={server.id}>
            <div className="space-y-8">
              <ServerNameplate server={server} />
              <p className="border-t-2 border-slate-300 pt-6 mx-8 text-md text-slate-900 antialiased font-sans indent-8">
                {server.description}
              </p>
              <Schedule schedule={server.events} />
              <div className="inline-flex flex-wrap justify-center gap-x-4 gap-y-4">
                {server.tags.map((tag: Tag) => (
                  <div
                    key={tag.id}
                    className="flex items-center px-4 py-2 space-x-3 bg-slate-600 text-white rounded-3xl h-8 shadow-lg shadow-slate-500
                  "
                  >
                    <div className="h-5">{TagIconComponent[tag.icon]}</div>
                    <div>{tag.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ))}
    </div>
  );
};

export default Servers;

const TagIconComponent: Record<string, JSX.Element> = {
  userGroup: <UserGroupIcon className="h-full" />,
  map: <MapIcon className="h-full" />,
  globe: <GlobeIcon className="h-full" />,
  calendarDay: <CalendarIcon className="h-full" />,
  calendarWeek: <CalendarIcon className="h-full" />,
  calendarEvent: <CalendarIcon className="h-full" />,
  games: <ScaleIcon className="h-full" />,
};

// const ServerCard = styled(Card)`
//   .server__server-nameplate {
//     margin-bottom: 2.5rem;
//   }

//   .server__membership {
//     margin-bottom: 4rem;
//   }
//   .server__join {
//     margin-bottom: 2rem;
//   }

//   .server__membership,
//   .server__join {
//     margin-left: auto;
//     margin-right: auto;
//   }

//   .server__tags {
//     display: flex;
//     flex-wrap: wrap;
//     align-items: center;
//     justify-content: center;
//     margin-top: 0.7rem 0;

//     .server__tag {
//       display: flex;
//       align-items: center;

//       height: 4.2rem;
//       padding: 0 1.25rem;
//       margin: 0.6rem 0.6rem;

//       color: ${(props): string => props.theme.colors.bravo};
//       background-color: ${(props): string => props.theme.colors.kilo};
//       border-radius: 2rem;

//       &-icon {
//         height: 100%;
//         margin-right: 1.2rem;

//         ${StyledIconBase} {
//           height: 60%;
//         }
//       }
//       &-value {
//         transition: all 0.2s;
//         font-size: 1.6rem;
//       }
//     }
//     & .server__tag:hover {
//       background-color: ${(props): string => props.theme.colors.echo};
//       transform: scale(1.1);
//     }
//   }
// `;
