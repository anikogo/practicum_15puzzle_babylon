import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';

import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store, history } from './store';
import ThemeContext from './context/ThemeContext';

import App from './App';

import './styles.css';

ReactDOM.hydrate(
  <ThemeContext.Provider value="light">
    <StrictMode>
      <Provider store={store}>
        <HistoryRouter history={history}>
          <App />
        </HistoryRouter>
      </Provider>
    </StrictMode>
  </ThemeContext.Provider>,
  document.getElementById('app'),
);
