import { createSelector } from 'reselect';

import { RootState } from '.';

type EntityTypes = Pick<RootState, 'user' | 'gameStats'>;

export default function makeDataSelector<T extends keyof EntityTypes>(entityType: T) {
  return createSelector(
    (state: RootState) => state[entityType],
    (entity) => entity,
  );
}
