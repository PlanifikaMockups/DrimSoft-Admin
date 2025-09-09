import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Search, Filter, Eye, FolderOpen, Clock, DollarSign, TrendingUp } from 'lucide-react'
import { Project, ProjectType, ProjectStatus, Organization } from '@/types'
import { formatDate, formatCurrency, formatPercentage, getStatusColor } from '@/lib/utils'

// Datos quemados para pruebas
const mockOrganizations: Organization[] = [
  {
    id: '1',
    name: 'TechCorp Solutions',
    address: '123 Innovation Ave, Tech City',
    phone: '+1 (555) 123-4567',
    domain: 'techcorp.com',
    plan: 'Enterprise' as any,
    status: 'Activa' as any,
    photoURL: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?w=150',
    adminCount: 3,
    projectCount: 8,
    mau: 1250,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'Global Manufacturing Inc',
    address: '456 Industrial Blvd, Factory Town',
    phone: '+1 (555) 234-5678',
    domain: 'globalmanufacturing.com',
    plan: 'Pro' as any,
    status: 'Activa' as any,
    adminCount: 2,
    projectCount: 5,
    mau: 850,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    name: 'Healthcare Partners',
    address: '789 Medical Center Dr, Health City',
    phone: '+1 (555) 345-6789',
    domain: 'healthcarepartners.org',
    plan: 'Pro' as any,
    status: 'Activa' as any,
    adminCount: 4,
    projectCount: 6,
    mau: 2100,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Digital Transformation Initiative',
    description: 'Complete overhaul of legacy systems to modern cloud-based architecture',
    type: ProjectType.DESARROLLO,
    status: ProjectStatus.EN_CURSO,
    startDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000),
    budget: 500000,
    cost: 320000,
    percentageBudgetExecution: 0.64,
    percentageProgress: 0.72,
    organizationId: '1',
    organization: mockOrganizations[0],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'ERP Implementation',
    description: 'Implementation of comprehensive ERP system for manufacturing operations',
    type: ProjectType.IMPLEMENTACION,
    status: ProjectStatus.EN_REVISION,
    startDate: new Date(Date.now() - 150 * 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    budget: 750000,
    cost: 680000,
    percentageBudgetExecution: 0.91,
    percentageProgress: 0.95,
    organizationId: '2',
    organization: mockOrganizations[1],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    name: 'Patient Management System',
    description: 'Electronic health records and patient management platform',
    type: ProjectType.DESARROLLO,
    status: ProjectStatus.EN_RIESGO,
    startDate: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
    budget: 300000,
    cost: 280000,
    percentageBudgetExecution: 0.93,
    percentageProgress: 0.65,
    organizationId: '3',
    organization: mockOrganizations[2],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '4',
    name: 'Mobile App Development',
    description: 'Customer-facing mobile application for service booking',
    type: ProjectType.DESARROLLO,
    status: ProjectStatus.EN_CURSO,
    startDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    budget: 150000,
    cost: 65000,
    percentageBudgetExecution: 0.43,
    percentageProgress: 0.55,
    organizationId: '1',
    organization: mockOrganizations[0],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '5',
    name: 'Security Audit & Compliance',
    description: 'Comprehensive security assessment and compliance implementation',
    type: ProjectType.CONSULTORIA,
    status: ProjectStatus.CERRADO,
    startDate: new Date(Date.now() - 200 * 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    budget: 100000,
    cost: 95000,
    percentageBudgetExecution: 0.95,
    percentageProgress: 1.0,
    organizationId: '2',
    organization: mockOrganizations[1],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '6',
    name: 'Financial Analytics Platform',
    description: 'Advanced analytics platform for financial data processing and reporting',
    type: ProjectType.DESARROLLO,
    status: ProjectStatus.EN_CURSO,
    startDate: new Date(Date.now() - 100 * 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now() + 80 * 24 * 60 * 60 * 1000),
    budget: 800000,
    cost: 450000,
    percentageBudgetExecution: 0.56,
    percentageProgress: 0.68,
    organizationId: '3',
    organization: mockOrganizations[2],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '7',
    name: 'E-commerce Integration',
    description: 'Integration of multiple e-commerce platforms for unified management',
    type: ProjectType.IMPLEMENTACION,
    status: ProjectStatus.EN_REVISION,
    startDate: new Date(Date.now() - 80 * 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
    budget: 300000,
    cost: 280000,
    percentageBudgetExecution: 0.93,
    percentageProgress: 0.88,
    organizationId: '1',
    organization: mockOrganizations[0],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '8',
    name: 'Supply Chain Optimization',
    description: 'AI-powered supply chain management and optimization system',
    type: ProjectType.DESARROLLO,
    status: ProjectStatus.EN_CURSO,
    startDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000),
    budget: 400000,
    cost: 180000,
    percentageBudgetExecution: 0.45,
    percentageProgress: 0.42,
    organizationId: '2',
    organization: mockOrganizations[1],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export function ProjectListPage() {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')

  // Usar datos quemados directamente
  const projects = mockProjects
  const data = {
    data: projects,
    total: projects.length,
    page: 1,
    limit: 10,
    totalPages: 1
  }
  const isLoading = false

  // Calculate stats
  const activeProjects = projects.filter(p => p.status === ProjectStatus.EN_CURSO).length
  const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0)
  const avgProgress = projects.length ? 
    projects.reduce((sum, p) => sum + p.percentageProgress, 0) / projects.length : 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">
            Monitor and manage all active projects across organizations
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.total || 0}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <Clock className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{activeProjects}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalBudget)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPercentage(avgProgress)}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters & Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="sm:w-auto w-full">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Projects Table */}
      <Card>
        <CardHeader>
          <CardTitle>Projects</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-muted-foreground">Loading projects...</div>
            </div>
          ) : (
            <div className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project</TableHead>
                    <TableHead>Organization</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Budget</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{project.name}</div>
                          <div className="text-sm text-muted-foreground line-clamp-1">
                            {project.description}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {project.organization?.photoURL ? (
                            <img
                              src={project.organization.photoURL}
                              alt={project.organization.name}
                              className="w-6 h-6 rounded-full"
                            />
                          ) : (
                            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                              <span className="text-primary-foreground text-xs">
                                {project.organization?.name.charAt(0)}
                              </span>
                            </div>
                          )}
                          <span className="text-sm">{project.organization?.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{project.type}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(project.status)}>
                          {project.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-secondary rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full transition-all"
                              style={{ width: `${project.percentageProgress * 100}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">
                            {formatPercentage(project.percentageProgress)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{formatCurrency(project.budget)}</div>
                          <div className="text-xs text-muted-foreground">
                            {formatPercentage(project.percentageBudgetExecution)} used
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{formatDate(project.endDate)}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" asChild>
                          <Link to={`/projects/${project.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination */}
              {data && data.totalPages > 1 && (
                <div className="flex justify-center space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setPage(page - 1)}
                    disabled={page <= 1}
                  >
                    Previous
                  </Button>
                  <span className="flex items-center px-4">
                    Page {page} of {data.totalPages}
                  </span>
                  <Button
                    variant="outline"
                    onClick={() => setPage(page + 1)}
                    disabled={page >= data.totalPages}
                  >
                    Next
                  </Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}