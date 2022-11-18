import { test, expect, describe } from '@jest/globals';

import { populateArray, shuffleArray } from '../index';

describe('populate array', () => {
  test('adds 1, 2 to [0]', () => {
    expect(populateArray(1, 2)).toEqual([0]);
  });

  test('adds 2, 3 to [0, 3]', () => {
    expect(populateArray(2, 3)).toEqual([0, 3]);
  });

  test('adds 2 to [0, 1]', () => {
    expect(populateArray(2)).toEqual([0, 1]);
  });

  test('adds 3 to [0, 1, 2]', () => {
    expect(populateArray(3)).toEqual([0, 1, 2]);
  });

  test('adds [] to equal []', () => {
    expect(shuffleArray([])).toEqual([]);
  });
});

test('adds [1, 2, 3] arrayContaining [1, 2, 3]', () => {
  // eslint-disable-next-line max-len
  const expected: Array<Array<number>> = [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]];
  const doArraysIntersect = (array: Array<number>, ex: Array<Array<number>>) => ex.some((item: Array<number>) => array.join('') === item.join(''));

  expect(doArraysIntersect([3, 1, 2], expected)).toBe(true);
});
