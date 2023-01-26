import { createSlice } from '@reduxjs/toolkit';

type Lang = 'en' | 'pl';

const langSlice = createSlice({
  name: 'lang',
  initialState: 'pl' as Lang,
  reducers: {
    toggleLanguage: (state) =>
      state === 'pl' ? (state = 'en') : (state = 'pl'),
    //? selectLanguage will be useful with more then two languages
    /* selectLanguage: (state, action: PayloadAction<Lang>) => {
      if (action.payload === "pl") {
        state = "en";
      } else {
        state = "pl";
      }
    }, */
  },
});

export const langReducer = langSlice.reducer;
export const { toggleLanguage } = langSlice.actions;
