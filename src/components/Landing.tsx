import {
  Box,
  Container,
  Grid,
  IconButton,
  SvgIconProps,
  Tooltip,
  Typography,
} from '@mui/material';

import {
  FirebaseIcon,
  MuiIcon,
  ReactIcon,
  ReduxIcon,
  TypescriptIcon,
} from './customIcons';

interface Icon {
  name: string;
  href: string;
  icon: (props: SvgIconProps) => JSX.Element;
}

const IconData: Icon[] = [
  { name: 'React', href: 'https://react.dev/', icon: ReactIcon },
  {
    name: 'Redux',
    href: 'https://redux.js.org/',
    icon: ReduxIcon,
  },
  {
    name: 'Material UI',
    href: 'https://mui.com/',
    icon: MuiIcon,
  },
  {
    name: 'Firebase',
    href: 'https://firebase.google.com/',
    icon: FirebaseIcon,
  },
  {
    name: 'Typescript',
    href: 'https://www.typescriptlang.org/',
    icon: TypescriptIcon,
  },
];

const Icons = () => {
  return (
    <Grid item xs={12}>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
        }}
      >
        {IconData.map((icon) => {
          const { name, href, icon: Icon } = icon;
          return (
            <Tooltip key={name} title={name}>
              <IconButton href={href}>
                <Icon sx={{ fontSize: { xs: 60, sm: 80 } }} />
              </IconButton>
            </Tooltip>
          );
        })}
      </Box>
    </Grid>
  );
};

export const Landing = () => {
  return (
    <Container maxWidth="md">
      <Box>
        <Grid container mt={{ xs: 5, sm: 7, md: 10 }} spacing={5}>
          <Grid item xs={12}>
            <Typography variant="h6" align="center">
              Welcome to the demo app for
            </Typography>
          </Grid>
          <Grid item xs={12} mb={3}>
            <Typography
              color="primary"
              align="center"
              sx={{
                fontWeight: 'bold',
                wordBreak: 'break-all',
                typography: { xs: 'h4', sm: 'h2', md: 'h1' },
              }}
            >
              AUTHENTICATION
            </Typography>
          </Grid>

          <Icons />

          <Grid item xs={12} mt={5} mb={5}>
            <Typography variant="h6" align="center">
              Checkout the repo and docs
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
