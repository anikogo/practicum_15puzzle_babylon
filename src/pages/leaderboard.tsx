import { useEffect, useState } from 'react';
import { useErrorHandler } from 'react-error-boundary';

import Content from '../components/Content';
import LeaderboardTable from '../components/LeaderboardTable';
import Preloader from '../components/Preloader';
import PageMeta from '../components/PageMeta';

import withUser from '../hoc/withUser';

import { useGetTeamUsersMutation } from '../store/api';

function LeaderboardPage() {
  const handleError = useErrorHandler();
  const [getUsers, { data, error, isLoading }] = useGetTeamUsersMutation();
  const [tableData, setTableData] = useState(data);

  const Urls = {
    AVATAR: {
      DEFAULT: 'https://robohash.org/corporissitanimi.png?size=50x50&set=set1',
      CUSTOM: 'https://ya-praktikum.tech/api/v2/resources/',
    },
  };

  useEffect(() => {
    if (!tableData) {
      getUsers({
        ratingFieldName: 'score',
        cursor: 0,
        limit: 20,
      }).then((scores: any) => {
        setTableData(scores.data
          ?.map((item: { data: User & { score: number } }) => ({
            ...item?.data,
            avatar: (item?.data.avatar && item?.data.avatar !== 'null')
              ? `${Urls.AVATAR.CUSTOM}${item.data?.avatar}`
              : Urls.AVATAR.DEFAULT,
          })));
      });
    }
  }, []);

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
