import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

const initialState: SettingState = {
  dateRange: [
    dayjs().subtract(7, 'd').startOf('d').toISOString(),
    dayjs().endOf('d').toISOString(),
  ],
};

const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    setDateRange: (
      state: SettingState,
      action: PayloadAction<[dayjs.Dayjs, dayjs.Dayjs]>
    ) => {
      state.dateRange = action.payload.map(v => v.toISOString()) as [
        string,
        string
      ];
    },
  },
});

export default settingSlice;
