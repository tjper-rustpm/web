import styled from 'styled-components';
import logo from './logo.png';

const Img = styled.img`
  height: 100%;
`;

type LogoProps = {
  className?: string;
};
const Logo = ({ className }: LogoProps): JSX.Element => {
  return <Img className={className} src={logo} alt="Logo" />;
};

export default Logo;
