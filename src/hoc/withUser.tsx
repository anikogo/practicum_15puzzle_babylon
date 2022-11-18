import { useEffect, type ComponentType } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { useErrorHandler } from 'react-error-boundary';
import type { AxiosError } from 'axios';

import Preloader from '../components/Preloader';

import useUser from '../hook/useUser';
import { useGetUserMutation, useSendCodeMutation } from '../store';

export default function withUser<P extends Record<string, unknown>>(
  Page: ComponentType<P>,
  shouldBeAuthorized = true,
) {
  return function WithUser(pageProps: P & { user?: User }) {
    const handleErrors = useErrorHandler();
    const [searchParams] = useSearchParams();
    const code = searchParams.get('code');
    let userData: User | null = useUser();
    const [getUser, {
      isUninitialized,
      isLoading,
      isError,
      error,
      data,
    }] = useGetUserMutation();

    const [sendCode, result] = useSendCodeMutation();

    useEffect(() => {
      if (code && !userData) {
        sendCode({ code, redirect_uri: window.location.origin })
          .then(() => getUser());
      }
    }, [sendCode, code, result]);

    useEffect(() => {
      if (isUninitialized && !userData) {
        console.log(document.cookie);
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

    if (!code || !result.isUninitialized) {
      return <Navigate to="/signin" />;
    }

    return <Preloader />;
  };
}
