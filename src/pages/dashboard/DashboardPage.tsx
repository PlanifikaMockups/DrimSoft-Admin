import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { api } from '@/services/api'
import { formatCurrency, formatPercentage } from '@/lib/utils'
import { mockOrganizations, mockProjects } from '@/mocks/fixtures'
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts'
import { 
  Building2, FolderOpen, TrendingUp, AlertTriangle, Clock, Star, 
  Users, DollarSign, Shield, Activity, Server, Zap, 
  CheckCircle, XCircle, Info, AlertCircle, Download, RefreshCw,
  BarChart3, BookOpen
} from 'lucide-react'

const COLORS = ['#3B82F6', '#22C55E', '#F59E0B', '#EF4444', '#8B5CF6']

export function DashboardPage() {
  const { data: kpis } = useQuery({
    queryKey: ['dashboard', 'kpis'],
    queryFn: async () => {
      const response = await api.get('/dashboard/kpis')
      return response.data
    }
  })

  const { data: widgetData } = useQuery({
    queryKey: ['dashboard', 'widgets'],
    queryFn: async () => {
      const response = await api.get('/dashboard/widgets?period=12w')
      return response.data
    }
  })

  // Datos calculados desde los mocks para consistencia
  const platformMetrics = {
    totalOrganizations: mockOrganizations.length,
    totalUsers: mockOrganizations.reduce((sum, org) => sum + org.mau, 0),
    monthlyRevenue: 485000, // Mantener valor realista
    systemUptime: 99.9,
    activeProjects: mockProjects.filter(p => p.status === 'En curso' || p.status === 'En revisión').length,
    completionRate: 89.2
  }

  const systemAlerts = [
    { 
      id: 1,
      type: 'performance', 
      message: 'Rendimiento de consultas de base de datos degradado', 
      severity: 'warning', 
      time: '30 min atrás',
      icon: AlertTriangle,
      color: 'text-amber-500'
    },
    { 
      id: 2,
      type: 'capacity', 
      message: 'Uso de almacenamiento al 85% de capacidad', 
      severity: 'info', 
      time: '2 horas atrás',
      icon: Info,
      color: 'text-blue-500'
    },
    { 
      id: 3,
      type: 'security', 
      message: 'Intentos de login fallidos desde Universidad Nacional', 
      severity: 'high', 
      time: '4 horas atrás',
      icon: Shield,
      color: 'text-red-500'
    },
    { 
      id: 4,
      type: 'success', 
      message: 'Backup automático completado exitosamente', 
      severity: 'success', 
      time: '6 horas atrás',
      icon: CheckCircle,
      color: 'text-green-500'
    }
  ]

  const topOrganizations = [
    { 
      id: '1', 
      name: 'Pontificia Universidad Javeriana', 
      users: 2847, 
      projects: 456, 
      status: 'activa',
      plan: 'enterprise',
      health: 95,
      revenue: 125000,
      logo: '/assets/images/universities/javeriana-logo.png',
      location: 'Bogotá, Colombia',
      founded: '1623',
      students: '28000+',
      faculties: 18
    },
    { 
      id: '2', 
      name: 'Universidad del Rosario', 
      users: 3200, 
      projects: 623, 
      status: 'activa',
      plan: 'enterprise',
      health: 98,
      revenue: 145000,
      logo: '/assets/images/universities/rosario-logo.png',
      location: 'Bogotá, Colombia',
      founded: '1653',
      students: '15000+',
      faculties: 9
    },
    { 
      id: '3', 
      name: 'Universidad de los Andes', 
      users: 2156, 
      projects: 387, 
      status: 'activa',
      plan: 'professional',
      health: 92,
      revenue: 98000,
      logo: '/assets/images/universities/andes-logo.png',
      location: 'Bogotá, Colombia',
      founded: '1948',
      students: '20000+',
      faculties: 12
    },
    { 
      id: '4', 
      name: 'Universidad Nacional de Colombia', 
      users: 1890, 
      projects: 298, 
      status: 'prueba',
      plan: 'trial',
      health: 89,
      revenue: 0,
      logo: '/assets/images/universities/nacional-logo.png',
      location: 'Bogotá, Colombia',
      founded: '1867',
      students: '50000+',
      faculties: 20
    }
  ]

  const chartData = [
    { name: 'Ene', proyectos: 45, completados: 38, presupuesto: 120000, usuarios: 8500 },
    { name: 'Feb', proyectos: 52, completados: 44, presupuesto: 135000, usuarios: 9200 },
    { name: 'Mar', proyectos: 48, completados: 42, presupuesto: 128000, usuarios: 9800 },
    { name: 'Abr', proyectos: 61, completados: 55, presupuesto: 145000, usuarios: 10500 },
    { name: 'May', proyectos: 55, completados: 48, presupuesto: 132000, usuarios: 11200 },
    { name: 'Jun', proyectos: 67, completados: 59, presupuesto: 158000, usuarios: 12847 }
  ]

  const projectStatusData = [
    { name: 'En Progreso', value: 45, color: '#3B82F6' },
    { name: 'Completados', value: 35, color: '#22C55E' },
    { name: 'En Revisión', value: 12, color: '#F59E0B' },
    { name: 'En Riesgo', value: 8, color: '#EF4444' }
  ]

  const universityStats = [
    { name: 'Javeriana', proyectos: 456, usuarios: 2847, satisfaccion: 4.8, ingresos: 125000 },
    { name: 'Rosario', proyectos: 623, usuarios: 3200, satisfaccion: 4.9, ingresos: 145000 },
    { name: 'Andes', proyectos: 387, usuarios: 2156, satisfaccion: 4.7, ingresos: 98000 },
    { name: 'Nacional', proyectos: 298, usuarios: 1890, satisfaccion: 4.6, ingresos: 0 }
  ]

  const usageStats = [
    { name: 'Lunes', sesiones: 2400, tiempo: 45 },
    { name: 'Martes', sesiones: 2800, tiempo: 52 },
    { name: 'Miércoles', sesiones: 3200, tiempo: 48 },
    { name: 'Jueves', sesiones: 2900, tiempo: 55 },
    { name: 'Viernes', sesiones: 2600, tiempo: 42 },
    { name: 'Sábado', sesiones: 1800, tiempo: 38 },
    { name: 'Domingo', sesiones: 1200, tiempo: 35 }
  ]

  const facultyDistribution = [
    { name: 'Ingeniería', proyectos: 45, estudiantes: 1200, profesores: 85 },
    { name: 'Medicina', proyectos: 38, estudiantes: 950, profesores: 72 },
    { name: 'Derecho', proyectos: 32, estudiantes: 800, profesores: 65 },
    { name: 'Economía', proyectos: 28, estudiantes: 700, profesores: 58 },
    { name: 'Psicología', proyectos: 25, estudiantes: 600, profesores: 45 },
    { name: 'Arquitectura', proyectos: 22, estudiantes: 500, profesores: 38 }
  ]

  const performanceMetrics = {
    responseTime: 1.2,
    uptime: 99.9,
    errorRate: 0.1,
    userSatisfaction: 4.7,
    adoptionRate: 87.5,
    retentionRate: 92.3
  }

  const kpiCards = [
    {
      title: 'Organizaciones Activas',
      value: platformMetrics.totalOrganizations,
      icon: Building2,
      color: 'text-blue-600',
      change: '+12%',
      trend: 'up'
    },
    {
      title: 'Usuarios Totales',
      value: platformMetrics.totalUsers.toLocaleString(),
      icon: Users,
      color: 'text-green-600',
      change: '+8%',
      trend: 'up'
    },
    {
      title: 'Ingresos Mensuales',
      value: formatCurrency(platformMetrics.monthlyRevenue),
      icon: DollarSign,
      color: 'text-emerald-600',
      change: '+15%',
      trend: 'up'
    },
    {
      title: 'Tiempo de Actividad',
      value: `${platformMetrics.systemUptime}%`,
      icon: Server,
      color: 'text-purple-600',
      change: '+0.1%',
      trend: 'up'
    },
    {
      title: 'Proyectos Activos',
      value: platformMetrics.activeProjects,
      icon: FolderOpen,
      color: 'text-amber-600',
      change: '+5%',
      trend: 'up'
    },
    {
      title: 'Tasa de Finalización',
      value: `${platformMetrics.completionRate}%`,
      icon: TrendingUp,
      color: 'text-indigo-600',
      change: '+3%',
      trend: 'up'
    }
  ]

  const atRiskProjects = [
    { 
      name: 'Sistema de Gestión Académica', 
      progress: 0.65, 
      budget: 0.93, 
      org: 'Universidad Nacional',
      daysOverdue: 5,
      riskLevel: 'alto'
    },
    { 
      name: 'Migración de Base de Datos', 
      progress: 0.45, 
      budget: 0.78, 
      org: 'Universidad de los Andes',
      daysOverdue: 12,
      riskLevel: 'crítico'
    },
    { 
      name: 'Implementación de LMS', 
      progress: 0.82, 
      budget: 0.95, 
      org: 'Universidad Javeriana',
      daysOverdue: 2,
      riskLevel: 'medio'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Panel de Administración</h1>
          <p className="text-muted-foreground">
            Vista ejecutiva de todas las organizaciones y proyectos
          </p>
        </div>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            <RefreshCw className="h-4 w-4 mr-2" />
            Actualizar
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-6">
        {kpiCards.map((kpi, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {kpi.title}
              </CardTitle>
              <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">{kpi.change}</span> desde el mes pasado
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* System Alerts */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-amber-500" />
              <span>Alertas del Sistema</span>
            </CardTitle>
          </div>
          <Badge variant="outline" className="text-xs">
            {systemAlerts.length} alertas
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {systemAlerts.map((alert) => (
              <div key={alert.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                <alert.icon className={`h-4 w-4 ${alert.color}`} />
                <div className="flex-1">
                  <p className="text-sm font-medium">{alert.message}</p>
                  <p className="text-xs text-muted-foreground">{alert.time}</p>
                </div>
                <Badge 
                  variant={alert.severity === 'high' ? 'destructive' : alert.severity === 'warning' ? 'default' : 'secondary'}
                  className="text-xs"
                >
                  {alert.severity}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Project Completion Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Tendencia de Finalización de Proyectos</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Line 
                  type="monotone" 
                  dataKey="completados" 
                  stroke="#22C55E" 
                  strokeWidth={2} 
                />
                <Line 
                  type="monotone" 
                  dataKey="proyectos" 
                  stroke="#3B82F6" 
                  strokeWidth={2} 
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Budget Utilization */}
        <Card>
          <CardHeader>
            <CardTitle>Utilización de Presupuesto por Mes</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Bar dataKey="presupuesto" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-green-500" />
              <span>Métricas de Rendimiento</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Tiempo de Respuesta</span>
                <span className="font-semibold">{performanceMetrics.responseTime}s</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Tiempo de Actividad</span>
                <span className="font-semibold text-green-600">{performanceMetrics.uptime}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Tasa de Error</span>
                <span className="font-semibold text-red-600">{performanceMetrics.errorRate}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Satisfacción del Usuario</span>
                <span className="font-semibold text-blue-600">{performanceMetrics.userSatisfaction}/5</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-blue-500" />
              <span>Adopción y Retención</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Tasa de Adopción</span>
                <span className="font-semibold text-green-600">{performanceMetrics.adoptionRate}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Tasa de Retención</span>
                <span className="font-semibold text-blue-600">{performanceMetrics.retentionRate}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: `${performanceMetrics.adoptionRate}%` }}></div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${performanceMetrics.retentionRate}%` }}></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-purple-500" />
              <span>Distribución de Proyectos</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={projectStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  dataKey="value"
                >
                  {projectStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Usage Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-indigo-500" />
              <span>Estadísticas de Uso Semanal</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={usageStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Area 
                  type="monotone" 
                  dataKey="sesiones" 
                  stackId="1" 
                  stroke="#3B82F6" 
                  fill="#3B82F6" 
                  fillOpacity={0.6}
                />
                <Area 
                  type="monotone" 
                  dataKey="tiempo" 
                  stackId="2" 
                  stroke="#22C55E" 
                  fill="#22C55E" 
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Building2 className="h-5 w-5 text-orange-500" />
              <span>Rendimiento por Universidad</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={universityStats} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={80} />
                <Bar dataKey="proyectos" fill="#3B82F6" />
                <Bar dataKey="usuarios" fill="#22C55E" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Faculty Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="h-5 w-5 text-emerald-500" />
            <span>Distribución por Facultades</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {facultyDistribution.map((faculty, index) => (
              <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <h4 className="font-semibold text-lg mb-2">{faculty.name}</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Proyectos:</span>
                    <span className="font-medium">{faculty.proyectos}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Estudiantes:</span>
                    <span className="font-medium">{faculty.estudiantes.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Profesores:</span>
                    <span className="font-medium">{faculty.profesores}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full" 
                      style={{ width: `${(faculty.proyectos / 50) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Organizations */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <Building2 className="h-5 w-5 text-blue-500" />
              <span>Organizaciones Principales</span>
            </CardTitle>
          </div>
          <Badge variant="outline" className="text-xs">
            {topOrganizations.length} organizaciones
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topOrganizations.map((org, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-xl hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {org.name.split(' ').map(word => word[0]).join('').slice(0, 2)}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium">{org.name}</h4>
                    <p className="text-sm text-muted-foreground">{org.location} • {org.students} estudiantes</p>
                  </div>
                </div>
                <div className="flex space-x-4 text-sm">
                  <div className="text-center">
                    <div className="font-semibold text-blue-600">{org.users.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">Usuarios</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-green-600">{org.projects}</div>
                    <div className="text-xs text-muted-foreground">Proyectos</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-purple-600">{org.health}%</div>
                    <div className="text-xs text-muted-foreground">Salud</div>
                  </div>
                  <div className="text-center">
                    <Badge variant={org.status === 'activa' ? 'default' : 'secondary'} className="text-xs">
                      {org.status}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* At Risk Projects */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              <span>Proyectos en Riesgo</span>
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {atRiskProjects.map((project, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-xl">
                <div>
                  <h4 className="font-medium">{project.name}</h4>
                  <p className="text-sm text-muted-foreground">{project.org}</p>
                </div>
                <div className="flex space-x-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Progreso: </span>
                    <span className={project.progress < 0.7 ? 'text-amber-600' : 'text-green-600'}>
                      {formatPercentage(project.progress)}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Presupuesto: </span>
                    <span className={project.budget > 0.9 ? 'text-red-600' : 'text-green-600'}>
                      {formatPercentage(project.budget)}
                    </span>
                  </div>
                  <div>
                    <Badge variant={project.riskLevel === 'crítico' ? 'destructive' : project.riskLevel === 'alto' ? 'default' : 'secondary'}>
                      {project.riskLevel}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}