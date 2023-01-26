import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../../store';

interface ThemeState {
  colorMode: 'dark' | 'light';
}

const themeSlice = createSlice({
  name: 'theme',
  initialState: { colorMode: 'dark' } as ThemeState,
  reducers: {
    toggleColorMode: (state) => {
      if (state.colorMode === 'light') {
        state.colorMode = 'dark';
      } else {
        state.colorMode = 'light';
      }
    },
  },
});

export default themeSlice.reducer;
export const themeReducerN = themeSlice.reducer;
export const { toggleColorMode } = themeSlice.actions;

export const selectColorMode = (state: RootState) => state.theme.colorMode;
