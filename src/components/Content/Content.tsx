import type { PropsWithChildren } from 'react';
import classnames from 'classnames';

import Header from '../Header';
import Footer from '../Footer';

type Props = PropsWithChildren<{
  heading?: string;
  className?: string;
}>;

export default function Content({ heading, className, children }: Props) {
  return (
    <>
      <Header />
      {heading && (
        <section className="bg-orange-500 dark:bg-gray-700 w-full pt-20 px-4 sm:px-6 pb-4 max-h-32">
          <h1 className="text-2xl font-bold text-white">{heading}</h1>
        </section>
      )}
      <main
        className={classnames(
          'max-w-7xl mx-auto px-4 sm:px-6',
          {
            'pt-20': !heading,
            'py-6': heading,
          },
          className,
        )}
      >
        {children}
      </main>
      <Footer />
    </>
  );
}
