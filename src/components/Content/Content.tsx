import type { PropsWithChildren } from 'react';
import classnames from 'classnames';

type Props = PropsWithChildren<{
  heading?: string;
}>;

export default function Content({ heading, children }: Props) {
  return (
    <>
      {heading && (
        <section className="bg-gray-700 w-full pt-20 px-4 sm:px-6 pb-4">
          <h1 className="text-2xl font-bold text-white">{heading}</h1>
        </section>
      )}
      <main
        className={classnames(
          'max-w-7xl mx-auto px-4 sm:px-6 h-screen',
          {
            'pt-20': !heading,
          },
        )}
      >
        {children}
      </main>
    </>
  );
}
