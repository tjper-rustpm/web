import { CalendarIcon, GlobeIcon, MapIcon, ScaleIcon, UserGroupIcon } from '@heroicons/react/outline';

import Schedule from '../../components/Schedule/Schedule';
import ServerNameplate from '../../components/ServerNameplate/ServerNameplate';

import { Card } from '../../components/Card';
import { Tooltip } from '../../components/Tooltip';

import { AnyServer, Tag } from '../../services/server/types';
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
        data.map((server: AnyServer) => (
          <Card key={server.id}>
            <div className="space-y-8">
              <ServerNameplate server={server} />
              <p className="border-t-2 border-slate-300 pt-6 mx-8 text-md text-slate-900 antialiased font-sans indent-8">
                {server.description}
              </p>
              <Schedule schedule={server.events} />
              <div className="inline-flex flex-wrap justify-center gap-x-4 gap-y-4">
                {server.tags.map((tag: Tag) => (
                  <div key={tag.id}>
                    <Tooltip content={<h5>{tag.description}</h5>} position="top">
                      <div
                        className="flex items-center px-4 py-2 space-x-3 bg-slate-600 text-white rounded-3xl h-8 shadow-lg shadow-slate-500
                  "
                      >
                        <div className="h-5">{TagIconComponent[tag.icon]}</div>
                        <div>{tag.value}</div>
                      </div>
                    </Tooltip>
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
