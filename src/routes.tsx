import { createBrowserRouter } from 'react-router-dom'
import LoginForm from './features/authentication/components/LoginForm'
import RegisterForm from './features/authentication/components/RegisterForm'
import ConfirmAccount from './features/authentication/components/ConfirmAccount'
import ProtectedRoute from './shared/components/layout/ProtectedRoute'
import AppLayout from './shared/components/layout/AppLayout'
import TaskDashboard from './features/task-management/components/TaskDashboard'
import Dashboard from './features/dashboard/components/Dashboard'

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginForm />
  },
  {
    path: '/register',
    element: <RegisterForm />
  },
  {
    path: '/',
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
        path: '', // /app
        element: <TaskDashboard />
      },
      {
        path: 'resumen', // /app/resumen
        element: <Dashboard />
      }
    ]
  }
])
