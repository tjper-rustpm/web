import styled from 'styled-components';

import Button from '../../components/Button/Button';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { LogIn as LoginIcon } from '@styled-icons/boxicons-solid/LogIn';
import { User as UserIcon } from '@styled-icons/boxicons-solid/User';

import { useState } from 'react';
import { useRouter } from '../../router/router';
import { useLogoutUser, useMe } from '../../services/user/hooks';

interface ProfileButtonProps {
  className?: string;
}
function ProfileButton({ className }: ProfileButtonProps): JSX.Element {
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
    logoutUser.mutate();
    handleCloseMenu();
    return true;
  };

  if (!data) {
    return (
      <StyledButton size="compact" onClick={(): void => router.push('/login')}>
        <LoginIcon />
        Login
      </StyledButton>
    );
  }

  return (
    <div className={className}>
      <StyledButton onClick={handleOpenMenu}>
        <UserIcon />
        {data && data.email}
      </StyledButton>
      <Menu id="menu" anchorEl={anchor} keepMounted open={Boolean(anchor)} onClose={handleCloseMenu}>
        <MenuItem onClick={() => router.push('/profile')}>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

export default ProfileButton;

const StyledButton = styled(Button)`
  height: 5rem;
`;
