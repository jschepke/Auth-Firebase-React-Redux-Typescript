import '@fontsource/roboto';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Dashboard from './Dashboard';
import { AuthCheck } from './features/auth/AuthCheck';
import { AuthGuard } from './features/auth/AuthGuard';
import LoginPage from './pages/authentication/AuthPage';
import ErrorPage from './pages/error-page';
import { paths } from './routes/paths';
import { Root } from './routes/Root';
import { store } from './store';

const router = createBrowserRouter([
  {
    path: paths.root,
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: paths.dashboard,
        element: (
          <AuthGuard>
            <Dashboard />
          </AuthGuard>
        ),
      },
      {
        path: paths.login,
        element: (
          <AuthCheck>
            <LoginPage variant="login" />
          </AuthCheck>
        ),
      },
      {
        path: paths.register,
        element: (
          <AuthCheck>
            <LoginPage variant="register" />
          </AuthCheck>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
