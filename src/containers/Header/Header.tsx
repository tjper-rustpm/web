import styled from 'styled-components';

import IconButton from '@material-ui/core/IconButton';

import ProfileButton from '../ProfileButton/ProfileButton';
import DiscordLogoColor from '../../images/Discord-Logo-Color.svg';
import { Link } from '../../components/Link/Link';
import Logo from '../../components/Logo/Logo';

const StyledHeader = styled.header`
  position: fixed;

  display: flex;
  align-items: center;

  height: 6.5rem;
  width: 100%;
  padding: 0 3rem;

  background-color: ${(props): string => props.theme.colors.lima};
  box-shadow: 0 0 1rem 0 ${(props): string => props.theme.shadows.light};
`;
const Home = styled(Link)`
  height: 70%;
  margin-right: auto;
`;
const Discord = styled.div`
  & img {
    height: 3rem;
  }
`;
const VerticalRule = styled.div`
  height: 3.5rem;
  margin: 0 3rem;
  border-left: 0.1rem solid ${(props): string => props.theme.shadows.light};
  box-shadow: 0 0 0.3rem 0 ${(props): string => props.theme.shadows.lighter};
`;

type HeaderProps = {
  className?: string;
};

function Header({ className }: HeaderProps): JSX.Element {
  return (
    <StyledHeader className={className}>
      <Home to="/servers">
        <Logo />
      </Home>
      <Discord>
        <IconButton>
          <a href="https://discord.com/invite/z9CR45E3gx">
            <img src={DiscordLogoColor} alt="discord" />
          </a>
        </IconButton>
      </Discord>
      <VerticalRule />
      <ProfileButton />
    </StyledHeader>
  );
}
export default Header;
