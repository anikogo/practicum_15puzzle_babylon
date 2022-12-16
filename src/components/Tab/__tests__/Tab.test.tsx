import renderer from 'react-test-renderer';
import { it, expect } from '@jest/globals';

import Tab from '../Tab';

it('tab', () => {
  const component = renderer.create(
    <Tab />,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
