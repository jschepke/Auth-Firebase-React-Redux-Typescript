import { Link, Stack } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Link as RouterLink, useMatch } from "react-router-dom";

import { paths } from "../routes/paths";

const NavLink = ({ path }: { path: string }) => {
  const match = useMatch(path);
  return (
    <Link
      variant="button"
      underline="hover"
      component={RouterLink}
      to={path}
      color={match ? "primary" : "inherit"}
    >
      {path === "/" ? "home" : path}
    </Link>
  );
};

export default function Navbar() {
  const renderNavLinks = Object.values(paths).map((path) => (
    <NavLink key={path} path={path} />
  ));
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Stack spacing={1} direction="row">
            {renderNavLinks}
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
