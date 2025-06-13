import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/authSlice";
import api from "./api/api";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer, 
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
