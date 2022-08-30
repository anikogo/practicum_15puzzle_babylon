import Content from '../components/Content';
import LeaderboardTable from '../components/LeaderboardTable';
import useDataMock from '../_demodata/useDataMock';

export default function LeaderboardPage() {
  const { data = [], error } = useDataMock<(User & { score: number })[]>('users');
  if (error) {
    return <div>{error}</div>;
  }
  return (
    <Content className="bg-gray-100" heading="Leaderboard">
      <LeaderboardTable users={data} />
    </Content>
  );
}
