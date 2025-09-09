import { api } from './api'
import { AuthResponse, LoginForm } from '@/types'

export const authService = {
  async login(credentials: LoginForm): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', credentials)
    return response.data
  },

  async refresh(): Promise<{ token: string; expiresAt: Date }> {
    const response = await api.post('/auth/refresh')
    return response.data
  },

  async logout(): Promise<void> {
    await api.post('/auth/logout')
  },
}