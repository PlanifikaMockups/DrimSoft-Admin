import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Search, Users, Shield, Mail, Calendar, Clock, Globe, Building2, Plus, Edit, Trash2, UserPlus, Settings } from 'lucide-react'
import { User, UserStatus, Role, Organization, SystemPermission, CreateUserForm, UpdateUserForm } from '@/types'
import { useAuth } from '@/contexts/AuthContext'

// Extender el tipo User para incluir información de tiempo real
interface UserWithRealtime extends User {
  isOnline: boolean
  lastSeen: Date
  currentSessionStart?: Date
  organization?: Organization
}

// Estado para modales y formularios
interface UserManagementState {
  showCreateModal: boolean
  showEditModal: boolean
  showDeleteModal: boolean
  selectedUser: UserWithRealtime | null
  createForm: CreateUserForm
  editForm: UpdateUserForm
}

// Datos mock de universidades (organizaciones)
const mockOrganizations: Organization[] = [
  {
    id: '1',
    name: 'Pontificia Universidad Javeriana',
    address: 'Carrera 7 No. 40-62, Bogotá, Colombia',
    phone: '+57 (1) 320 8320',
    domain: 'javeriana.edu.co',
    plan: 'Enterprise' as any,
    status: 'Activa' as any,
    photoURL: '/assets/images/universities/javeriana-logo.png',
    adminCount: 8,
    projectCount: 456,
    mau: 2847,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'Universidad del Rosario',
    address: 'Carrera 6 No. 12C-13, Bogotá, Colombia',
    phone: '+57 (1) 297 0200',
    domain: 'urosario.edu.co',
    plan: 'Enterprise' as any,
    status: 'Activa' as any,
    adminCount: 6,
    projectCount: 623,
    mau: 3200,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    name: 'Universidad de los Andes',
    address: 'Carrera 1 No. 18A-12, Bogotá, Colombia',
    phone: '+57 (1) 339 4949',
    domain: 'uniandes.edu.co',
    plan: 'Pro' as any,
    status: 'Activa' as any,
    adminCount: 5,
    projectCount: 387,
    mau: 2156,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '4',
    name: 'Universidad Nacional de Colombia',
    address: 'Carrera 30 No. 45-03, Bogotá, Colombia',
    phone: '+57 (1) 316 5000',
    domain: 'unal.edu.co',
    plan: 'Basic' as any,
    status: 'Activa' as any,
    adminCount: 3,
    projectCount: 298,
    mau: 1890,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

// Datos mock de usuarios con información de tiempo real
const mockUsers: UserWithRealtime[] = [
  // DrimSoft Staff
  {
    id: '1',
    name: 'Ana García',
    email: 'ana.garcia@drimsoft.com',
    photoURL: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=150',
    status: UserStatus.ACTIVO,
    role: Role.ADMIN_DRIMSOFT,
    createdAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(),
    isOnline: true,
    lastSeen: new Date(Date.now() - 2 * 60 * 1000), // 2 minutos atrás
    currentSessionStart: new Date(Date.now() - 45 * 60 * 1000), // 45 minutos atrás
  },
  {
    id: '2',
    name: 'Carlos Mendez',
    email: 'carlos.mendez@drimsoft.com',
    photoURL: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?w=150',
    status: UserStatus.ACTIVO,
    role: Role.ADMIN_DRIMSOFT,
    createdAt: new Date(Date.now() - 150 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(),
    isOnline: true,
    lastSeen: new Date(Date.now() - 5 * 60 * 1000), // 5 minutos atrás
    currentSessionStart: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 horas atrás
  },
  {
    id: '3',
    name: 'Elena Rodriguez',
    email: 'elena.rodriguez@drimsoft.com',
    status: UserStatus.ACTIVO,
    role: Role.ADMIN_DRIMSOFT,
    createdAt: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(),
    isOnline: false,
    lastSeen: new Date(Date.now() - 30 * 60 * 1000), // 30 minutos atrás
  },
  
  // Universidad Javeriana
  {
    id: '4',
    name: 'María López',
    email: 'maria.lopez@javeriana.edu.co',
    photoURL: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?w=150',
    status: UserStatus.ACTIVO,
    role: Role.ADMIN_ORG,
    createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(),
    isOnline: true,
    lastSeen: new Date(Date.now() - 1 * 60 * 1000), // 1 minuto atrás
    currentSessionStart: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 horas atrás
    organization: mockOrganizations[0],
  },
  {
    id: '5',
    name: 'Roberto Silva',
    email: 'roberto.silva@javeriana.edu.co',
    photoURL: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?w=150',
    status: UserStatus.ACTIVO,
    role: Role.MANAGER,
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(),
    isOnline: true,
    lastSeen: new Date(Date.now() - 3 * 60 * 1000), // 3 minutos atrás
    currentSessionStart: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hora atrás
    organization: mockOrganizations[0],
  },
  {
    id: '6',
    name: 'Sofia Jiménez',
    email: 'sofia.jimenez@javeriana.edu.co',
    photoURL: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=150',
    status: UserStatus.ACTIVO,
    role: Role.MEMBER,
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(),
    isOnline: true,
    lastSeen: new Date(Date.now() - 2 * 60 * 1000), // 2 minutos atrás
    currentSessionStart: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hora atrás
    organization: mockOrganizations[0],
  },
  
  // Universidad del Rosario
  {
    id: '7',
    name: 'Laura Martínez',
    email: 'laura.martinez@urosario.edu.co',
    photoURL: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=150',
    status: UserStatus.ACTIVO,
    role: Role.ADMIN_ORG,
    createdAt: new Date(Date.now() - 75 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(),
    isOnline: false,
    lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 horas atrás
    organization: mockOrganizations[1],
  },
  {
    id: '8',
    name: 'Diego Herrera',
    email: 'diego.herrera@urosario.edu.co',
    photoURL: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?w=150',
    status: UserStatus.ACTIVO,
    role: Role.MANAGER,
    createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(),
    isOnline: true,
    lastSeen: new Date(Date.now() - 4 * 60 * 1000), // 4 minutos atrás
    currentSessionStart: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 horas atrás
    organization: mockOrganizations[1],
  },
  {
    id: '9',
    name: 'Carmen Vega',
    email: 'carmen.vega@urosario.edu.co',
    photoURL: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=150',
    status: UserStatus.ACTIVO,
    role: Role.MEMBER,
    createdAt: new Date(Date.now() - 100 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(),
    isOnline: true,
    lastSeen: new Date(Date.now() - 2 * 60 * 1000), // 2 minutos atrás
    currentSessionStart: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 horas atrás
    organization: mockOrganizations[1],
  },
  
  // Universidad de los Andes
  {
    id: '10',
    name: 'Andrés Morales',
    email: 'andres.morales@uniandes.edu.co',
    photoURL: 'https://images.pexels.com/photos/1040882/pexels-photo-1040882.jpeg?w=150',
    status: UserStatus.ACTIVO,
    role: Role.ADMIN_ORG,
    createdAt: new Date(Date.now() - 80 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(),
    isOnline: false,
    lastSeen: new Date(Date.now() - 45 * 60 * 1000), // 45 minutos atrás
    organization: mockOrganizations[2],
  },
  {
    id: '11',
    name: 'Patricia Ruiz',
    email: 'patricia.ruiz@uniandes.edu.co',
    photoURL: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?w=150',
    status: UserStatus.ACTIVO,
    role: Role.MANAGER,
    createdAt: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(),
    isOnline: true,
    lastSeen: new Date(Date.now() - 1 * 60 * 1000), // 1 minuto atrás
    currentSessionStart: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 horas atrás
    organization: mockOrganizations[2],
  },
  
  // Universidad Nacional
  {
    id: '12',
    name: 'Fernando Castro',
    email: 'fernando.castro@unal.edu.co',
    photoURL: 'https://images.pexels.com/photos/1040883/pexels-photo-1040883.jpeg?w=150',
    status: UserStatus.ACTIVO,
    role: Role.ADMIN_ORG,
    createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(),
    isOnline: false,
    lastSeen: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 horas atrás
    organization: mockOrganizations[3],
  },
  {
    id: '13',
    name: 'Isabel Torres',
    email: 'isabel.torres@unal.edu.co',
    photoURL: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=150',
    status: UserStatus.ACTIVO,
    role: Role.MEMBER,
    createdAt: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(),
    isOnline: true,
    lastSeen: new Date(Date.now() - 3 * 60 * 1000), // 3 minutos atrás
    currentSessionStart: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 horas atrás
    organization: mockOrganizations[3],
  },
]
import { getStatusColor } from '@/lib/utils'

// Función para formatear tiempo transcurrido
function formatTimeAgo(date: Date): string {
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
  
  if (diffInSeconds < 60) return 'Hace un momento'
  if (diffInSeconds < 3600) return `Hace ${Math.floor(diffInSeconds / 60)} min`
  if (diffInSeconds < 86400) return `Hace ${Math.floor(diffInSeconds / 3600)} h`
  return `Hace ${Math.floor(diffInSeconds / 86400)} días`
}

// Función para formatear duración de sesión
function formatSessionDuration(startDate: Date): string {
  const now = new Date()
  const diffInMinutes = Math.floor((now.getTime() - startDate.getTime()) / (1000 * 60))
  
  if (diffInMinutes < 60) return `${diffInMinutes} min`
  const hours = Math.floor(diffInMinutes / 60)
  const minutes = diffInMinutes % 60
  return `${hours}h ${minutes}min`
}

export function UsersPage() {
  const { hasPermission, isAdmin } = useAuth()
  const [search, setSearch] = useState('')
  const [managementState, setManagementState] = useState<UserManagementState>({
    showCreateModal: false,
    showEditModal: false,
    showDeleteModal: false,
    selectedUser: null,
    createForm: {
      name: '',
      email: '',
      role: Role.MEMBER,
      status: UserStatus.ACTIVO
    },
    editForm: {
      id: '',
      name: '',
      email: '',
      role: Role.MEMBER,
      status: UserStatus.ACTIVO
    }
  })

  // Actualizar tiempo cada minuto para mostrar información en tiempo real
  useEffect(() => {
    const interval = setInterval(() => {
      // Forzar re-render para actualizar tiempos
      setSearch(prev => prev)
    }, 60000) // Actualizar cada minuto

    return () => clearInterval(interval)
  }, [])

  // Filtrar usuarios por búsqueda
  const filteredUsers = mockUsers.filter(user => 
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase()) ||
    user.organization?.name.toLowerCase().includes(search.toLowerCase())
  )

  // Agrupar usuarios por organización
  const usersByOrganization = filteredUsers.reduce((acc, user) => {
    const orgName = user.organization?.name || 'DrimSoft'
    if (!acc[orgName]) {
      acc[orgName] = []
    }
    acc[orgName].push(user)
    return acc
  }, {} as Record<string, UserWithRealtime[]>)

  const onlineUsers = filteredUsers.filter(user => user.isOnline).length
  const totalUsers = filteredUsers.length
  const drimsoftUsers = filteredUsers.filter(user => !user.organization).length

  // Funciones de gestión de usuarios
  const handleCreateUser = () => {
    setManagementState(prev => ({ ...prev, showCreateModal: true }))
  }

  const handleEditUser = (user: UserWithRealtime) => {
    setManagementState(prev => ({
      ...prev,
      showEditModal: true,
      selectedUser: user,
      editForm: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role || Role.MEMBER,
        status: user.status,
        organizationId: user.organization?.id
      }
    }))
  }

  const handleDeleteUser = (user: UserWithRealtime) => {
    setManagementState(prev => ({
      ...prev,
      showDeleteModal: true,
      selectedUser: user
    }))
  }

  const handleSaveUser = () => {
    // Aquí se implementaría la lógica para guardar el usuario
    console.log('Guardando usuario:', managementState.createForm)
    setManagementState(prev => ({ ...prev, showCreateModal: false, createForm: { name: '', email: '', role: Role.MEMBER, status: UserStatus.ACTIVO } }))
  }

  const handleUpdateUser = () => {
    // Aquí se implementaría la lógica para actualizar el usuario
    console.log('Actualizando usuario:', managementState.editForm)
    setManagementState(prev => ({ ...prev, showEditModal: false, selectedUser: null }))
  }

  const handleConfirmDelete = () => {
    // Aquí se implementaría la lógica para eliminar el usuario
    console.log('Eliminando usuario:', managementState.selectedUser?.id)
    setManagementState(prev => ({ ...prev, showDeleteModal: false, selectedUser: null }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Usuarios en Tiempo Real</h1>
        <p className="text-muted-foreground">
          Monitorea la actividad de usuarios en tiempo real por organización
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Usuarios</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En Línea</CardTitle>
            <Globe className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{onlineUsers}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">DrimSoft Staff</CardTitle>
            <Shield className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{drimsoftUsers}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Organizaciones</CardTitle>
            <Building2 className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{Object.keys(usersByOrganization).length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Actions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Buscar Usuarios</CardTitle>
            {hasPermission(SystemPermission.USER_CREATE) && (
              <Button onClick={handleCreateUser} className="flex items-center space-x-2">
                <UserPlus className="h-4 w-4" />
                <span>Crear Usuario</span>
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nombre, email u organización..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Users by Organization */}
      {Object.entries(usersByOrganization).map(([orgName, users]) => (
        <Card key={orgName}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Building2 className="h-5 w-5 text-muted-foreground" />
                <CardTitle className="text-lg">{orgName}</CardTitle>
                <Badge variant="outline" className="ml-2">
                  {users.length} usuarios
                </Badge>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>{users.filter(u => u.isOnline).length} en línea</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Usuario</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Tiempo de Acceso</TableHead>
                  <TableHead>Última Actividad</TableHead>
                  <TableHead>Rol</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          {user.photoURL ? (
                            <img
                              src={user.photoURL}
                              alt={user.name}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                              <span className="text-primary-foreground font-medium">
                                {user.name.charAt(0)}
                              </span>
                            </div>
                          )}
                          {/* Indicador de estado en línea */}
                          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                            user.isOnline ? 'bg-green-500' : 'bg-gray-400'
                          }`}></div>
                        </div>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-muted-foreground flex items-center space-x-1">
                            <Mail className="h-3 w-3" />
                            <span>{user.email}</span>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col space-y-1">
                        <Badge className={user.isOnline ? 'bg-green-100 text-green-800 border-green-200' : 'bg-gray-100 text-gray-800 border-gray-200'}>
                          {user.isOnline ? 'En línea' : 'Desconectado'}
                        </Badge>
                        <Badge className={getStatusColor(user.status)}>
                          {user.status}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      {user.isOnline && user.currentSessionStart ? (
                        <div className="flex items-center space-x-1 text-sm">
                          <Clock className="h-4 w-4 text-green-500" />
                          <span className="text-green-600 font-medium">
                            {formatSessionDuration(user.currentSessionStart)}
                          </span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-sm">No disponible</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className={user.isOnline ? 'text-green-600' : 'text-muted-foreground'}>
                          {formatTimeAgo(user.lastSeen)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {user.role?.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          Ver Perfil
                        </Button>
                        {hasPermission(SystemPermission.USER_UPDATE) && (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleEditUser(user)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        )}
                        {hasPermission(SystemPermission.USER_DELETE) && user.role !== Role.SUPER_ADMIN && (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDeleteUser(user)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ))}

      {/* Modal de Crear Usuario */}
      {managementState.showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <UserPlus className="h-5 w-5" />
                <span>Crear Nuevo Usuario</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Nombre</label>
                <Input
                  value={managementState.createForm.name}
                  onChange={(e) => setManagementState(prev => ({
                    ...prev,
                    createForm: { ...prev.createForm, name: e.target.value }
                  }))}
                  placeholder="Nombre completo"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <Input
                  type="email"
                  value={managementState.createForm.email}
                  onChange={(e) => setManagementState(prev => ({
                    ...prev,
                    createForm: { ...prev.createForm, email: e.target.value }
                  }))}
                  placeholder="usuario@ejemplo.com"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Rol</label>
                <select
                  value={managementState.createForm.role}
                  onChange={(e) => setManagementState(prev => ({
                    ...prev,
                    createForm: { ...prev.createForm, role: e.target.value as Role }
                  }))}
                  className="w-full p-2 border rounded-md"
                >
                  <option value={Role.MEMBER}>Miembro</option>
                  <option value={Role.MANAGER}>Manager</option>
                  <option value={Role.ADMIN_ORG}>Admin Organización</option>
                  {isAdmin() && <option value={Role.ADMIN_DRIMSOFT}>Admin DrimSoft</option>}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Estado</label>
                <select
                  value={managementState.createForm.status}
                  onChange={(e) => setManagementState(prev => ({
                    ...prev,
                    createForm: { ...prev.createForm, status: e.target.value as UserStatus }
                  }))}
                  className="w-full p-2 border rounded-md"
                >
                  <option value={UserStatus.ACTIVO}>Activo</option>
                  <option value={UserStatus.INVITADO}>Invitado</option>
                  <option value={UserStatus.SUSPENDIDO}>Suspendido</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setManagementState(prev => ({ ...prev, showCreateModal: false }))}
                >
                  Cancelar
                </Button>
                <Button onClick={handleSaveUser}>
                  Crear Usuario
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Modal de Editar Usuario */}
      {managementState.showEditModal && managementState.selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Edit className="h-5 w-5" />
                <span>Editar Usuario</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Nombre</label>
                <Input
                  value={managementState.editForm.name}
                  onChange={(e) => setManagementState(prev => ({
                    ...prev,
                    editForm: { ...prev.editForm, name: e.target.value }
                  }))}
                  placeholder="Nombre completo"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <Input
                  type="email"
                  value={managementState.editForm.email}
                  onChange={(e) => setManagementState(prev => ({
                    ...prev,
                    editForm: { ...prev.editForm, email: e.target.value }
                  }))}
                  placeholder="usuario@ejemplo.com"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Rol</label>
                <select
                  value={managementState.editForm.role}
                  onChange={(e) => setManagementState(prev => ({
                    ...prev,
                    editForm: { ...prev.editForm, role: e.target.value as Role }
                  }))}
                  className="w-full p-2 border rounded-md"
                  disabled={managementState.selectedUser.role === Role.SUPER_ADMIN}
                >
                  <option value={Role.MEMBER}>Miembro</option>
                  <option value={Role.MANAGER}>Manager</option>
                  <option value={Role.ADMIN_ORG}>Admin Organización</option>
                  {isAdmin() && <option value={Role.ADMIN_DRIMSOFT}>Admin DrimSoft</option>}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Estado</label>
                <select
                  value={managementState.editForm.status}
                  onChange={(e) => setManagementState(prev => ({
                    ...prev,
                    editForm: { ...prev.editForm, status: e.target.value as UserStatus }
                  }))}
                  className="w-full p-2 border rounded-md"
                >
                  <option value={UserStatus.ACTIVO}>Activo</option>
                  <option value={UserStatus.INVITADO}>Invitado</option>
                  <option value={UserStatus.SUSPENDIDO}>Suspendido</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setManagementState(prev => ({ ...prev, showEditModal: false, selectedUser: null }))}
                >
                  Cancelar
                </Button>
                <Button onClick={handleUpdateUser}>
                  Guardar Cambios
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Modal de Confirmar Eliminación */}
      {managementState.showDeleteModal && managementState.selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-red-600">
                <Trash2 className="h-5 w-5" />
                <span>Confirmar Eliminación</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                ¿Estás seguro de que deseas eliminar al usuario <strong>{managementState.selectedUser.name}</strong>?
                Esta acción no se puede deshacer.
              </p>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setManagementState(prev => ({ ...prev, showDeleteModal: false, selectedUser: null }))}
                >
                  Cancelar
                </Button>
                <Button 
                  variant="destructive"
                  onClick={handleConfirmDelete}
                >
                  Eliminar Usuario
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}