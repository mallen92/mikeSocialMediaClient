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
    // updateUserPic: (state, action) => {
    //   state.user.picUrl = action.payload.newPic;
    //   state.user.picFilename = action.payload.newPicFilename;
    // },
  },
});

export const { setUser, unsetUser, updateUserPic } = userSlice.actions;

export default userSlice.reducer;

export const selectCurrentToken = (state) => state.user.accessToken;
