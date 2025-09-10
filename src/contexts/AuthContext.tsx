import React, { createContext, useContext, ReactNode } from 'react'
import { useAuthStore } from '@/stores/auth'
import { Role, SystemPermission } from '@/types'

interface User {
  id: string
  name: string
  email: string
  role: Role
  avatar?: string
  institution?: string
}

interface AuthContextType {
  user: User | null
  hasPermission: (permission: SystemPermission) => boolean
  hasRole: (role: Role) => boolean
  isAdmin: () => boolean
  isSuperAdmin: () => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

// Mapeo de roles a permisos
const rolePermissions: Record<Role, SystemPermission[]> = {
  [Role.SUPER_ADMIN]: Object.values(SystemPermission), // Todos los permisos
  [Role.ADMIN_DRIMSOFT]: [
    SystemPermission.USER_CREATE,
    SystemPermission.USER_READ,
    SystemPermission.USER_UPDATE,
    SystemPermission.USER_DELETE,
    SystemPermission.USER_MANAGE_ROLES,
    SystemPermission.ORG_CREATE,
    SystemPermission.ORG_READ,
    SystemPermission.ORG_UPDATE,
    SystemPermission.ORG_DELETE,
    SystemPermission.ORG_MANAGE_USERS,
    SystemPermission.PROJECT_CREATE,
    SystemPermission.PROJECT_READ,
    SystemPermission.PROJECT_UPDATE,
    SystemPermission.PROJECT_DELETE,
    SystemPermission.SYSTEM_CONFIG,
    SystemPermission.SYSTEM_INTEGRATIONS,
    SystemPermission.SYSTEM_FEATURES,
    SystemPermission.SYSTEM_SECURITY,
    SystemPermission.SYSTEM_DATABASE,
    SystemPermission.AUDIT_READ,
    SystemPermission.AUDIT_EXPORT,
    SystemPermission.REPORTS_CREATE,
    SystemPermission.REPORTS_READ,
    SystemPermission.REPORTS_EXPORT
  ],
  [Role.ADMIN_ORG]: [
    SystemPermission.USER_READ,
    SystemPermission.USER_UPDATE,
    SystemPermission.ORG_READ,
    SystemPermission.ORG_UPDATE,
    SystemPermission.ORG_MANAGE_USERS,
    SystemPermission.PROJECT_CREATE,
    SystemPermission.PROJECT_READ,
    SystemPermission.PROJECT_UPDATE,
    SystemPermission.PROJECT_DELETE,
    SystemPermission.REPORTS_CREATE,
    SystemPermission.REPORTS_READ,
    SystemPermission.REPORTS_EXPORT
  ],
  [Role.MANAGER]: [
    SystemPermission.USER_READ,
    SystemPermission.PROJECT_READ,
    SystemPermission.PROJECT_UPDATE,
    SystemPermission.REPORTS_READ
  ],
  [Role.MEMBER]: [
    SystemPermission.USER_READ,
    SystemPermission.PROJECT_READ,
    SystemPermission.REPORTS_READ
  ],
  [Role.VIEWER]: [
    SystemPermission.USER_READ,
    SystemPermission.PROJECT_READ,
    SystemPermission.REPORTS_READ
  ]
}

export function AuthProvider({ children }: AuthProviderProps) {
  const authStore = useAuthStore()
  
  const user: User | null = authStore.user ? {
    id: authStore.user.id,
    name: authStore.user.name,
    email: authStore.user.email,
    role: authStore.user.role || Role.ADMIN_DRIMSOFT,
    avatar: authStore.user.photoURL,
    institution: 'DrimSoft'
  } : null

  const hasPermission = (permission: SystemPermission): boolean => {
    if (!user) return false
    const userPermissions = rolePermissions[user.role] || []
    return userPermissions.includes(permission)
  }

  const hasRole = (role: Role): boolean => {
    return user?.role === role
  }

  const isAdmin = (): boolean => {
    return user?.role === Role.ADMIN_DRIMSOFT || user?.role === Role.SUPER_ADMIN
  }

  const isSuperAdmin = (): boolean => {
    return user?.role === Role.SUPER_ADMIN
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      hasPermission, 
      hasRole, 
      isAdmin, 
      isSuperAdmin 
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
