import { Outlet } from 'react-router-dom';

import { Layout } from '../components/Layout';

/**
 * Root route component.
 * @returns `Layout` and react-router `Outlet`
 */
export const Root = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};
