import renderer from 'react-test-renderer';
import { it, expect } from '@jest/globals';

import Logo from '../Logo';

it('logo', () => {
  const component = renderer.create(
    <Logo />,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
