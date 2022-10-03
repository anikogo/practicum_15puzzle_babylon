import { useEffect, useState } from 'react';
import { useErrorHandler } from 'react-error-boundary';
import { useGetTeamUsersMutation } from '../store/api';

import Content from '../components/Content';
import LeaderboardTable from '../components/LeaderboardTable';
import Preloader from '../components/Preloader/index';
import withUser from '../hoc/withUser';
import PageMeta from '../components/PageMeta';

function LeaderboardPage() {
  const handleError = useErrorHandler();
  const [tableData, setTableData] = useState<(User & { score: number; })[]>();

  const Urls = {
    AVATAR: {
      DEFAULT: 'https://robohash.org/corporissitanimi.png?size=50x50&set=set1',
      CUSTOM: 'https://ya-praktikum.tech/api/v2/resources/',
    },
  };

  const [getUsers, { data, error, isLoading }] = useGetTeamUsersMutation();
  useEffect(() => {
    if (!tableData) {
      getUsers({
        ratingFieldName: 'score',
        cursor: 0,
        limit: 0,
      }).then(() => {
        setTableData(data
          ?.map((item) => ({
            ...item.data,
            avatar: item.data.avatar
              ? `${Urls.AVATAR.CUSTOM}${item.data?.avatar}`
              : Urls.AVATAR.DEFAULT,
          })));
      });
    }
  }, [data]);

  if (error) {
    handleError(error);
  }

  return (
    <>
      <PageMeta
        title="Leaderboard"
        description="Game leaderboard with user stats"
      />
      <Content className="bg-gray-100" heading="Leaderboard">
        { isLoading ? (<Preloader />) : (<LeaderboardTable users={tableData ?? []} />) }
      </Content>
    </>
  );
}

export default withUser(LeaderboardPage);
