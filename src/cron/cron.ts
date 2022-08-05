import { DateTime } from 'luxon';
import parser from 'cron-parser';

export class Cron {
  #schedule: string;
  #weekday?: number;

  constructor(schedule: string, weekday?: number) {
    this.#schedule = schedule;
    this.#weekday = weekday;
  }

  events(start: DateTime, end: DateTime): DateTime[] {
    const iter = parser.parseExpression(this.#schedule, {
      currentDate: start.toJSDate(),
      endDate: end.toJSDate(),
      utc: true,
    });

    const events: DateTime[] = [];
    while (true) {
      try {
        const current = DateTime.fromISO(iter.next().toISOString(), { zone: 'utc' });
        if (this.#weekday && this.#weekday !== current.weekday) {
          continue;
        }

        events.push(current);
      } catch (e) {
        break;
      }
    }
    return events;
  }

  next(start: DateTime = DateTime.utc()): DateTime {
    const iter = parser.parseExpression(this.#schedule, { utc: true, currentDate: start.toJSDate() });
    return DateTime.fromISO(iter.next().toISOString(), { zone: 'utc' });
  }
}
