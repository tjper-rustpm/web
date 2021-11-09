import React from 'react';
import { DateTime } from 'luxon';
import { gql, useQuery, QueryResult } from '@apollo/client';

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

export interface ServerService {
  servers(): QueryResult;
}

export type Server = LiveServer | DormantServer;

export interface LiveServer {
  __typename: 'LiveServer';
  id: string;
  associationID: string;
  activePlayers: number;
  queuedPlayers: number;
  definition: Definition;
  updatedAt: DateTime;
  createdAt: DateTime;
}

export interface DormantServer {
  __typename: 'DormantServer';
  id: string;
  definition: Definition;
  startsAt: DateTime;
  updatedAt: DateTime;
  createdAt: DateTime;
}

export interface Definition {
  id: string;
  instanceID: string;
  instanceKind: string;
  allocationID: string;
  elasticIP: string;
  name: string;
  region: string;
  description: string;
  url: string;
  bannerURL: string;
  background: Background;
  tickRate: number;
  mapSalt: number;
  mapSeed: number;
  mapSize: number;
  maxPlayers: number;
  mapWipeFrequency: string;
  blueprintWipeFrequency: string;
  schedule: Event[];
  tags: Tag[];
}

export declare type EventType = 'START' | 'STOP';

export interface Event {
  id: string;
  day: number;
  hour: number;
  kind: EventType;
}

export declare type TagIcon =
  | 'USER_GROUP'
  | 'MAP'
  | 'GLOBE'
  | 'CALENDAR_DAY'
  | 'CALENDAR_WEEK'
  | 'CALENDAR_EVENT'
  | 'GAMES';

export interface Tag {
  id: string;
  description: string;
  icon: TagIcon;
  value: string;
}

// Background is a union type of string literals communicating the backgrounds
// available to the ServerNameplate.
export declare type Background =
  | 'AIRPORT'
  | 'BEACH_LIGHTHOUSE'
  | 'BIG_OIL_NIGHT'
  | 'FOREST'
  | 'ISLAND_LIGHTHOUSE'
  | 'JUNKYARD'
  | 'MOUNTAIN_NIGHT'
  | 'OXUM'
  | 'SEWER_NIGHT'
  | 'TOWER_NIGHT';

const SERVER_DEFINITION = gql`
  fragment ServerDefinitionFields on ServerDefinition {
    id
    instanceID
    instanceKind
    allocationID
    elasticIP
    name
    region
    description
    url
    bannerURL
    background
    tickRate
    mapSalt
    mapSeed
    mapSize
    maxPlayers
    mapWipeFrequency
    blueprintWipeFrequency
    wipeDay
    tags {
      id
      description
      icon
      value
    }
    moderators {
      id
      steamID
    }
    schedule {
      id
      day
      hour
      kind
    }
  }
`;

const SERVERS = gql`
  ${SERVER_DEFINITION}
  query Servers($state: State!) {
    servers(input: { state: $state }) {
      servers {
        __typename
        ... on LiveServer {
          id
          associationID
          activePlayers
          queuedPlayers
          updatedAt
          createdAt
          definition {
            ...ServerDefinitionFields
          }
        }
        ... on DormantServer {
          id
          updatedAt
          createdAt
          startsAt
          definition {
            ...ServerDefinitionFields
          }
        }
      }
    }
  }
`;
interface ServersArgs {
  state: string;
}

function useServerServiceProvider(): ServerService {
  const servers = (): QueryResult<Server[], ServersArgs> => {
    return useQuery<Server[], ServersArgs>(SERVERS, { variables: { state: 'ACTIVE' } });
  };
  return {
    servers: servers,
  };
}
