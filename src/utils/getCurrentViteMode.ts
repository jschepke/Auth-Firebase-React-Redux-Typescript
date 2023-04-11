type ViteMode = 'development' | 'production';

export function getCurrentViteMode(): ViteMode {
  switch (true) {
    case import.meta.env.DEV:
      return 'development';
    case import.meta.env.PROD:
      return 'production';
    default:
      throw new Error('No Vite mode found');
  }
}
