import { Fragment } from 'react';

import { Link } from 'react-router-dom';

import { Button } from '../Button';

import { Menu, Transition } from '@headlessui/react';
import Logo from '../../components/Logo/Logo';
import { User as UserIcon } from '@styled-icons/boxicons-solid/User';
import { ReactComponent as DiscordLogo } from '../../images/Discord-Logo-Color.svg';

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
    <header className="fixed w-full p-3 flex items-center bg-neutral-50 shadow-2xl">
      <Link className="h-10 mr-auto" to="/servers">
        <Logo />
      </Link>
      <div className="inline-flex">
        <div className="invisible md:visible">
          <button className="w-full h-full">
            <a href="https://discord.com/invite/z9CR45E3gx">
              <DiscordLogo className="h-8 mx-auto" title="discord" />
            </a>
          </button>
        </div>
        {!session && (
          <div className="inline-flex items-center ml-8 space-x-3">
            <Link to="/login">
              <Button compact slate>
                <div className="text-sm">Log In</div>
              </Button>
            </Link>
            <Link to="/signup">
              <Button compact>
                <div className="text-sm">Sign Up</div>
              </Button>
            </Link>
          </div>
        )}
        <Menu as="div" className="relative h-full">
          <Menu.Button className="inline-flex items-center w-full h-full">
            {session ? (
              <Fragment>
                <UserIcon className="h-8 mx-3" /> <div className="truncate">{session.user.email}</div>{' '}
              </Fragment>
            ) : null}
          </Menu.Button>
          <Transition
            enter="transition-opacity duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Menu.Items className="absolute top-10 w-full pt-2 rounded-sm shadow-lg bg-white divide-y">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={classNames(
                      active ? 'bg-neutral-50 text-gray-900' : 'text-gray-700',
                      'block w-full px-4 py-2 text-md',
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
                      'block w-full px-4 py-2 text-md',
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
    </header>
  );
}
export default Header;
