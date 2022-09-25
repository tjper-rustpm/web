import { Fragment } from 'react';

import { Link } from 'react-router-dom';

import { Button } from '../Button';
import { Tooltip } from '../Tooltip';
import { Typography } from '../Typography';

import { Menu, Transition } from '@headlessui/react';
import Logo from '../../components/Logo/Logo';
import { User as UserIcon } from '@styled-icons/boxicons-solid/User';
import { ReactComponent as DiscordLogo } from '../../imgs/Discord-Logo-Color.svg';

import { useRouter } from '../../router/router';
import { useLogoutUser, useSession } from '../../services/user/hooks';

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ');
}

function Header(): JSX.Element {
  const router = useRouter();
  const { data: session } = useSession();
  const logoutUser = useLogoutUser();

  const handleLogout = async (): Promise<boolean> => {
    logoutUser.mutate();
    router.push('/servers');
    return true;
  };

  return (
    <header className="fixed w-full p-2 bg-neutral-50 shadow-2xl z-50 md:flex md:justify-between md:px-4">
      <div className="flex items-center justify-evenly mb-2 border-b-2 md:border-b-0 md:mb-0 md:space-x-8">
        <div className="flex items-center space-x-4">
          <Link to="/servers">
            <Logo />
          </Link>
          <div>
            <Tooltip
              position="bottom"
              content={
                <p className="w-60 font-sans text-base text-center">
                  Rustpm is under active development; issues may occur. Please report any problems in Discord.
                </p>
              }
            >
              <h3 className="text-lg border-4 border-zinc-300 pt-0.5 px-2">Beta</h3>
            </Tooltip>
          </div>
        </div>
        <div className="flex items-center">
          <button>
            <a href="https://discord.gg/wPEFqXYvQV">
              <DiscordLogo className="h-8 mx-auto" title="discord" />
            </a>
          </button>
        </div>
      </div>
      {!session && (
        <div className="flex items-center justify-evenly md:space-x-4">
          <Link to="/login">
            <Button compact slate>
              <div className="text-lg w-24">Log In</div>
            </Button>
          </Link>
          <Link to="/signup">
            <Button compact>
              <div className="text-lg w-20">Sign Up</div>
            </Button>
          </Link>
        </div>
      )}
      {session ? (
        <div className="md:flex md:items-center">
          <Menu as="div" className="relative">
            <Menu.Button className="flex items-center mx-auto">
              <Fragment>
                <UserIcon className="h-8 mx-3" />
                <span className="truncate w-32">
                  <Typography>{session.user.email}</Typography>
                </span>
              </Fragment>
            </Menu.Button>
            <Transition
              enter="transition-opacity duration-200"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-150"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Menu.Items className="absolute top-14 w-full pt-2 rounded-sm shadow-lg bg-white divide-y">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={classNames(
                        active ? 'bg-neutral-50 text-gray-900' : 'text-gray-700',
                        'block w-full px-4 py-2 text-lg',
                      )}
                      onClick={() => router.push('/profile')}
                    >
                      Profile
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={classNames(
                        active ? 'bg-neutral-50 text-gray-900' : 'text-gray-700',
                        'block w-full px-4 py-2 text-lg',
                      )}
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      ) : null}
    </header>
  );
}
export default Header;
