import { useMemo } from 'react';
import { DateTime } from 'luxon';
import { Cron } from '../../cron/cron';

import { Tooltip } from '../Tooltip';
import { Typography } from '../Typography';

import { QuestionMarkCircleIcon } from '@heroicons/react/solid';

import { Event, EventKind } from '../../services/server/types';

type ScheduleProps = {
  schedule: Event[];
};
const Schedule = ({ schedule }: ScheduleProps): JSX.Element => {
  const computeSchedule = (schedule: Event[]): { eventHash: Map<string, EventOccurrence>; active: boolean } => {
    const events = schedule
      .filter((scheduleEvent: Event) => {
        if (scheduleEvent.kind === 'start') {
          return false;
        }
        return true;
      })
      .map((scheduleEvent: Event) => {
        const cron = new Cron(scheduleEvent.schedule, scheduleEvent.weekday);
        const start = DateTime.utc();
        const end = DateTime.utc().plus({ weeks: 1 });

        return cron.events(start, end).map((event) => {
          return { kind: scheduleEvent.kind, at: event };
        });
      })
      .flat();

    events.sort((a: EventOccurrence, b: EventOccurrence) => {
      const aEventAt = DateTime.fromISO(a.at.toString());
      const bEventAt = DateTime.fromISO(b.at.toString());
      return aEventAt.weekday * 24 + aEventAt.hour - (bEventAt.weekday * 24 + bEventAt.hour);
    });

    let active = false;
    const eventHash = new Map();

    events.forEach((event: EventOccurrence, index: number): void => {
      if (index === 0 && event.kind === 'stop') {
        active = true;
      }

      const at = DateTime.fromISO(event.at.toString());
      const key = `${at.weekday - 1}-${at.hour}`;
      eventHash.set(key, event);
    });
    return { eventHash: eventHash, active: active };
  };

  const res = useMemo(() => computeSchedule(schedule), [schedule]);
  const eventHash = res.eventHash;
  let active = res.active;

  const dt = DateTime.local();
  const yAxis = ['day', 0, 1, 2, 3, 4, 5, 6];
  const xAxis = ['hour', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

  const legend = (
    <div className="w-20 space-y-2 font-sans">
      <div className="flex items-center align-center space-x-1">
        <span className="bg-green-200 border rounded-md shadow-md w-5 h-5" />
        <span>Now</span>
      </div>
      <div className="flex items-center space-x-1">
        <span className="bg-green-50 border rounded-md shadow-md w-5 h-5" />
        <span>Online</span>
      </div>
      <div className="flex items-center space-x-1">
        <span className="bg-white border rounded-md shadow-md w-5 h-5" />
        <span>Offline</span>
      </div>
      <div className="flex items-center space-x-1">
        <span className="bg-rose-200 border rounded-md shadow-md w-5 h-5" />
        <span>Map Wipe</span>
      </div>
      <div className="flex items-center space-x-1">
        <span className="bg-rose-400 border rounded-md shadow-md w-5 h-5" />
        <span>Full Wipe</span>
      </div>
    </div>
  );

  return (
    <div className="my-2 bg-slate-100 shadow-lg shadow-slate-300 p-3 border border-slate-200 rounded-md max-w-xl">
      <div className="flex items-center space-x-2">
        <Typography size="2xl">Schedule</Typography>
        <Tooltip content={legend}>
          <QuestionMarkCircleIcon className="h-5" />
        </Tooltip>
      </div>
      <div className="border-b mt-2 mb-6" />
      <div className="grid grid-cols-26 grid-rows-9 text-xs">
        {yAxis.map((y: number | string) =>
          xAxis.map((x: number | string) => {
            const key = `${y}-${x}`;
            const event = eventHash.has(key) ? eventHash.get(key) : null;

            if (event?.kind === 'live') {
              active = true;
            } else if (event?.kind === 'stop') {
              active = false;
            }

            const now = dt.weekday - 1 === y && dt.hour === x;
            let bg = '';
            let border = '';
            if (event?.kind === 'mapWipe') {
              bg = now ? 'bg-rose-300' : 'bg-rose-200';
              border = now ? 'border-rose-300' : 'border-rose-200';
            } else if (event?.kind === 'fullWipe') {
              bg = now ? 'bg-rose-500' : 'bg-rose-400';
              border = now ? 'border-rose-400' : 'border-rose-300';
            } else if (active) {
              bg = now ? 'bg-green-200' : 'bg-green-50';
            } else if (now) {
              bg = 'bg-green-200';
            }

            let style = `${bg} ${border} border w-full rounded-sm shadow-xs`;
            let text: string | number | null = '';

            if (y === 'day' && x === 'hour') {
              style = 'col-span-2 row-span-2';
            }
            if (y === 'day' && x !== 'hour' && typeof x === 'number') {
              style = 'font-sans font-bold self-end row-span-2 -translate-x-2 -translate-y-3 -rotate-[55deg] w-max';
              text = x % 2 === 0 ? readableHour(x) : null;
            }
            if (x === 'hour' && y !== 'day' && typeof y === 'number') {
              style = 'font-sans font-bold place-self-start col-span-2';
              text = ShortWeekdayName[y];
            }

            return (
              <div key={key} className={style}>
                <div>{text}</div>
              </div>
            );
          }),
        )}
      </div>
    </div>
  );
};

export default Schedule;

const ShortWeekdayName: Record<number, string> = {
  0: 'Mon',
  1: 'Tue',
  2: 'Wed',
  3: 'Thur',
  4: 'Fri',
  5: 'Sat',
  6: 'Sun',
};

const readableHour = (hour: number): string => {
  const suffix = hour > 11 ? 'pm' : 'am';
  return `${hour % 12 === 0 ? 12 : hour % 12} ${suffix}`;
};

interface EventOccurrence {
  at: DateTime;
  kind: EventKind;
}
