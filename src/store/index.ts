import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { reducers } from '../slices';
import { persistReducer, PERSIST } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const production = process.env.NODE_ENV === 'production';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [],
  timeout: 1,
};

const persistedReducer = persistReducer(persistConfig, combineReducers(reducers));

const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: {
        ignoredActions: [PERSIST],
      },
    }),

  devTools: !production
    ? {
        trace: true,
        traceLimit: 25,
      }
    : false,
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export default store;
