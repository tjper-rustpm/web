import { Typography } from '../Typography';

interface LogoProps {
  compact?: boolean;
}
const Logo = ({ compact }: LogoProps): JSX.Element => {
  const textSize = compact ? 'text-4xl' : 'text-5xl';
  const paddingBottom = compact ? 'pb-1.5' : 'pb-2';

  return (
    <h1 className={`${textSize} flex justify-center items-center tracking-wide`}>
      <Typography size="5xl">RU</Typography>
      <span className={`text-red-500 align-bottom px-0.5 ${paddingBottom}`}>:</span>
      <Typography size="5xl">ST</Typography>
      <span className={`text-red-500 align-bottom px-0.5 ${paddingBottom}`}>:</span>
      <Typography size="5xl">PM</Typography>
      <span className="text-red-500 pl-0.5 pt-1">!</span>
    </h1>
  );
};

export default Logo;
