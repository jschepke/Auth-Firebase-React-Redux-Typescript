import { z } from 'zod';

import { AuthErrorCodes } from '../../auth/authErrorCodes';

const common = z.object({
  navbar: z.object({
    home: z.string(),
    dashboard: z.string(),
    login: z.string(),
    register: z.string(),
  }),
  auth: z.object({
    loginTitle: z.string(),
    or: z.string(),
    redirectToLogin: z.string(),
    redirectToRegister: z.string(),
    registerConsent: z.string(),
    registerConsent_privacyPolicy_link: z.string(),
    registerConsent_termsOfService_link: z.string(),
    registerConsent_and: z.string(),
    registerTitle: z.string(),
    keepMeLoggedIn: z.string(),
    forgotPassword: z.string(),
    email_label: z.string(),
    email_placeholder: z.string(),
    password_label: z.string(),
    password_placeholder: z.string(),
  }),
});

interface Errors {
  auth: Record<AuthErrorCodes, string>;
  fallbackMessage: string;
}

const validation = z.object({
  email_invalid: z.string(),
  password_tooShort: z.string(),
  password_tooLong: z.string(),
});

export type ValidationErrorCodes = keyof Validation;

export type Common = z.infer<typeof common>;
type Validation = z.infer<typeof validation>;

export interface TranslationSchema {
  common: Common;
  errors: Errors;
  validation: Validation;
}
