import { ReactNode } from "react";
import useAuth from "../../hooks/useAuth";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { Navigate } from "react-router-dom";

export const AuthLoadingCheck = ({ children }: { children: ReactNode }) => {
  const { user, loadingStatus } = useAuth();

  if (loadingStatus === "unset") {
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    );
  }

  if (user && loadingStatus === "idle") {
    return <Navigate to="/app" />;
  }

  return <>{children}</>;
};
