import { StrictMode, Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import RootLayout from './layouts/RootLayout.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoadingSpinner from './components/LoadingSpinner.jsx';

// Lazy load pages
const LoginPage = lazy(() => import('./pages/LoginPage.jsx'));
const SignupPage = lazy(() => import('./pages/SignupPage.jsx'));
const Dashboard = lazy(() => import('./pages/Dashboard.jsx'));
const ProductPage = lazy(() => import('./pages/ProductPage.jsx'));
const NewCarPage = lazy(() => import('./pages/NewCarPage.jsx'));
// const NotFound = lazy(() => import('./pages/NotFound.jsx'));
// const AboutMe = lazy(() => import('./pages/AboutMe.jsx'));

// Define routes in an array for easier management
const routes = [
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <SignupPage /> },
  { path: '/dashboard', element: <Dashboard /> },
  { path: '/dashboard/:id', element: <ProductPage /> },
  { path: '/dashboard/new', element: <NewCarPage /> },
  // { path: '/aboutme', element: <AboutMe /> },
  // { path: '*', element: <NotFound /> },
];

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: routes.map(({ path, element }) => ({
      path,
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          {element}
        </Suspense>
      ),
    })),
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
