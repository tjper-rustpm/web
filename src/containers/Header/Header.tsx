import React from 'react';
import styled from 'styled-components';

import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { LogIn as LoginIcon } from '@styled-icons/boxicons-solid/LogIn';
import { User as UserIcon } from '@styled-icons/boxicons-solid/User';

import Button from '../../components/Button/Button';
import DiscordLogoColor from '../../images/Discord-Logo-Color.svg';
import { Link } from '../../components/Link/Link';
import Logo from '../../components/Logo/Logo';

import { useRouter } from '../../router/router';
import { useState } from 'react';

import { useLogoutUser, useMe } from '../../services/user/hooks';

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
const StyledButton = styled(Button)`
  height: 5rem;
`;

type HeaderProps = {
  className?: string;
};

function Header({ className }: HeaderProps): JSX.Element {
  const router = useRouter();
  const { data } = useMe();
  const logoutUser = useLogoutUser();

  const [anchor, setAnchor] = useState<Element | null>(null);
  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchor(event.currentTarget);
  };
  const handleCloseMenu = (): void => {
    setAnchor(null);
  };
  const handleLogout = async (): Promise<boolean> => {
    logoutUser.mutate;
    handleCloseMenu();
    return true;
  };

  const login = (
    <StyledButton size="compact" onClick={(): void => router.push('/login')}>
      <LoginIcon />
      Login
    </StyledButton>
  );
  const profile = (
    <StyledButton onClick={handleOpenMenu}>
      <UserIcon />
      {data && data.email}
    </StyledButton>
  );

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
      <div>
        {data ? profile : login}
        <Menu id="menu" anchorEl={anchor} keepMounted open={Boolean(anchor)} onClose={handleCloseMenu}>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </div>
    </StyledHeader>
  );
}
export default Header;
