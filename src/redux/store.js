import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./API/apiSlice";
import authReducer from "./authSlice";
import orderRedicer from "./orderSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    orders: orderRedicer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
