/* eslint-disable jsx-a11y/anchor-is-valid */
import renderer from 'react-test-renderer';
import Tab from '../Tab';

it('tab', () => {
  const component = renderer.create(
    <Tab />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
