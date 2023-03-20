import { TranslationSchema } from './schema';

export const en: TranslationSchema = {
  common: {
    navbar: {
      home: 'Home',
      dashboard: 'Dashboard',
      login: 'Login',
      register: 'Register',
    },
    auth: {
      loginTitle: 'Login',
      or: 'or',
      redirectToLogin: 'Already have an account? Login here',
      redirectToRegister: "Don't have an account? Sign up here",
      registerConsent: 'By Signing up, you agree to our',
      registerConsent_and: 'and',
      registerConsent_privacyPolicy_link: 'Privacy Policy',
      registerConsent_termsOfService_link: 'Terms of Service',
      registerTitle: 'Register',
      keepMeLoggedIn: 'Keep me logged in',
      forgotPassword: 'Forgot password?',
      email_label: 'Email',
      password_label: 'Password',
      email_placeholder: 'Enter email address',
      password_placeholder: 'Enter password',
    },
  },
  errors: {
    auth: {
      'auth/email-already-in-use':
        'An account for this email address already exists. Login.',
      'auth/network-request-failed': `You are offline or there is some problem with your internet connection`,
      'auth/user-not-found':
        'There is no account for this email address. Register',
      'auth/weak-password': 'Password needs to contain ...', //TODO
      'auth/wrong-password': 'Wrong password',
    },
    fallbackMessage: 'Something went wrong...',
  },
  validation: {
    email_invalid: 'Email invalid',
    password_tooShort: 'Must be at least 8 or more characters',
    password_tooLong: 'Password is too long',
  },
};
