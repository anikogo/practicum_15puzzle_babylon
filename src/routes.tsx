import { Dispatch } from 'react';
import { PathMatch } from 'react-router';
import IndexPage from './pages';
import ForumPage from './pages/forum';
import LeaderboardPage from './pages/leaderboard';
import SignInPage from './pages/signin';
import SignUpPage from './pages/signup';
import ProfilePage from './pages/profile';
import Page404 from './pages/404';

import { appApi } from './store/api';

export type RouterFetchDataArgs<T> = {
  dispatch: Dispatch<Action<T>>;
  match: PathMatch;
};

export default [
  {
    path: '/',
    element: <IndexPage />,
  },
  {
    path: '/forum',
    element: <ForumPage />,
    // async fetchData({ dispatch }: RouterFetchDataArgs<Thread[]>) {
    //   dispatch(getThreads());
    // },
  },
  {
    path: '/forum/:id',
    element: <ForumPage />,
    // async fetchData({ dispatch, match }: RouterFetchDataArgs<Thread[]>) {
    //   if (match.params.id) {
    //     dispatch(getThread(match.params.id));
    //   }
    // },
  },
  {
    path: '/leaderboard',
    element: <LeaderboardPage />,
    fetchData({ dispatch }: RouterFetchDataArgs<(User & { score: number; })[]>) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      dispatch(appApi.endpoints.getAllUsers.initiate());
    },
  },
  {
    path: '/signin',
    element: <SignInPage />,
  },
  {
    path: '/signup',
    element: <SignUpPage />,
  },
  {
    path: '/profile',
    element: <ProfilePage />,
  },
  {
    path: '*',
    element: <Page404 />,
  },
];
