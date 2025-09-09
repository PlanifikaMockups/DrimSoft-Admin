import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/services/api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Settings, Mail, DollarSign, Calendar, Plug, 
  Check, X, TestTube, Shield, Database
} from 'lucide-react'

export function ConfigPage() {
  const { data: config } = useQuery({
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

  const integrations = [
    {
      name: 'Email/SMTP',
      icon: Mail,
      enabled: config?.integrations?.email?.enabled || false,
      configured: config?.integrations?.email?.configured || false,
      description: 'Email notifications and SMTP configuration'
    },
    {
      name: 'SIIGO',
      icon: DollarSign,
      enabled: config?.integrations?.siigo?.enabled || false,
      configured: config?.integrations?.siigo?.configured || false,
      description: 'Financial and accounting system integration'
    },
    {
      name: 'Calendar',
      icon: Calendar,
      enabled: config?.integrations?.calendar?.enabled || false,
      configured: config?.integrations?.calendar?.configured || false,
      description: 'Calendar and scheduling integration'
    }
  ]

  const features = [
    {
      name: 'Audit Logs',
      enabled: config?.features?.auditLogs || false,
      description: 'System-wide audit logging and monitoring'
    },
    {
      name: 'Advanced Reports',
      enabled: config?.features?.advancedReports || false,
      description: 'Enhanced reporting and analytics features'
    },
    {
      name: 'API Access',
      enabled: config?.features?.apiAccess || false,
      description: 'REST API access for integrations'
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
                      {feature.enabled ? (
                        <Check className="h-5 w-5 text-green-500" />
                      ) : (
                        <X className="h-5 w-5 text-gray-400" />
                      )}
                      <Badge variant={feature.enabled ? 'default' : 'secondary'}>
                        {feature.enabled ? 'Enabled' : 'Disabled'}
                      </Badge>
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
                  <Badge variant="default">Enabled</Badge>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-xl">
                  <div>
                    <h4 className="font-medium">IP Allowlist</h4>
                    <p className="text-sm text-muted-foreground">
                      Restrict access to specific IP addresses
                    </p>
                  </div>
                  <Badge variant="secondary">Disabled</Badge>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-xl">
                  <div>
                    <h4 className="font-medium">Session Timeout</h4>
                    <p className="text-sm text-muted-foreground">
                      Auto-logout after 8 hours of inactivity
                    </p>
                  </div>
                  <Badge variant="default">8 hours</Badge>
                </div>
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
                  <Badge variant="default">Active</Badge>
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
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}