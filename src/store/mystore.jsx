import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/authSlice";
import api from "./api/api";
import tmpvar from "./reducers/tmpvariable";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer, 
    [api.reducerPath]: api.reducer,
    [tmpvar.name] :tmpvar.reducer 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
