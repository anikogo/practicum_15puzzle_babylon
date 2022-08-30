import type { PropsWithChildren } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { Link } from 'react-router-dom';

import Button from '../Button';

import imgSrc from './assets/error.jpg';

type ErrorBoundaryWrapperProps = PropsWithChildren<unknown>;

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className="bg-gray-100 grow h-full w-full flex items-center">
      <div role="alert" className="m-auto content-center bg-white py-8 px-12 rounded-3xl">
        <h2 className="mb-6">Holy crap!</h2>
        <img className="max-w-2xl pb-6" src={imgSrc} alt="broken puzzle" />
        <div className="w-full flex justify-between">
          <pre className="my-4">{error.message}</pre>
        </div>
        Try to
        <Button color="green" variant="filled" onClick={resetErrorBoundary}>Reload app</Button>
        or
        <Button color="green" variant="outline" onClick={resetErrorBoundary} as={Link} to="/">Go to homepage</Button>
      </div>
    </div>
  );
}

export default function ErrorBoundaryWrapper({
  children,
}: ErrorBoundaryWrapperProps) {
  return (
    <ErrorBoundary
      onReset={() => {}}
      FallbackComponent={ErrorFallback}
    >
      {children}
    </ErrorBoundary>
  );
}
