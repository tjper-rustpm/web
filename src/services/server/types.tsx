import { DateTime } from 'luxon';

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
