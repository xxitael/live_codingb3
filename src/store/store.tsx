import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../api/authApi";
import { profileApi } from "../api/profileApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
  },
  middleware: (getDefault) =>
    getDefault().concat(authApi.middleware, profileApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
