import React from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { SystemPermission, Role } from '@/types'

interface PermissionGuardProps {
  permission?: SystemPermission
  role?: Role
  fallback?: React.ReactNode
  children: React.ReactNode
}

export function PermissionGuard({ 
  permission, 
  role, 
  fallback = null, 
  children 
}: PermissionGuardProps) {
  const { hasPermission, hasRole } = useAuth()

  // Si se especifica un permiso, verificar que el usuario lo tenga
  if (permission && !hasPermission(permission)) {
    return <>{fallback}</>
  }

  // Si se especifica un rol, verificar que el usuario tenga ese rol
  if (role && !hasRole(role)) {
    return <>{fallback}</>
  }

  return <>{children}</>
}

interface AdminOnlyProps {
  fallback?: React.ReactNode
  children: React.ReactNode
}

export function AdminOnly({ fallback = null, children }: AdminOnlyProps) {
  const { isAdmin } = useAuth()

  if (!isAdmin()) {
    return <>{fallback}</>
  }

  return <>{children}</>
}

interface SuperAdminOnlyProps {
  fallback?: React.ReactNode
  children: React.ReactNode
}

export function SuperAdminOnly({ fallback = null, children }: SuperAdminOnlyProps) {
  const { isSuperAdmin } = useAuth()

  if (!isSuperAdmin()) {
    return <>{fallback}</>
  }

  return <>{children}</>
}
