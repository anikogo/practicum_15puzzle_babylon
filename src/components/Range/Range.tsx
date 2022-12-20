export default function Range({ label, value, rangeSlide }
: { label: string, value: string, rangeSlide: (value: string) => void }) {
  return (
    <div className="relative inline-flex relative items-center gap-2">
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor={label} className="ml-3 text-sm font-medium text-gray-400 dark:text-gray-500">
        {label}
      </label>
      <input
        value={value}
        min="0"
        max="1"
        step="0.05"
        type="range"
        onChange={(e) => rangeSlide(e.target.value)}
        className="
          form-range
          appearance-none
          w-full
          h-4
          p-0
          bg-transparent
          bg-gray-200
          rounded-full
          focus:outline-none focus:ring-1 focus:shadow-none
          accent-green-600 focus:accent-green-600
        "
        id={label}
      />
    </div>
  );
}
