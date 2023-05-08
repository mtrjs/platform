import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { ROUTE_PATH } from '@constants/routes';
import Login from './pages/login';
import Layout from './pages/layout';

const Performance = lazy(() => import('./pages/performance'));
const Overview = lazy(() => import('./pages/overview'));
const Exception = lazy(() => import('./pages/exception'));
const JsExceptionList = lazy(() => import('./pages/js-exception-list'));

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
    path: '/',
    children: [
      {
        path: ROUTE_PATH.performance,
        element: (
          <Suspense fallback={<div>加载中</div>}>
            <Performance />
          </Suspense>
        ),
      },
    ],
    element: <Layout />,
  },
  {
    path: ROUTE_PATH.exception,
    element: (
      <Suspense fallback={<div>加载中</div>}>
        <Exception />
      </Suspense>
    ),
  },
  {
    path: ROUTE_PATH.jsExceptionList,
    element: (
      <Suspense fallback={<div>加载中</div>}>
        <JsExceptionList />
      </Suspense>
    ),
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
