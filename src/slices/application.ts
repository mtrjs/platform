import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApplicationInfo, getApplicationList } from '@api/user';

const initialState: ApplicationState = {
  appId: '',
  name: '',
  list: [],
};

const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    setApplication(state, action: PayloadAction<Pick<ApplicationInfo, 'appId'>>) {
      const { appId } = action.payload;
      Object.assign(state, { appId });
      setTimeout(() => {
        location.replace('/');
      }, 100);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchApplicationList.fulfilled, (state, action) => {
      const list = action.payload;
      state.list = list;
      if (!state.appId) {
        const { appId } = list[0];
        Object.assign(state, { appId });
      }
    });
  },
});

export const fetchApplicationList = createAsyncThunk('application/list', async () => {
  const { data } = await getApplicationList();
  return data;
});

export default applicationSlice;
