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
  SUPER_ADMIN = 'super_admin',
  ADMIN_DRIMSOFT = 'admin_drimsoft',
  ADMIN_ORG = 'admin_org',
  MANAGER = 'manager',
  MEMBER = 'member',
  VIEWER = 'viewer'
}

// Sistema de permisos
export interface Permission {
  id: string;
  name: string;
  description: string;
  resource: string;
  action: string;
}

export interface RolePermissions {
  role: Role;
  permissions: Permission[];
}

// Permisos del sistema
export enum SystemPermission {
  // Usuarios
  USER_CREATE = 'user:create',
  USER_READ = 'user:read',
  USER_UPDATE = 'user:update',
  USER_DELETE = 'user:delete',
  USER_MANAGE_ROLES = 'user:manage_roles',
  
  // Organizaciones
  ORG_CREATE = 'org:create',
  ORG_READ = 'org:read',
  ORG_UPDATE = 'org:update',
  ORG_DELETE = 'org:delete',
  ORG_MANAGE_USERS = 'org:manage_users',
  
  // Proyectos
  PROJECT_CREATE = 'project:create',
  PROJECT_READ = 'project:read',
  PROJECT_UPDATE = 'project:update',
  PROJECT_DELETE = 'project:delete',
  
  // Configuración del sistema
  SYSTEM_CONFIG = 'system:config',
  SYSTEM_INTEGRATIONS = 'system:integrations',
  SYSTEM_FEATURES = 'system:features',
  SYSTEM_SECURITY = 'system:security',
  SYSTEM_DATABASE = 'system:database',
  
  // Auditoría
  AUDIT_READ = 'audit:read',
  AUDIT_EXPORT = 'audit:export',
  
  // Reportes
  REPORTS_CREATE = 'reports:create',
  REPORTS_READ = 'reports:read',
  REPORTS_EXPORT = 'reports:export'
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

// Formularios de gestión de usuarios
export interface CreateUserForm {
  name: string;
  email: string;
  role: Role;
  organizationId?: string;
  status: UserStatus;
}

export interface UpdateUserForm {
  id: string;
  name?: string;
  email?: string;
  role?: Role;
  status?: UserStatus;
  organizationId?: string;
}

// Configuración del sistema
export interface SystemConfig {
  features: {
    auditLogs: boolean;
    advancedReports: boolean;
    apiAccess: boolean;
    realTimeMonitoring: boolean;
  };
  integrations: {
    email: {
      enabled: boolean;
      configured: boolean;
      smtpHost?: string;
      smtpPort?: number;
      smtpUser?: string;
    };
    siigo: {
      enabled: boolean;
      configured: boolean;
      apiKey?: string;
      baseUrl?: string;
    };
    calendar: {
      enabled: boolean;
      configured: boolean;
      provider?: string;
      apiKey?: string;
    };
  };
  security: {
    twoFactorAuth: boolean;
    ipAllowlist: boolean;
    sessionTimeout: number; // en horas
    passwordPolicy: {
      minLength: number;
      requireUppercase: boolean;
      requireNumbers: boolean;
      requireSpecialChars: boolean;
    };
  };
  database: {
    backupEnabled: boolean;
    backupFrequency: string;
    retentionDays: number;
  };
}