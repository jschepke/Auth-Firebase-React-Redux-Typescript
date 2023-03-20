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
  AuthErrorCodes,
  isHandledAuthErrorCode,
} from '../../features/auth/authErrorCodes';
import {
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
} from '../../features/auth/authSlice';
import { ValidationErrorCodes } from '../../features/i18n/translations/schema';
import { useAppDispatch } from '../../hooks/redux-hooks';
import useAuth from '../../hooks/useAuth';
import { useI18n } from '../../hooks/useI18n';
import { authPersistence } from '../../utils/authPersistence';
import { consoleLogger } from '../../utils/consoleLogger';
import { viteMode } from '../../utils/viteMode';
import type { AuthPageProps } from './AuthPage';

export const AuthForm = ({ variant }: AuthPageProps) => {
  const { loadingStatus } = useAuth();
  const { translation } = useI18n();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const mediaQueryMatches = useMediaQuery(theme.breakpoints.up('md'));

  const log = consoleLogger(viteMode, 'AuthForm.tsx');

  const [keepSignedIn, setKeepSignedIn] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorCodes, setErrorCodes] = useState<{
    auth: AuthErrorCodes | string | null;
    emailValidation: ValidationErrorCodes | string | null;
    passwordValidation: ValidationErrorCodes | string | null;
  }>({ auth: null, emailValidation: null, passwordValidation: null });

  useEffect(() => {
    if (!keepSignedIn) {
      authPersistence.set();
    } else authPersistence.remove();
  }, [keepSignedIn]);

  const variantSpecs = {
    login: {
      title: translation.common.auth.loginTitle,
      redirection: {
        text: translation.common.auth.redirectToRegister,
        path: '/register',
      },
    },
    register: {
      title: translation.common.auth.registerTitle,
      redirection: {
        text: translation.common.auth.redirectToLogin,
        path: '/login',
      },
    },
  };

  const validateEmail = (value: string) => {
    const code: ValidationErrorCodes = 'email_invalid';
    const validationEmail = z.string().email({
      message: code,
    });
    try {
      validationEmail.parse(value);
      setErrorCodes((prevState) => ({
        emailValidation: null,
        passwordValidation: prevState.passwordValidation,
        auth: prevState.auth,
      }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        const issue = error.issues[0];

        setErrorCodes((prevState) => ({
          emailValidation: issue.message,
          passwordValidation: prevState.passwordValidation,
          auth: prevState.auth,
        }));
      }
    }
  };

  const validatePassword = (value: string) => {
    const tooShort: ValidationErrorCodes = 'password_tooShort';
    const tooLong: ValidationErrorCodes = 'password_tooLong';
    const validationPassword = z
      .string()
      .min(8, {
        message: tooShort,
      })
      .max(255, {
        message: tooLong,
      });
    try {
      validationPassword.parse(value);
      setErrorCodes((prevState) => ({
        emailValidation: prevState.emailValidation,
        passwordValidation: null,
        auth: prevState.auth,
      }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        const issue = error.issues[0];

        setErrorCodes((prevState) => ({
          emailValidation: prevState.emailValidation,
          passwordValidation: issue.message,
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
      Boolean(errorCodes.emailValidation) ||
      Boolean(errorCodes.passwordValidation)
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

    log.log('handleAuthError', error);
    if (
      error !== null &&
      typeof error === 'object' &&
      'code' in error &&
      typeof error.code === 'string'
    ) {
      log.log('handleAuthError, error code:', error.code);
      code = error.code;
    }

    if (isHandledAuthErrorCode(code)) {
      setErrorCodes({
        ...errorCodes,
        auth: code,
      });
      return;
    }

    setErrorCodes({
      ...errorCodes,
      auth: 'Unknown Error',
    });
  };

  const handleFormReset = () => {
    setEmail('');
    setPassword('');
    setErrorCodes({
      auth: null,
      emailValidation: null,
      passwordValidation: null,
    });
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
            <Typography variant="caption">
              {translation.common.auth.or}
            </Typography>
          </Divider>
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label={translation.common.auth.email_label}
            type="email"
            placeholder={translation.common.auth.email_placeholder}
            margin="normal"
            error={Boolean(errorCodes.emailValidation)}
            helperText={
              errorCodes.emailValidation
                ? translation.validation[
                    errorCodes.emailValidation as ValidationErrorCodes
                  ]
                : false
            }
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
            label={translation.common.auth.password_label}
            type={showPassword ? 'text' : 'password'}
            placeholder={translation.common.auth.password_placeholder}
            margin="normal"
            name="password"
            value={password}
            error={Boolean(errorCodes.passwordValidation)}
            helperText={
              errorCodes.passwordValidation
                ? translation.validation[
                    errorCodes.passwordValidation as ValidationErrorCodes
                  ]
                : false
            }
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
                label={
                  <Typography variant="body2">
                    {translation.common.auth.keepMeLoggedIn}
                  </Typography>
                }
              />
              <Link
                variant="body2"
                underline="hover"
                component={RouterLink}
                to=""
                color="inherit"
              >
                {translation.common.auth.forgotPassword}
              </Link>
            </Stack>
          </Grid>
        )}

        {variant === 'register' && (
          <Grid item xs={12} mb={1}>
            <Stack>
              <Typography variant="caption" textAlign="center">
                {translation.common.auth.registerConsent} &nbsp;
                <Link variant="caption" component={RouterLink} to="#">
                  {translation.common.auth.registerConsent_termsOfService_link}
                </Link>
                &nbsp; {translation.common.auth.registerConsent_and} &nbsp;
                <Link variant="caption" component={RouterLink} to="#">
                  {translation.common.auth.registerConsent_privacyPolicy_link}.
                </Link>
              </Typography>
            </Stack>
          </Grid>
        )}

        {errorCodes.auth && (
          <Grid item xs={12} sx={{ textAlign: 'center' }}>
            <Typography variant="body1" sx={{ color: 'error.main' }}>
              {translation.errors.auth[errorCodes.auth as AuthErrorCodes] ??
                translation.errors.fallbackMessage}
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
              color="inherit"
              sx={{
                textDecoration: 'none',
                ':hover': { textDecorationLine: 'underline' },
              }}
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
