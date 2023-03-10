import { Visibility, VisibilityOff } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { type FormEvent, type MouseEvent, useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { z } from 'zod';

import {
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
} from '../../features/auth/authSlice';
import {
  errorMessages as errorMessagesPredefined,
  fallbackErrorMessage,
  isHandledAuthErrorCode,
} from '../../features/auth/errorCodes';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import useAuth from '../../hooks/useAuth';
import { authPersistence } from '../../utils/authPersistence';
import type { AuthPageProps } from './AuthPage';

export const AuthForm = ({ variant }: AuthPageProps) => {
  const loadingStatus = useAuth().loadingStatus;
  const lang = useAppSelector((state) => state.lang);
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const mediaQueryMatches = useMediaQuery(theme.breakpoints.up('md'));

  const [keepSignedIn, setKeepSignedIn] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessages, setErrorMessages] = useState<{
    email: null | string;
    password: null | string;
    auth: null | string;
  }>({ email: null, password: null, auth: null });

  useEffect(() => {
    if (!keepSignedIn) {
      authPersistence.set();
    } else authPersistence.remove();
  }, [keepSignedIn]);

  const variantSpecs = {
    login: {
      title: 'Login',
      redirection: {
        text: "Don't have an account? Sign up here",
        path: '/register',
      },
    },
    register: {
      title: 'Sign up',
      redirection: {
        text: 'Already have an account? Login here',
        path: '/login',
      },
    },
  };

  const validateEmail = (value: string) => {
    const validationEmail = z.string().email();
    try {
      validationEmail.parse(value);
      setErrorMessages((prevState) => ({
        email: '',
        password: prevState.password,
        auth: prevState.auth,
      }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        const issue = error.issues[0];

        setErrorMessages((prevState) => ({
          email: issue.message,
          password: prevState.password,
          auth: prevState.auth,
        }));
      }
    }
  };

  const validatePassword = (value: string) => {
    const validationPassword = z.string().min(8).max(255);
    try {
      validationPassword.parse(value);
      setErrorMessages((prevState) => ({
        email: prevState.email,
        password: '',
        auth: prevState.auth,
      }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        const issue = error.issues[0];

        setErrorMessages((prevState) => ({
          email: prevState.email,
          password: issue.message,
          auth: prevState.auth,
        }));
      }
    }
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const authHandler = async () => {
      // Navigation after successful login/register handle by the AuthObserver component
      try {
        if (variant === 'login') {
          await dispatch(
            logInWithEmailAndPassword({ email, password })
          ).unwrap();
          handleFormReset();
        }
        if (variant === 'register') {
          await dispatch(
            registerWithEmailAndPassword({ email, password })
          ).unwrap();
          handleFormReset();
        }
      } catch (error) {
        handleAuthError(error);
      }
    };

    if (
      !email ||
      !password ||
      Boolean(errorMessages.email) ||
      Boolean(errorMessages.password)
    ) {
      validateEmail(email);
      validatePassword(password);
      return;
    }
    void authHandler();
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  /**
   * @remarks
   * In order to optimize user experience, media queries are utilized to
   * tailor the sign-in process according to the device screen size.
   * For mobile devices, signing in with redirection is the preferred method.
   * This ensures seamless navigation and convenience for users on smaller screens.
   *
   * Production might need adjustments with redirect sign-ins on
   * browsers that block third-party cookies:
   * {@link https://firebase.google.com/docs/auth/web/redirect-best-practices}
   */
  const handleGoogleSignIn = async () => {
    if (!mediaQueryMatches) {
      try {
        await dispatch(signInWithGoogleRedirect()).unwrap();
      } catch (error) {
        handleAuthError(error);
      }
    }
    try {
      await dispatch(signInWithGooglePopup()).unwrap();
    } catch (error) {
      handleAuthError(error);
    }
  };

  /**
   * @remarks
   * To prevent code duplication in form submission and third-party provider sign-in,
   * the auth error handler has been extracted into a separate function.
   */
  const handleAuthError = (error: unknown) => {
    let code = null;

    console.log(error);
    if (
      error !== null &&
      typeof error === 'object' &&
      'code' in error &&
      typeof error.code === 'string'
    ) {
      console.log('error code:', error.code);
      code = error.code;
    }

    if (isHandledAuthErrorCode(code)) {
      setErrorMessages({
        ...errorMessages,
        auth: errorMessagesPredefined[code][lang],
      });
      return;
    }

    setErrorMessages({
      ...errorMessages,
      auth: fallbackErrorMessage[lang],
    });
  };

  const handleFormReset = () => {
    setEmail('');
    setPassword('');
    setErrorMessages({ email: null, password: null, auth: null });
    setShowPassword(false);
  };

  return (
    <Box noValidate component="form" onSubmit={handleFormSubmit}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Box sx={{ pt: 1, pb: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              {variantSpecs[variant].title}
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={handleGoogleSignIn}
          >
            Google
          </Button>
          {/* <FirebaseSocial /> */}
        </Grid>

        <Grid item xs={12} sx={{ mt: 2 }}>
          <Divider textAlign="center">
            <Typography variant="caption">or</Typography>
          </Divider>
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            placeholder="Enter email address"
            margin="normal"
            error={Boolean(errorMessages.email)}
            helperText={errorMessages.email || false}
            name="email"
            value={email}
            onChange={(event) => {
              const value = event.target.value;
              setEmail(value);
              validateEmail(value);
            }}
          />

          <TextField
            fullWidth
            label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter password"
            margin="normal"
            name="password"
            value={password}
            error={Boolean(errorMessages.password)}
            helperText={errorMessages.password || false}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                    onClick={handleShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            onChange={(event) => {
              const value = event.target.value;
              setPassword(value);
              validatePassword(value);
            }}
          />
        </Grid>
        {variant === 'login' && (
          <Grid item xs={12} sx={{ mt: 0 }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={2}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={keepSignedIn}
                    name="checked"
                    color="primary"
                    size="small"
                    onChange={(event) => {
                      setKeepSignedIn(event.target.checked);
                    }}
                  />
                }
                label={<Typography variant="body2">Keep me sign in</Typography>}
              />
              <Link
                variant="body2"
                underline="none"
                component={RouterLink}
                to=""
                color="inherit"
              >
                Forgot Password?
              </Link>
            </Stack>
          </Grid>
        )}

        {variant === 'register' && (
          <Grid item xs={12} mb={1}>
            <Stack>
              <Typography variant="caption" textAlign="center">
                By Signing up, you agree to our &nbsp;
                <Link variant="caption" component={RouterLink} to="#">
                  Terms of Service
                </Link>
                &nbsp; and &nbsp;
                <Link variant="caption" component={RouterLink} to="#">
                  Privacy Policy
                </Link>
              </Typography>
            </Stack>
          </Grid>
        )}

        {errorMessages.auth && (
          <Grid item xs={12} sx={{ textAlign: 'center' }}>
            <Typography variant="body1" sx={{ color: 'error.main' }}>
              {errorMessages.auth}
            </Typography>
          </Grid>
        )}

        <Grid item xs={12}>
          <LoadingButton
            disableElevation
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            color="primary"
            loading={loadingStatus === 'pending'}
          >
            {variantSpecs[variant].title}
          </LoadingButton>
        </Grid>

        <Grid item xs={12}>
          <Stack mt={2}>
            <Typography
              component={RouterLink}
              to={variantSpecs[variant].redirection.path}
              variant="body2"
              color="primary"
              sx={{ textDecoration: 'none' }}
              textAlign="center"
            >
              {variantSpecs[variant].redirection.text}
            </Typography>
          </Stack>
        </Grid>
      </Grid>
      <Button onClick={handleFormReset}>RESET</Button>
    </Box>
  );
};
