import { useErrorHandler } from 'react-error-boundary';
import { useGetTeamUsersQuery } from '../store/api/appApi/endpoints/leaderboard';

import Content from '../components/Content';
import LeaderboardTable from '../components/LeaderboardTable';
import Preloader from '../components/Preloader/index';

export default function LeaderboardPage() {
  const handleError = useErrorHandler();

  const teamName = 'babylon';
  const Urls = {
    AVATAR: {
      DEFAULT: 'https://robohash.org/corporissitanimi.png?size=50x50&set=set1',
      CUSTOM: 'https://ya-praktikum.tech/api/v2/resources/',
    },
  };

  const body = { ratingFieldName: 'score', cursor: 0, limit: 50 };
  const { data = [], error, isLoading } = useGetTeamUsersQuery({ body, teamName });

  const tableData = data.map((item: { data: (User & { score: number }) }) => ({
    login: item.data.login,
    email: item.data.email,
    avatar: item.data.avatar ? `${Urls.AVATAR.CUSTOM}${item.data?.avatar}` : Urls.AVATAR.DEFAULT,
    score: item.data.score || 0,
    display_name: item.data.display_name || 'default',
    first_name: item.data.first_name || 'default',
    second_name: item.data.second_name || 'default',
  }));

  if (error) {
    handleError(error);
  }

  return (
    <Content className="bg-gray-100" heading="Leaderboard">
      {isLoading ? (<Preloader />) : (<LeaderboardTable users={tableData} />) }
    </Content>
  );
}
