import React from 'react';

import { Link } from 'react-router-dom';

import { Menu, Transition } from '@headlessui/react';
import Logo from '../../components/Logo/Logo';
import { User as UserIcon } from '@styled-icons/boxicons-solid/User';
import { ReactComponent as DiscordLogo } from '../../images/Discord-Logo-Color.svg';

import { useRouter } from '../../router/router';
import { useLogoutUser, useMe } from '../../services/user/hooks';

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ');
}

function Header(): JSX.Element {
  const router = useRouter();
  const { data } = useMe();
  const logoutUser = useLogoutUser();

  const handleLogout = async (): Promise<boolean> => {
    logoutUser.mutate();
    return true;
  };

  const login = (
    <button className="w-full h-full" onClick={() => router.push('/login')}>
      Login
    </button>
  );

  const profile = (
    <React.Fragment>
      <UserIcon className="h-8 mx-3" />
      <div className="truncate">tjamesperry@hotmail.com</div>
    </React.Fragment>
  );

  const buttonClasses = 'w-full w-48 max-w-xs hover:bg-slate-100';
  return (
    <header className="fixed w-full p-3 flex items-center shadow-xl">
      <Link className="h-10 mr-auto" to="/servers">
        <Logo />
      </Link>
      <div className="md:grid md:grid-cols-2 justify-items-center divide-x">
        <div className={`${buttonClasses} hidden md:block`}>
          <button className="w-full h-full">
            <a href="https://discord.com/invite/z9CR45E3gx">
              <DiscordLogo className="h-8 mx-auto" title="discord" />
            </a>
          </button>
        </div>
        <div className={buttonClasses}>
          {!data && login}
          <Menu as="div" className="relative h-full">
            <Menu.Button className="inline-flex items-center w-full h-full">{data && profile}</Menu.Button>
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
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
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
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
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
      </div>
    </header>
  );
}
export default Header;
