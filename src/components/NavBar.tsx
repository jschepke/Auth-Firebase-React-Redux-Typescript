import LanguageIcon from '@mui/icons-material/Language';
import { Button, Link, Menu, MenuItem, Stack } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { useState } from 'react';
import { Link as RouterLink, useMatch } from 'react-router-dom';

import { logOut } from '../features/auth/authSlice';
import { LanguageCodes, languages } from '../features/i18n/i18nConfig';
import { setLanguage } from '../features/i18n/i18nSlice';
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

const SelectLang = () => {
  const i18nLang = useAppSelector((state) => state.i18n.lang);
  const dispatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="change-language-button"
        aria-controls={open ? 'language-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        startIcon={<LanguageIcon />}
        onClick={handleClick}
      >
        {i18nLang}
      </Button>
      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        open={open}
        MenuListProps={{
          'aria-labelledby': 'change-language-button',
        }}
        onClose={handleClose}
      >
        {Object.entries(languages).map(([code, name]) => (
          <MenuItem
            key={code}
            onClick={() => {
              dispatch(setLanguage(code as LanguageCodes));
              handleClose();
            }}
          >
            {name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default function Navbar() {
  const dispatch = useAppDispatch();
  const { user } = useAuth();

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
          <SelectLang />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
