import { TranslationSchema } from './schema';

export const pl: TranslationSchema = {
  common: {
    navbar: {
      home: 'Home',
      dashboard: 'Kokpit',
      login: 'Logowanie',
      register: 'Rejestracja',
    },
    auth: {
      loginTitle: 'Zaloguj',
      or: 'lub',
      redirectToLogin: 'Masz już konto? Zaloguj się tutaj',
      redirectToRegister: 'Nie masz konta? Zarejestruj się tutaj',
      registerConsent: 'Rejestrując się, zgadzasz się na naszymi',
      registerConsent_and: 'i',
      registerConsent_privacyPolicy_link: 'Polityką Prywatności',
      registerConsent_termsOfService_link: 'Warunkami Użytkowania Serwisu',
      registerTitle: 'Zarejestruj',
      keepMeLoggedIn: 'Nie wylogowuj mnie',
      forgotPassword: 'Zapomniałeś hasła?',
      email_label: 'Email',
      password_label: 'Hasło',
      email_placeholder: 'Wprowadź adres email',
      password_placeholder: 'Wprowadź hasło',
    },
  },
  errors: {
    auth: {
      'auth/email-already-in-use':
        'Konto dla tego adresu juz istnieje. Zaloguj się',
      'auth/network-request-failed':
        'Jesteś offline lub występuje problem z twoim połączeniem internetowym',
      'auth/user-not-found':
        'Brak konta dla tego adresu mailowego. Zarejestruj się',
      'auth/weak-password': 'Hasło musi składać się z ...', //TODO
      'auth/wrong-password': 'Hasło nieprawidłowe',
    },
    fallbackMessage: 'Coś poszło nie tak..',
  },
  validation: {
    email_invalid: 'Email niepoprawny',
    password_tooLong: 'Hasło jest za długie',
    password_tooShort: 'Hasło musi zawierać co najmniej 8 znaków',
  },
};
