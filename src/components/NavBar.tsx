import { Button, Link, Stack } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Link as RouterLink, useMatch } from 'react-router-dom';

import { logOut } from '../features/auth/authSlice';
import { setLanguage } from '../features/i18n/i18nSlice';
import { toggleLanguage } from '../features/lang/langSlice';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import useAuth from '../hooks/useAuth';
import { type Paths, paths } from '../routes/paths';
import { consoleLogger } from '../utils/consoleLogger';
import { viteMode } from '../utils/viteMode';

interface NavLinkProps {
  path: Paths;
}

const NavLink = ({ path }: NavLinkProps) => {
  const translations = useAppSelector((state) => state.i18n.translations);

  const match = useMatch(path);
  return (
    <Link
      variant="button"
      underline="hover"
      component={RouterLink}
      to={path}
      color={match ? 'primary' : 'inherit'}
    >
      {path === '/'
        ? translations.common.navbar.home
        : translations.common.navbar[path]}
    </Link>
  );
};

export default function Navbar() {
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const lang = useAppSelector((state) => state.lang);
  const i18nLang = useAppSelector((state) => state.i18n.lang);

  const cl = consoleLogger(viteMode, 'NavBar.tsx');

  const renderNavLinks = Object.values(paths).map((path) => (
    <NavLink key={path} path={path} />
  ));

  const handleLogout = async () => {
    try {
      await dispatch(logOut()).unwrap();
    } catch (error) {
      cl.error(error);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Stack spacing={1} direction="row" flexGrow={1}>
            {renderNavLinks}
          </Stack>
          {user && <Button onClick={handleLogout}>Logout</Button>}
          <Button onClick={() => dispatch(toggleLanguage())}>
            {lang === 'en' ? lang : lang}
          </Button>
          <Button
            onClick={() =>
              dispatch(setLanguage(i18nLang === 'en' ? 'pl' : 'en'))
            }
          >
            {i18nLang === 'en' ? i18nLang + ' i18n' : i18nLang + ' i18n'}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
