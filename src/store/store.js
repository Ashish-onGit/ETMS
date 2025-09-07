import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import busPassReducer from "./busPassSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    busPass: busPassReducer,
  },
});

export default store;
