import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../store';
import { LanguageCodes } from './i18nConfig';
import { en } from './translations/en';
import { pl } from './translations/pl';
import { TranslationSchema } from './translations/schema';

interface I18nState {
  lang: LanguageCodes;
  translation: TranslationSchema;
}

const initialState: I18nState = {
  // Default language
  lang: 'en',
  translation: en,
};

const i18nSlice = createSlice({
  name: 'i18n',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<LanguageCodes>) => {
      if (state.lang === action.payload) return;
      state.lang = action.payload;
      state.translation = action.payload === 'en' ? en : pl;
    },
  },
});

export const selectLanguage = (state: RootState) => state.i18n.lang;
export const selectTranslation = (state: RootState) => state.i18n.translation;

export const i18nReducer = i18nSlice.reducer;
export const { setLanguage } = i18nSlice.actions;
