import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { ROUTE_PATH } from '@constants/routes';
import Login from './pages/login';
import Layout from './pages/layout';
import Performance from './pages/performance';
import JsException from './pages/js-exception';
import RequestException from './pages/request-exception/components/trend';
import JsExceptionList from './pages/js-exception-list';

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
    path: ROUTE_PATH.performance,
    children: [
      {
        path: ROUTE_PATH.performanceOverview,
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
    children: [
      {
        path: ROUTE_PATH.jsException,
        element: (
          <Suspense fallback={<div>加载中</div>}>
            <JsException />
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
        path: ROUTE_PATH.requestException,
        element: (
          <Suspense fallback={<div>加载中</div>}>
            <RequestException />
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
