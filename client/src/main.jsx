import { StrictMode, Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import RootLayout from './layouts/RootLayout.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const LoginPage = lazy(() => import('./pages/LoginPage.jsx'));
const SignupPage = lazy(() => import('./pages/SignupPage.jsx'));
const Dashboard = lazy(() => import('./pages/Dashboard.jsx'));
const ProductPage = lazy(() => import('./pages/ProductPage.jsx'));
// const NotFound = lazy(() => import('./pages/NotFound.jsx'));
// const AboutMe = lazy(() => import('./pages/AboutMe.jsx'));

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/login',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <LoginPage />
          </Suspense>
        ),
      },
      {
        path: '/register',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <SignupPage />
          </Suspense>
        ),
      },
      {
        path: '/Dashboard',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: '/Dashboard/:id',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ProductPage />
          </Suspense>
        ),
      }
      // {
      //   path: '/aboutme',
      //   element: (
      //     <Suspense fallback={<div>Loading...</div>}>
      //       <AboutMe />
      //     </Suspense>
      //   ),
      // },
      // {
      //   path: '*',
      //   element: (
      //     <Suspense fallback={<div>Loading...</div>}>
      //       <NotFound />
      //     </Suspense>
      //   ),
      // },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
