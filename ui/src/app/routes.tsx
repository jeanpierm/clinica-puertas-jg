import { RouteObject } from 'react-router-dom';
import NoRequireAuthGuard from '../guards/NoRequireAuthGuard';
import RequireAuthGuard from '../guards/RequireAuthGuard';
import UsersPage from '../features/dashboard/pages/UsersPage';
import AlarmsPage from '../features/dashboard/pages/AlarmsPage';
import DoorLocksPage from '../features/dashboard/pages/DoorLocksPage';
import ElevatorsPage from '../features/dashboard/pages/ElevatorsPage';
import LoginPage from '../features/auth/pages/LoginPage';
import RegisterPage from '../features/auth/pages/RegisterPage';
import HomePage from '../features/dashboard/pages/HomePage';
import DashboardLayout from '../features/dashboard/layout/DashboardLayout';

export const routes: RouteObject[] = [
  {
    path: 'login',
    element: (
      <NoRequireAuthGuard>
        <LoginPage />
      </NoRequireAuthGuard>
    ),
  },
  {
    path: 'register',
    element: <RegisterPage />,
  },
  {
    path: '/',
    element: (
      <RequireAuthGuard>
        <DashboardLayout />
      </RequireAuthGuard>
    ),
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/seguros', element: <DoorLocksPage /> },
      { path: '/elevadores', element: <ElevatorsPage /> },
      { path: '/alarmas', element: <AlarmsPage /> },
      { path: '/usuarios', element: <UsersPage /> },
    ],
  },
];
