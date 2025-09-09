import React, { createContext, useContext, ReactNode } from 'react'
import { useAuthStore } from '@/stores/auth'

interface User {
  id: string
  name: string
  email: string
  role: string
  avatar?: string
  institution?: string
}

interface AuthContextType {
  user: User | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const authStore = useAuthStore()
  
  const user: User | null = authStore.user ? {
    id: authStore.user.id,
    name: authStore.user.name,
    email: authStore.user.email,
    role: authStore.user.role || 'admin_drimsoft',
    avatar: authStore.user.photoURL,
    institution: 'DrimSoft'
  } : null

  return (
    <AuthContext.Provider value={{ user }}>
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
