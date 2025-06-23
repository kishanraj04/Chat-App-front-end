import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchusername: "",
  clickedelement: "",
  chatId: "",
  members: [],
  fileUploading: false,
  fileSendByMe: [],
  tmp: true,
  totalNotification:0
};

const tmpvar = createSlice({
  name: "tmp",
  initialState,
  reducers: {
    setSearchUserName: (state, action) => {
      state.searchusername = action.payload;
    },
    setClickedElement: (state, action) => {
      state.clickedelement = action.payload;
    },
    setChatId: (state, action) => {
      state.chatId = action.payload;
    },
    setMembers: (state, action) => {
      state.members = [...action.payload];
    },
    setFileUploading: (state, action) => {
      state.fileUploading = action.payload;
    },
    setSendFileByMe: (state, action) => {
      // console.log(action.payload);
      state.fileSendByMe = action.payload;
    },
    setTotalNotification: (state, action) => {
      console.log(action.payload);
      // state.searchusername = action.payload;
    },
  },
});

export default tmpvar;
export const {
  setSearchUserName,
  setClickedElement,
  setChatId,
  setMembers,
  setFileUploading,
  setSendFileByMe,
  setTotalNotification
} = tmpvar.actions;
