import Content from '../components/Content';
import withUser from '../hoc/withUser';

function ProfilePage() {
  return (
    <Content heading="Profile" />
  );
}

export default withUser(ProfilePage);
