import { z } from 'zod';

const common = z.object({
  navbar: z.object({
    home: z.string(),
    dashboard: z.string(),
    login: z.string(),
    register: z.string(),
  }),
});

export type Common = z.infer<typeof common>;
const en: Common = {
  navbar: {
    home: 'Home',
    dashboard: 'Dashboard',
    login: 'Login',
    register: 'Register',
  },
};

const pl: Common = {
  navbar: {
    home: 'Home',
    dashboard: 'Kokpit',
    login: 'Zaloguj',
    register: 'Zarejestruj',
  },
};

export { en, pl };
