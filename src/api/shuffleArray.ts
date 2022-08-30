export default function shuffle(array: number[]): number[] {
  let currentIndex: number = array.length;
  let randomIndex: number;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    // eslint-disable-next-line no-plusplus
    currentIndex--;

    // eslint-disable-next-line no-param-reassign
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}
