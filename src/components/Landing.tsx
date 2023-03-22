import {
  Box,
  Button,
  Container,
  Link,
  List,
  ListItem,
  Paper,
  Tooltip,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import useCopyToClipboard from '../hooks/useCopyToClipboard';
import { paths } from '../routes/paths';

export const Landing = () => {
  const [title, setTitle] = useState<
    | 'Click to copy'
    | '✅ Copied!'
    | '⚠️ Something went wrong. Try to copy manually.'
  >('Click to copy');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_value, copy] = useCopyToClipboard();

  const handleCopyToClipboard = async (text: string) => {
    const result = await copy(text);
    result
      ? setTitle('✅ Copied!')
      : setTitle('⚠️ Something went wrong. Try to copy manually.');
  };

  const handleTooltipOnOpen = () => {
    if (title !== 'Click to copy') setTitle('Click to copy');
  };
  return (
    <Container>
      <Box m={2}>
        <Paper>
          <Box p={2}>
            <Typography gutterBottom variant="h5">
              Welcome!
            </Typography>
            <Typography gutterBottom variant="body1">
              The{' '}
              <Link component={RouterLink} to={paths.root}>
                base route
              </Link>{' '}
              is public. Anyone can see it regardless of authentication state.
            </Typography>
            <Typography gutterBottom variant="body1">
              The{' '}
              <Link component={RouterLink} to={paths.dashboard}>
                dashboard
              </Link>{' '}
              is a protected route. You need to{' '}
              <Link component={RouterLink} to={paths.login}>
                log in
              </Link>{' '}
              to see its content.
            </Typography>
            <Typography gutterBottom variant="body1">
              Once you have logged in, try to go to{' '}
              <Link component={RouterLink} to={paths.login}>
                login
              </Link>{' '}
              or{' '}
              <Link component={RouterLink} to={paths.register}>
                register
              </Link>{' '}
              again. The auth state is observed on these routes and if you are
              logged in, you will be redirected to the dashboard.
            </Typography>
            <Typography variant="body1">
              You can also try to copy entire urls and paste them into new
              browser tab. You may have noticed a progress bar as a result of
              the auth state being checked.
            </Typography>
            <List>
              <ListItem>
                <Tooltip title={title} onOpen={handleTooltipOnOpen}>
                  <Button
                    centerRipple
                    variant="text"
                    sx={{ textTransform: 'inherit' }}
                    onClick={() =>
                      handleCopyToClipboard(window.location.href + paths.login)
                    }
                  >
                    {window.location.href + paths.login}
                  </Button>
                </Tooltip>
              </ListItem>
              <ListItem>
                <Tooltip
                  title={title}
                  placement="right-end"
                  onOpen={handleTooltipOnOpen}
                >
                  <Button
                    centerRipple
                    variant="text"
                    sx={{ textTransform: 'inherit' }}
                    onClick={() =>
                      handleCopyToClipboard(
                        window.location.href + paths.register
                      )
                    }
                  >
                    {window.location.href + paths.register}
                  </Button>
                </Tooltip>
              </ListItem>
              <ListItem>
                <Tooltip title={title} onOpen={handleTooltipOnOpen}>
                  <Button
                    centerRipple
                    variant="text"
                    sx={{ textTransform: 'inherit' }}
                    onClick={() =>
                      handleCopyToClipboard(
                        window.location.href + paths.dashboard
                      )
                    }
                  >
                    {window.location.href + paths.dashboard}
                  </Button>
                </Tooltip>
              </ListItem>
            </List>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};
