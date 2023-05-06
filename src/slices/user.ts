import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: UserState = {
  id: '',
  name: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    /** set user info */
    setUserInfo: (state, action: PayloadAction<UserModel>) => {
      const userInfo = action.payload;
      Object.assign(state, userInfo);
    },
  },
});

export default userSlice;
