import React from 'react';
import ReactDOM from 'react-dom/client';
import Layout from './layout';
import './index.css';
import Reporter, { Browser } from '@tubefast/core';

const reporter = new Reporter();
reporter.init({
  appId: 'test',
  dsn: 'http://172.16.10.88:3001',
  plugins: [new Browser()],
  maxPool: 5,
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Layout />
  </React.StrictMode>
);
