import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { Navigate } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';
import { paths } from '../../routes/paths';

interface AuthObserverProps {
  children: React.ReactNode;
}

/**
 * This component checks the state of the authentication and its loading status.
 *
 * @remarks
 * Checks if the user is logged in and gets him to a dashboard or login form.
 *
 * @returns Progress bar when auth is unset and navigates to a dashboard if logged in.
 * Otherwise returns children eg. login/register form.
 */
export const AuthObserver = ({ children }: AuthObserverProps) => {
  const { user, loadingStatus } = useAuth();

  if (loadingStatus === 'unset') {
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>
    );
  }

  if (user && loadingStatus === 'idle') {
    return <Navigate to={'/' + paths.dashboard} />;
  }

  return <>{children}</>;
};
