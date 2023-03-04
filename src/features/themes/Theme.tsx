import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSelector } from 'react-redux';

import { selectColorMode } from './themeSlice';

interface ThemeProps {
  children: React.ReactNode;
}

function Theme({ children }: ThemeProps) {
  const colorMode = useSelector(selectColorMode);

  const theme = createTheme({
    palette: {
      mode: colorMode,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export default Theme;
