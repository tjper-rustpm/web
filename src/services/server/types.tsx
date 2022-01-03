import { DateTime } from 'luxon';

export type AnyServer = LiveServer | DormantServer;

export type LiveServer = Server & {
  activePlayers: number;
  queuedPlayers: number;
};

export type DormantServer = Server & {
  startsAt: DateTime;
};

export interface Server {
  id: string;
  kind: 'dormant' | 'live';
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
  schedule: Event[];
  tags: Tag[];
  createdAt: DateTime;
}

export declare type EventType = 'start' | 'stop';

export interface Event {
  id: string;
  weekday: number;
  hour: number;
  kind: EventType;
}

export declare type TagIcon =
  | 'userGroup'
  | 'map'
  | 'globe'
  | 'calendarDay'
  | 'calendarWeek'
  | 'calendarEvent'
  | 'games';

export interface Tag {
  id: string;
  description: string;
  icon: TagIcon;
  value: string;
}

// Background is a union type of string literals communicating the backgrounds
// available to the ServerNameplate.
export declare type Background =
  | 'airport'
  | 'beachLighthouse'
  | 'bigOilNight'
  | 'forest'
  | 'islandLighthouse'
  | 'junkyard'
  | 'mountainNight'
  | 'oxum'
  | 'sewerNight'
  | 'towerNight';
