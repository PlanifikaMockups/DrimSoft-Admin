import { useQuery } from '@tanstack/react-query'
import { useParams, Link } from 'react-router-dom'
import { api } from '@/services/api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { 
  MapPin, Phone, Globe, Users, 
  TrendingUp, ChevronLeft, DollarSign, GraduationCap,
  BookOpen, UserCheck
} from 'lucide-react'
import { Organization, Project } from '@/types'
import { formatDate, formatCurrency, formatPercentage, getStatusColor } from '@/lib/utils'
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer,
  LineChart, Line
} from 'recharts'

export function InstitutionDetailPage() {
  const { id } = useParams<{ id: string }>()

  const { data: university } = useQuery({
    queryKey: ['university', id],
    queryFn: async () => {
      const response = await api.get<Organization>(`/universities/${id}`)
      return response.data
    }
  })

  const { data: projects } = useQuery({
    queryKey: ['university', id, 'projects'],
    queryFn: async () => {
      const response = await api.get<{ data: Project[] }>(`/universities/${id}/projects`)
      return response.data.data
    }
  })

  const { data: usageData } = useQuery({
    queryKey: ['university', id, 'usage'],
    queryFn: async () => {
      // Mock university usage data
      return Array.from({ length: 12 }, (_, i) => ({
        name: `Week ${i + 1}`,
        students: Math.floor(Math.random() * 200) + 100,
        faculty: Math.floor(Math.random() * 50) + 20,
        sessions: Math.floor(Math.random() * 800) + 300,
        assignments: Math.floor(Math.random() * 150) + 50,
      }))
    }
  })

  if (!university) {
    return <div>Loading...</div>
  }

  const activeProjects = projects?.filter(p => p.status === 'En curso').length || 0
  const totalBudget = projects?.reduce((sum, p) => sum + p.budget, 0) || 0
  const avgProgress = projects?.length ? 
    projects.reduce((sum, p) => sum + p.percentageProgress, 0) / projects.length : 0

  // University-specific metrics
  const totalStudents = university.mau || 0
  const totalFaculty = Math.floor(totalStudents * 0.08) // Approximate faculty ratio
  const totalPrograms = Math.floor(activeProjects * 0.3) // Approximate programs

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/institutions">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Universities
            </Link>
          </Button>
        </div>
      </div>

      {/* University Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start space-x-6">
            {university.photoURL ? (
              <img
                src={university.photoURL}
                alt={university.name}
                className="w-20 h-20 rounded-2xl object-cover"
              />
            ) : (
              <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center">
                <GraduationCap className="text-primary-foreground h-8 w-8" />
              </div>
            )}
            
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold">{university.name}</h1>
                  <div className="flex items-center space-x-4 mt-2 text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{university.address}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Phone className="h-4 w-4" />
                      <span>{university.phone}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Globe className="h-4 w-4" />
                      <span>{university.domain}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(university.status)}>
                    {university.status}
                  </Badge>
                  <Badge variant="outline">{university.plan}</Badge>
                </div>
              </div>

              {/* University Quick Stats */}
              <div className="grid grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">{totalStudents.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Total Students</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{totalFaculty}</div>
                  <div className="text-sm text-muted-foreground">Faculty Members</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{totalPrograms}</div>
                  <div className="text-sm text-muted-foreground">Academic Programs</div>
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
          <TabsTrigger value="summary">University Overview</TabsTrigger>
          <TabsTrigger value="projects">Academic Projects</TabsTrigger>
          <TabsTrigger value="usage">Student Engagement</TabsTrigger>
          <TabsTrigger value="billing">University Billing</TabsTrigger>
          <TabsTrigger value="tickets">Academic Support</TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <GraduationCap className="h-5 w-5" />
                  <span>University Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Founded</span>
                  <span>{formatDate(university.createdAt)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Updated</span>
                  <span>{formatDate(university.updatedAt)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Plan</span>
                  <Badge variant="outline">{university.plan}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Budget</span>
                  <span className="font-medium">{formatCurrency(totalBudget)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Active Students</span>
                  <span className="font-medium">{totalStudents.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Faculty Members</span>
                  <span className="font-medium">{totalFaculty}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>Student Engagement</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={usageData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Line type="monotone" dataKey="students" stroke="#3B82F6" strokeWidth={2} />
                    <Line type="monotone" dataKey="faculty" stroke="#8B5CF6" strokeWidth={2} />
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
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5" />
                <span>Academic Projects</span>
              </CardTitle>
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
                  No academic projects found for this university
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Student Engagement Analytics</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={usageData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Bar dataKey="students" fill="#3B82F6" name="Active Students" />
                  <Bar dataKey="faculty" fill="#8B5CF6" name="Faculty" />
                  <Bar dataKey="sessions" fill="#22C55E" name="Learning Sessions" />
                  <Bar dataKey="assignments" fill="#F59E0B" name="Assignments" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5" />
                <span>University Billing Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                University billing and subscription management coming soon...
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tickets" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <UserCheck className="h-5 w-5" />
                <span>Academic Support</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                Academic support and help desk integration coming soon...
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}