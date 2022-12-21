import { useErrorHandler } from 'react-error-boundary';
import { useLocation } from 'react-router-dom';

import Content from '../components/Content';
import withUser from '../hoc/withUser';

import Topic from '../components/Topic';
import Preloader from '../components/Preloader/index';
import PageMeta from '../components/PageMeta';

import { useGetTopicQuery } from '../store';

function TopicPage() {
  const location = useLocation();
  const topic = location.pathname.replace('/forum', '/topics');
  const handleError = useErrorHandler();
  const { data = [], error, isLoading } = useGetTopicQuery(topic);

  if (error) {
    handleError(error);
  }

  return (
    <>
      <PageMeta
        title={data?.title ?? 'Topic'}
        description="Forum topic page"
      />
      <Content className="bg-white w-full h-[100vh] flex" heading="Forum">
        { isLoading ? (<Preloader />) : (<Topic data={data} />) }
      </Content>
    </>
  );
}

export default withUser(TopicPage, false);
