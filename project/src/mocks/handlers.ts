import { http, HttpResponse } from 'msw'
import { 
  mockUsers, mockOrganizations, mockProjects, mockKPIs, 
  mockAuditLogs, mockAuthResponse, mockDashboardKPIs 
} from './fixtures'
import { ProjectFilters, OrganizationFilters, AuditFilters } from '@/types'

const API_BASE = '/api'

export const handlers = [
  // Auth endpoints
  http.post(`${API_BASE}/auth/login`, async ({ request }) => {
    const body = await request.json() as { email: string; password: string }
    
    // Check if email is from DrimSoft domain
    if (!body.email.endsWith('@drimsoft.com')) {
      return HttpResponse.json(
        { error: 'Access restricted to DrimSoft accounts only' },
        { status: 403 }
      )
    }
    
    // Mock authentication - in real app, validate credentials
    if (body.email && body.password) {
      return HttpResponse.json(mockAuthResponse)
    }
    
    return HttpResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    )
  }),

  http.post(`${API_BASE}/auth/refresh`, () => {
    return HttpResponse.json({
      token: 'new_mock_token',
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    })
  }),

  http.post(`${API_BASE}/auth/logout`, () => {
    return HttpResponse.json({ success: true })
  }),

  // Dashboard endpoints
  http.get(`${API_BASE}/dashboard/kpis`, () => {
    return HttpResponse.json(mockDashboardKPIs)
  }),

  http.get(`${API_BASE}/dashboard/widgets`, ({ request }) => {
    const url = new URL(request.url)
    const period = url.searchParams.get('period') || '12w'
    
    // Generate mock chart data based on period
    const weeks = period === '4w' ? 4 : period === '12w' ? 12 : 24
    const chartData = Array.from({ length: weeks }, (_, i) => ({
      name: `Week ${i + 1}`,
      projects: Math.floor(Math.random() * 20) + 10,
      completed: Math.floor(Math.random() * 8) + 2,
      budget: Math.floor(Math.random() * 100000) + 50000,
    }))
    
    return HttpResponse.json({ chartData })
  }),

  // Organizations endpoints
  http.get(`${API_BASE}/organizations`, ({ request }) => {
    const url = new URL(request.url)
    const page = parseInt(url.searchParams.get('page') || '1')
    const limit = parseInt(url.searchParams.get('limit') || '10')
    const search = url.searchParams.get('search')
    const status = url.searchParams.get('status')?.split(',')
    const plan = url.searchParams.get('plan')?.split(',')

    let filtered = mockOrganizations

    if (search) {
      filtered = filtered.filter(org => 
        org.name.toLowerCase().includes(search.toLowerCase()) ||
        org.domain.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (status?.length) {
      filtered = filtered.filter(org => status.includes(org.status))
    }

    if (plan?.length) {
      filtered = filtered.filter(org => plan.includes(org.plan))
    }

    const start = (page - 1) * limit
    const data = filtered.slice(start, start + limit)

    return HttpResponse.json({
      data,
      total: filtered.length,
      page,
      limit,
      totalPages: Math.ceil(filtered.length / limit)
    })
  }),

  http.get(`${API_BASE}/organizations/:id`, ({ params }) => {
    const org = mockOrganizations.find(o => o.id === params.id)
    if (!org) {
      return HttpResponse.json({ error: 'Organization not found' }, { status: 404 })
    }
    return HttpResponse.json(org)
  }),

  http.get(`${API_BASE}/organizations/:id/projects`, ({ params }) => {
    const projects = mockProjects.filter(p => p.organizationId === params.id)
    return HttpResponse.json({ data: projects })
  }),

  // Projects endpoints
  http.get(`${API_BASE}/projects`, ({ request }) => {
    const url = new URL(request.url)
    const page = parseInt(url.searchParams.get('page') || '1')
    const limit = parseInt(url.searchParams.get('limit') || '10')
    const search = url.searchParams.get('search')
    const status = url.searchParams.get('status')?.split(',')
    const type = url.searchParams.get('type')?.split(',')
    const organizationId = url.searchParams.get('organizationId')?.split(',')

    let filtered = mockProjects

    if (search) {
      filtered = filtered.filter(project => 
        project.name.toLowerCase().includes(search.toLowerCase()) ||
        project.description.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (status?.length) {
      filtered = filtered.filter(project => status.includes(project.status))
    }

    if (type?.length) {
      filtered = filtered.filter(project => type.includes(project.type))
    }

    if (organizationId?.length) {
      filtered = filtered.filter(project => organizationId.includes(project.organizationId))
    }

    const start = (page - 1) * limit
    const data = filtered.slice(start, start + limit)

    return HttpResponse.json({
      data,
      total: filtered.length,
      page,
      limit,
      totalPages: Math.ceil(filtered.length / limit)
    })
  }),

  http.get(`${API_BASE}/projects/:id`, ({ params }) => {
    const project = mockProjects.find(p => p.id === params.id)
    if (!project) {
      return HttpResponse.json({ error: 'Project not found' }, { status: 404 })
    }
    return HttpResponse.json(project)
  }),

  // Reports endpoints
  http.get(`${API_BASE}/reports/kpis`, ({ request }) => {
    const url = new URL(request.url)
    const category = url.searchParams.get('category')
    const period = url.searchParams.get('period')
    const organizationId = url.searchParams.get('organizationId')

    let filtered = mockKPIs

    if (category) {
      filtered = filtered.filter(kpi => kpi.category === category)
    }

    if (organizationId) {
      filtered = filtered.filter(kpi => kpi.organizationId === organizationId)
    }

    return HttpResponse.json({ data: filtered })
  }),

  // Audit endpoints
  http.get(`${API_BASE}/audit/logs`, ({ request }) => {
    const url = new URL(request.url)
    const page = parseInt(url.searchParams.get('page') || '1')
    const limit = parseInt(url.searchParams.get('limit') || '20')
    const search = url.searchParams.get('search')
    const actor = url.searchParams.get('actor')
    const action = url.searchParams.get('action')
    const severity = url.searchParams.get('severity')?.split(',')

    let filtered = mockAuditLogs

    if (search) {
      filtered = filtered.filter(log => 
        log.actor.toLowerCase().includes(search.toLowerCase()) ||
        log.action.toLowerCase().includes(search.toLowerCase()) ||
        log.entity.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (actor) {
      filtered = filtered.filter(log => log.actor === actor)
    }

    if (action) {
      filtered = filtered.filter(log => log.action === action)
    }

    if (severity?.length) {
      filtered = filtered.filter(log => severity.includes(log.severity))
    }

    const start = (page - 1) * limit
    const data = filtered.slice(start, start + limit)

    return HttpResponse.json({
      data,
      total: filtered.length,
      page,
      limit,
      totalPages: Math.ceil(filtered.length / limit)
    })
  }),

  // Users endpoints
  http.get(`${API_BASE}/users`, ({ request }) => {
    const url = new URL(request.url)
    const search = url.searchParams.get('search')

    let filtered = mockUsers

    if (search) {
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
      )
    }

    return HttpResponse.json({ data: filtered })
  }),

  // System config endpoints
  http.get(`${API_BASE}/system/config`, () => {
    return HttpResponse.json({
      integrations: {
        email: { enabled: true, configured: true },
        siigo: { enabled: false, configured: false },
        calendar: { enabled: true, configured: true }
      },
      features: {
        auditLogs: true,
        advancedReports: true,
        apiAccess: true
      }
    })
  }),
]