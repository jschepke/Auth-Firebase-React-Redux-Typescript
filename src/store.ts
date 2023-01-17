import { configureStore } from "@reduxjs/toolkit";

import { authReducer } from "./features/auth/authSlice";
import { langReducer } from "./features/lang/langSlice";
import themeReducer from "./features/themes/themeSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    lang: langReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
