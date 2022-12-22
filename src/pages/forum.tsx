import { useErrorHandler } from 'react-error-boundary';
import { useGetTopicsQuery } from '../store';

import Content from '../components/Content';
import withUser from '../hoc/withUser';

import Forum from '../components/Forum';
import Preloader from '../components/Preloader';
import PageMeta from '../components/PageMeta';

function ForumPage() {
  const handleError = useErrorHandler();
  const { data = [], error, isLoading } = useGetTopicsQuery({});

  if (error) {
    handleError(error);
  }

  return (
    <>
      <PageMeta
        title="Forum"
        description="Forum page"
      />
      <Content className="bg-gray-100 min-h-[calc(100vh_-_184px)]" heading="Forum">
        { isLoading ? (<Preloader />) : (<Forum users={data ?? []} />) }
      </Content>
    </>
  );
}

export default withUser(ForumPage);
