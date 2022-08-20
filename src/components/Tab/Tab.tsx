import type { ComponentPropsWithoutRef, ElementType, PropsWithChildren } from 'react';

import classnames from 'classnames';

type TabProps<T extends ElementType> = PropsWithChildren<{
  as?: T;
  active?: boolean;
  className?: string;
}> & Omit<ComponentPropsWithoutRef<T>, 'as' | 'className' | 'variant' | 'children'>;

export default function Tab<T extends ElementType = 'button'>({
  as,
  active,
  className = '',
  ...props
}: TabProps<T>): JSX.Element {
  const Component = as ?? 'button';
  return (
    <Component
      role="tab"
      className={classnames(
        'text-base font-medium border-b-2 py-2',
        'hover:border-indigo-500 hover:text-gray-900', // hover state
        className, // additional classnames
        {
          'text-gray-900 border-indigo-500': active,
          'text-gray-500 border-transparent': !active,
        },
      )}
      {...props}
    />
  );
}
