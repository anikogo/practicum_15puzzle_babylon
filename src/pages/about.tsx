import Content from '../components/Content';
import withUser from '../hoc/withUser';
import About from '../components/About';

function AboutPage() {
  return (
    <Content heading="About">
      <About />
    </Content>
  );
}

export default withUser(AboutPage);
