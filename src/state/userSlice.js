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
    updateProfilePic: (state, action) => {
      state.user.profile_pic_url = action.payload.newPic;
      state.user.user_profile_pic = action.payload.newPicFilename;
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
    addFriend: (state, action) => {
      const id = state.user.friend_requests_in.splice(action.payload, 1);
      state.user.user_friends.push(id[0]);
    },
    removeFriend: (state, action) => {
      state.user.user_friends.splice(action.payload, 1);
    },
  },
});

export const {
  setUser,
  unsetUser,
  updateProfilePic,
  addFriendRequestOut,
  deleteFriendRequestOut,
  deleteFriendRequestIn,
  addFriend,
  removeFriend,
} = userSlice.actions;

export default userSlice.reducer;
