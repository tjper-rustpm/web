import styled from 'styled-components';
import { Event } from '../../providers/Server/Server';
import { DateTime } from 'luxon';

type ScheduleProps = {
  className?: string;
  schedule: Event[];
};
const Schedule = ({ className, schedule }: ScheduleProps): JSX.Element => {
  const daysOfWeek = [1, 2, 3, 4, 5, 6, 7];
  const hoursInDay = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
  const dt = DateTime.local();

  let startHour = 24;
  const scheduleHash = new Map();
  schedule.forEach((event: Event): void => {
    const offsetHour = (24 + (event.hour + Math.floor(dt.offset / 60))) % 24;

    scheduleHash.set(`${event.day}-${offsetHour}`, event);
    if (event.kind === 'START' && offsetHour < startHour) {
      startHour = offsetHour;
    }
  });
  const adjustedHourInDay = hoursInDay.slice(startHour).concat(hoursInDay.slice(0, startHour));

  let active = false;
  return (
    <Figure className={className}>
      {daysOfWeek.map((day: number) =>
        adjustedHourInDay.map((hour: number) => {
          const key = `${day}-${hour}`;
          if (scheduleHash.has(key) && scheduleHash.get(key).kind === 'START') {
            active = true;
          } else if (scheduleHash.has(key) && scheduleHash.get(key).kind === 'STOP') {
            active = false;
          }

          const dayText = hour === 0 ? `${DayText[day]}` : '';
          const hourText = day === 1 ? `${hour}` : '';

          const isActive = active ? 'active' : '';
          const isCurrent = dt.weekday === day && dt.hour === hour ? 'current' : '';
          return (
            <span key={key} className={`schedule__cell schedule__cell--${day}-${hour} ${isActive} ${isCurrent}`}>
              {dayText}
              {dayText !== '' && hourText !== '' ? ` - ${hourText}` : hourText}
            </span>
          );
        }),
      )}
    </Figure>
  );
};

export default Schedule;

const DayText: Record<number, string> = {
  1: 'M',
  2: 'T',
  3: 'W',
  4: 'T',
  5: 'F',
  6: 'S',
  7: 'S',
};

const Figure = styled.figure`
  margin: 3rem 0;
  display: grid;
  grid-template-columns: repeat(24, [col-start] 1fr [col-end]);
  grid-template-rows: repeat(7, [row-start] 1fr [row-end]);
  column-gap: 0.8vw;
  row-gap: 0.8vw;

  padding: 1vw;
  background-color: ${(props): string => props.theme.colors.bravo};
  box-shadow: 0.3rem 0.3rem 1rem 0 ${(props): string => props.theme.shadows.lightest};
  border-radius: 0.3rem;

  & .schedule__cell {
    background-color: ${(props): string => props.theme.colors.mike};
    border-radius: 0.1rem;
    width: 3vw;
    height: 3vw;
    margin: 0 auto;
    font-size: 1.6rem;

    transition: all 0.2s;

    :hover {
      transform: scale(1.2);
    }

    &--1-0 {
      grid-row: row-start 1 / span 1;
      grid-column: col-start 1 / span 1;
    }
    &--1-1 {
      grid-row: row-start 1 / span 1;
      grid-column: col-start 2 / span 1;
    }
    &--1-2 {
      grid-row: row-start 1 / span 1;
      grid-column: col-start 3 / span 1;
    }
    &--1-3 {
      grid-row: row-start 1 / span 1;
      grid-column: col-start 4 / span 1;
    }
    &--1-4 {
      grid-row: row-start 1 / span 1;
      grid-column: col-start 5 / span 1;
    }
    &--1-5 {
      grid-row: row-start 1 / span 1;
      grid-column: col-start 6 / span 1;
    }
    &--1-6 {
      grid-row: row-start 1 / span 1;
      grid-column: col-start 7 / span 1;
    }
    &--1-7 {
      grid-row: row-start 1 / span 1;
      grid-column: col-start 8 / span 1;
    }
    &--1-8 {
      grid-row: row-start 1 / span 1;
      grid-column: col-start 9 / span 1;
    }
    &--1-9 {
      grid-row: row-start 1 / span 1;
      grid-column: col-start 10 / span 1;
    }
    &--1-10 {
      grid-row: row-start 1 / span 1;
      grid-column: col-start 11 / span 1;
    }
    &--1-11 {
      grid-row: row-start 1 / span 1;
      grid-column: col-start 12 / span 1;
    }
    &--1-12 {
      grid-row: row-start 1 / span 1;
      grid-column: col-start 13 / span 1;
    }
    &--1-13 {
      grid-row: row-start 1 / span 1;
      grid-column: col-start 14 / span 1;
    }
    &--1-14 {
      grid-row: row-start 1 / span 1;
      grid-column: col-start 15 / span 1;
    }
    &--1-15 {
      grid-row: row-start 1 / span 1;
      grid-column: col-start 16 / span 1;
    }
    &--1-16 {
      grid-row: row-start 1 / span 1;
      grid-column: col-start 17 / span 1;
    }
    &--1-17 {
      grid-row: row-start 1 / span 1;
      grid-column: col-start 18 / span 1;
    }
    &--1-18 {
      grid-row: row-start 1 / span 1;
      grid-column: col-start 19 / span 1;
    }
    &--1-19 {
      grid-row: row-start 1 / span 1;
      grid-column: col-start 20 / span 1;
    }
    &--1-20 {
      grid-row: row-start 1 / span 1;
      grid-column: col-start 21 / span 1;
    }
    &--1-21 {
      grid-row: row-start 1 / span 1;
      grid-column: col-start 22 / span 1;
    }
    &--1-22 {
      grid-row: row-start 1 / span 1;
      grid-column: col-start 23 / span 1;
    }
    &--1-23 {
      grid-row: row-start 1 / span 1;
      grid-column: col-start 24 / span 1;
    }
    &--2-0 {
      grid-row: row-start 2 / span 1;
      grid-column: col-start 1 / span 1;
    }
    &--2-1 {
      grid-row: row-start 2 / span 1;
      grid-column: col-start 2 / span 1;
    }
    &--2-2 {
      grid-row: row-start 2 / span 1;
      grid-column: col-start 3 / span 1;
    }
    &--2-3 {
      grid-row: row-start 2 / span 1;
      grid-column: col-start 4 / span 1;
    }
    &--2-4 {
      grid-row: row-start 2 / span 1;
      grid-column: col-start 5 / span 1;
    }
    &--2-5 {
      grid-row: row-start 2 / span 1;
      grid-column: col-start 6 / span 1;
    }
    &--2-6 {
      grid-row: row-start 2 / span 1;
      grid-column: col-start 7 / span 1;
    }
    &--2-7 {
      grid-row: row-start 2 / span 1;
      grid-column: col-start 8 / span 1;
    }
    &--2-8 {
      grid-row: row-start 2 / span 1;
      grid-column: col-start 9 / span 1;
    }
    &--2-9 {
      grid-row: row-start 2 / span 1;
      grid-column: col-start 10 / span 1;
    }
    &--2-10 {
      grid-row: row-start 2 / span 1;
      grid-column: col-start 11 / span 1;
    }
    &--2-11 {
      grid-row: row-start 2 / span 1;
      grid-column: col-start 12 / span 1;
    }
    &--2-12 {
      grid-row: row-start 2 / span 1;
      grid-column: col-start 13 / span 1;
    }
    &--2-13 {
      grid-row: row-start 2 / span 1;
      grid-column: col-start 14 / span 1;
    }
    &--2-14 {
      grid-row: row-start 2 / span 1;
      grid-column: col-start 15 / span 1;
    }
    &--2-15 {
      grid-row: row-start 2 / span 1;
      grid-column: col-start 16 / span 1;
    }
    &--2-16 {
      grid-row: row-start 2 / span 1;
      grid-column: col-start 17 / span 1;
    }
    &--2-17 {
      grid-row: row-start 2 / span 1;
      grid-column: col-start 18 / span 1;
    }
    &--2-18 {
      grid-row: row-start 2 / span 1;
      grid-column: col-start 19 / span 1;
    }
    &--2-19 {
      grid-row: row-start 2 / span 1;
      grid-column: col-start 20 / span 1;
    }
    &--2-20 {
      grid-row: row-start 2 / span 1;
      grid-column: col-start 21 / span 1;
    }
    &--2-21 {
      grid-row: row-start 2 / span 1;
      grid-column: col-start 22 / span 1;
    }
    &--2-22 {
      grid-row: row-start 2 / span 1;
      grid-column: col-start 23 / span 1;
    }
    &--2-23 {
      grid-row: row-start 2 / span 1;
      grid-column: col-start 24 / span 1;
    }
    &--3-0 {
      grid-row: row-start 3 / span 1;
      grid-column: col-start 1 / span 1;
    }
    &--3-1 {
      grid-row: row-start 3 / span 1;
      grid-column: col-start 2 / span 1;
    }
    &--3-2 {
      grid-row: row-start 3 / span 1;
      grid-column: col-start 3 / span 1;
    }
    &--3-3 {
      grid-row: row-start 3 / span 1;
      grid-column: col-start 4 / span 1;
    }
    &--3-4 {
      grid-row: row-start 3 / span 1;
      grid-column: col-start 5 / span 1;
    }
    &--3-5 {
      grid-row: row-start 3 / span 1;
      grid-column: col-start 6 / span 1;
    }
    &--3-6 {
      grid-row: row-start 3 / span 1;
      grid-column: col-start 7 / span 1;
    }
    &--3-7 {
      grid-row: row-start 3 / span 1;
      grid-column: col-start 8 / span 1;
    }
    &--3-8 {
      grid-row: row-start 3 / span 1;
      grid-column: col-start 9 / span 1;
    }
    &--3-9 {
      grid-row: row-start 3 / span 1;
      grid-column: col-start 10 / span 1;
    }
    &--3-10 {
      grid-row: row-start 3 / span 1;
      grid-column: col-start 11 / span 1;
    }
    &--3-11 {
      grid-row: row-start 3 / span 1;
      grid-column: col-start 12 / span 1;
    }
    &--3-12 {
      grid-row: row-start 3 / span 1;
      grid-column: col-start 13 / span 1;
    }
    &--3-13 {
      grid-row: row-start 3 / span 1;
      grid-column: col-start 14 / span 1;
    }
    &--3-14 {
      grid-row: row-start 3 / span 1;
      grid-column: col-start 15 / span 1;
    }
    &--3-15 {
      grid-row: row-start 3 / span 1;
      grid-column: col-start 16 / span 1;
    }
    &--3-16 {
      grid-row: row-start 3 / span 1;
      grid-column: col-start 17 / span 1;
    }
    &--3-17 {
      grid-row: row-start 3 / span 1;
      grid-column: col-start 18 / span 1;
    }
    &--3-18 {
      grid-row: row-start 3 / span 1;
      grid-column: col-start 19 / span 1;
    }
    &--3-19 {
      grid-row: row-start 3 / span 1;
      grid-column: col-start 20 / span 1;
    }
    &--3-20 {
      grid-row: row-start 3 / span 1;
      grid-column: col-start 21 / span 1;
    }
    &--3-21 {
      grid-row: row-start 3 / span 1;
      grid-column: col-start 22 / span 1;
    }
    &--3-22 {
      grid-row: row-start 3 / span 1;
      grid-column: col-start 23 / span 1;
    }
    &--3-23 {
      grid-row: row-start 3 / span 1;
      grid-column: col-start 24 / span 1;
    }
    &--4-0 {
      grid-row: row-start 4 / span 1;
      grid-column: col-start 1 / span 1;
    }
    &--4-1 {
      grid-row: row-start 4 / span 1;
      grid-column: col-start 2 / span 1;
    }
    &--4-2 {
      grid-row: row-start 4 / span 1;
      grid-column: col-start 3 / span 1;
    }
    &--4-3 {
      grid-row: row-start 4 / span 1;
      grid-column: col-start 4 / span 1;
    }
    &--4-4 {
      grid-row: row-start 4 / span 1;
      grid-column: col-start 5 / span 1;
    }
    &--4-5 {
      grid-row: row-start 4 / span 1;
      grid-column: col-start 6 / span 1;
    }
    &--4-6 {
      grid-row: row-start 4 / span 1;
      grid-column: col-start 7 / span 1;
    }
    &--4-7 {
      grid-row: row-start 4 / span 1;
      grid-column: col-start 8 / span 1;
    }
    &--4-8 {
      grid-row: row-start 4 / span 1;
      grid-column: col-start 9 / span 1;
    }
    &--4-9 {
      grid-row: row-start 4 / span 1;
      grid-column: col-start 10 / span 1;
    }
    &--4-10 {
      grid-row: row-start 4 / span 1;
      grid-column: col-start 11 / span 1;
    }
    &--4-11 {
      grid-row: row-start 4 / span 1;
      grid-column: col-start 12 / span 1;
    }
    &--4-12 {
      grid-row: row-start 4 / span 1;
      grid-column: col-start 13 / span 1;
    }
    &--4-13 {
      grid-row: row-start 4 / span 1;
      grid-column: col-start 14 / span 1;
    }
    &--4-14 {
      grid-row: row-start 4 / span 1;
      grid-column: col-start 15 / span 1;
    }
    &--4-15 {
      grid-row: row-start 4 / span 1;
      grid-column: col-start 16 / span 1;
    }
    &--4-16 {
      grid-row: row-start 4 / span 1;
      grid-column: col-start 17 / span 1;
    }
    &--4-17 {
      grid-row: row-start 4 / span 1;
      grid-column: col-start 18 / span 1;
    }
    &--4-18 {
      grid-row: row-start 4 / span 1;
      grid-column: col-start 19 / span 1;
    }
    &--4-19 {
      grid-row: row-start 4 / span 1;
      grid-column: col-start 20 / span 1;
    }
    &--4-20 {
      grid-row: row-start 4 / span 1;
      grid-column: col-start 21 / span 1;
    }
    &--4-21 {
      grid-row: row-start 4 / span 1;
      grid-column: col-start 22 / span 1;
    }
    &--4-22 {
      grid-row: row-start 4 / span 1;
      grid-column: col-start 23 / span 1;
    }
    &--4-23 {
      grid-row: row-start 4 / span 1;
      grid-column: col-start 24 / span 1;
    }
    &--5-0 {
      grid-row: row-start 5 / span 1;
      grid-column: col-start 1 / span 1;
    }
    &--5-1 {
      grid-row: row-start 5 / span 1;
      grid-column: col-start 2 / span 1;
    }
    &--5-2 {
      grid-row: row-start 5 / span 1;
      grid-column: col-start 3 / span 1;
    }
    &--5-3 {
      grid-row: row-start 5 / span 1;
      grid-column: col-start 4 / span 1;
    }
    &--5-4 {
      grid-row: row-start 5 / span 1;
      grid-column: col-start 5 / span 1;
    }
    &--5-5 {
      grid-row: row-start 5 / span 1;
      grid-column: col-start 6 / span 1;
    }
    &--5-6 {
      grid-row: row-start 5 / span 1;
      grid-column: col-start 7 / span 1;
    }
    &--5-7 {
      grid-row: row-start 5 / span 1;
      grid-column: col-start 8 / span 1;
    }
    &--5-8 {
      grid-row: row-start 5 / span 1;
      grid-column: col-start 9 / span 1;
    }
    &--5-9 {
      grid-row: row-start 5 / span 1;
      grid-column: col-start 10 / span 1;
    }
    &--5-10 {
      grid-row: row-start 5 / span 1;
      grid-column: col-start 11 / span 1;
    }
    &--5-11 {
      grid-row: row-start 5 / span 1;
      grid-column: col-start 12 / span 1;
    }
    &--5-12 {
      grid-row: row-start 5 / span 1;
      grid-column: col-start 13 / span 1;
    }
    &--5-13 {
      grid-row: row-start 5 / span 1;
      grid-column: col-start 14 / span 1;
    }
    &--5-14 {
      grid-row: row-start 5 / span 1;
      grid-column: col-start 15 / span 1;
    }
    &--5-15 {
      grid-row: row-start 5 / span 1;
      grid-column: col-start 16 / span 1;
    }
    &--5-16 {
      grid-row: row-start 5 / span 1;
      grid-column: col-start 17 / span 1;
    }
    &--5-17 {
      grid-row: row-start 5 / span 1;
      grid-column: col-start 18 / span 1;
    }
    &--5-18 {
      grid-row: row-start 5 / span 1;
      grid-column: col-start 19 / span 1;
    }
    &--5-19 {
      grid-row: row-start 5 / span 1;
      grid-column: col-start 20 / span 1;
    }
    &--5-20 {
      grid-row: row-start 5 / span 1;
      grid-column: col-start 21 / span 1;
    }
    &--5-21 {
      grid-row: row-start 5 / span 1;
      grid-column: col-start 22 / span 1;
    }
    &--5-22 {
      grid-row: row-start 5 / span 1;
      grid-column: col-start 23 / span 1;
    }
    &--5-23 {
      grid-row: row-start 5 / span 1;
      grid-column: col-start 24 / span 1;
    }
    &--6-0 {
      grid-row: row-start 6 / span 1;
      grid-column: col-start 1 / span 1;
    }
    &--6-1 {
      grid-row: row-start 6 / span 1;
      grid-column: col-start 2 / span 1;
    }
    &--6-2 {
      grid-row: row-start 6 / span 1;
      grid-column: col-start 3 / span 1;
    }
    &--6-3 {
      grid-row: row-start 6 / span 1;
      grid-column: col-start 4 / span 1;
    }
    &--6-4 {
      grid-row: row-start 6 / span 1;
      grid-column: col-start 5 / span 1;
    }
    &--6-5 {
      grid-row: row-start 6 / span 1;
      grid-column: col-start 6 / span 1;
    }
    &--6-6 {
      grid-row: row-start 6 / span 1;
      grid-column: col-start 7 / span 1;
    }
    &--6-7 {
      grid-row: row-start 6 / span 1;
      grid-column: col-start 8 / span 1;
    }
    &--6-8 {
      grid-row: row-start 6 / span 1;
      grid-column: col-start 9 / span 1;
    }
    &--6-9 {
      grid-row: row-start 6 / span 1;
      grid-column: col-start 10 / span 1;
    }
    &--6-10 {
      grid-row: row-start 6 / span 1;
      grid-column: col-start 11 / span 1;
    }
    &--6-11 {
      grid-row: row-start 6 / span 1;
      grid-column: col-start 12 / span 1;
    }
    &--6-12 {
      grid-row: row-start 6 / span 1;
      grid-column: col-start 13 / span 1;
    }
    &--6-13 {
      grid-row: row-start 6 / span 1;
      grid-column: col-start 14 / span 1;
    }
    &--6-14 {
      grid-row: row-start 6 / span 1;
      grid-column: col-start 15 / span 1;
    }
    &--6-15 {
      grid-row: row-start 6 / span 1;
      grid-column: col-start 16 / span 1;
    }
    &--6-16 {
      grid-row: row-start 6 / span 1;
      grid-column: col-start 17 / span 1;
    }
    &--6-17 {
      grid-row: row-start 6 / span 1;
      grid-column: col-start 18 / span 1;
    }
    &--6-18 {
      grid-row: row-start 6 / span 1;
      grid-column: col-start 19 / span 1;
    }
    &--6-19 {
      grid-row: row-start 6 / span 1;
      grid-column: col-start 20 / span 1;
    }
    &--6-20 {
      grid-row: row-start 6 / span 1;
      grid-column: col-start 21 / span 1;
    }
    &--6-21 {
      grid-row: row-start 6 / span 1;
      grid-column: col-start 22 / span 1;
    }
    &--6-22 {
      grid-row: row-start 6 / span 1;
      grid-column: col-start 23 / span 1;
    }
    &--6-23 {
      grid-row: row-start 6 / span 1;
      grid-column: col-start 24 / span 1;
    }
    &--7-0 {
      grid-row: row-start 7 / span 1;
      grid-column: col-start 1 / span 1;
    }
    &--7-1 {
      grid-row: row-start 7 / span 1;
      grid-column: col-start 2 / span 1;
    }
    &--7-2 {
      grid-row: row-start 7 / span 1;
      grid-column: col-start 3 / span 1;
    }
    &--7-3 {
      grid-row: row-start 7 / span 1;
      grid-column: col-start 4 / span 1;
    }
    &--7-4 {
      grid-row: row-start 7 / span 1;
      grid-column: col-start 5 / span 1;
    }
    &--7-5 {
      grid-row: row-start 7 / span 1;
      grid-column: col-start 6 / span 1;
    }
    &--7-6 {
      grid-row: row-start 7 / span 1;
      grid-column: col-start 7 / span 1;
    }
    &--7-7 {
      grid-row: row-start 7 / span 1;
      grid-column: col-start 8 / span 1;
    }
    &--7-8 {
      grid-row: row-start 7 / span 1;
      grid-column: col-start 9 / span 1;
    }
    &--7-9 {
      grid-row: row-start 7 / span 1;
      grid-column: col-start 10 / span 1;
    }
    &--7-10 {
      grid-row: row-start 7 / span 1;
      grid-column: col-start 11 / span 1;
    }
    &--7-11 {
      grid-row: row-start 7 / span 1;
      grid-column: col-start 12 / span 1;
    }
    &--7-12 {
      grid-row: row-start 7 / span 1;
      grid-column: col-start 13 / span 1;
    }
    &--7-13 {
      grid-row: row-start 7 / span 1;
      grid-column: col-start 14 / span 1;
    }
    &--7-14 {
      grid-row: row-start 7 / span 1;
      grid-column: col-start 15 / span 1;
    }
    &--7-15 {
      grid-row: row-start 7 / span 1;
      grid-column: col-start 16 / span 1;
    }
    &--7-16 {
      grid-row: row-start 7 / span 1;
      grid-column: col-start 17 / span 1;
    }
    &--7-17 {
      grid-row: row-start 7 / span 1;
      grid-column: col-start 18 / span 1;
    }
    &--7-18 {
      grid-row: row-start 7 / span 1;
      grid-column: col-start 19 / span 1;
    }
    &--7-19 {
      grid-row: row-start 7 / span 1;
      grid-column: col-start 20 / span 1;
    }
    &--7-20 {
      grid-row: row-start 7 / span 1;
      grid-column: col-start 21 / span 1;
    }
    &--7-21 {
      grid-row: row-start 7 / span 1;
      grid-column: col-start 22 / span 1;
    }
    &--7-22 {
      grid-row: row-start 7 / span 1;
      grid-column: col-start 23 / span 1;
    }
    &--7-23 {
      grid-row: row-start 7 / span 1;
      grid-column: col-start 24 / span 1;
    }
  }
  & .active {
    background-color: ${(props): string => props.theme.colors.golf.dark};
  }
  & .current {
    background-color: ${(props): string => props.theme.colors.echo};
  }
`;
