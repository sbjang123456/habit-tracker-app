import renderer from 'react-test-renderer';
import Navbar from '../Navbar';

describe('Navbar', () => {
  it('renders', () => {
    const component = renderer.create(<Navbar totalCount={4} />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});