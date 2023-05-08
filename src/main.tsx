import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import store from './store';
import dayjs from 'dayjs';
import dayjsLocal from 'dayjs/locale/zh-cn';
import zhCN from 'antd/locale/zh_CN';
import App from './app';

import 'antd/lib/style';

ConfigProvider.config({
  theme: {
    primaryColor: '#ff7626',
  },
});

dayjs.locale(dayjsLocal);

const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </ConfigProvider>
  </React.StrictMode>
);
