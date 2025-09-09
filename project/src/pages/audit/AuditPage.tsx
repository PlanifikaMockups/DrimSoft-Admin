import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Search, Filter, Shield, Download, AlertTriangle, Eye, Lock, 
  User, Settings, FileText, Database, Clock, Globe, CheckCircle,
  XCircle, Info, Activity, Users, Building2, Calendar
} from 'lucide-react'

// Tipos de eventos de auditoría
type AuditEventType = 
  | 'LOGIN' | 'LOGOUT' | 'LOGIN_FAILED' | 'PASSWORD_CHANGE' | 'PERMISSION_CHANGE'
  | 'PROJECT_CREATE' | 'PROJECT_UPDATE' | 'PROJECT_DELETE' | 'PROJECT_ACCESS'
  | 'FILE_UPLOAD' | 'FILE_DOWNLOAD' | 'FILE_DELETE' | 'FILE_SHARE'
  | 'USER_CREATE' | 'USER_UPDATE' | 'USER_DELETE' | 'USER_DEACTIVATE'
  | 'ORG_CREATE' | 'ORG_UPDATE' | 'ORG_DELETE' | 'ORG_SETTINGS'
  | 'DATA_EXPORT' | 'DATA_IMPORT' | 'BACKUP_CREATE' | 'BACKUP_RESTORE'
  | 'SYSTEM_CONFIG' | 'SECURITY_ALERT' | 'COMPLIANCE_CHECK'

type AuditSeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'

interface AuditLog {
  id: string
  timestamp: Date
  actor: string
  actorEmail: string
  actorRole: string
  organization: string
  action: AuditEventType
  entity: string
  entityId: string
  severity: AuditSeverity
  ipAddress: string
  userAgent: string
  details: Record<string, any>
  result: 'SUCCESS' | 'FAILED' | 'WARNING'
  sessionId: string
  location?: string
}

export function AuditPage() {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [selectedSeverity, setSelectedSeverity] = useState<AuditSeverity | 'all'>('all')
  const [selectedAction, setSelectedAction] = useState<string>('all')
  const [selectedOrganization, setSelectedOrganization] = useState<string>('all')

  // Datos mock comprehensivos de auditoría
  const mockAuditLogs: AuditLog[] = [
    // Eventos de autenticación
    {
      id: '1',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      actor: 'María López',
      actorEmail: 'maria.lopez@javeriana.edu.co',
      actorRole: 'Admin Organización',
      organization: 'Pontificia Universidad Javeriana',
      action: 'LOGIN',
      entity: 'Sistema',
      entityId: 'auth-system',
      severity: 'LOW',
      ipAddress: '192.168.1.45',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      details: { method: 'password', mfa: true },
      result: 'SUCCESS',
      sessionId: 'sess_abc123',
      location: 'Bogotá, Colombia'
    },
    {
      id: '2',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      actor: 'Usuario Desconocido',
      actorEmail: 'intruso@email.com',
      actorRole: 'N/A',
      organization: 'N/A',
      action: 'LOGIN_FAILED',
      entity: 'Sistema',
      entityId: 'auth-system',
      severity: 'HIGH',
      ipAddress: '203.45.67.89',
      userAgent: 'curl/7.68.0',
      details: { attempts: 5, reason: 'invalid_credentials' },
      result: 'FAILED',
      sessionId: 'sess_failed',
      location: 'IP Externa'
    },
    {
      id: '3',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      actor: 'Carlos Mendez',
      actorEmail: 'carlos.mendez@drimsoft.com',
      actorRole: 'Admin DrimSoft',
      organization: 'DrimSoft',
      action: 'PASSWORD_CHANGE',
      entity: 'Usuario',
      entityId: 'user_carlos',
      severity: 'MEDIUM',
      ipAddress: '192.168.1.10',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
      details: { forced: false, strength: 'strong' },
      result: 'SUCCESS',
      sessionId: 'sess_def456',
      location: 'Bogotá, Colombia'
    },
    // Eventos de proyectos
    {
      id: '4',
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      actor: 'Roberto Silva',
      actorEmail: 'roberto.silva@javeriana.edu.co',
      actorRole: 'Manager',
      organization: 'Pontificia Universidad Javeriana',
      action: 'PROJECT_CREATE',
      entity: 'Proyecto Académico',
      entityId: 'proj_789',
      severity: 'LOW',
      ipAddress: '192.168.1.67',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      details: { 
        projectName: 'Sistema de Gestión de Tesis',
        department: 'Ingeniería de Sistemas',
        budget: 5000000
      },
      result: 'SUCCESS',
      sessionId: 'sess_ghi789',
      location: 'Bogotá, Colombia'
    },
    {
      id: '5',
      timestamp: new Date(Date.now() - 60 * 60 * 1000),
      actor: 'Laura Martínez',
      actorEmail: 'laura.martinez@urosario.edu.co',
      actorRole: 'Admin Organización',
      organization: 'Universidad del Rosario',
      action: 'PROJECT_ACCESS',
      entity: 'Proyecto Académico',
      entityId: 'proj_456',
      severity: 'LOW',
      ipAddress: '192.168.2.23',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      details: { 
        projectName: 'Plataforma de E-learning',
        accessType: 'read',
        duration: 120
      },
      result: 'SUCCESS',
      sessionId: 'sess_jkl012',
      location: 'Bogotá, Colombia'
    },
    // Eventos de archivos
    {
      id: '6',
      timestamp: new Date(Date.now() - 90 * 60 * 1000),
      actor: 'Sofia Jiménez',
      actorEmail: 'sofia.jimenez@javeriana.edu.co',
      actorRole: 'Member',
      organization: 'Pontificia Universidad Javeriana',
      action: 'FILE_UPLOAD',
      entity: 'Archivo',
      entityId: 'file_123',
      severity: 'LOW',
      ipAddress: '192.168.1.89',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      details: { 
        fileName: 'documento_tesis.pdf',
        fileSize: 2048576,
        projectId: 'proj_789',
        encryption: true
      },
      result: 'SUCCESS',
      sessionId: 'sess_mno345',
      location: 'Bogotá, Colombia'
    },
    {
      id: '7',
      timestamp: new Date(Date.now() - 120 * 60 * 1000),
      actor: 'Diego Herrera',
      actorEmail: 'diego.herrera@urosario.edu.co',
      actorRole: 'Manager',
      organization: 'Universidad del Rosario',
      action: 'FILE_DOWNLOAD',
      entity: 'Archivo',
      entityId: 'file_456',
      severity: 'LOW',
      ipAddress: '192.168.2.45',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      details: { 
        fileName: 'presentacion_proyecto.pptx',
        fileSize: 15360000,
        projectId: 'proj_456',
        downloadReason: 'revision'
      },
      result: 'SUCCESS',
      sessionId: 'sess_pqr678',
      location: 'Bogotá, Colombia'
    },
    // Eventos de usuarios
    {
      id: '8',
      timestamp: new Date(Date.now() - 150 * 60 * 1000),
      actor: 'Ana García',
      actorEmail: 'ana.garcia@drimsoft.com',
      actorRole: 'Admin DrimSoft',
      organization: 'DrimSoft',
      action: 'USER_CREATE',
      entity: 'Usuario',
      entityId: 'user_new_001',
      severity: 'MEDIUM',
      ipAddress: '192.168.1.5',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
      details: { 
        newUserEmail: 'nuevo.profesor@andes.edu.co',
        newUserRole: 'Manager',
        organization: 'Universidad de los Andes',
        permissions: ['project_create', 'user_manage']
      },
      result: 'SUCCESS',
      sessionId: 'sess_stu901',
      location: 'Bogotá, Colombia'
    },
    {
      id: '9',
      timestamp: new Date(Date.now() - 180 * 60 * 1000),
      actor: 'Andrés Morales',
      actorEmail: 'andres.morales@uniandes.edu.co',
      actorRole: 'Admin Organización',
      organization: 'Universidad de los Andes',
      action: 'PERMISSION_CHANGE',
      entity: 'Usuario',
      entityId: 'user_234',
      severity: 'HIGH',
      ipAddress: '192.168.3.12',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      details: { 
        targetUser: 'patricia.ruiz@uniandes.edu.co',
        oldPermissions: ['project_read'],
        newPermissions: ['project_read', 'project_create', 'file_upload'],
        reason: 'promotion_to_manager'
      },
      result: 'SUCCESS',
      sessionId: 'sess_vwx234',
      location: 'Bogotá, Colombia'
    },
    // Eventos de sistema
    {
      id: '10',
      timestamp: new Date(Date.now() - 240 * 60 * 1000),
      actor: 'Sistema',
      actorEmail: 'system@drimsoft.com',
      actorRole: 'System',
      organization: 'DrimSoft',
      action: 'BACKUP_CREATE',
      entity: 'Sistema',
      entityId: 'backup_001',
      severity: 'LOW',
      ipAddress: '127.0.0.1',
      userAgent: 'Planifika-Backup-Service/1.0',
      details: { 
        backupType: 'full',
        size: '2.5GB',
        duration: 1800,
        location: 's3://planifika-backups/'
      },
      result: 'SUCCESS',
      sessionId: 'sess_system',
      location: 'Servidor Principal'
    },
    {
      id: '11',
      timestamp: new Date(Date.now() - 300 * 60 * 1000),
      actor: 'Fernando Castro',
      actorEmail: 'fernando.castro@unal.edu.co',
      actorRole: 'Admin Organización',
      organization: 'Universidad Nacional de Colombia',
      action: 'DATA_EXPORT',
      entity: 'Datos',
      entityId: 'export_001',
      severity: 'HIGH',
      ipAddress: '192.168.4.78',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      details: { 
        dataType: 'project_data',
        recordCount: 1250,
        format: 'CSV',
        reason: 'annual_report',
        dataRetention: '30_days'
      },
      result: 'SUCCESS',
      sessionId: 'sess_yza567',
      location: 'Bogotá, Colombia'
    },
    {
      id: '12',
      timestamp: new Date(Date.now() - 360 * 60 * 1000),
      actor: 'Sistema',
      actorEmail: 'security@drimsoft.com',
      actorRole: 'Security System',
      organization: 'DrimSoft',
      action: 'SECURITY_ALERT',
      entity: 'Sistema',
      entityId: 'alert_001',
      severity: 'CRITICAL',
      ipAddress: '127.0.0.1',
      userAgent: 'Planifika-Security-Monitor/1.0',
      details: { 
        alertType: 'multiple_failed_logins',
        sourceIP: '203.45.67.89',
        attempts: 15,
        timeWindow: '10_minutes',
        action: 'ip_blocked'
      },
      result: 'SUCCESS',
      sessionId: 'sess_security',
      location: 'Servidor de Seguridad'
    },
    {
      id: '13',
      timestamp: new Date(Date.now() - 420 * 60 * 1000),
      actor: 'Elena Rodriguez',
      actorEmail: 'elena.rodriguez@drimsoft.com',
      actorRole: 'Admin DrimSoft',
      organization: 'DrimSoft',
      action: 'SYSTEM_CONFIG',
      entity: 'Sistema',
      entityId: 'config_001',
      severity: 'HIGH',
      ipAddress: '192.168.1.8',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
      details: { 
        configType: 'security_policy',
        changes: {
          passwordMinLength: '8->12',
          sessionTimeout: '30min->15min',
          mfaRequired: 'false->true'
        },
        reason: 'security_enhancement'
      },
      result: 'SUCCESS',
      sessionId: 'sess_bcd890',
      location: 'Bogotá, Colombia'
    },
    {
      id: '14',
      timestamp: new Date(Date.now() - 480 * 60 * 1000),
      actor: 'Isabel Torres',
      actorEmail: 'isabel.torres@unal.edu.co',
      actorRole: 'Member',
      organization: 'Universidad Nacional de Colombia',
      action: 'PROJECT_DELETE',
      entity: 'Proyecto Académico',
      entityId: 'proj_999',
      severity: 'HIGH',
      ipAddress: '192.168.4.56',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      details: { 
        projectName: 'Proyecto de Prueba',
        projectAge: '30_days',
        dataSize: '150MB',
        reason: 'duplicate_project'
      },
      result: 'SUCCESS',
      sessionId: 'sess_efg123',
      location: 'Bogotá, Colombia'
    },
    {
      id: '15',
      timestamp: new Date(Date.now() - 540 * 60 * 1000),
      actor: 'Sistema',
      actorEmail: 'compliance@drimsoft.com',
      actorRole: 'Compliance System',
      organization: 'DrimSoft',
      action: 'COMPLIANCE_CHECK',
      entity: 'Sistema',
      entityId: 'compliance_001',
      severity: 'MEDIUM',
      ipAddress: '127.0.0.1',
      userAgent: 'Planifika-Compliance-Checker/1.0',
      details: { 
        checkType: 'data_retention',
        status: 'compliant',
        findings: 0,
        nextCheck: '2024-01-15T00:00:00Z'
      },
      result: 'SUCCESS',
      sessionId: 'sess_compliance',
      location: 'Servidor de Cumplimiento'
    }
  ]

  // Filtrar logs basado en búsqueda y filtros
  const filteredLogs = mockAuditLogs.filter(log => {
    const matchesSearch = !search || 
      log.actor.toLowerCase().includes(search.toLowerCase()) ||
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.entity.toLowerCase().includes(search.toLowerCase()) ||
      log.organization.toLowerCase().includes(search.toLowerCase())
    
    const matchesSeverity = selectedSeverity === 'all' || log.severity === selectedSeverity
    const matchesAction = selectedAction === 'all' || log.action === selectedAction
    const matchesOrganization = selectedOrganization === 'all' || log.organization === selectedOrganization
    
    return matchesSearch && matchesSeverity && matchesAction && matchesOrganization
  })

  // Paginación
  const limit = 20
  const totalPages = Math.ceil(filteredLogs.length / limit)
  const startIndex = (page - 1) * limit
  const logs = filteredLogs.slice(startIndex, startIndex + limit)

  // Calcular estadísticas
  const criticalLogs = filteredLogs.filter(log => log.severity === 'CRITICAL').length
  const highLogs = filteredLogs.filter(log => log.severity === 'HIGH').length
  const failedLogs = filteredLogs.filter(log => log.result === 'FAILED').length
  const recentLogs = filteredLogs.filter(log => {
    const logDate = new Date(log.timestamp)
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    return logDate >= yesterday
  }).length

  // Obtener organizaciones únicas para filtro
  const organizations = Array.from(new Set(mockAuditLogs.map(log => log.organization)))
  const actions = Array.from(new Set(mockAuditLogs.map(log => log.action)))

  const getSeverityColor = (severity: AuditSeverity) => {
    switch (severity) {
      case 'CRITICAL': return 'bg-red-100 text-red-800 border-red-200'
      case 'HIGH': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'LOW': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getResultColor = (result: string) => {
    switch (result) {
      case 'SUCCESS': return 'bg-green-100 text-green-800 border-green-200'
      case 'FAILED': return 'bg-red-100 text-red-800 border-red-200'
      case 'WARNING': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const formatDateTime = (date: Date) => {
    return new Intl.DateTimeFormat('es-CO', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(date)
  }

  const exportLogs = () => {
    const csvContent = logs.map(log => 
      `${log.timestamp.toISOString()},${log.actor},${log.actorEmail},${log.organization},${log.action},${log.entity},${log.severity},${log.result},${log.ipAddress}`
    ).join('\n')
    
    const blob = new Blob([`Timestamp,Actor,Email,Organización,Acción,Entidad,Severidad,Resultado,IP\n${csvContent}`], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `auditoria-planifika-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Auditoría de Seguridad</h1>
          <p className="text-muted-foreground">
            Monitoreo completo de actividad, seguridad y cumplimiento normativo
          </p>
        </div>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
          <Button variant="outline" className="w-full sm:w-auto">
            <Filter className="h-4 w-4 mr-2" />
            Filtros Avanzados
          </Button>
          <Button onClick={exportLogs} className="w-full sm:w-auto">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Métricas de Seguridad */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Eventos</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredLogs.length}</div>
            <p className="text-xs text-muted-foreground">
              Últimas 24h: {recentLogs}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Eventos Críticos</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{criticalLogs}</div>
            <p className="text-xs text-red-600">
              Requieren atención inmediata
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alta Prioridad</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{highLogs}</div>
            <p className="text-xs text-orange-600">
              Revisar en las próximas horas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Eventos Fallidos</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{failedLogs}</div>
            <p className="text-xs text-muted-foreground">
              Intentos de acceso fallidos
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros y Búsqueda */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filtros y Búsqueda</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por actor, acción o entidad..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value as AuditSeverity | 'all')}
              className="px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Todas las Severidades</option>
              <option value="CRITICAL">Crítico</option>
              <option value="HIGH">Alto</option>
              <option value="MEDIUM">Medio</option>
              <option value="LOW">Bajo</option>
            </select>
            <select
              value={selectedAction}
              onChange={(e) => setSelectedAction(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Todas las Acciones</option>
              {actions.map(action => (
                <option key={action} value={action}>{action}</option>
              ))}
            </select>
            <select
              value={selectedOrganization}
              onChange={(e) => setSelectedOrganization(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Todas las Organizaciones</option>
              {organizations.map(org => (
                <option key={org} value={org}>{org}</option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Reportes de Auditoría */}
      <Tabs defaultValue="actividad" className="space-y-4">
        <TabsList>
          <TabsTrigger value="actividad">Actividad Reciente</TabsTrigger>
          <TabsTrigger value="seguridad">Seguridad</TabsTrigger>
          <TabsTrigger value="usuarios">Usuarios</TabsTrigger>
          <TabsTrigger value="sistema">Sistema</TabsTrigger>
        </TabsList>

        <TabsContent value="actividad" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-blue-500" />
                <span>Registro de Actividad</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Timestamp</TableHead>
                        <TableHead>Actor</TableHead>
                        <TableHead>Acción</TableHead>
                        <TableHead>Entidad</TableHead>
                        <TableHead>Severidad</TableHead>
                        <TableHead>Resultado</TableHead>
                        <TableHead>IP</TableHead>
                        <TableHead>Detalles</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                    {logs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="font-mono text-xs">
                          {formatDateTime(log.timestamp)}
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{log.actor}</div>
                            <div className="text-xs text-muted-foreground">{log.actorEmail}</div>
                            <div className="text-xs text-muted-foreground">{log.organization}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="font-mono text-xs">
                            {log.action}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{log.entity}</div>
                            <div className="text-xs text-muted-foreground">
                              ID: {log.entityId}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getSeverityColor(log.severity)}>
                            {log.severity}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getResultColor(log.result)}>
                            {log.result}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-mono text-xs">
                          {log.ipAddress}
                        </TableCell>
                        <TableCell className="max-w-xs">
                          <div className="text-xs text-muted-foreground">
                            <div className="truncate">
                              {JSON.stringify(log.details).substring(0, 50)}...
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Paginación */}
                {totalPages > 1 && (
                  <div className="flex justify-center space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => setPage(page - 1)}
                      disabled={page <= 1}
                    >
                      Anterior
                    </Button>
                    <span className="flex items-center px-4">
                      Página {page} de {totalPages}
                    </span>
                    <Button
                      variant="outline"
                      onClick={() => setPage(page + 1)}
                      disabled={page >= totalPages}
                    >
                      Siguiente
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seguridad" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-red-500" />
                  <span>Alertas de Seguridad</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredLogs
                    .filter(log => log.severity === 'CRITICAL' || log.severity === 'HIGH')
                    .slice(0, 5)
                    .map((log) => (
                    <div key={log.id} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium">{log.action}</div>
                          <div className="text-sm text-muted-foreground">{log.actor}</div>
                          <div className="text-xs text-muted-foreground">
                            {formatDateTime(log.timestamp)}
                          </div>
                        </div>
                        <Badge className={getSeverityColor(log.severity)}>
                          {log.severity}
                        </Badge>
                      </div>
                      <div className="mt-2 text-xs text-muted-foreground">
                        IP: {log.ipAddress} • {log.location}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lock className="h-5 w-5 text-orange-500" />
                  <span>Intentos de Acceso</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredLogs
                    .filter(log => log.action === 'LOGIN_FAILED' || log.result === 'FAILED')
                    .slice(0, 5)
                    .map((log) => (
                    <div key={log.id} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium text-red-600">Acceso Fallido</div>
                          <div className="text-sm text-muted-foreground">{log.actor}</div>
                          <div className="text-xs text-muted-foreground">
                            {formatDateTime(log.timestamp)}
                          </div>
                        </div>
                        <Badge className="bg-red-100 text-red-800 border-red-200">
                          FALLIDO
                        </Badge>
                      </div>
                      <div className="mt-2 text-xs text-muted-foreground">
                        IP: {log.ipAddress} • Intentos: {log.details.attempts || 'N/A'}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="usuarios" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-blue-500" />
                <span>Actividad de Usuarios</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredLogs
                  .filter(log => log.action.includes('USER_') || log.action.includes('PERMISSION_'))
                  .slice(0, 10)
                  .map((log) => (
                  <div key={log.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{log.actor}</div>
                        <div className="text-sm text-muted-foreground">{log.action}</div>
                        <div className="text-xs text-muted-foreground">
                          {formatDateTime(log.timestamp)}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={getSeverityColor(log.severity)}>
                        {log.severity}
                      </Badge>
                      <div className="text-xs text-muted-foreground mt-1">
                        {log.organization}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sistema" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5 text-purple-500" />
                <span>Eventos del Sistema</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredLogs
                  .filter(log => log.actor === 'Sistema' || log.action.includes('SYSTEM_') || log.action.includes('BACKUP_'))
                  .slice(0, 10)
                  .map((log) => (
                  <div key={log.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Database className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{log.action}</div>
                        <div className="text-sm text-muted-foreground">{log.entity}</div>
                        <div className="text-xs text-muted-foreground">
                          {formatDateTime(log.timestamp)}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={getResultColor(log.result)}>
                        {log.result}
                      </Badge>
                      <div className="text-xs text-muted-foreground mt-1">
                        {log.location}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}