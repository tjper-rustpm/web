import { useQuery, UseQueryResult } from 'react-query';
import axios from 'axios';

import { AnyServer } from './types';

export function useServers(): UseQueryResult<AnyServer[], Error> {
  return useQuery('servers', async () => {
    const res = await axios.get<AnyServer[]>('/server-api/v1/servers');
    return res.data;
  });
}
