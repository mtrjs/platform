import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { ROUTE_PATH } from '@constants/routes';
import Login from './pages/login';
import Layout from './pages/layout';

const Overview = lazy(() => import('./pages/overview'));

export const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        path: ROUTE_PATH.overview,
        element: (
          <Suspense fallback={<div>加载中</div>}>
            <Overview />
          </Suspense>
        ),
      },
    ],
    element: <Layout />,
  },
  {
    path: ROUTE_PATH.login,
    element: (
      <Suspense fallback={<div>加载中</div>}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: '*',
    element: <div>error</div>,
  },
]);

function Component() {
  return <RouterProvider router={router} />;
}

export default Component;
