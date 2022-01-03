import { DateTime } from 'luxon';

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

  return (
    <div className="my-2 bg-slate-100 shadow-lg shadow-slate-300 p-3 border border-slate-200 rounded-md max-w-xl">
      <div className="flex items-center space-x-2">
        <h5 className="text-2xl">Schedule</h5>
        <QuestionMarkCircleIcon className="h-5" />
      </div>
      <div className="border-b mt-2 mb-6" />
      <div className="grid grid-cols-26 grid-rows-8 gap-1 aspect-[24/7] text-xs">
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
              style = 'col-span-2';
            }
            if (day === 0 && hour !== 0) {
              style = 'place-self-center font-thin';
              text = (hour - 1) % 2 === 0 ? hour - 1 : null;
            }
            if (hour === 0 && day !== 0) {
              style = 'place-self-start col-span-2 font-thin';
              text = WeekdayName[day];
            }

            return (
              <div key={key} className={style}>
                {text}
              </div>
            );
          }),
        )}
      </div>
    </div>
  );
};

export default Schedule;

const WeekdayName: Record<number, string> = {
  1: 'Mon',
  2: 'Tue',
  3: 'Wed',
  4: 'Thur',
  5: 'Fri',
  6: 'Sat',
  7: 'Sun',
};
