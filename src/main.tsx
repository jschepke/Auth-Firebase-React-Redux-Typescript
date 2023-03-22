import '@fontsource/roboto';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Landing } from './components/Landing';
import Dashboard from './Dashboard';
import { AuthGuard } from './features/auth/AuthGuard';
import { AuthObserver } from './features/auth/AuthObserver';
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
        path: paths.root,
        element: <Landing />,
      },
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
          <AuthObserver>
            <LoginPage variant="login" />
          </AuthObserver>
        ),
      },
      {
        path: paths.register,
        element: (
          <AuthObserver>
            <LoginPage variant="register" />
          </AuthObserver>
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
