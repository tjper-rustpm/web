import {
  CalendarIcon,
  GlobeIcon,
  MapIcon,
  PlayIcon,
  ScaleIcon,
  StarIcon,
  UserGroupIcon,
} from '@heroicons/react/outline';

import Schedule from '../../components/Schedule/Schedule';

import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { DormantServerNameplate } from '../../components/DormantServerNameplate';
import { LiveServerNameplate } from '../../components/LiveServerNameplate';
import { Tooltip } from '../../components/Tooltip';
import { Spinner } from '../../components/Spinner';

import { AnyServer, Tag } from '../../services/server/types';
import { useServers } from '../../services/server/hooks';

/**
 * Servers is a component responsible for Rustpm's servers.
 */
const Servers = (): JSX.Element => {
  const { data, isLoading, error } = useServers();

  if (isLoading || !data) {
    return (
      <div className="h-16 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Spinner />
      </div>
    );
  }
  if (error) {
    return <div>Error ...</div>;
  }

  const servers = data.map((server: AnyServer) => {
    let nameplate: JSX.Element;
    let buttons: JSX.Element;

    switch (server.kind) {
      case 'live':
        nameplate = <LiveServerNameplate server={server} />;
        buttons = (
          <div className="flex space-x-4 w-11/12 m-auto">
            <Button slate>
              <span className="flex items-center justify-center space-x-2">
                <PlayIcon className="h-6" />
                <span>Join</span>
              </span>
            </Button>
            <Button slate>
              <span className="flex items-center justify-center space-x-2">
                <StarIcon className="h-6" />
                <span>VIP</span>
              </span>
            </Button>
          </div>
        );
        break;
      case 'dormant':
        nameplate = <DormantServerNameplate server={server} />;
        buttons = (
          <div className="w-11/12 m-auto">
            <Button slate>
              <span className="flex items-center justify-center space-x-2">
                <StarIcon className="h-6" />
                <span>VIP</span>
              </span>
            </Button>
          </div>
        );
        break;
    }
    return (
      <Card key={server.id} variant="compact">
        <div className="space-y-6">
          {nameplate}
          {buttons}
          <Schedule schedule={server.events} />
          <div className="inline-flex flex-wrap justify-center gap-x-4 gap-y-4 pb-4">
            {server.tags.map((tag: Tag) => (
              <div key={tag.id}>
                <Tooltip content={<h5>{tag.description}</h5>} position="top">
                  <div className="flex items-center px-4 py-2 space-x-3 bg-slate-600 text-white rounded-3xl h-8 shadow-lg shadow-slate-500">
                    <div className="h-5">{TagIconComponent[tag.icon]}</div>
                    <div>{tag.value}</div>
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
  globe: <GlobeIcon className="h-full" />,
  calendarDay: <CalendarIcon className="h-full" />,
  calendarWeek: <CalendarIcon className="h-full" />,
  calendarEvent: <CalendarIcon className="h-full" />,
  games: <ScaleIcon className="h-full" />,
};
