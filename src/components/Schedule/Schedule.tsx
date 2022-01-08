import { DateTime } from 'luxon';

import { Tooltip } from '../Tooltip';

import { QuestionMarkCircleIcon } from '@heroicons/react/solid';

import { Event } from '../../services/server/types';

type ScheduleProps = {
  schedule: Event[];
};
const Schedule = ({ schedule }: ScheduleProps): JSX.Element => {
  schedule.sort((a: Event, b: Event) => {
    return a.weekday * 24 + a.hour - (b.weekday * 24 + b.hour);
  });

  let active = false;
  const scheduleHash = new Map();
  schedule.forEach((event: Event, index: number): void => {
    if (index === 0 && event.kind === 'stop') {
      active = true;
    }

    scheduleHash.set(`${event.weekday + 1}-${event.hour}`, event);
  });

  const yAxis = [0, 1, 2, 3, 4, 5, 6, 7];
  const xAxis = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
  const dt = DateTime.local();

  const legend = (
    <div className="w-16 space-y-1">
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
    </div>
  );

  return (
    <div className="my-2 bg-slate-100 shadow-lg shadow-slate-300 p-3 border border-slate-200 rounded-md max-w-xl">
      <div className="flex items-center space-x-2">
        <h5 className="text-2xl">Schedule</h5>
        <Tooltip content={legend}>
          <QuestionMarkCircleIcon className="h-5" />
        </Tooltip>
      </div>
      <div className="border-b mt-2 mb-6" />
      <div className="grid grid-cols-26 grid-rows-9 gap-y-1.5 text-xs">
        {yAxis.map((day: number) =>
          xAxis.map((hour: number) => {
            const key = `${day}-${hour}`;
            if (scheduleHash.has(key) && scheduleHash.get(key).kind === 'start') {
              active = true;
            } else if (scheduleHash.has(key) && scheduleHash.get(key).kind === 'stop') {
              active = false;
            }

            let bg = 'bg-white';
            if (dt.weekday === day && dt.hour === hour) {
              bg = 'bg-green-200';
            } else if (active) {
              bg = 'bg-green-50';
            }

            let style = `${bg} border w-full rounded-sm shadow-md`;
            let text: string | number | null = '';

            if (day === 0 && hour === 0) {
              style = 'col-span-2 row-span-2';
            }
            if (day === 0 && hour !== 0) {
              style = 'self-end row-span-2 font-thin -translate-y-2 -rotate-[55deg] w-max';
              text = (hour - 1) % 2 === 0 ? readableHour(hour - 1) : null;
            }
            if (hour === 0 && day !== 0) {
              style = 'place-self-start col-span-2 font-thin';
              text = ShortWeekdayName[day];
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
  1: 'Mon',
  2: 'Tue',
  3: 'Wed',
  4: 'Thur',
  5: 'Fri',
  6: 'Sat',
  7: 'Sun',
};

const readableHour = (hour: number): string => {
  const suffix = hour > 11 ? 'pm' : 'am';
  return `${hour % 12 === 0 ? 12 : hour % 12} ${suffix}`;
};
