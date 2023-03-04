import { Box, LinearProgress } from '@mui/material';
import { Link } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const { user, loadingStatus } = useAuth();

  if (loadingStatus === 'unset') {
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>
    );
  }

  if (!user && loadingStatus === 'idle') {
    return (
      <div>
        {' '}
        <p>Authentication required ❌</p> <Link to="/login">Login</Link>
      </div>
    );
  }

  return <>{children}</>;
};
