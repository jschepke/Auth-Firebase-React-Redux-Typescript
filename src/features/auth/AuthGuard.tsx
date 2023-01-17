import { Box, LinearProgress } from "@mui/material";
import { Link } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

export const AuthGuard = ({ children }: { children: JSX.Element }) => {
  const { user, loadingStatus } = useAuth();

  if (loadingStatus === "unset") {
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    );
  }

  if (!user && loadingStatus === "idle") {
    return (
      <div>
        {" "}
        <p>Authentication required ❌</p> <Link to="/login">Login</Link>
      </div>
    );
  }

  return children;
};
