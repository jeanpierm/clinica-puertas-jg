import { RouteObject } from 'react-router-dom';
import NoRequireAuth from '../components/NoRequireAuth';
import RequireAuth from '../components/RequireAuth';
import DashboardLayout from '../layouts/dashboard/DashboardLayout';
import AlarmsPage from '../pages/AlarmsPage';
import DoorLocksPage from '../pages/DoorLocksPage';
import ElevatorsPage from '../pages/ElevatorsPage';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';

export const routes: RouteObject[] = [
  {
    path: 'login',
    element: (
      <NoRequireAuth>
        <LoginPage />
      </NoRequireAuth>
    ),
  },
  {
    path: 'register',
    element: <RegisterPage />,
  },
  {
    path: '/',
    element: (
      <RequireAuth>
        <DashboardLayout />
      </RequireAuth>
    ),
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/seguros', element: <DoorLocksPage /> },
      { path: '/elevadores', element: <ElevatorsPage /> },
      { path: '/alarmas', element: <AlarmsPage /> },
    ],
  },
];
