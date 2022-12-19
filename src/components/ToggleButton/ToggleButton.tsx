export default function ToggleButton({ label, value, toggleAction }
:{ label: string, value: boolean, toggleAction: () => void }) {
  return (
    <label
      htmlFor={label.replace('', '-')}
      className="inline-flex relative items-center cursor-pointer"
    >
      <input
        type="checkbox"
        value=""
        id={label.replace('', '-')}
        className="sr-only peer"
        checked={value}
        onChange={toggleAction}
      />
      <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600" />
      <span className="ml-3 text-sm font-medium text-gray-400 dark:text-gray-500">
        {label}
      </span>
    </label>
  );
}
