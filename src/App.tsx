import { Routes, Route } from 'react-router-dom';
import ErrorBoundaryWrapper from './components/ErrorBoundaryWrapper';

import routes from './routes';

export default function App(): JSX.Element {
  return (
    <ErrorBoundaryWrapper>
      <Routes>
        {routes.map(({ fetchData, ...routeProps }) => (
          <Route key={routeProps.path} {...routeProps} />
        ))}
      </Routes>
    </ErrorBoundaryWrapper>
  );
}
