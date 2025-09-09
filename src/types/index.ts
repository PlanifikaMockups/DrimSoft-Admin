// Core Entity Types
export interface IDAuthentication {
  id: string;
  email: string;
  password: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  photoURL?: string;
  status: UserStatus;
  role?: Role;
  createdAt: Date;
  updatedAt: Date;
}

export interface Organization {
  id: string;
  name: string;
  address: string;
  phone: string;
  domain: string;
  plan: OrganizationPlan;
  status: OrganizationStatus;
  photoURL?: string;
  adminCount: number;
  projectCount: number;
  mau: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserOrganization {
  userId: string;
  organizationId: string;
  role: Role;
  createdAt: Date;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  type: ProjectType;
  status: ProjectStatus;
  startDate: Date;
  endDate: Date;
  budget: number;
  cost: number;
  percentageBudgetExecution: number;
  percentageProgress: number;
  organizationId: string;
  organization?: Organization;
  createdAt: Date;
  updatedAt: Date;
}

export interface Phase {
  id: string;
  name: string;
  description: string;
  status: PhaseStatus;
  startDate: Date;
  endDate: Date;
  projectId: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Task {
  id: string;
  name: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assigneeId?: string;
  assignee?: User;
  phaseId: string;
  estimatedHours: number;
  actualHours: number;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Deliverable {
  id: string;
  name: string;
  description: string;
  status: DeliverableStatus;
  taskId: string;
  score?: number;
  feedback?: string;
  dueDate: Date;
  submittedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Report {
  id: string;
  name: string;
  type: ReportType;
  projectId: string;
  content: Record<string, unknown>;
  createdBy: string;
  createdAt: Date;
}

export interface KPI {
  id: string;
  category: KPICategory;
  name: string;
  value: number;
  target?: number;
  unit: string;
  period: string;
  organizationId?: string;
  createdAt: Date;
}

export interface LogAuditoria {
  id: string;
  actor: string;
  action: string;
  entity: string;
  entityId: string;
  severity: AuditSeverity;
  details: Record<string, unknown>;
  ipAddress: string;
  userAgent: string;
  createdAt: Date;
}

// Enums
export enum UserStatus {
  ACTIVO = 'Activo',
  SUSPENDIDO = 'Suspendido',
  INVITADO = 'Invitado',
  ELIMINADO = 'Eliminado'
}

export enum OrganizationPlan {
  BASIC = 'Basic',
  PRO = 'Pro',
  ENTERPRISE = 'Enterprise'
}

export enum OrganizationStatus {
  ACTIVA = 'Activa',
  SUSPENDIDA = 'Suspendida',
  PENDIENTE = 'Pendiente'
}

export enum ProjectType {
  DESARROLLO = 'Desarrollo',
  CONSULTORIA = 'Consultoría',
  IMPLEMENTACION = 'Implementación',
  MANTENIMIENTO = 'Mantenimiento'
}

export enum ProjectStatus {
  NUEVO = 'Nuevo',
  EN_CURSO = 'En curso',
  EN_REVISION = 'En revisión',
  CERRADO = 'Cerrado',
  EN_RIESGO = 'En riesgo',
  CANCELADO = 'Cancelado'
}

export enum PhaseStatus {
  NO_INICIADA = 'No iniciada',
  EN_PROGRESO = 'En progreso',
  COMPLETADA = 'Completada',
  BLOQUEADA = 'Bloqueada'
}

export enum TaskStatus {
  POR_HACER = 'Por hacer',
  EN_PROGRESO = 'En progreso',
  EN_REVISION = 'En revisión',
  HECHO = 'Hecho',
  BLOQUEADO = 'Bloqueado'
}

export enum TaskPriority {
  BAJA = 'Baja',
  MEDIA = 'Media',
  ALTA = 'Alta',
  CRITICA = 'Crítica'
}

export enum DeliverableStatus {
  PENDIENTE = 'Pendiente',
  EN_REVISION = 'En revisión',
  APROBADO = 'Aprobado',
  RECHAZADO = 'Rechazado'
}

export enum ReportType {
  PROGRESS = 'Progress',
  FINANCIAL = 'Financial',
  QUALITY = 'Quality',
  RISK = 'Risk',
  CUSTOM = 'Custom'
}

export enum KPICategory {
  PERFORMANCE = 'Performance',
  QUALITY = 'Quality',
  SECURITY = 'Security',
  ADOPTION = 'Adoption',
  FINANCIAL = 'Financial'
}

export enum AuditSeverity {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
  CRITICAL = 'Critical'
}

export enum Role {
  ADMIN_DRIMSOFT = 'admin_drimsoft',
  ADMIN_ORG = 'admin_org',
  MANAGER = 'manager',
  MEMBER = 'member',
  VIEWER = 'viewer'
}

// API Response Types
export interface AuthResponse {
  token: string;
  refreshToken: string;
  user: User;
  expiresAt: Date;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Dashboard Types
export interface DashboardKPIs {
  activeOrganizations: number;
  activeProjects: number;
  averageProgress: number;
  openTickets: number;
  slaCompliance: number;
  npsScore: number;
  budgetUtilization: number;
  overdueDeliverables: number;
}

export interface ChartData {
  name: string;
  value: number;
  date?: string;
}

// Filter Types
export interface ProjectFilters {
  status?: ProjectStatus[];
  type?: ProjectType[];
  organizationId?: string[];
  startDate?: Date;
  endDate?: Date;
  search?: string;
}

export interface OrganizationFilters {
  status?: OrganizationStatus[];
  plan?: OrganizationPlan[];
  search?: string;
}

export interface AuditFilters {
  actor?: string;
  action?: string;
  entity?: string;
  severity?: AuditSeverity[];
  startDate?: Date;
  endDate?: Date;
  search?: string;
}

// Form Types
export interface LoginForm {
  email: string;
  password: string;
}

export interface CreateProjectForm {
  name: string;
  description: string;
  type: ProjectType;
  startDate: Date;
  endDate: Date;
  budget: number;
  organizationId: string;
}