import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { authService } from '@/services/auth'
import { useAuthStore } from '@/stores/auth'
import { LoginForm } from '@/types'

const loginSchema = z.object({
  email: z.string()
    .email('Dirección de email inválida')
    .refine(email => email.endsWith('@drimsoft.com'), 'Solo cuentas de DrimSoft están permitidas'),
  password: z.string().min(1, 'La contraseña es requerida'),
})

export function LoginPage() {
  const navigate = useNavigate()
  const login = useAuthStore(state => state.login)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  })


  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      login(data)
      navigate('/dashboard')
    },
    onError: (error: any) => {
      const message = error.response?.data?.error || 'Login failed'
      setError('root', { message })
    }
  })

  const onSubmit = (data: LoginForm) => {
    // Cualquier usuario con dominio @drimsoft.com es admitido
    if (data.email.endsWith('@drimsoft.com')) {
      // Extraer el nombre del usuario del email
      const userName = data.email.split('@')[0].replace(/[._]/g, ' ')
      const displayName = userName.split(' ').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ')
      
      // Simula respuesta del backend
      login({
        user: {
          id: data.email.split('@')[0],
          email: data.email,
          name: displayName,
          status: 'Activo',
          role: 'admin_drimsoft',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        token: 'fake-token-' + Date.now(),
        refreshToken: 'refresh-token-' + Date.now(),
        expiresAt: new Date(Date.now() + 8 * 60 * 60 * 1000) // 8 horas
      })
      navigate('/dashboard')
      return
    }
    
    // Si no es dominio @drimsoft.com, intentar con el servicio normal
    loginMutation.mutate(data)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-4">
            <img 
              src="/assets/images/DrimSoft logo.png" 
              alt="DrimSoft" 
              className="w-12 h-12"
            />
          </div>
          <CardTitle className="text-2xl font-bold text-primary">DrimSoft Admin</CardTitle>
          <CardDescription>
            Inicia sesión para acceder al panel de administración
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Correo Electrónico
              </label>
              <Input
                id="email"
                type="email"
                placeholder="tu.nombre@drimsoft.com"
                {...register('email')}
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Contraseña
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Ingresa tu contraseña"
                {...register('password')}
                className={errors.password ? 'border-red-500' : ''}
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>

            {errors.root && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{errors.root.message}</p>
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Acceso restringido solo a empleados de DrimSoft
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Cualquier contraseña es válida para usuarios @drimsoft.com
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}