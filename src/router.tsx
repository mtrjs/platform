import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from './dashboard';
import Performance from './performance';
import Err from './error';
import ErrorList from './errorList';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />,
  },
  {
    path: '/performance',
    element: <Performance />,
  },
  {
    path: '/error',
    element: <Err />,
  },
  {
    path: '/resource',
    element: <div>resource</div>,
  },
  {
    path: '/error/list',
    element: <ErrorList />,
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
