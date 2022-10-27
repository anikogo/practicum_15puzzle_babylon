/* eslint-disable jsx-a11y/anchor-is-valid */
import renderer from 'react-test-renderer';
import Logo from '../Logo';

it('logo', () => {
  const component = renderer.create(
    <Logo />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
