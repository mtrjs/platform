import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApplicationInfo, getApplicationList } from '@api/user';

const initialState: ApplicationState = {
  env: '',
  app_id: '',
  name: '',
  list: [],
};

const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    setApplication(state, action: PayloadAction<Pick<ApplicationInfo, 'app_id' | 'env'>>) {
      const { app_id, env = '' } = action.payload;
      const envs = env.split(',');
      const defaultEnv = envs[0] || '';
      Object.assign(state, { app_id, env: defaultEnv });
      setTimeout(() => {
        location.replace('/');
      }, 100);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchApplicationList.fulfilled, (state, action) => {
      const list = action.payload;
      state.list = list;
      if (!state.app_id) {
        const { app_id, env = '' } = list[0];
        const envs = env.split(',');
        const defaultEnv = envs[0] || '';
        Object.assign(state, { app_id, env: defaultEnv });
      }
    });
  },
});

export const fetchApplicationList = createAsyncThunk('application/list', async () => {
  const { data } = await getApplicationList();
  return data;
});

export default applicationSlice;
