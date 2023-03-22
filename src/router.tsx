import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from './dashboard';
import Performance from './performance';

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
    element: <div>error</div>,
  },
  {
    path: '/resource',
    element: <div>resource</div>,
  },
]);

function Component() {
  return <RouterProvider router={router} />;
}

export default Component;
