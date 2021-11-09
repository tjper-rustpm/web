import React from 'react';
import { useQuery, QueryResult } from '@apollo/client';

import { Server, ServersArgs } from './types';
import { SERVERS } from './gql';

export interface ServerService {
  servers(): QueryResult;
}

const ServerServiceContext = React.createContext<ServerService | null>(null);

export interface ServerServiceProviderProps {
  children: React.ReactNode;
}

export function ServerServiceProvider({ children }: ServerServiceProviderProps): JSX.Element {
  const server = useServerServiceProvider();
  return <ServerServiceContext.Provider value={server}>{children}</ServerServiceContext.Provider>;
}

export function useServerService(): ServerService {
  const server = React.useContext(ServerServiceContext);
  if (server === null) {
    throw new Error('useServer must be called within child component fo ServerProvider');
  }
  return server;
}

function useServerServiceProvider(): ServerService {
  const servers = (): QueryResult<Server[], ServersArgs> => {
    return useQuery<Server[], ServersArgs>(SERVERS, { variables: { state: 'ACTIVE' } });
  };
  return {
    servers: servers,
  };
}
