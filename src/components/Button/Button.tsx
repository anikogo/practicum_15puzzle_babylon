import { ComponentPropsWithoutRef, ElementType, PropsWithChildren } from 'react';
import classnames from 'classnames';

type ButtonProps<T extends ElementType> = PropsWithChildren<{
  as?: T;
  className?: string;
  color?: string;
  variant: 'filled' | 'outline' | 'link' | 'icon';
}> & Omit<ComponentPropsWithoutRef<T>, 'as' | 'className' | 'variant' | 'children'>;

export default function Button<T extends ElementType = 'button'>({
  as,
  variant,
  color,
  className = '',
  ...props
}: ButtonProps<T>) {
  const Component = as ?? 'button';
  return (
    <Component
      className={classnames(
        'btn',
        {
          [`bg-${color}-500 border-2 border-transparent hover:bg-${color}-300 text-white`]: variant === 'filled',
          [`text-${color}-500 border-2 border-${color}-500 hover:text-${color}-300 hover:border-${color}-300 bg-transparent`]: variant === 'outline',
          'hover:text-gray-500 hover:bg-gray-100': variant === 'icon',
          'focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500': variant === 'icon',
        },
        className,
      )}
      {...props}
    />
  );
}
