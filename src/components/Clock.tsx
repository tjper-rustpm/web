import { Duration } from 'luxon';
import { useCount } from '../hooks/useCount';
import { Tooltip } from './Tooltip';
import { Typography } from './Typography';

interface ClockProps {
  direction?: '+' | '-';
  initial: Duration;
  tooltip: string;
}

export const Clock = ({ initial, direction, tooltip }: ClockProps): JSX.Element => {
  const count = useCount({
    direction: direction,
    initial: initial,
  });

  return (
    <Tooltip content={<p className="font-sans text-md min-w-max">{tooltip}</p>} position="top">
      <Typography size="2xl">{count.toFormat('hh:mm:ss')}</Typography>
    </Tooltip>
  );
};
