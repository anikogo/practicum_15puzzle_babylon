import { Routes, Route } from 'react-router-dom';
import ErrorBoundaryWrapper from './components/ErrorBoundaryWrapper';

import routes from './routes';

export default function App(): JSX.Element {
  return (
    <ErrorBoundaryWrapper>
      <div className="bg-gradient-to-b from-orange-100 to-orange-50 dark:from-gray-100 dark:to-gray-50">
        <Routes>
          {routes.map(({ fetchData, ...routeProps }) => (
            <Route key={routeProps.path} {...routeProps} />
          ))}
        </Routes>
      </div>
    </ErrorBoundaryWrapper>
  );
}
