/* eslint-disable max-len */
import { AuthErrorCodes } from 'firebase/auth';

/**
 * List of Firebase Auth error codes that may occur
 * @remarks
 * Based on Firebase AuthErrorCodes. Can be extended. {@link https://firebase.google.com/docs/reference/js/auth.md?hl=en#autherrorcodes | AuthErrorCodes }
 */
const firebaseAuthErrors = [
  AuthErrorCodes.EMAIL_EXISTS,
  AuthErrorCodes.USER_DELETED,
  AuthErrorCodes.NETWORK_REQUEST_FAILED,
  AuthErrorCodes.WEAK_PASSWORD,
  AuthErrorCodes.INVALID_PASSWORD,
] as const;

type FirebaseAuthErrorTuple = typeof firebaseAuthErrors;
/**
 * Firebase Auth error codes explicitly handled.
 */
type HandledAuthErrors = FirebaseAuthErrorTuple[number];

/**
 * Determines if the code is in one of the handled errors.
 *
 * @param code - Firebase AuthError code
 */
export const isHandledAuthErrorCode = (
  code: unknown
): code is HandledAuthErrors => {
  if (typeof code === 'string') {
    return firebaseAuthErrors.includes(code as HandledAuthErrors);
  }
  return false;
};

export const errorMessages: Record<
  HandledAuthErrors,
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
