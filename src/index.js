import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import '@fortawesome/fontawesome-free/js/all.js';
import SimpleHabit from './components/SimpleHabit';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SimpleHabit />
  </React.StrictMode>
);

