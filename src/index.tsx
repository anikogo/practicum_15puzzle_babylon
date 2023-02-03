import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';

import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store, history } from './store';

import App from './App';

import './styles.css';

// let fullScreen = false;

hydrateRoot(
  document.getElementById('app') as HTMLElement,
  <StrictMode>
    <Provider store={store}>
      <HistoryRouter history={history}>
        <App />
      </HistoryRouter>
    </Provider>
  </StrictMode>,
);

// function startServiceWorker() {
//   if ('serviceWorker' in navigator) {
//     window.addEventListener('load', () => {
//       navigator.serviceWorker.register('/service-worker.js').then((registration) => {
//         console.log('ServiceWorker registration successful with scope: ', registration.scope);
//       }).catch((error: string) => {
//         console.log('ServiceWorker registration failed: ', error);
//       });
//     });
//   }
// }

// startServiceWorker();
