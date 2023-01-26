import { AuthErrorCodes } from 'firebase/auth';

const selectedAuthErrorCodes = [
  AuthErrorCodes.EMAIL_EXISTS,
  AuthErrorCodes.USER_DELETED,
  AuthErrorCodes.NETWORK_REQUEST_FAILED,
  AuthErrorCodes.WEAK_PASSWORD,
  AuthErrorCodes.INVALID_PASSWORD,
] as const;

type SelectedAuthErrorCodesTuple = typeof selectedAuthErrorCodes;
type SelectedAuthErrorCodes = SelectedAuthErrorCodesTuple[number];

export const isSelectedAuthErrorCode = (
  code: string
): code is SelectedAuthErrorCodes => {
  return selectedAuthErrorCodes.includes(code as SelectedAuthErrorCodes);
};

export const errorMessages: Record<
  SelectedAuthErrorCodes,
  { en: string; pl: string }
> = {
  'auth/wrong-password': {
    en: 'Wrong password',
    pl: 'Hasło nieprawidłowe',
  },
  'auth/user-not-found': {
    en: 'There is no account for this email address. Register',
    pl: 'Brak konta dla tego adresu mailowego. Zarejestruj się',
  },
  'auth/network-request-failed': {
    pl: `Jesteś offline lub występuje problem z twoim
        połączeniem internetowym`,
    en: `You are offline or there is some problem
        with your internet connection`,
  },
  'auth/email-already-in-use': {
    en: `An account for this email address already exists. Login.`,
    pl: 'Konto dla tego adresu juz istnieje. Zaloguj się',
  },
  'auth/weak-password': {
    en: 'Password needs to contain ...',
    pl: 'Hasło musi składać się z ...',
  },
};

export const fallbackErrorMessage = {
  en: 'Something went wrong',
  pl: 'Coś poszło nie tak',
};
