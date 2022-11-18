import { useErrorHandler } from 'react-error-boundary';
import { useGetTopicsQuery } from '../store';

import Content from '../components/Content';
import withUser from '../hoc/withUser';

import Forum from '../components/Forum';
import Preloader from '../components/Preloader/index';

function ForumPage() {
  const handleError = useErrorHandler();
  const { data = [], error, isLoading } = useGetTopicsQuery({});

  if (error) {
    handleError(error);
  }

  return (
    <Content className="bg-gray-100" heading="Forum">
      { isLoading ? (<Preloader />) : (<Forum users={data ?? []} />) }
    </Content>
  );
}

export default withUser(ForumPage);
