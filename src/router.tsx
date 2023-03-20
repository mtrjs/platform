import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from 'react-router-dom';
import Dashboard from './dashboard';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />,
  },
]);

function Component() {
  return <RouterProvider router={router} />;
}

export default Component;
