import '@fontsource/roboto';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import { AuthLoadingCheck } from './features/auth/AuthLoadingCheck';
import LoginPage from './pages/authentication/AuthPage';
import ErrorPage from './pages/error-page';
import { paths } from './routes/paths';
import Root from './routes/Root';
import { store } from './store';

const router = createBrowserRouter([
  {
    path: paths.home,
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: paths.app,
        element: <App />,
      },
      {
        path: 'login',
        element: (
          <AuthLoadingCheck>
            <LoginPage variant="login" />
          </AuthLoadingCheck>
        ),
      },
      {
        path: 'register',
        element: (
          <AuthLoadingCheck>
            <LoginPage variant="register" />
          </AuthLoadingCheck>
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
