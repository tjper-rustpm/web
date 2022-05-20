import { DateTime } from 'luxon';

export interface Server {
  id: string;
  activeSubscriptions: number;
  subscriptionLimit: number;
  createdAt: DateTime;
}
