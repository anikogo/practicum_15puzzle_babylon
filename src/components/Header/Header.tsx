import { Fragment, type MouseEventHandler } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import classnames from 'classnames';

import { Popover, Transition } from '@headlessui/react';

import { MenuIcon } from '@heroicons/react/outline';
import { ChevronDownIcon } from '@heroicons/react/solid';

import Tab from '../Tab';
import Logo from '../Logo';
import Button from '../Button';
// import ToggleButton from '../ToggleButton';
import Avatar from '../Avatar';

import useUser from '../../hook/useUser';
import { setCredentials, useSignOutMutation } from '../../store';

type HeaderProps = {
  disabled?: boolean;
};

export default function Header({ disabled }: HeaderProps) {
  const { pathname } = useLocation();
  const user = useUser();
  const dispatch = useDispatch();

  const [signOut] = useSignOutMutation();

  const signOutHandler = (close: () => void): MouseEventHandler => (event) => {
    event.preventDefault();
    signOut().then(() => {
      close();
      dispatch(setCredentials(null));
      localStorage.removeItem('userAuth');
    });
  };

  return (
    <Popover as="header" className="bg-gray-700 fixed w-full top-0 z-10 border-b-2 border-gray-800">
      <div className="mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-2 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1 space-x-6">
            {disabled ? (
              <Logo />
            ) : (
              <>
                <Link to="/"><Logo /></Link>
                <nav className="hidden md:flex items-center space-x-2">
                  <Button
                    variant={pathname === '/leaderboard' ? 'filled' : 'link'}
                    color="green"
                    as={Link}
                    to="/leaderboard"
                  >
                    Leaderboard
                  </Button>
                  <Button
                    variant={pathname === '/forum' ? 'filled' : 'link'}
                    color="green"
                    as={Link}
                    to="/forum"
                  >
                    Forum
                  </Button>
                  <Button
                    variant={pathname === '/about' ? 'filled' : 'link'}
                    color="green"
                    as={Link}
                    to="/about"
                  >
                    About
                  </Button>

                  {/* <ToggleButton /> */}
                </nav>
              </>
            )}
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <Button as={Popover.Button} variant="icon">
              <span className="sr-only">Open menu</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </Button>
          </div>
          <nav>
            {user ? (
              <Popover className="relative flex gap-4">
                {({ open, close }) => (
                  <>
                    <Avatar
                      className="max-h-12 w-auto"
                      firstName={user.first_name}
                      secondName={user.second_name}
                      src={user.avatar}
                    />
                    <Tab
                      as={Popover.Button}
                      className="flex items-center"
                      active={open || pathname === '/profile'}
                    >
                      <span>
                        {user.display_name ?? `${user.first_name} ${user.second_name}`}
                      </span>
                      <ChevronDownIcon
                        className={classnames('ml-2 h-5 w-5', {
                          'text-gray-600': open,
                          'text-gray-400': !open,
                        })}
                        aria-hidden="true"
                      />
                    </Tab>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                    >
                      <Popover.Panel
                        className="absolute z-10 right-0 w-40 max-w-sm sm:px-0"
                      >
                        <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                          <div className="relative grid gap-6 bg-white px-5 py-6">
                            <Tab
                              as={Link}
                              to="/profile"
                              className="w-full"
                              active={pathname === '/profile'}
                              onClick={() => close()}
                            >
                              Profile
                            </Tab>
                            <Tab
                              to="/"
                              as={Link}
                              className="w-full"
                              onClick={signOutHandler(close)}
                            >
                              Sign Out
                            </Tab>
                          </div>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>
            ) : (
              <span>
                <Button
                  color="green"
                  variant={pathname === '/signin' ? 'filled' : 'outline'}
                  as={Link}
                  to="/signin"
                >
                  Sign In
                </Button>
                <Button
                  color="green"
                  variant={pathname === '/signup' ? 'filled' : 'outline'}
                  as={Link}
                  to="/signup"
                  className="ml-4"
                >
                  Sign Up
                </Button>
              </span>
            )}
          </nav>
        </div>
      </div>
    </Popover>
  );
}
