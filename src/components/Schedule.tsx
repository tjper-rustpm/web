import { useMemo } from 'react';
import { DateTime, DateTimeFormatOptions } from 'luxon';
import { Cron } from '../cron/cron';

import { Tooltip } from './Tooltip';
import { Typography } from './Typography';

import { QuestionMarkCircleIcon } from '@heroicons/react/20/solid';
import { ArrowPathIcon, ArrowTrendingUpIcon } from '@heroicons/react/20/solid';

import { Event, EventKind } from '../services/server/types';

export const ScheduleV3 = ({ schedule }: ScheduleProps): JSX.Element => {
  const nextWipeEvent = schedule
    .filter((event: Event) => event.kind === 'mapWipe' || event.kind === 'fullWipe')
    .map((event: Event) => {
      return { kind: event.kind, at: new Cron(event.schedule, event.weekday).next() };
    })
    .sort((a: EventOccurrence, b: EventOccurrence) => {
      return a.at.toSeconds() - b.at.toSeconds();
    })[0];

  const prevWipeEvent = schedule
    .filter((event: Event) => event.kind === 'mapWipe' || event.kind === 'fullWipe')
    .map((event: Event) => {
      return { kind: event.kind, at: new Cron(event.schedule, event.weekday).prev() };
    })
    .sort((a: EventOccurrence, b: EventOccurrence) => {
      return a.at.toSeconds() - b.at.toSeconds();
    })
    .at(-1);

  const wipeAge = prevWipeEvent?.at
    .diffNow('seconds')
    .negate()
    .shiftTo('days', 'hours')
    .toHuman({ maximumFractionDigits: 0, listStyle: 'narrow', unitDisplay: 'short' });

  const liveSchedule = schedule
    .filter((event: Event) => event.kind === 'live' || event.kind === 'stop')
    .map((event: Event) => {
      const cron = new Cron(event.schedule, event.weekday);
      const start = DateTime.local().startOf('day').toUTC();
      const end = DateTime.local().endOf('day').toUTC();
      return cron.events(start, end).map((occurrence) => {
        return { kind: event.kind, at: occurrence };
      });
    })
    .flat()
    .sort((a: EventOccurrence, b: EventOccurrence) => {
      return a.at.toSeconds() - b.at.toSeconds();
    });

  let active = false;
  const eventHash = new Map();

  liveSchedule.forEach((event: EventOccurrence, index: number): void => {
    if (index === 0 && event.kind === 'stop') {
      active = true;
    }

    const at = DateTime.fromISO(event.at.toString());
    const key = `${at.hour}`;
    eventHash.set(key, event);
  });

  const now = DateTime.local();
  const xAxis = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
  const yAxis = ['day', 0];

  return (
    <div className="my-2 bg-slate-100 shadow-lg shadow-slate-400 p-3 border border-slate-200 rounded-md max-w-xl">
      <div className="mt-5">
        <div className="grid grid-cols-24 grid-rows-2 gap-0.5 text-xs">
          {yAxis.map((y: number | string) =>
            xAxis.map((x: number) => {
              const key = `${x}`;
              const event = eventHash.has(key) ? eventHash.get(key) : null;

              if (event?.kind === 'live') {
                active = true;
              } else if (event?.kind === 'stop') {
                active = false;
              }

              let bg = '';
              if (active) {
                bg = now.hour === x ? 'bg-green-200' : 'bg-green-100';
              } else if (now.hour === x) {
                bg = 'bg-green-200';
              }

              let style = `${bg} border h-4 w-4 rounded-sm shadow-xs`;
              let text: string | number | null = '';

              if (y === 'day') {
                style =
                  'font-sans font-bold self-end row-span-2 -translate-x-2.5 -translate-y-2.5 -rotate-[55deg] w-max';
                text = x % 2 === 0 ? readableHour(x) : null;
              }

              return (
                <div key={key} className={style}>
                  <div>{text}</div>
                </div>
              );
            }),
          )}
        </div>
        <div className="flex items-center gap-2">
          <ArrowPathIcon className="w-5" />
          <div>{nextWipeEvent.at.toLocaleString()}</div>
        </div>
        <div className="flex items-center gap-2">
          <ArrowTrendingUpIcon className="w-5 h-5" />
          <div>{wipeAge}</div>
        </div>
      </div>
      <div className="border-b mt-2 mb-2" />
    </div>
  );
};

export const ScheduleV2 = ({ schedule }: ScheduleProps): JSX.Element => {
  const now = DateTime.local();
  const start = now.startOf('day');

  const remPerMinute = 0.006;
  const heightMultipler = 1440;
  const scheduleDuration = 10; // days

  const dayOfMonthFormat: DateTimeFormatOptions = { month: '2-digit', day: '2-digit' };
  const hourFormat: DateTimeFormatOptions = { hour: 'numeric' };

  // events are the events generated from the server schedule.
  const events = schedule
    // Only concerned with "live" and "stop" events. The "start" event is not
    // needed to properly display the schedule.
    .filter((scheduleEvent: Event) => {
      if (scheduleEvent.kind === 'start') {
        return false;
      }
      return true;
    })
    .map((scheduleEvent: Event) => {
      const cron = new Cron(scheduleEvent.schedule, scheduleEvent.weekday);

      // Depending on timezones, schedule can generate incorrrectly and some
      // events are missed, adding a 3 day buffer mitigates known occurrences
      // of this.
      const scheduleBuffer = 3;
      const end = now.plus({ days: scheduleDuration + scheduleBuffer }).endOf('day');

      return cron.events(start, end).map((event) => {
        return { kind: scheduleEvent.kind, at: event.toLocal() };
      });
    })
    .flat()
    .sort((a: EventOccurrence, b: EventOccurrence) => {
      return a.at.toSeconds() - b.at.toSeconds();
    });

  const bubbleStyle = 'shadow-slate-500 shadow-sm hover:scale-105';
  const liveStyle = `${bubbleStyle} bg-green-100`;

  const daySchedule = new Map();
  let live = false;
  let wiped = '';
  let current = events.shift();
  events.forEach((value: EventOccurrence, index) => {
    if (!current || !current.at) return;

    const next = value;
    const day = current.at.day;

    // If first event is stop and there are days between first event and now,
    // create events to fill "live" days as needed.
    const nowDaysDiff = current.at.diff(start, ['days', 'hours']).days;
    if (index === 0 && current.kind === 'stop' && nowDaysDiff > 0) {
      [...Array(nowDaysDiff)].forEach((_, index) => {
        const day = start.plus({ days: index }).day;

        daySchedule.set(day, [
          ...(daySchedule.get(day) ?? []),
          <div
            key={`${day}-live-filler`}
            style={{ height: `${heightMultipler * remPerMinute}rem` }}
            className={`group ${liveStyle} transition`}
          >
            <div className="absolute w-full">
              <span className="hidden group-hover:block">Live</span>
            </div>
          </div>,
        ]);
      });
    }

    // If there is more than a day between events, create events to fill "live"
    // days as needed.
    const daysDiff = next.at.diff(current.at, ['days', 'hours']).days;
    if (daysDiff > 1) {
      if (current.kind === 'live') {
        [...Array(daysDiff)].forEach((_, index) => {
          if (!current) return;

          const day = current.at.plus({ days: index + 1 }).day;
          daySchedule.set(day, [
            ...(daySchedule.get(day) ?? []),
            <div
              key={`${day}-live-filler`}
              style={{ height: `${heightMultipler * remPerMinute}rem` }}
              className={`group ${liveStyle} transition`}
            >
              <div className="absolute w-full">
                <span className="hidden group-hover:block">Live</span>
              </div>
            </div>,
          ]);
        });
      }
    }

    const currentIsAtDayStart = current.at.diff(current.at.startOf('day'), 'minutes').minutes === 0;
    // If first event of a day, need to create div for pre-event.
    if (!daySchedule.has(day) && current.kind === 'stop' && !currentIsAtDayStart) {
      const height = current.at.diff(current.at.startOf('day'), 'minutes').minutes * remPerMinute;
      daySchedule.set(day, [
        ...(daySchedule.get(day) ?? []),
        <div
          key={`${day}-${current.kind}-live-passover`}
          style={{ height: `${height}rem` }}
          className={`group ${liveStyle} transition`}
        >
          <div style={{ top: `${height}rem` }} className="absolute w-full">
            <span className="group-hover:hidden">{current.at.toLocaleString(hourFormat)}</span>
            <span className="hidden group-hover:block">Offline</span>
          </div>
        </div>,
      ]);
    }

    const top = current.at.diff(current.at.startOf('day'), 'minutes').minutes * remPerMinute;
    // If event is a map or full wipe, create wipe event component. Once wipe
    // component is created, create a filler component or extend an paused
    // live component.
    if (current.kind === 'mapWipe' || current.kind === 'fullWipe') {
      const color = current.kind === 'mapWipe' ? 'bg-rose-300' : 'bg-rose-400';

      // Wipe event occurs while server is live. Add a component that indicates
      // this will occur.
      if (live) {
        daySchedule.set(day, [
          ...(daySchedule.get(day) ?? []),
          <div key={`${day}-${current.kind}-wipe`} style={{ top: `${top}rem` }} className="w-full absolute">
            <div className={'group relative w-full z-10 h-0.5 transition'}>
              <div className={`h-full w-full z-10 shadow-slate-500 shadow-sm group-hover:scale-105 ${color}`} />
            </div>
          </div>,
        ]);

        // If the next event is a stop event, we assume the server is live and
        // create a new live component after the wipe.
        if (next.kind === 'stop') {
          const untilNext = next.at.diff(current.at, 'minutes').minutes * remPerMinute;
          const untilEOD = current.at.endOf('day').diff(current.at, 'minutes').minutes * remPerMinute;
          const height = untilEOD < untilNext ? untilEOD : untilNext;
          const nextAtEOD = Math.abs(untilNext - untilEOD) < remPerMinute;

          let offlineTop = height;
          if (untilEOD - height < 180 * remPerMinute) {
            offlineTop = height - 180 * remPerMinute;
          }

          daySchedule.set(day, [
            ...daySchedule.get(day),
            <div
              key={`${day}-${current.kind}-post-wipe-live`}
              style={{ top: `${top}rem`, height: `${height}rem` }}
              className={`group absolute w-full ${liveStyle} transition`}
            >
              {height === untilNext || nextAtEOD ? (
                <div style={{ top: `${offlineTop}rem` }} className="absolute w-full">
                  <span className="group-hover:hidden">{next.at.toLocaleString(hourFormat)}</span>
                  <span className="hidden group-hover:block">Offline</span>
                </div>
              ) : null}
            </div>,
          ]);
        }
        // If the next event is not a stop event, create a filler component.
        else {
          const height = next.at.diff(current.at, 'minutes').minutes * remPerMinute;
          daySchedule.set(day, [
            ...daySchedule.get(day),
            <div key={`${day}-${current.kind}-post-wipe`} style={{ top: `${top}rem`, height: `${height}rem` }} />,
          ]);
        }
      }
      // The below code path executes when a wipe event is found that does
      // not occur while the server is live. The wiped variable is set to
      // inform the next 'live' event that a wipe has previously occurred.
      else {
        wiped = current.kind;
      }
    }
    // If event is live, create live event component.
    else if (current.kind === 'live') {
      const untilEOD = current.at.endOf('day').diff(current.at, 'minutes').minutes * remPerMinute;
      const untilNext = next.at.diff(current.at, 'minutes').minutes * remPerMinute;
      const height = untilEOD < untilNext ? untilEOD : untilNext;
      const nextAtEOD = Math.abs(untilNext - untilEOD) < remPerMinute;

      let offlineTop = height;
      if (untilEOD - height < 180 * remPerMinute) {
        offlineTop = height - 180 * remPerMinute;
      }

      let liveTop = 0;
      if (untilEOD < 180 * remPerMinute) {
        liveTop = -180 * remPerMinute;
      }

      let border = '';
      if (wiped) {
        if (wiped === 'fullWipe') {
          border = 'border-t-2 border-rose-400';
        } else if (wiped === 'mapWipe') {
          border = 'border-t-2 border-rose-300';
        }
        // Adjust liveTop and offlineTop as border size affects where these
        // components are drawn.
        liveTop -= 18 * remPerMinute;
        offlineTop -= 18 * remPerMinute;

        // Update wiped so that the next live event does not think a wipe has
        // recently occurred.
        wiped = '';
      }

      daySchedule.set(day, [
        ...(daySchedule.get(day) ?? []),
        <div
          key={`${day}-${current.kind}-live`}
          style={{ top: `${top}rem`, height: `${height}rem` }}
          className={`group absolute w-full transition ${liveStyle} ${border}`}
        >
          <div className="relative">
            <div style={{ top: `${liveTop}rem` }} className="absolute w-full">
              <span className="group-hover:hidden">{current.at.toLocaleString(hourFormat)}</span>
              <span className="hidden group-hover:block">Live</span>
            </div>
            {next.kind === 'stop' && (height === untilNext || nextAtEOD) ? (
              <div style={{ top: `${offlineTop}rem` }} className="absolute w-full">
                <span className="group-hover:hidden">{next.at.toLocaleString(hourFormat)}</span>
                <span className="hidden group-hover:block">Offline</span>
              </div>
            ) : null}
          </div>
        </div>,
      ]);
      live = true;
    }
    // If event is stop, create stop and post-stop event components.
    else if (current.kind === 'stop') {
      daySchedule.set(day, [
        ...(daySchedule.get(day) ?? []),
        <div key={`${day}-${current.kind}-stop`} style={{ top: `${top}rem` }} />,
      ]);
      live = false;
    }

    current = next;
  });

  const legend = (
    <div className="w-20 space-y-2 font-sans">
      <div className="flex items-center space-x-1">
        <span className="bg-green-100 border rounded-md shadow-md w-5 h-5" />
        <span>Online</span>
      </div>
      <div className="flex items-center space-x-1">
        <span className="bg-rose-300 border rounded-md shadow-md w-5 h-5" />
        <span>Map Wipe</span>
      </div>
      <div className="flex items-center space-x-1">
        <span className="bg-rose-400 border rounded-md shadow-md w-5 h-5" />
        <span>Full Wipe</span>
      </div>
    </div>
  );

  return (
    <div className="my-2 bg-slate-100 shadow-lg shadow-slate-400 p-3 border border-slate-200 rounded-md max-w-xl">
      <div className="flex items-center space-x-2">
        <Typography size="2xl">Schedule</Typography>
        <Tooltip content={legend}>
          <QuestionMarkCircleIcon className="h-5" />
        </Tooltip>
      </div>
      <div className="border-b mt-2 mb-2" />
      <div className="flex gap-2 text-center text-slate-900 text-sm">
        {[...Array(scheduleDuration)].map((_, index) => {
          return (
            <div className="grow" key={index}>
              <div className="mb-3">{now.plus({ day: index }).toLocaleString(dayOfMonthFormat)}</div>
              <div
                style={{ height: `${heightMultipler * remPerMinute}rem` }}
                className="relative shadow-sm shadow-slate-400 border-slate-300 border"
              >
                {daySchedule.get(now.plus({ day: index }).day)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

type ScheduleProps = {
  schedule: Event[];
};
export const Schedule = ({ schedule }: ScheduleProps): JSX.Element => {
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
              bg = now ? 'bg-green-300' : 'bg-green-100';
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
