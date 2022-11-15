import { ReactNode } from 'react';
import classnames from 'classnames';

export type NotificationProps = {
  type: 'error' | 'success' | 'notification',
  children: ReactNode | string,
  className?: string,
};

export default function Notification({ type = 'notification', children, className = '' }: NotificationProps) {
  const classesOfType = {
    error: 'text-error bg-red-200',
    success: 'text-success bg-green-200',
    notification: 'text-notification bg-orange-200',
  };

  return (
    <div className={classnames(
      classesOfType[type],
      className,
      'p-4 pl-16 bg-no-repeat bg-[left_1rem_center] rounded',
    )}
    >
      { children }
    </div>
  );
}
