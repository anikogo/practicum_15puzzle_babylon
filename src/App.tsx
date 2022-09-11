import { StrictMode } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import ErrorBoundaryWrapper from './components/ErrorBoundaryWrapper';
// import Preloader from './components/Preloader';

import IndexPage from './pages/index';
import Page404 from './pages/404';
import ForumPage from './pages/forum';
import LeaderboardPage from './pages/leaderboard';
import SignInPage from './pages/signin';
import SignUpPage from './pages/signup';
import ProfilePage from './pages/profile';

import store from './store';

import './App.css';

export default function App(): JSX.Element {
  return (
    <StrictMode>
      <Provider store={store}>
        <Router>
          <ErrorBoundaryWrapper>
            <Routes>
              <Route path="/" element={<IndexPage />} />
              <Route path="/forum" element={<ForumPage />} />
              <Route path="/leaderboard" element={<LeaderboardPage />} />
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="*" element={<Page404 />} />
            </Routes>
          </ErrorBoundaryWrapper>
        </Router>
      </Provider>
    </StrictMode>
  );
}
