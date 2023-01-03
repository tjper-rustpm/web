import { Server } from '../../components/Server';

import { Card } from '../../components/Card';
import { Spinner } from '../../components/Spinner';
import { Typography } from '../../components/Typography';

import { AnyServer } from '../../services/server/types';
import { useServers } from '../../services/server/hooks';

import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

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
    return (
      <Card>
        <div className="flex items-center mb-6">
          <ExclamationCircleIcon className="h-10 text-red-400 mr-3" />
          <Typography size="4xl">Error!</Typography>
        </div>
        <p className="font-sans">
          An unexpected error has occurred and is being followed up on by our team. We apologize for this inconvenience,
          in the meantime, please try again. If the issue persists please check our Discord for more details.
        </p>
      </Card>
    );
  }

  const servers = data.map((server: AnyServer) => {
    return (
      <div key={server.id}>
        <Server vipNav joinNav server={server} />
      </div>
    );
  });

  return <div className="mx-auto max-w-[1880px] gap-x-16 gap-y-16 flex flex-wrap justify-evenly">{servers}</div>;
};

export default Servers;
