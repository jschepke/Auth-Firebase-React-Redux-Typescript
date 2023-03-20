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

type FirebaseAuthErrorCodesTuple = typeof firebaseAuthErrors;
/**
 * Firebase Auth error codes explicitly handled.
 */
type HandledFirebaseAuthErrorCodes = FirebaseAuthErrorCodesTuple[number];

/**
 * All known auth error codes within the app.
 * @remarks This should be merged with any other error codes used in the app, eg. from other auth providers or custom ones.
 */
export type AuthErrorCodes = HandledFirebaseAuthErrorCodes;

/**
 * Determines if a code is in one of the handled ones.
 *
 * @param code - Firebase AuthError code
 */
export const isHandledAuthErrorCode = (
  code: unknown
): code is HandledFirebaseAuthErrorCodes => {
  if (typeof code === 'string') {
    return firebaseAuthErrors.includes(code as HandledFirebaseAuthErrorCodes);
  }
  return false;
};
