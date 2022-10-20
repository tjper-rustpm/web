import { DateTime } from 'luxon';
import { Cron } from './cron';

describe('Cron.events', () => {
  const kases = [
    {
      description: 'simple schedule, should get single event',
      cron: new Cron('0 18 * * *'),
      start: DateTime.utc(2022, 8, 4, 0, 0, 0, 0),
      end: DateTime.utc(2022, 8, 5, 0, 0, 0, 0),
      expected: [DateTime.utc(2022, 8, 4, 18, 0, 0, 0)],
    },
    {
      description: 'simple schedule, should get two events',
      cron: new Cron('0 18 * * *'),
      start: DateTime.utc(2022, 8, 4, 0, 0, 0, 0),
      end: DateTime.utc(2022, 8, 6, 0, 0, 0, 0),
      expected: [DateTime.utc(2022, 8, 4, 18, 0, 0, 0), DateTime.utc(2022, 8, 5, 18, 0, 0, 0)],
    },
    {
      description: 'simple schedule, should get 5 events',
      cron: new Cron('0 18 * * *'),
      start: DateTime.utc(2022, 8, 4, 0, 0, 0, 0),
      end: DateTime.utc(2022, 8, 9, 0, 0, 0, 0),
      expected: [
        DateTime.utc(2022, 8, 4, 18, 0, 0, 0),
        DateTime.utc(2022, 8, 5, 18, 0, 0, 0),
        DateTime.utc(2022, 8, 6, 18, 0, 0, 0),
        DateTime.utc(2022, 8, 7, 18, 0, 0, 0),
        DateTime.utc(2022, 8, 8, 18, 0, 0, 0),
      ],
    },
    {
      description: 'day range, should get single event',
      cron: new Cron('0 20 8-14 * *', 5),
      start: DateTime.utc(2022, 8, 5, 0, 0, 0, 0),
      end: DateTime.utc(2022, 8, 14, 0, 0, 0, 0),
      expected: [DateTime.utc(2022, 8, 12, 20, 0, 0, 0)],
    },
  ];

  kases.forEach((kase) => {
    test(kase.description, () => {
      const events = kase.cron.events(kase.start, kase.end);
      expect(events).toHaveLength(kase.expected.length);

      events.forEach((event, index) => {
        expect(event.toMillis()).toEqual(kase.expected[index].toMillis());
      });
    });
  });
});

describe('Cron.next', () => {
  const kases = [
    {
      description: 'next day',
      cron: new Cron('0 18 * * *'),
      start: DateTime.utc(2022, 8, 4, 0, 0, 0, 0),
      expected: DateTime.utc(2022, 8, 4, 18, 0, 0, 0),
    },
    {
      description: 'next thursday',
      cron: new Cron('0 18 * * *', 4),
      start: DateTime.utc(2022, 10, 18, 0, 0, 0, 0),
      expected: DateTime.utc(2022, 10, 20, 18, 0, 0, 0),
    },
  ];

  kases.forEach((kase) => {
    test(kase.description, () => {
      const next = kase.cron.next(kase.start);
      expect(next.toMillis()).toEqual(kase.expected.toMillis());
    });
  });
});

describe('Cron.prev', () => {
  const kases = [
    {
      description: 'prev day',
      cron: new Cron('0 18 * * *'),
      start: DateTime.utc(2022, 8, 4, 0, 0, 0, 0),
      expected: DateTime.utc(2022, 8, 3, 18, 0, 0, 0),
    },
    {
      description: 'prev thursday',
      cron: new Cron('0 18 * * *', 4),
      start: DateTime.utc(2022, 10, 18, 0, 0, 0, 0),
      expected: DateTime.utc(2022, 10, 13, 18, 0, 0, 0),
    },
  ];

  kases.forEach((kase) => {
    test(kase.description, () => {
      const prev = kase.cron.prev(kase.start);
      expect(prev.toMillis()).toEqual(kase.expected.toMillis());
    });
  });
});
