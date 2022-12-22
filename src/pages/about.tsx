import Content from '../components/Content';
import About from '../components/About';
import PageMeta from '../components/PageMeta';

function AboutPage() {
  return (
    <>
      <PageMeta
        title="About"
        description="Information about the project"
      />
      <Content heading="About" className="min-h-[calc(100vh_-_184px)]">
        <About />
      </Content>
    </>
  );
}

export default AboutPage;
