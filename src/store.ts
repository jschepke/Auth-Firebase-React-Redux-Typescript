import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from './features/auth/authSlice';
import { i18nReducer } from './features/i18n/i18nSlice';
import { langReducer } from './features/lang/langSlice';
import themeReducer from './features/themes/themeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    lang: langReducer,
    theme: themeReducer,
    i18n: i18nReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
