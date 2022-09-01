import { useErrorHandler } from 'react-error-boundary';
import Content from '../components/Content';
import LeaderboardTable from '../components/LeaderboardTable';
import useDataMock from '../_demodata/useDataMock';

export default function LeaderboardPage() {
  const handleError = useErrorHandler();
  const { data = [], error } = useDataMock<(User & { score: number })[]>('users');
  if (error) {
    handleError(error);
  }
  return (
    <Content className="bg-gray-100" heading="Leaderboard">
      <LeaderboardTable users={data.slice(0, 100)} />
    </Content>
  );
}
