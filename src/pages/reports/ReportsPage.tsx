import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, ComposedChart,
  ScatterChart, Scatter, RadialBarChart, RadialBar, Legend, Tooltip
} from 'recharts'
import { 
  BarChart3, TrendingUp, Download, Filter, Percent as Performance, Shield, 
  Activity, DollarSign, Users, Building2, Clock, AlertTriangle, CheckCircle,
  Zap, Server, Globe, Target, Calendar, PieChart as PieChartIcon
} from 'lucide-react'

const COLORS = ['#3B82F6', '#22C55E', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#14B8A6', '#F97316']

export function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('12w')
  const [selectedOrganization, setSelectedOrganization] = useState('all')

  // Datos mock comprehensivos para reportes de Planifika
  const platformMetrics = {
    totalUsers: 12847,
    activeOrganizations: 4,
    totalProjects: 1764,
    monthlyRevenue: 485000,
    systemUptime: 99.9,
    avgResponseTime: 1.2,
    userSatisfaction: 4.7,
    projectCompletionRate: 89.2,
    userGrowth: 12.5,
    revenueGrowth: 15.3
  }

  // Datos de rendimiento mensual
  const performanceData = [
    { month: 'Ene', usuarios: 8500, proyectos: 45, ingresos: 120000, satisfaccion: 4.6, uptime: 99.8 },
    { month: 'Feb', usuarios: 9200, proyectos: 52, ingresos: 135000, satisfaccion: 4.7, uptime: 99.9 },
    { month: 'Mar', usuarios: 9800, proyectos: 48, ingresos: 128000, satisfaccion: 4.8, uptime: 99.9 },
    { month: 'Abr', usuarios: 10500, proyectos: 61, ingresos: 145000, satisfaccion: 4.7, uptime: 99.9 },
    { month: 'May', usuarios: 11200, proyectos: 55, ingresos: 132000, satisfaccion: 4.8, uptime: 99.9 },
    { month: 'Jun', usuarios: 12847, proyectos: 67, ingresos: 158000, satisfaccion: 4.7, uptime: 99.9 }
  ]

  // Datos de adopción por organización
  const adoptionData = [
    { organization: 'Javeriana', usuarios: 2847, proyectos: 456, adopcion: 87, satisfaccion: 4.8 },
    { organization: 'Rosario', usuarios: 3200, proyectos: 623, adopcion: 92, satisfaccion: 4.9 },
    { organization: 'Andes', usuarios: 2156, proyectos: 387, adopcion: 78, satisfaccion: 4.7 },
    { organization: 'Nacional', usuarios: 1890, proyectos: 298, adopcion: 65, satisfaccion: 4.6 }
  ]

  // Distribución de planes
  const planDistribution = [
    { name: 'Enterprise', value: 2, color: '#3B82F6', revenue: 270000 },
    { name: 'Professional', value: 1, color: '#22C55E', revenue: 98000 },
    { name: 'Basic', value: 1, color: '#F59E0B', revenue: 0 },
    { name: 'Trial', value: 0, color: '#EF4444', revenue: 0 }
  ]

  // Métricas de uso diario
  const dailyUsage = [
    { day: 'Lun', sesiones: 2400, tiempoPromedio: 45, proyectosCreados: 12 },
    { day: 'Mar', sesiones: 2800, tiempoPromedio: 52, proyectosCreados: 15 },
    { day: 'Mié', sesiones: 3200, tiempoPromedio: 48, proyectosCreados: 18 },
    { day: 'Jue', sesiones: 2900, tiempoPromedio: 55, proyectosCreados: 14 },
    { day: 'Vie', sesiones: 2600, tiempoPromedio: 42, proyectosCreados: 11 },
    { day: 'Sáb', sesiones: 1800, tiempoPromedio: 38, proyectosCreados: 8 },
    { day: 'Dom', sesiones: 1200, tiempoPromedio: 35, proyectosCreados: 5 }
  ]

  // Estado de proyectos
  const projectStatus = [
    { name: 'En Progreso', value: 45, color: '#3B82F6' },
    { name: 'Completados', value: 35, color: '#22C55E' },
    { name: 'En Revisión', value: 12, color: '#F59E0B' },
    { name: 'En Riesgo', value: 8, color: '#EF4444' }
  ]

  // Métricas de rendimiento del sistema
  const systemMetrics = [
    { metric: 'Tiempo de Respuesta', value: 1.2, unit: 's', target: 2.0, status: 'excellent' },
    { metric: 'Uptime', value: 99.9, unit: '%', target: 99.5, status: 'excellent' },
    { metric: 'Tasa de Error', value: 0.1, unit: '%', target: 1.0, status: 'excellent' },
    { metric: 'Capacidad CPU', value: 65, unit: '%', target: 80, status: 'good' },
    { metric: 'Memoria', value: 72, unit: '%', target: 85, status: 'good' },
    { metric: 'Almacenamiento', value: 58, unit: '%', target: 90, status: 'good' }
  ]

  // Ingresos por organización
  const revenueData = [
    { organization: 'Javeriana', plan: 'Enterprise', mrr: 125000, growth: 8.5, users: 2847 },
    { organization: 'Rosario', plan: 'Enterprise', mrr: 145000, growth: 12.3, users: 3200 },
    { organization: 'Andes', plan: 'Professional', mrr: 98000, growth: 5.2, users: 2156 },
    { organization: 'Nacional', plan: 'Basic', mrr: 0, growth: 0, users: 1890 }
  ]

  // Tendencias de engagement
  const engagementData = [
    { week: 'Sem 1', logins: 18500, tiempoSesion: 42, proyectosCreados: 89, colaboraciones: 156 },
    { week: 'Sem 2', logins: 19200, tiempoSesion: 45, proyectosCreados: 95, colaboraciones: 168 },
    { week: 'Sem 3', logins: 20100, tiempoSesion: 48, proyectosCreados: 102, colaboraciones: 175 },
    { week: 'Sem 4', logins: 20800, tiempoSesion: 46, proyectosCreados: 98, colaboraciones: 182 }
  ]

  const exportReport = () => {
    const reportData = {
      platformMetrics,
      performanceData,
      adoptionData,
      planDistribution,
      dailyUsage,
      projectStatus,
      systemMetrics,
      revenueData,
      engagementData
    }
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `reporte-planifika-${new Date().toISOString().split('T')[0]}.json`
    a.click()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reportes de Planifika</h1>
          <p className="text-muted-foreground">
            Análisis completo de rendimiento, usuarios y métricas de la plataforma
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>
          <Button onClick={exportReport}>
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* KPIs Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Usuarios</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{platformMetrics.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-green-600">
              +{platformMetrics.userGrowth}% vs mes anterior
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ingresos Mensuales</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              ${platformMetrics.monthlyRevenue.toLocaleString()}
            </div>
            <p className="text-xs text-green-600">
              +{platformMetrics.revenueGrowth}% vs mes anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Organizaciones Activas</CardTitle>
            <Building2 className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {platformMetrics.activeOrganizations}
            </div>
            <p className="text-xs text-muted-foreground">
              {platformMetrics.totalProjects} proyectos totales
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Satisfacción Usuario</CardTitle>
            <Target className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {platformMetrics.userSatisfaction}/5
            </div>
            <p className="text-xs text-muted-foreground">
              {platformMetrics.projectCompletionRate}% proyectos completados
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Métricas del Sistema */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Server className="h-5 w-5 text-blue-500" />
            <span>Métricas del Sistema</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {systemMetrics.map((metric, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">{metric.metric}</span>
                  <Badge variant={metric.status === 'excellent' ? 'default' : 'secondary'}>
                    {metric.status === 'excellent' ? 'Excelente' : 'Bueno'}
                  </Badge>
                </div>
                <div className="text-2xl font-bold">
                  {metric.value}{metric.unit}
                </div>
                <div className="text-xs text-muted-foreground">
                  Objetivo: {metric.target}{metric.unit}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className={`h-2 rounded-full ${
                      metric.status === 'excellent' ? 'bg-green-500' : 'bg-blue-500'
                    }`}
                    style={{ width: `${Math.min((metric.value / metric.target) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Reportes Principales */}
      <Tabs defaultValue="rendimiento" className="space-y-4">
        <TabsList>
          <TabsTrigger value="rendimiento">Rendimiento</TabsTrigger>
          <TabsTrigger value="adopcion">Adopción</TabsTrigger>
          <TabsTrigger value="financiero">Financiero</TabsTrigger>
          <TabsTrigger value="usuarios">Usuarios</TabsTrigger>
          <TabsTrigger value="proyectos">Proyectos</TabsTrigger>
        </TabsList>

        <TabsContent value="rendimiento" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Tendencia de Usuarios y Proyectos</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="usuarios" fill="#3B82F6" name="Usuarios" />
                    <Line yAxisId="right" type="monotone" dataKey="proyectos" stroke="#22C55E" strokeWidth={2} name="Proyectos" />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ingresos Mensuales</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Ingresos']} />
                    <Area 
                      type="monotone" 
                      dataKey="ingresos" 
                      stroke="#22C55E" 
                      fill="#22C55E" 
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="adopcion" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Adopción por Organización</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={adoptionData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="organization" type="category" width={100} />
                    <Tooltip />
                    <Bar dataKey="adopcion" fill="#3B82F6" name="% Adopción" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Distribución de Planes</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={planDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}`}
                    >
                      {planDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="financiero" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Ingresos por Organización</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="organization" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'MRR']} />
                    <Bar dataKey="mrr" fill="#22C55E" name="Ingresos Mensuales" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Análisis de Crecimiento</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {revenueData.map((org, index) => (
                    <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{org.organization}</div>
                        <div className="text-sm text-muted-foreground">{org.plan}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">${org.mrr.toLocaleString()}</div>
                        <div className={`text-sm ${org.growth > 0 ? 'text-green-600' : 'text-gray-500'}`}>
                          {org.growth > 0 ? `+${org.growth}%` : 'Sin crecimiento'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="usuarios" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Uso Diario de la Plataforma</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={dailyUsage}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="sesiones" 
                      stackId="1" 
                      stroke="#3B82F6" 
                      fill="#3B82F6" 
                      fillOpacity={0.6}
                      name="Sesiones"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="proyectosCreados" 
                      stackId="2" 
                      stroke="#22C55E" 
                      fill="#22C55E" 
                      fillOpacity={0.6}
                      name="Proyectos Creados"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tendencias de Engagement</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={engagementData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="logins" 
                      stroke="#3B82F6" 
                      strokeWidth={2}
                      name="Logins"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="colaboraciones" 
                      stroke="#22C55E" 
                      strokeWidth={2}
                      name="Colaboraciones"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="proyectos" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Estado de Proyectos</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={projectStatus}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {projectStatus.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Proyectos por Organización</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={adoptionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="organization" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="proyectos" fill="#8B5CF6" name="Proyectos" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}