import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import Header from './components/Header';

import IndexPage from './pages/index';
import Page404 from './pages/404';
import ForumPage from './pages/forum';
import LeaderboardPage from './pages/leaderboard';
import SignInPage from './pages/signin';
import SignUpPage from './pages/signup';
import ProfilePage from './pages/profile';
import GamePage from './pages/game';

export default function App(): JSX.Element {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/forum" element={<ForumPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Router>
  );
}
