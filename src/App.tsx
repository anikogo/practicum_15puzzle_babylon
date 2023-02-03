import { useEffect, useMemo, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import ErrorBoundaryWrapper from './components/ErrorBoundaryWrapper';

import routes from './routes';
import ThemeContext from './context/ThemeContext';

export default function App(): JSX.Element {
  const [style, setStyle] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);
  const providerValue = useMemo(() => ({ style, setStyle }), [style, setStyle]);
  const fullScreenAction = (event: KeyboardEvent) => {
    if (event.code === 'KeyF' && event.shiftKey) {
      setFullScreen(!fullScreen);
    }
  };
  const makeFullScreen = (el: HTMLElement | null) => {
    if (!document.fullscreenElement) {
      el?.requestFullscreen();
      return;
    }
    document.exitFullscreen();
  };

  useEffect(() => {
    const userTheme = localStorage.getItem('theme');

    if (userTheme === 'true') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    makeFullScreen(document.querySelector('.app'));
    setStyle(userTheme === 'true');
    document.addEventListener('keydown', fullScreenAction);

    return () => {
      document.removeEventListener('keydown', fullScreenAction);
    };
  }, [style, fullScreen]);

  return (
    <ThemeContext.Provider value={providerValue}>
      <ErrorBoundaryWrapper>
        <div className="bg-gradient-to-b from-orange-100 to-orange-50 dark:from-gray-100 dark:to-gray-50">
          <Routes>
            {routes.map(({ fetchData, ...routeProps }) => (
              <Route key={routeProps.path} {...routeProps} />
            ))}
          </Routes>
        </div>
      </ErrorBoundaryWrapper>
    </ThemeContext.Provider>
  );
}
