import { Duration } from 'luxon';
import { useCount } from '../hooks/useCount';
import { Tooltip } from './Tooltip';
import { Typography } from './Typography';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/20/solid';

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

  const arrowStyle = 'mr-1 w-5';
  const arrow = direction === '+' ? <ArrowUpIcon className={arrowStyle} /> : <ArrowDownIcon className={arrowStyle} />;

  return (
    <Tooltip content={<p className="font-sans text-md min-w-max">{tooltip}</p>} position="top">
      <div className="flex item-center">
        {arrow}
        <Typography size="2xl">{count.toFormat('hh:mm:ss')}</Typography>
      </div>
    </Tooltip>
  );
};
