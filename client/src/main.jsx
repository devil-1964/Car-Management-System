import { StrictMode, Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import './index.css';
import RootLayout from './layouts/RootLayout.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoadingSpinner from './components/LoadingSpinner.jsx';
import { Toaster } from 'react-hot-toast';
import PrivateRoute from './components/PrivateRoute.jsx';

// Lazy load pages
const LoginPage = lazy(() => import('./pages/LoginPage.jsx'));
const SignupPage = lazy(() => import('./pages/SignupPage.jsx'));
const Dashboard = lazy(() => import('./pages/Dashboard.jsx'));
const ProductPage = lazy(() => import('./pages/ProductPage.jsx'));
const NewCarPage = lazy(() => import('./pages/NewCarPage.jsx'));

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/login',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <LoginPage />
          </Suspense>
        ),
      },
      {
        path: '/register',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <SignupPage />
          </Suspense>
        ),
      },
      {
        element: <PrivateRoute />,
        children: [
          {
            path: '/dashboard',
            element: (
              <Suspense fallback={<LoadingSpinner />}>
                <Dashboard />
              </Suspense>
            ),
          },
          {
            path: '/dashboard/:id',
            element: (
              <Suspense fallback={<LoadingSpinner />}>
                <ProductPage />
              </Suspense>
            ),
          },
          {
            path: '/dashboard/new',
            element: (
              <Suspense fallback={<LoadingSpinner />}>
                <NewCarPage />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RecoilRoot>
      <Toaster reverseOrder={false} />
      <RouterProvider router={router} />
    </RecoilRoot>
  </StrictMode>
);
