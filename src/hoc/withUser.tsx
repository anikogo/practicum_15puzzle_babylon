import { ComponentType, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useErrorHandler } from 'react-error-boundary';
import type { AxiosError } from 'axios';

import Preloader from '../components/Preloader';
import makeDataSelector from '../utils/makeDataSelector';

import { useGetUserMutation } from '../store';

const userSelector = makeDataSelector('user');

export default function withUser<P extends Record<string, unknown>>(
  Page: ComponentType<P>,
  shouldBeAuthorized = true,
) {
  return function WithUser(pageProps: P & { user?: User }) {
    const handleErrors = useErrorHandler();
    let userData: User | null = useSelector(userSelector);
    const [getUser, {
      isUninitialized,
      isLoading,
      isError,
      error,
      data,
    }] = useGetUserMutation();

    useEffect(() => {
      if (isUninitialized && !userData) {
        getUser().then(() => { if (data && !isError) userData = data; });
      }
    }, [getUser, isError, isLoading, isUninitialized, userData]);

    if (isLoading || (isUninitialized && !userData)) {
      return <Preloader />;
    }

    if (userData || !shouldBeAuthorized) {
      const pagePropsWithUser = { ...pageProps, user: userData };
      pagePropsWithUser.user = userData;
      return <Page {...pagePropsWithUser} />;
    }

    if (isError && (error as AxiosError).response?.status !== 401 && !shouldBeAuthorized) {
      handleErrors(error);
      return <div>Something went wrong</div>;
    }

    return <Navigate to="/signin" />;
  };
}
