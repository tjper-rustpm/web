import { Typography, TypographySize } from '../Typography';

interface LogoProps {
  size?: 'small' | 'medium' | 'large' | 'larger';
}
const Logo = ({ size = 'medium' }: LogoProps): JSX.Element => {
  let textSize: string;
  let typographySize: TypographySize;
  let paddingBottom: string;
  switch (size) {
    case 'small':
      textSize = 'text-4xl';
      typographySize = '5xl';
      paddingBottom = 'pb-1.5';
      break;
    case 'medium':
      textSize = 'text-5xl';
      typographySize = '5xl';
      paddingBottom = 'pb-2';
      break;
    case 'large':
      textSize = 'text-7xl';
      typographySize = '7xl';
      paddingBottom = 'pb-3';
      break;
    case 'larger':
      textSize = 'text-8xl';
      typographySize = '8xl';
      paddingBottom = 'pb-3';
      break;
  }

  return (
    <h1 className={`${textSize} flex justify-center items-center tracking-wide`}>
      <Typography size={`${typographySize}`}>RU</Typography>
      <span className={`text-red-500 align-bottom px-0.5 ${paddingBottom}`}>:</span>
      <Typography size={`${typographySize}`}>ST</Typography>
      <span className={`text-red-500 align-bottom px-0.5 ${paddingBottom}`}>:</span>
      <Typography size={`${typographySize}`}>PM</Typography>
      <span className="text-red-500 pl-0.5 pt-1">!</span>
    </h1>
  );
};

export default Logo;
