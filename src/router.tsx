import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import Performance from './pages/performance';
import Err from './pages/error';
import ErrorList from './pages/errorList';
import Overview from './pages/overview';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Overview />,
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
