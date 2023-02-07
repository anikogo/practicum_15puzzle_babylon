import { Fragment, type MouseEventHandler, useContext } from 'react';

import { Link, useLocation } from 'react-router-dom';
import classnames from 'classnames';
import { Popover, Transition } from '@headlessui/react';
import { MenuIcon } from '@heroicons/react/outline';
import { ChevronDownIcon } from '@heroicons/react/solid';

import Tab from '../Tab';
import Logo from '../Logo';
import Button from '../Button';
import ToggleButton from '../ToggleButton';
import Avatar from '../Avatar';

import useUser from '../../hook/useUser';
import { useSignOutMutation } from '../../store';
import ThemeContext from '../../context/ThemeContext';

type HeaderProps = {
  disabled?: boolean;
};

export default function Header({ disabled }: HeaderProps) {
  const { style, setStyle } = useContext(ThemeContext);
  const [signOut] = useSignOutMutation();
  const { pathname } = useLocation();
  const user = useUser();

  const signOutHandler = (close: () => void): MouseEventHandler => async (event) => {
    event.preventDefault();
    await signOut();
    close();
  };

  const toggleTheme = (theme: boolean) => {
    setStyle(theme);
    localStorage.setItem('theme', theme.toString());
  };

  return (
    <Popover
      as="header"
      className="bg-orange-100 dark:bg-gray-700 fixed w-full top-0 z-10 border-b-2 border-orange-700 dark:border-gray-800"
    >
      <div className="mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-2 md:justify-start md:space-x-10">
          <div className="flex justify-start md:w-0 md:flex-1 space-x-6">
            {disabled ? (
              <Logo />
            ) : (
              <>
                <Link to="/"><Logo /></Link>
                <nav className="hidden md:flex items-center space-x-2">
                  <Button
                    as={Link}
                    className={classnames({
                      'btn-orange-filled dark:btn-green-filled': pathname === '/leaderboard',
                      'btn-orange-text dark:btn-green-text': pathname !== '/leaderboard',
                    })}
                    to="/leaderboard"
                  >
                    Leaderboard
                  </Button>
                  <Button
                    as={Link}
                    className={classnames({
                      'btn-orange-filled dark:btn-green-filled': pathname === '/forum',
                      'btn-orange-text dark:btn-green-text': pathname !== '/forum',
                    })}
                    to="/forum"
                  >
                    Forum
                  </Button>
                  <Button
                    as={Link}
                    className={classnames({
                      'btn-orange-filled dark:btn-green-filled': pathname === '/about',
                      'btn-orange-text dark:btn-green-text': pathname !== '/about',
                    })}
                    to="/about"
                  >
                    About
                  </Button>
                </nav>
              </>
            )}
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <Button as={Popover.Button} className="btn-icon">
              <span className="sr-only">Open menu</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </Button>
          </div>
          <div className="md:flex items-center gap-4">
            <ToggleButton
              id="theme"
              labelLeft="🌕"
              labelRight="🌑"
              checked={style}
              onToggle={toggleTheme}
            />
          </div>
          <nav>
            {user ? (
              <Popover className="relative flex gap-4">
                {({ open, close }) => (
                  <>
                    <Tab
                      as={Popover.Button}
                      className="flex items-center"
                      active={open || pathname === '/profile'}
                    >
                      <Avatar
                        className="max-h-12 w-auto"
                        firstName={user.first_name}
                        secondName={user.second_name}
                        src={user.avatar}
                      />
                      {/* <span>
                        {user.display_name ?? `${user.first_name} ${user.second_name}`}
                      </span> */}
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
                  as={Link}
                  className={classnames({
                    'btn-orange-filled dark:btn-green-filled': pathname === '/signin',
                    'btn-orange-text dark:btn-green-text': pathname !== '/signin',
                  })}
                  to="/signin"
                >
                  Sign In
                </Button>
                <Button
                  as={Link}
                  className={classnames('ml-4', {
                    'btn-orange-filled dark:btn-green-filled': pathname === '/signup',
                    'btn-orange-text dark:btn-green-text': pathname !== '/signup',
                  })}
                  to="/signup"
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
