import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useParams, Link } from 'react-router-dom'
import { api } from '@/services/api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { 
  ChevronLeft, Calendar, DollarSign, Users, Clock,
  Target, TrendingUp, AlertTriangle
} from 'lucide-react'
import { Project } from '@/types'
import { formatDate, formatCurrency, formatPercentage, getStatusColor } from '@/lib/utils'
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell
} from 'recharts'

const COLORS = ['#22C55E', '#3B82F6', '#F59E0B', '#EF4444']

export function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>()

  const { data: project } = useQuery({
    queryKey: ['project', id],
    queryFn: async () => {
      const response = await api.get<Project>(`/projects/${id}`)
      return response.data
    }
  })

  // Mock data for phases, tasks, etc.
  const mockPhases = [
    { name: 'Planning', status: 'Completada', progress: 1.0, tasks: 8 },
    { name: 'Development', status: 'En progreso', progress: 0.75, tasks: 15 },
    { name: 'Testing', status: 'No iniciada', progress: 0.0, tasks: 6 },
    { name: 'Deployment', status: 'No iniciada', progress: 0.0, tasks: 4 },
  ]

  const mockTasks = [
    { id: '1', name: 'Database Design', status: 'Hecho', assignee: 'Ana García', priority: 'Alta' },
    { id: '2', name: 'API Development', status: 'En progreso', assignee: 'Carlos Mendez', priority: 'Alta' },
    { id: '3', name: 'Frontend Components', status: 'En progreso', assignee: 'Elena Rodriguez', priority: 'Media' },
    { id: '4', name: 'Integration Testing', status: 'Por hacer', assignee: 'Ana García', priority: 'Media' },
    { id: '5', name: 'Performance Optimization', status: 'Por hacer', assignee: 'Carlos Mendez', priority: 'Baja' },
  ]

  const mockProgressData = Array.from({ length: 12 }, (_, i) => ({
    week: `Week ${i + 1}`,
    planned: Math.min(100, (i + 1) * 8),
    actual: Math.min(100, (i + 1) * 7 + Math.random() * 5),
  }))

  if (!project) {
    return <div>Loading...</div>
  }

  const budgetRemaining = project.budget - project.cost
  const isOverBudget = project.percentageBudgetExecution > 1
  const daysUntilDeadline = Math.ceil(
    (new Date(project.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/projects">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Volver a Proyectos
            </Link>
          </Button>
        </div>
      </div>

      {/* Project Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-3xl font-bold">{project.name}</h1>
                <Badge className={getStatusColor(project.status)}>
                  {project.status}
                </Badge>
              </div>
              
              <p className="text-muted-foreground mb-4">{project.description}</p>
              
              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(project.startDate)} - {formatDate(project.endDate)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{daysUntilDeadline > 0 ? `${daysUntilDeadline} days left` : 'Overdue'}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>{project.organization?.name}</span>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <Badge variant="outline" className="mb-2">{project.type}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progress</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPercentage(project.percentageProgress)}</div>
            <div className="w-full bg-secondary rounded-full h-2 mt-2">
              <div
                className="bg-primary h-2 rounded-full transition-all"
                style={{ width: `${project.percentageProgress * 100}%` }}
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Budget</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(project.budget)}</div>
            <p className="text-xs text-muted-foreground">
              <span className={isOverBudget ? 'text-red-600' : 'text-green-600'}>
                {formatCurrency(budgetRemaining)} remaining
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Budget Used</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${isOverBudget ? 'text-red-600' : ''}`}>
              {formatPercentage(project.percentageBudgetExecution)}
            </div>
            <div className="w-full bg-secondary rounded-full h-2 mt-2">
              <div
                className={`h-2 rounded-full transition-all ${
                  isOverBudget ? 'bg-red-500' : 'bg-green-500'
                }`}
                style={{ width: `${Math.min(100, project.percentageBudgetExecution * 100)}%` }}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
            {project.status === 'En riesgo' && (
              <AlertTriangle className="h-4 w-4 text-amber-500" />
            )}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockTasks.length}</div>
            <p className="text-xs text-muted-foreground">
              {mockTasks.filter(t => t.status === 'Hecho').length} completed
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Information Tabs */}
      <Tabs defaultValue="summary" className="space-y-4">
        <TabsList>
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="phases">Phases</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="deliverables">Deliverables</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Progress Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={mockProgressData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Line type="monotone" dataKey="planned" stroke="#3B82F6" name="Planned" />
                    <Line type="monotone" dataKey="actual" stroke="#22C55E" name="Actual" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Phase Status</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Completed', value: 1, fill: COLORS[0] },
                        { name: 'In Progress', value: 1, fill: COLORS[1] },
                        { name: 'Not Started', value: 2, fill: COLORS[2] }
                      ]}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="phases" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Project Phases</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockPhases.map((phase, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-xl">
                    <div className="flex-1">
                      <h4 className="font-medium">{phase.name}</h4>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                        <span>{phase.tasks} tasks</span>
                        <span>Progress: {formatPercentage(phase.progress)}</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2 mt-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all"
                          style={{ width: `${phase.progress * 100}%` }}
                        />
                      </div>
                    </div>
                    <Badge className={getStatusColor(phase.status)}>
                      {phase.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Task Board</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {['Por hacer', 'En progreso', 'En revisión', 'Hecho'].map((status) => (
                  <div key={status} className="space-y-2">
                    <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                      {status}
                    </h4>
                    <div className="space-y-2">
                      {mockTasks
                        .filter(task => task.status === status)
                        .map((task) => (
                          <div key={task.id} className="p-3 bg-card border rounded-lg">
                            <h5 className="font-medium text-sm">{task.name}</h5>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-xs text-muted-foreground">
                                {task.assignee}
                              </span>
                              <Badge 
                                variant="outline" 
                                className="text-xs"
                              >
                                {task.priority}
                              </Badge>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deliverables" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Deliverables</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                Deliverables tracking coming soon...
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Project Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                Project reports coming soon...
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}