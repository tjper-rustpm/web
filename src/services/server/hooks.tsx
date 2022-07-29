import { useQuery, UseQueryResult } from 'react-query';
import { client } from '../../axios/axios';

import { AnyServer, Subscriptions } from './types';

export function useServers(): UseQueryResult<AnyServer[], Error> {
  return useQuery(
    'servers',
    async ({ signal }) => {
      const getServers = client.get<AnyServer[]>('/server-api/v1/servers', { signal });
      const getSubscriptions = client.get<Subscriptions[]>('/payment-api/v1/servers', { signal });

      const res = await Promise.all([getServers, getSubscriptions]);
      const [serversDetails, subscriptionsDetails] = res;

      const servers = new Map(
        serversDetails.data.map((server: AnyServer): [string, AnyServer] => {
          return [server.id, server];
        }),
      );

      subscriptionsDetails.data.forEach((subscriptions: Subscriptions) => {
        const server = servers.get(subscriptions.id);
        if (!server) {
          return;
        }
        servers.set(subscriptions.id, { ...server, ...{ subscriptions: subscriptions } });
      });

      return Array.from(servers.values());
    },
    { staleTime: 1000 * 60 },
  );
}
