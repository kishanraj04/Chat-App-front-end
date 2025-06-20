import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  searchusername:"",
  clickedelement:"",
  chatId:"",
  members:[]
};

const tmpvar = createSlice({
  name: "tmp",
  initialState,
  reducers: {
    setSearchUserName:(state,action)=>{
        state.searchusername = action.payload
    },
    setClickedElement:(state,action)=>{
        
        state.clickedelement = action.payload
    },
    setChatId:(state,action)=>{
      state.chatId = action.payload
    },
    setMembers:(state,action)=>{
      state.members = [...action.payload]
    }
  }
});

export default tmpvar;
export const { setSearchUserName,setClickedElement,setChatId,setMembers} = tmpvar.actions;
