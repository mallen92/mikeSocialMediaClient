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
    addFriendRequestOut: (state, action) => {
      state.user.friend_requests_out.push(action.payload);
    },
    deleteFriendRequestOut: (state, action) => {
      state.user.friend_requests_out.splice(action.payload, 1);
    },
    deleteFriendRequestIn: (state, action) => {
      state.user.friend_requests_in.splice(action.payload, 1);
    },
    unsetUser: (state) => {
      state.user = {};
    },
  },
});

export const {
  setUser,
  updateProfilePic,
  addFriendRequestOut,
  deleteFriendRequestOut,
  deleteFriendRequestIn,
  unsetUser,
} = userSlice.actions;

export default userSlice.reducer;
