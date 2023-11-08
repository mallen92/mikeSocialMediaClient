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
    updateProfilePic: (state, action) => {
      state.user.user_profile_pic = action.payload;
    },
    unsetUser: (state) => {
      state.user = {};
    },
  },
});

export const { setUser, updateProfilePic, unsetUser } = userSlice.actions;

export default userSlice.reducer;
