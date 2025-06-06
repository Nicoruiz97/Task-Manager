import { createBrowserRouter } from 'react-router-dom'
import LoginForm from './features/authentication/components/LoginForm'
import RegisterForm from './features/authentication/components/RegisterForm'
import ProtectedRoute from './shared/components/layout/ProtectedRoute'
import AppLayout from './shared/components/layout/AppLayout'
import TaskDashboard from './features/task-management/components/TaskDashboard'
import Dashboard from './features/dashboard/components/Dashboard'
import ConfirmAccount from './features/authentication/components/ConfirmAccount'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginForm />
  },
  {
    path: '/login',
    element: <LoginForm />
  },
  {
    path: '/register',
    element: <RegisterForm />
  },
  {
    path: '/confirm',
    element: <ConfirmAccount />
  },
  {
    path: '/app',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '',
        element: <TaskDashboard />
      },
      {
        path: 'resumen',
        element: <Dashboard />
      }
    ]
  }
])
