import classnames from 'classnames';

type RangeProps = {
  label?: string;
  value: string;
  rangeSlide: (value: string) => void;
  className?: string;
};

export default function Range({
  label,
  value,
  rangeSlide,
  className,
}: RangeProps) {
  return (
    <div
      className={classnames(
        'relative flex relative items-center gap-2',
        className,
      )}
    >
      {label && (
        <label htmlFor={label} className="mr-3 font-medium">
          {label}
        </label>
      )}
      <input
        value={value}
        min="0"
        max="1"
        step="0.05"
        type="range"
        onChange={(e) => rangeSlide(e.target.value)}
        className={classnames(
          'form-range appearance-none w-full h-4 p-0 bg-transparent bg-gray-200 rounded-full',
          'focus:outline-none focus:ring-1 focus:shadow-none accent-orange-600 dark:accent-green-600',
          'focus:accent-orange-600 dark:focus:accent-green-600',
        )}
        id={label}
      />
    </div>
  );
}
