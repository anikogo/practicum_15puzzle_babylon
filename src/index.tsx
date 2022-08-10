import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App';

const root = ReactDOM.createRoot(document.getElementById('root')!);
const element = <App title="15 puzzle" />;
root.render(element);
