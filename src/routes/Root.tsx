import { Outlet } from 'react-router-dom';

import { Layout } from '../components/Layout';
// import { SymbolButtons } from '../utils/keybordSymb/KeyboardSymbolsComponent';

/**
 * Root route component.
 * @returns `Layout` and react-router `Outlet`
 */
export const Root = () => {
  return (
    <Layout>
      {/* <SymbolButtons /> */}
      <Outlet />
    </Layout>
  );
};
