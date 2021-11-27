import { useQuery, UseQueryResult } from 'react-query';
import axios from 'axios';

import { Server } from './types';

export function useServers(): UseQueryResult<Server[], Error> {
  return useQuery('servers', () => {
    axios.get('/server-api/v1/servers').then((res) => res.data);
  });
}
