import { DateTime } from 'luxon';

export type AnyServer = LiveServer | DormantServer;

export type LiveServer = Server & {
  kind: 'live';
  activePlayers: number;
  queuedPlayers: number;
};

export type DormantServer = Server & {
  kind: 'dormant';
  startsAt: DateTime;
};

export interface Server {
  id: string;
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
  events: Event[];
  tags: Tag[];
  subscriptions: Subscriptions;
  createdAt: DateTime;
}

export interface Subscriptions {
  id: string;
  activeSubscriptions: number;
  subscriptionLimit: number;
  createdAt: DateTime;
}

export declare type EventKind = 'start' | 'stop' | 'mapWipe' | 'fullWipe';

export interface Event {
  id: string;
  schedule: string;
  weekday?: number;
  kind: EventKind;
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
