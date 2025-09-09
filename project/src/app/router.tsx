import React from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { LoginPage } from '@/pages/auth/LoginPage'
import { DashboardPage } from '@/pages/dashboard/DashboardPage'
import { InstitutionListPage } from '@/pages/institutions/InstitutionListPage'
import { InstitutionDetailPage } from '@/pages/institutions/InstitutionDetailPage'
import { ProjectListPage } from '@/pages/projects/ProjectListPage'
import { ProjectDetailPage } from '@/pages/projects/ProjectDetailPage'
import { UsersPage } from '@/pages/users/UsersPage'
import { ReportsPage } from '@/pages/reports/ReportsPage'
import { AuditPage } from '@/pages/audit/AuditPage'
import { ConfigPage } from '@/pages/config/ConfigPage'
import { useAuthStore } from '@/stores/auth'

interface ProtectedRouteProps {
  children: React.ReactNode
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  
  return <>{children}</>
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: 'dashboard',
        element: <DashboardPage />,
      },
      {
        path: 'institutions',
        element: <InstitutionListPage />,
      },
      {
        path: 'institutions/:id',
        element: <InstitutionDetailPage />,
      },
      {
        path: 'projects',
        element: <ProjectListPage />,
      },
      {
        path: 'projects/:id',
        element: <ProjectDetailPage />,
      },
      {
        path: 'users',
        element: <UsersPage />,
      },
      {
        path: 'reports',
        element: <ReportsPage />,
      },
      {
        path: 'audit',
        element: <AuditPage />,
      },
      {
        path: 'config',
        element: <ConfigPage />,
      },
    ],
  },
])