import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../store';
import { LanguageCodes } from './i18nConfig';
import {
  Common,
  en as common_en,
  pl as common_pl,
} from './translations/common';

interface I18nState {
  lang: LanguageCodes;
  translations: {
    common: Common;
  };
}
const initialState: I18nState = {
  // Default language
  lang: 'en',
  translations: {
    common: common_en,
  },
};

const i18nSlice = createSlice({
  name: 'i18n',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<LanguageCodes>) => {
      if (state.lang === action.payload) return;
      state.lang = action.payload;
      state.translations.common =
        action.payload === 'en' ? common_en : common_pl;
    },
  },
});

export const selectLanguage = (state: RootState) => state.i18n.lang;

export const i18nReducer = i18nSlice.reducer;
export const { setLanguage } = i18nSlice.actions;
