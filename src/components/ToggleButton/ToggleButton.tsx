import { ChangeEvent } from 'react';
import classnames from 'classnames';

type ToggleButtonProps = {
  id: string;
  labelLeft?: string;
  labelRight?: string;
  className?: string;
  checked: boolean;
  onToggle: (checked: boolean) => void | React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ToggleButton({
  id,
  labelLeft,
  labelRight,
  className,
  checked,
  onToggle,
}: ToggleButtonProps) {
  const onChange = (event: ChangeEvent<HTMLInputElement>) => onToggle(event.target.checked);

  return (
    <label
      htmlFor={id}
      className={classnames(
        'flex relative items-center cursor-pointer',
        className,
      )}
    >
      {labelLeft && (
        <span className="mr-3 font-medium">
          {labelLeft}
        </span>
      )}
      <input
        type="checkbox"
        value=""
        id={id}
        className="sr-only peer"
        checked={checked}
        onChange={onChange}
      />
      <div
        className={classnames(
          'relative w-11 h-6 bg-gray-700 rounded-full peer dark:bg-gray-500',
          'peer-checked:after:translate-x-full peer-checked:after:border-white',
          'after:content-[""] after:absolute after:top-0.5 after:left-[2px]',
          'after:bg-white after:border-gray-300 after:border after:rounded-full',
          'after:h-5 after:w-5 after:transition-all dark:border-gray-600',
          'peer-checked:bg-orange-600 dark:peer-checked:bg-green-600',
        )}
      />
      {labelRight && (
        <span className="ml-3 font-medium">
          {labelRight}
        </span>
      )}
    </label>
  );
}
