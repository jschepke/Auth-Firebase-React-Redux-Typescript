export const paths = {
  root: '/',
  dashboard: 'dashboard',
  login: 'login',
  register: 'register',
} as const;

type PathNames = keyof typeof paths;
export type Paths = (typeof paths)[PathNames];
