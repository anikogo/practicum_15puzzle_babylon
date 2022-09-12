import Content from '../components/Content';
import withUser from '../hoc/withUser';

function ForumPage() {
  return (
    <Content heading="Forum" />
  );
}

export default withUser(ForumPage);
