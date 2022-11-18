import { test, expect } from '@jest/globals';

import dateTimeFormat from '../dateTimeFormat';

test('December 17, 1995 03:24:00 to equal 12/17/1995, 03:24:00 AM', () => {
  expect(dateTimeFormat(new Date('December 17, 1995 03:24:00'))).toBe('12/17/1995, 03:24:00 AM');
});
