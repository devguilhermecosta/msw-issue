import { createBrowserRouter } from 'react-router-dom';
import Dashboard from './pages/admin';
import LoginPage from './pages/login';
import PrivateRoute from './components/privateRoute';

export const router = createBrowserRouter([
  {
    path: 'admin/login',
    element: <LoginPage />
  },
  {
    path: 'admin/dashboard',
    element: <PrivateRoute><Dashboard /></PrivateRoute>
  },
])
