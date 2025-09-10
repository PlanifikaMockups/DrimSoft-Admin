import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/services/api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Settings, Mail, DollarSign, Calendar, Plug, 
  Check, X, TestTube, Shield, Database, Save, 
  RefreshCw, Download, Upload, Key, Lock, 
  Server, Users, Globe, AlertTriangle, UserPlus
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { SystemPermission, SystemConfig } from '@/types'

export function ConfigPage() {
  const { hasPermission, isAdmin, isSuperAdmin } = useAuth()
  const [config, setConfig] = useState<SystemConfig>({
    features: {
      auditLogs: true,
      advancedReports: true,
      apiAccess: false,
      realTimeMonitoring: true
    },
    integrations: {
      email: {
        enabled: true,
        configured: false,
        smtpHost: '',
        smtpPort: 587,
        smtpUser: ''
      },
      siigo: {
        enabled: false,
        configured: false,
        apiKey: '',
        baseUrl: ''
      },
      calendar: {
        enabled: false,
        configured: false,
        provider: 'google',
        apiKey: ''
      }
    },
    security: {
      twoFactorAuth: true,
      ipAllowlist: false,
      sessionTimeout: 8,
      passwordPolicy: {
        minLength: 8,
        requireUppercase: true,
        requireNumbers: true,
        requireSpecialChars: true
      }
    },
    database: {
      backupEnabled: true,
      backupFrequency: 'daily',
      retentionDays: 30
    }
  })

  const { data: systemConfig } = useQuery({
    queryKey: ['system', 'config'],
    queryFn: async () => {
      const response = await api.get('/system/config')
      return response.data
    }
  })

  const testIntegration = (integration: string) => {
    // Mock test functionality
    alert(`Testing ${integration} integration...`)
  }

  const saveConfig = () => {
    // Aquí se implementaría la lógica para guardar la configuración
    console.log('Guardando configuración:', config)
    alert('Configuración guardada exitosamente')
  }

  const updateConfig = (section: keyof SystemConfig, updates: any) => {
    setConfig(prev => ({
      ...prev,
      [section]: { ...prev[section], ...updates }
    }))
  }

  const updateFeature = (feature: string, enabled: boolean) => {
    setConfig(prev => ({
      ...prev,
      features: { ...prev.features, [feature]: enabled }
    }))
  }

  const updateIntegration = (integration: string, updates: any) => {
    setConfig(prev => ({
      ...prev,
      integrations: {
        ...prev.integrations,
        [integration]: { ...prev.integrations[integration as keyof typeof prev.integrations], ...updates }
      }
    }))
  }

  const integrations = [
    {
      name: 'Email/SMTP',
      icon: Mail,
      enabled: config.integrations.email.enabled,
      configured: config.integrations.email.configured,
      description: 'Email notifications and SMTP configuration',
      key: 'email'
    },
    {
      name: 'SIIGO',
      icon: DollarSign,
      enabled: config.integrations.siigo.enabled,
      configured: config.integrations.siigo.configured,
      description: 'Financial and accounting system integration',
      key: 'siigo'
    },
    {
      name: 'Calendar',
      icon: Calendar,
      enabled: config.integrations.calendar.enabled,
      configured: config.integrations.calendar.configured,
      description: 'Calendar and scheduling integration',
      key: 'calendar'
    }
  ]

  const features = [
    {
      name: 'Audit Logs',
      enabled: config.features.auditLogs,
      description: 'System-wide audit logging and monitoring',
      key: 'auditLogs'
    },
    {
      name: 'Advanced Reports',
      enabled: config.features.advancedReports,
      description: 'Enhanced reporting and analytics features',
      key: 'advancedReports'
    },
    {
      name: 'API Access',
      enabled: config.features.apiAccess,
      description: 'REST API access for integrations',
      key: 'apiAccess'
    },
    {
      name: 'Real-time Monitoring',
      enabled: config.features.realTimeMonitoring,
      description: 'Real-time system monitoring and alerts',
      key: 'realTimeMonitoring'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Configuración</h1>
        <p className="text-muted-foreground">
          Configuraciones del sistema, integraciones y gestión de características
        </p>
      </div>

      <Tabs defaultValue="integrations" className="space-y-4">
        <TabsList>
          <TabsTrigger value="integrations">Integraciones</TabsTrigger>
          <TabsTrigger value="features">Características</TabsTrigger>
          <TabsTrigger value="security">Seguridad</TabsTrigger>
          <TabsTrigger value="database">Base de Datos</TabsTrigger>
          {hasPermission(SystemPermission.SYSTEM_CONFIG) && (
            <TabsTrigger value="admin">Administración</TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Plug className="h-5 w-5" />
                <span>External Integrations</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {integrations.map((integration) => (
                  <div key={integration.name} className="flex items-center justify-between p-4 border rounded-xl">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                        <integration.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">{integration.name}</h4>
                        <p className="text-sm text-muted-foreground">{integration.description}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge variant={integration.enabled ? 'default' : 'secondary'}>
                            {integration.enabled ? 'Enabled' : 'Disabled'}
                          </Badge>
                          <Badge variant={integration.configured ? 'default' : 'destructive'}>
                            {integration.configured ? 'Configured' : 'Not Configured'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => testIntegration(integration.name)}
                        disabled={!integration.configured}
                      >
                        <TestTube className="h-4 w-4 mr-1" />
                        Test
                      </Button>
                      {hasPermission(SystemPermission.SYSTEM_INTEGRATIONS) && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => updateIntegration(integration.key, { enabled: !integration.enabled })}
                        >
                          {integration.enabled ? 'Deshabilitar' : 'Habilitar'}
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        Configure
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>Feature Flags</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {features.map((feature) => (
                  <div key={feature.name} className="flex items-center justify-between p-4 border rounded-xl">
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${
                        feature.enabled ? 'bg-green-500' : 'bg-gray-300'
                      }`} />
                      <div>
                        <h4 className="font-medium">{feature.name}</h4>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {hasPermission(SystemPermission.SYSTEM_FEATURES) ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateFeature(feature.key, !feature.enabled)}
                        >
                          {feature.enabled ? 'Deshabilitar' : 'Habilitar'}
                        </Button>
                      ) : (
                        <>
                          {feature.enabled ? (
                            <Check className="h-5 w-5 text-green-500" />
                          ) : (
                            <X className="h-5 w-5 text-gray-400" />
                          )}
                          <Badge variant={feature.enabled ? 'default' : 'secondary'}>
                            {feature.enabled ? 'Enabled' : 'Disabled'}
                          </Badge>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Security Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 border rounded-xl">
                  <div>
                    <h4 className="font-medium">Two-Factor Authentication</h4>
                    <p className="text-sm text-muted-foreground">
                      Require 2FA for all DrimSoft accounts
                    </p>
                  </div>
                  {hasPermission(SystemPermission.SYSTEM_SECURITY) ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateConfig('security', { twoFactorAuth: !config.security.twoFactorAuth })}
                    >
                      {config.security.twoFactorAuth ? 'Deshabilitar' : 'Habilitar'}
                    </Button>
                  ) : (
                    <Badge variant={config.security.twoFactorAuth ? 'default' : 'secondary'}>
                      {config.security.twoFactorAuth ? 'Enabled' : 'Disabled'}
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-between p-4 border rounded-xl">
                  <div>
                    <h4 className="font-medium">IP Allowlist</h4>
                    <p className="text-sm text-muted-foreground">
                      Restrict access to specific IP addresses
                    </p>
                  </div>
                  {hasPermission(SystemPermission.SYSTEM_SECURITY) ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateConfig('security', { ipAllowlist: !config.security.ipAllowlist })}
                    >
                      {config.security.ipAllowlist ? 'Deshabilitar' : 'Habilitar'}
                    </Button>
                  ) : (
                    <Badge variant={config.security.ipAllowlist ? 'default' : 'secondary'}>
                      {config.security.ipAllowlist ? 'Enabled' : 'Disabled'}
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-between p-4 border rounded-xl">
                  <div>
                    <h4 className="font-medium">Session Timeout</h4>
                    <p className="text-sm text-muted-foreground">
                      Auto-logout after inactivity
                    </p>
                  </div>
                  {hasPermission(SystemPermission.SYSTEM_SECURITY) ? (
                    <div className="flex items-center space-x-2">
                      <Input
                        type="number"
                        value={config.security.sessionTimeout}
                        onChange={(e) => updateConfig('security', { sessionTimeout: parseInt(e.target.value) })}
                        className="w-20"
                        min="1"
                        max="24"
                      />
                      <span className="text-sm text-muted-foreground">horas</span>
                    </div>
                  ) : (
                    <Badge variant="default">{config.security.sessionTimeout} hours</Badge>
                  )}
                </div>

                {hasPermission(SystemPermission.SYSTEM_SECURITY) && (
                  <div className="p-4 border rounded-xl">
                    <h4 className="font-medium mb-4">Password Policy</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Minimum Length</span>
                        <Input
                          type="number"
                          value={config.security.passwordPolicy.minLength}
                          onChange={(e) => updateConfig('security', {
                            passwordPolicy: {
                              ...config.security.passwordPolicy,
                              minLength: parseInt(e.target.value)
                            }
                          })}
                          className="w-20"
                          min="6"
                          max="20"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Require Uppercase</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateConfig('security', {
                            passwordPolicy: {
                              ...config.security.passwordPolicy,
                              requireUppercase: !config.security.passwordPolicy.requireUppercase
                            }
                          })}
                        >
                          {config.security.passwordPolicy.requireUppercase ? 'Yes' : 'No'}
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Require Numbers</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateConfig('security', {
                            passwordPolicy: {
                              ...config.security.passwordPolicy,
                              requireNumbers: !config.security.passwordPolicy.requireNumbers
                            }
                          })}
                        >
                          {config.security.passwordPolicy.requireNumbers ? 'Yes' : 'No'}
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Require Special Characters</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateConfig('security', {
                            passwordPolicy: {
                              ...config.security.passwordPolicy,
                              requireSpecialChars: !config.security.passwordPolicy.requireSpecialChars
                            }
                          })}
                        >
                          {config.security.passwordPolicy.requireSpecialChars ? 'Yes' : 'No'}
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="database" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="h-5 w-5" />
                <span>Database Management</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 border rounded-xl">
                  <div>
                    <h4 className="font-medium">Backup Status</h4>
                    <p className="text-sm text-muted-foreground">
                      Last backup: 2 hours ago
                    </p>
                  </div>
                  {hasPermission(SystemPermission.SYSTEM_DATABASE) ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateConfig('database', { backupEnabled: !config.database.backupEnabled })}
                    >
                      {config.database.backupEnabled ? 'Deshabilitar' : 'Habilitar'}
                    </Button>
                  ) : (
                    <Badge variant={config.database.backupEnabled ? 'default' : 'secondary'}>
                      {config.database.backupEnabled ? 'Active' : 'Inactive'}
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-between p-4 border rounded-xl">
                  <div>
                    <h4 className="font-medium">Database Size</h4>
                    <p className="text-sm text-muted-foreground">
                      Current database size and growth
                    </p>
                  </div>
                  <Badge variant="outline">2.4 GB</Badge>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-xl">
                  <div>
                    <h4 className="font-medium">Connection Pool</h4>
                    <p className="text-sm text-muted-foreground">
                      Active database connections
                    </p>
                  </div>
                  <Badge variant="default">12/50</Badge>
                </div>

                {hasPermission(SystemPermission.SYSTEM_DATABASE) && (
                  <div className="p-4 border rounded-xl">
                    <h4 className="font-medium mb-4">Backup Configuration</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Backup Frequency</span>
                        <select
                          value={config.database.backupFrequency}
                          onChange={(e) => updateConfig('database', { backupFrequency: e.target.value })}
                          className="p-2 border rounded-md"
                        >
                          <option value="hourly">Hourly</option>
                          <option value="daily">Daily</option>
                          <option value="weekly">Weekly</option>
                        </select>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Retention Days</span>
                        <Input
                          type="number"
                          value={config.database.retentionDays}
                          onChange={(e) => updateConfig('database', { retentionDays: parseInt(e.target.value) })}
                          className="w-20"
                          min="1"
                          max="365"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {hasPermission(SystemPermission.SYSTEM_CONFIG) && (
          <TabsContent value="admin" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <span>System Administration</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Users className="h-4 w-4" />
                          <span>User Management</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <Button variant="outline" className="w-full justify-start">
                            <UserPlus className="h-4 w-4 mr-2" />
                            Bulk User Import
                          </Button>
                          <Button variant="outline" className="w-full justify-start">
                            <Download className="h-4 w-4 mr-2" />
                            Export User Data
                          </Button>
                          <Button variant="outline" className="w-full justify-start">
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Sync User Roles
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Server className="h-4 w-4" />
                          <span>System Operations</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <Button variant="outline" className="w-full justify-start">
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Clear Cache
                          </Button>
                          <Button variant="outline" className="w-full justify-start">
                            <Database className="h-4 w-4 mr-2" />
                            Database Maintenance
                          </Button>
                          <Button variant="outline" className="w-full justify-start">
                            <Globe className="h-4 w-4 mr-2" />
                            System Health Check
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Key className="h-4 w-4" />
                          <span>API Management</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <Button variant="outline" className="w-full justify-start">
                            <Key className="h-4 w-4 mr-2" />
                            Generate API Keys
                          </Button>
                          <Button variant="outline" className="w-full justify-start">
                            <Lock className="h-4 w-4 mr-2" />
                            Revoke API Access
                          </Button>
                          <Button variant="outline" className="w-full justify-start">
                            <Download className="h-4 w-4 mr-2" />
                            Export API Logs
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <AlertTriangle className="h-4 w-4" />
                          <span>Emergency Actions</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <Button variant="destructive" className="w-full justify-start">
                            <AlertTriangle className="h-4 w-4 mr-2" />
                            Emergency Shutdown
                          </Button>
                          <Button variant="destructive" className="w-full justify-start">
                            <Lock className="h-4 w-4 mr-2" />
                            Lock All Users
                          </Button>
                          <Button variant="destructive" className="w-full justify-start">
                            <Database className="h-4 w-4 mr-2" />
                            Force Backup
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button variant="outline">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Reset to Defaults
                    </Button>
                    <Button onClick={saveConfig}>
                      <Save className="h-4 w-4 mr-2" />
                      Save All Changes
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}