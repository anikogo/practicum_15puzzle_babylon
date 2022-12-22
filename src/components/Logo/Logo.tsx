import classnames from 'classnames';

export default function Logo() {
  return (
    <span
      className="inline-flex justify-start items-center gap-2 text-orange-500 dark:text-green-500 group-hover:text-green-300"
    >
      <span className="rounded overflow-hidden">
        <span
          className={classnames(
            'border-2 border-gradient-br-indigo',
            'bg-orange-500 dark:bg-green-500 group-hover:bg-green-300',
            'grid aspect-square w-12 rounded place-items-center',
            'text-white text-3xl font-bold',
          )}
        >
          15
        </span>
      </span>
      <span className="uppercase font-bold text-xl">Puzzle</span>
    </span>
  );
}
