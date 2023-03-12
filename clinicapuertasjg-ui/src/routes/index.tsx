import { RouteObject } from 'react-router-dom';
import NoRequireAuthGuard from '../components/guards/NoRequireAuthGuard';
import RequireAuthGuard from '../components/guards/RequireAuthGuard';
import UsersPage from '../pages/users/UsersPage';
import AlarmsPage from '../pages/alarms/AlarmsPage';
import DoorLocksPage from '../pages/door-locks/DoorLocksPage';
import ElevatorsPage from '../pages/elevators/ElevatorsPage';
import LoginPage from '../pages/login/LoginPage';
import RegisterPage from '../pages/register/RegisterPage';
import HomePage from '../pages/home/HomePage';
import DashboardLayout from '../layouts/dashboard/DashboardLayout';
import CreateUserPage from '../pages/users/CreateUserPage';
import EditUserPage from '../pages/users/EditUserPage';
import SalesPage from '../pages/sales/SalesPage';
import PurchasesPage from '../pages/purchases/PurchasesPage';
import SuppliersPage from '../pages/suppliers/SuppliersPage';

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
      { path: 'ventas', element: <SalesPage /> },
      { path: 'compras', element: <PurchasesPage /> },
      { path: 'proveedores', element: <SuppliersPage /> },
      { path: 'seguros', element: <DoorLocksPage /> },
      { path: 'elevadores', element: <ElevatorsPage /> },
      { path: 'alarmas', element: <AlarmsPage /> },
      { path: 'usuarios', element: <UsersPage /> },
      { path: 'usuarios/crear', element: <CreateUserPage /> },
      { path: 'usuarios/editar/:userId', element: <EditUserPage /> },
    ],
  },
];
