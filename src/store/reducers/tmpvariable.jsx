import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  searchusername:"",
  clickedelement:""
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
    }
  }
});

export default tmpvar;
export const { setSearchUserName,setClickedElement} = tmpvar.actions;
