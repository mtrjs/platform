import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import { lazy, Suspense } from 'react';

const Performance = lazy(() => import('./pages/performance'));
const Overview = lazy(() => import('./pages/overview'));
const ErrorList = lazy(() => import('./pages/errorList'));
const Err = lazy(() => import('./pages/error'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<div>加载中</div>}>
        <Overview />
      </Suspense>
    ),
  },
  {
    path: '/performance',
    element: (
      <Suspense fallback={<div>加载中</div>}>
        <Performance />
      </Suspense>
    ),
  },
  {
    path: '/error',
    element: (
      <Suspense fallback={<div>加载中</div>}>
        <Err />
      </Suspense>
    ),
  },
  {
    path: '/resource',
    element: <div>resource</div>,
  },
  {
    path: '/error/list',
    element: (
      <Suspense fallback={<div>加载中</div>}>
        <ErrorList />
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
