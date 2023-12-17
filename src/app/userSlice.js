import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    unsetUser: (state) => {
      state.user = {};
    },
    updateAccessToken: (state, action) => {
      state.user.accessToken = action.payload;
    },
    updateUserPic: (state, action) => {
      state.user.picUrl = action.payload.newPic;
      state.user.picFilename = action.payload.newPicFilename;
    },
  },
});

export const { setUser, unsetUser, updateAccessToken, updateUserPic } =
  userSlice.actions;

export default userSlice.reducer;
