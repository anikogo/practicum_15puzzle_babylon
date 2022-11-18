export default function About() {
  return (
    <div className="flex flex-col w-full">
      <div className="w-full mx-auto px-4 sm:px-6 py-6 bg-gray-100 sm:rounded-lg">
        <h2 className="relative z-0 inline-flex min-w-full border-b pt-6 pb-4">
          Game
          <span className="relative z-0 inline-flex text-gray-500" />
        </h2>
        <p className="mt-4 font-light text-gray-500 dark:text-gray-400">
          The 15 puzzle is a sliding puzzle having 15 square tiles numbered
          1–15 in a frame that is 4 tiles high and 4 tiles wide, leaving
          one unoccupied tile position. Tiles in the same row or column
          of the open position can be moved by sliding them horizontally or
          vertically, respectively. The goal of the puzzle is to place the
          tiles in numerical order.
        </p>
        <h2 className="relative z-0 inline-flex min-w-full border-b pt-6 pb-4">
          Developer
          <span className="relative z-0 inline-flex text-gray-500" />
        </h2>
        <p className="mt-4 font-light text-gray-500 dark:text-gray-400">
          The development of the project and its ecosystem is guided by Babylon team.
        </p>
        <ul className="mt-4 space-y-1 max-w-md list-disc list-inside text-gray-500 dark:text-gray-400">
          <li>
            Kventi111
          </li>
          <li>
            rkkmkkfx
          </li>
          <li>
            bmazurm
          </li>
        </ul>
        <h2 className="relative z-0 inline-flex min-w-full border-b pt-6 pb-4">
          Our goal
          <span className="relative z-0 inline-flex text-gray-500" />
        </h2>
        <p className="mt-4 font-light text-gray-500 dark:text-gray-400">
          We aim high trying to design the most effective and efficient game.
        </p>
      </div>
    </div>
  );
}
