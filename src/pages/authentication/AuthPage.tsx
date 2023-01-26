import { Box, Grid } from '@mui/material';

import { AuthCard } from './AuthCard';
import { AuthForm } from './AuthForm';

export type AuthPageVariant = 'login' | 'register';

export interface AuthPageProps {
  variant: 'login' | 'register';
}

const AuthPage = ({ variant }: AuthPageProps) => {
  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        sx={{
          minHeight: '100vh',
        }}
      >
        <Grid item xs={12}>
          <Box sx={{ height: '50px' }}>Top bar</Box>
        </Grid>
        <Grid
          item
          container
          xs={12}
          justifyContent="center"
          alignItems="center"
        >
          <AuthCard>
            <AuthForm variant={variant} />
          </AuthCard>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ height: '50px' }}>footer</Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AuthPage;
