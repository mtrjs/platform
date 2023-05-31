import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApplicationInfo, getApplicationList } from '@api/user';

const initialState: ApplicationState = {
  app_id: '',
  name: '',
  list: [],
};

const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    setApplication(state, action: PayloadAction<Pick<ApplicationInfo, 'app_id'>>) {
      const { app_id } = action.payload;
      Object.assign(state, { app_id });
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
        const { app_id } = list[0];
        Object.assign(state, { app_id });
      }
    });
  },
});

export const fetchApplicationList = createAsyncThunk('application/list', async () => {
  const { data } = await getApplicationList();
  return data;
});

export default applicationSlice;
