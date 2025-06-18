import { createSlice } from "@reduxjs/toolkit";

const options = {
  day: "numeric",
  month: "long",
  year: "numeric",
};

const initialState = {
  user: null,
  _id:null,
  avatar: null,
  bio: null,
  isAdmin: false,
  isloading: true,
  joindate: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    isUserExist: (state, action) => {
      const user = action?.payload?.user;
      const createdAt = user?.createdAt;

      // Format date (e.g., "8 Jun 2025")
      const formattedDate = createdAt
        ? new Date(createdAt).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })
        : null;

      state.user = user?.name;
      state.avatar = user?.avatar?.url;
      state.bio = user?.bio;
      state.joindate = formattedDate;
      state.isloading = false;
      state._id=user?._id
    },
    resetUser: (state, action) => {
      state.user= null,
   state.avatar= null,
   state.bio=null,
   state.isAdmin= false,
   state.isloading= true,
   state.joindate= ""
    },
  },
});

export default authSlice;
export const { isUserExist,resetUser } = authSlice.actions;
