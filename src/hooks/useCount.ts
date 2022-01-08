import { useEffect, useState } from 'react';
import { Duration } from 'luxon';

interface CountDownArgs {
  direction?: '+' | '-';
  rate?: number;
  initial: Duration;
}

export const useCount = ({ direction = '+', rate = 1000, initial }: CountDownArgs): Duration => {
  const [count, setCount] = useState<Duration>(initial);
  useEffect(() => {
    setTimeout(() => {
      if (direction === '+') {
        setCount(count.plus(rate));
      } else if (direction === '-') {
        setCount(count.minus(rate));
      }
    }, rate);
  }, [count]);
  return count;
};
