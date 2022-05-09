interface LogoProps {
  compact?: boolean;
}
const Logo = ({ compact }: LogoProps): JSX.Element => {
  const textSize = compact ? 'text-4xl' : 'text-5xl';
  const paddingBottom = compact ? 'pb-1.5' : 'pb-2';

  return (
    <h1 className={`${textSize} flex justify-center items-center tracking-wide`}>
      <span className="align-middle">RU</span>
      <span className={`text-red-500 align-bottom px-0.5 ${paddingBottom}`}>:</span>
      <span className="">ST</span>
      <span className={`text-red-500 align-bottom px-0.5 ${paddingBottom}`}>:</span>
      <span className="">PM</span>
      <span className="text-red-500 pl-0.5">!</span>
    </h1>
  );
};

export default Logo;
