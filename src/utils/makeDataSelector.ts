import { createSelector } from 'reselect';

import { RootState } from '../store';

type EntityTypes = Pick<RootState, 'user'>;

export default function makeDataSelector<T extends keyof EntityTypes>(entityType: T) {
  return createSelector(
    (state: RootState) => state[entityType],
    (entity) => entity.data,
  );
}
