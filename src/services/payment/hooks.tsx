import { useQuery, UseQueryResult } from 'react-query';
import axios from 'axios';

import { Server } from './types';

export function useServers(): UseQueryResult<Server[], Error> {
  return useQuery('servers', async () => {
    const res = await axios.get<Server[]>('/payment-api/v1/servers');
    return res.data;
  });
}
