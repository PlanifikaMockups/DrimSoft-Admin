import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useParams, Link } from 'react-router-dom'
import { api } from '@/services/api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { 
  Building2, MapPin, Phone, Globe, Users, FolderOpen, 
  TrendingUp, ChevronLeft, Calendar, DollarSign
} from 'lucide-react'
import { Organization, Project } from '@/types'
import { formatDate, formatCurrency, formatPercentage, getStatusColor } from '@/lib/utils'
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer,
  LineChart, Line
} from 'recharts'

export function InstitutionDetailPage() {
  const { id } = useParams<{ id: string }>()

  const { data: organization } = useQuery({
    queryKey: ['organization', id],
    queryFn: async () => {
      const response = await api.get<Organization>(`/organizations/${id}`)
      return response.data
    }
  })

  const { data: projects } = useQuery({
    queryKey: ['organization', id, 'projects'],
    queryFn: async () => {
      const response = await api.get<{ data: Project[] }>(`/organizations/${id}/projects`)
      return response.data.data
    }
  })

  const { data: usageData } = useQuery({
    queryKey: ['organization', id, 'usage'],
    queryFn: async () => {
      // Mock usage data
      return Array.from({ length: 12 }, (_, i) => ({
        name: `Week ${i + 1}`,
        users: Math.floor(Math.random() * 100) + 50,
        sessions: Math.floor(Math.random() * 500) + 200,
      }))
    }
  })

  if (!organization) {
    return <div>Loading...</div>
  }

  const activeProjects = projects?.filter(p => p.status === 'En curso').length || 0
  const totalBudget = projects?.reduce((sum, p) => sum + p.budget, 0) || 0
  const avgProgress = projects?.length ? 
    projects.reduce((sum, p) => sum + p.percentageProgress, 0) / projects.length : 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/institutions">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Organizations
            </Link>
          </Button>
        </div>
      </div>

      {/* Organization Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start space-x-6">
            {organization.photoURL ? (
              <img
                src={organization.photoURL}
                alt={organization.name}
                className="w-20 h-20 rounded-2xl object-cover"
              />
            ) : (
              <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-2xl">
                  {organization.name.charAt(0)}
                </span>
              </div>
            )}
            
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold">{organization.name}</h1>
                  <div className="flex items-center space-x-4 mt-2 text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{organization.address}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Phone className="h-4 w-4" />
                      <span>{organization.phone}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Globe className="h-4 w-4" />
                      <span>{organization.domain}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(organization.status)}>
                    {organization.status}
                  </Badge>
                  <Badge variant="outline">{organization.plan}</Badge>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">{organization.projectCount}</div>
                  <div className="text-sm text-muted-foreground">Total Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{activeProjects}</div>
                  <div className="text-sm text-muted-foreground">Active Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{organization.mau.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Monthly Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{formatPercentage(avgProgress)}</div>
                  <div className="text-sm text-muted-foreground">Avg Progress</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Information Tabs */}
      <Tabs defaultValue="summary" className="space-y-4">
        <TabsList>
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="usage">Usage</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="tickets">Support</TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Organization Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Created</span>
                  <span>{formatDate(organization.createdAt)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Updated</span>
                  <span>{formatDate(organization.updatedAt)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Plan</span>
                  <Badge variant="outline">{organization.plan}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Budget</span>
                  <span className="font-medium">{formatCurrency(totalBudget)}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Usage Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={usageData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Line type="monotone" dataKey="users" stroke="#3B82F6" strokeWidth={2} />
                    <Line type="monotone" dataKey="sessions" stroke="#22C55E" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="projects" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Projects</CardTitle>
            </CardHeader>
            <CardContent>
              {projects?.length ? (
                <div className="space-y-4">
                  {projects.map((project) => (
                    <div key={project.id} className="flex items-center justify-between p-4 border rounded-xl">
                      <div className="flex-1">
                        <h4 className="font-medium">{project.name}</h4>
                        <p className="text-sm text-muted-foreground">{project.description}</p>
                        <div className="flex items-center space-x-4 mt-2 text-sm">
                          <span>Progress: {formatPercentage(project.percentageProgress)}</span>
                          <span>Budget: {formatCurrency(project.budget)}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(project.status)}>
                          {project.status}
                        </Badge>
                        <Button variant="ghost" size="sm" asChild>
                          <Link to={`/projects/${project.id}`}>View</Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No projects found for this organization
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Usage Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={usageData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Bar dataKey="users" fill="#3B82F6" name="Active Users" />
                  <Bar dataKey="sessions" fill="#22C55E" name="Sessions" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Billing Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                Billing information coming soon...
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tickets" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Support Tickets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                Support ticket integration coming soon...
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}