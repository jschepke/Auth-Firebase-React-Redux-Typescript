import { Box, Card } from '@mui/material';

export const AuthCard = ({ children }: { children: JSX.Element }) => {
  return (
    <Card
      elevation={2}
      sx={{
        maxWidth: { xs: 400, sm: 500 },
        margin: { xs: 2.5, md: 3 },
      }}
    >
      <Box
        sx={{
          p: { xs: 2, sm: 3, md: 4, xl: 5 },
        }}
      >
        {children}
      </Box>
    </Card>
  );
};
