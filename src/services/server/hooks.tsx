import { useQuery, UseQueryResult } from 'react-query';
import axios from 'axios';

import { AnyServer, Subscriptions } from './types';

export function useServers(): UseQueryResult<AnyServer[], Error> {
  return useQuery('servers', async () => {
    const getServers = axios.get<AnyServer[]>('/server-api/v1/servers');
    const getSubscriptions = axios.get<Subscriptions[]>('/payment-api/v1/servers');

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
  });
}
