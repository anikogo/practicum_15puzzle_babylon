import type { ComponentPropsWithoutRef, ElementType, PropsWithChildren } from 'react';
import classnames from 'classnames';

type ButtonProps<T extends ElementType> = PropsWithChildren<{
  as?: T;
  className?: string;
}> & Omit<ComponentPropsWithoutRef<T>, 'as' | 'className' | 'variant' | 'children'>;

export default function Button<T extends ElementType = 'button'>({
  as,
  color,
  className = '',
  ...props
}: ButtonProps<T>) {
  const Component = as ?? 'button';
  return (
    <Component
      className={classnames(
        'btn',
        className,
      )}
      {...props}
    />
  );
}
