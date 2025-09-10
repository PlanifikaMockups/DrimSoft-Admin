import { NavLink, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { 
  LayoutDashboard, 
  FolderOpen, 
  BarChart3, 
  Users, 
  Settings,
  Building,
  Shield,
  ChevronLeft,
  ChevronDown,
  ChevronUp
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useUIStore } from '@/stores/ui'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { DrimSoftLogo } from '@/components/ui/DrimSoftLogo'
import { Logo } from '@/components/ui/Logo'
import { mockOrganizations } from '@/mocks/fixtures'
import { SystemPermission, Role } from '@/types'
import { PermissionGuard } from '@/components/ui/permission-guard'

// Datos mock de plataformas de DrimSoft
const drimsoftPlatforms = [
  {
    id: 'planifika',
    name: 'Planifika',
    subtitle: 'Plataforma Educativa',
    description: 'Gestión académica y proyectos educativos',
    icon: Logo,
    color: '#FFD369',
    bgColor: 'bg-yellow-50',
    textColor: 'text-yellow-800',
    borderColor: 'border-yellow-200',
    isActive: true,
    stats: {
      organizations: mockOrganizations.length,
      users: Math.round(mockOrganizations.reduce((sum, org) => sum + org.mau, 0) / 1000)
    }
  }
]

const navigation = {
  admin_drimsoft: [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, permission: SystemPermission.USER_READ },
    { name: 'Organizaciones', href: '/institutions', icon: Building, permission: SystemPermission.ORG_READ },
    { name: 'Proyectos', href: '/projects', icon: FolderOpen, permission: SystemPermission.PROJECT_READ },
    { name: 'Usuarios', href: '/users', icon: Users, permission: SystemPermission.USER_READ },
    { name: 'Reportes', href: '/reports', icon: BarChart3, permission: SystemPermission.REPORTS_READ },
    { name: 'Auditoría', href: '/audit', icon: Shield, permission: SystemPermission.AUDIT_READ },
    { name: 'Configuración', href: '/config', icon: Settings, permission: SystemPermission.SYSTEM_CONFIG },
  ]
}

export function Sidebar() {
  const { user } = useAuth()
  const location = useLocation()
  const { sidebarOpen, setSidebarOpen } = useUIStore()
  const [platformsExpanded, setPlatformsExpanded] = useState(false)
  const [selectedPlatform, setSelectedPlatform] = useState('planifika')
  
  if (!user) return null

  const userNavigation = navigation.admin_drimsoft
  const activePlatform = drimsoftPlatforms.find(p => p.id === selectedPlatform) || drimsoftPlatforms[0]

  return (
    <>
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 lg:hidden z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={cn(
        "fixed left-0 top-0 h-full bg-white dark:bg-gradient-to-b dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 border-r border-gray-200 dark:border-slate-700 z-50 transition-transform duration-300 ease-in-out",
        "w-72 sm:w-80",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Selector de Plataformas */}
          <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 dark:border-slate-700/50">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <DrimSoftLogo className="h-5 w-5 sm:h-6 sm:w-6 text-[#3A6EA5]" />
                <span className="ml-2 text-xs sm:text-sm font-bold text-[#3A6EA5] font-['Poppins']">DrimSoft</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-700"
                onClick={() => setSidebarOpen(false)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Plataforma Activa */}
            <div 
              className={cn(
                "relative p-3 sm:p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg",
                activePlatform.bgColor,
                activePlatform.borderColor
              )}
              onClick={() => setPlatformsExpanded(!platformsExpanded)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="relative">
                    <div 
                      className="absolute inset-0 rounded-xl opacity-20 blur-lg"
                      style={{ backgroundColor: activePlatform.color }}
                    ></div>
                    <div 
                      className="relative p-1.5 sm:p-2 rounded-xl border"
                      style={{ 
                        backgroundColor: `${activePlatform.color}10`,
                        borderColor: `${activePlatform.color}20`
                      }}
                    >
                      <activePlatform.icon 
                        className="h-5 w-5 sm:h-6 sm:w-6" 
                      />
                    </div>
                  </div>
                  <div className="ml-2 sm:ml-3">
                    <div className={cn("text-sm sm:text-lg font-bold font-['Poppins']", activePlatform.textColor)}>
                      {activePlatform.name}
                    </div>
                    <div className={cn("text-xs sm:text-sm font-['Inter']", activePlatform.textColor)}>
                      {activePlatform.subtitle}
                    </div>
                  </div>
                </div>
                {drimsoftPlatforms.length > 1 && (
                  platformsExpanded ? (
                    <ChevronUp className="h-4 w-4 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  )
                )}
              </div>
            </div>

            {/* Lista de Plataformas - Solo se muestra si hay más de una plataforma */}
            {platformsExpanded && drimsoftPlatforms.length > 1 && (
              <div className="mt-3 space-y-2 max-h-64 overflow-y-auto">
                {drimsoftPlatforms.map((platform) => (
                  <div
                    key={platform.id}
                    className={cn(
                      "p-3 rounded-xl border cursor-pointer transition-all duration-200 hover:shadow-md",
                      platform.id === selectedPlatform 
                        ? `${platform.bgColor} ${platform.borderColor} border-2` 
                        : "bg-gray-50 dark:bg-slate-800 border-gray-200 dark:border-slate-600 hover:bg-gray-100 dark:hover:bg-slate-700"
                    )}
                    onClick={() => {
                      setSelectedPlatform(platform.id)
                      setPlatformsExpanded(false)
                    }}
                  >
                    <div className="flex items-center">
                      <div 
                        className="p-2 rounded-lg"
                        style={{ 
                          backgroundColor: `${platform.color}10`,
                          borderColor: `${platform.color}20`
                        }}
                      >
                        <platform.icon 
                          className="h-4 w-4" 
                        />
                      </div>
                      <div className="ml-3 flex-1">
                        <div className={cn(
                          "text-sm font-semibold font-['Poppins']",
                          platform.id === selectedPlatform ? platform.textColor : "text-gray-700 dark:text-gray-300"
                        )}>
                          {platform.name}
                        </div>
                        <div className={cn(
                          "text-xs font-['Inter']",
                          platform.id === selectedPlatform ? platform.textColor : "text-gray-500 dark:text-gray-400"
                        )}>
                          {platform.subtitle}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {platform.stats.organizations} orgs
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {platform.stats.users}K users
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sección de Perfil de Usuario Mejorada */}
          <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-slate-700/50">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="relative">
                <img
                  src={user.avatar || 'https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?w=100&h=100&fit=crop&crop=face'}
                  alt={user.name}
                  className="h-10 w-10 sm:h-12 sm:w-12 rounded-2xl object-cover ring-2 ring-[#FFD369]/30"
                />
                <div className="absolute -bottom-1 -right-1 h-3 w-3 sm:h-4 sm:w-4 bg-[#4CAF50] border-2 border-white dark:border-slate-800 rounded-full"></div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm sm:text-lg font-semibold text-gray-900 dark:text-white truncate font-['Poppins']">{user.name}</p>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 capitalize font-['Inter']">
                  {user.role.replace('_', ' ')}
                </p>
                {user.institution && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-['Inter'] truncate">{user.institution}</p>
                )}
              </div>
            </div>
            
            {/* Estadísticas de la plataforma activa */}
            <div className="mt-3 sm:mt-4 grid grid-cols-2 gap-2 sm:gap-3">
              <div className="text-center p-2 sm:p-3 bg-gray-100 dark:bg-white/5 rounded-xl">
                <div className="text-sm sm:text-lg font-bold text-gray-900 dark:text-white font-['Poppins']">{activePlatform.stats.organizations}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400 font-['Inter']">Organizaciones</div>
              </div>
              <div className="text-center p-2 sm:p-3 bg-gray-100 dark:bg-white/5 rounded-xl">
                <div className="text-sm sm:text-lg font-bold text-gray-900 dark:text-white font-['Poppins']">{activePlatform.stats.users}K+</div>
                <div className="text-xs text-gray-600 dark:text-gray-400 font-['Inter']">Usuarios</div>
              </div>
            </div>
          </div>

          {/* Navegación Mejorada */}
          <nav className="flex-1 px-4 sm:px-6 py-6 sm:py-8 space-y-2 sm:space-y-3">
            <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-3 sm:mb-4 font-['Inter']">
              Navegación Principal
            </div>
            {userNavigation.map((item) => {
              const isActive = location.pathname === item.href || 
                (item.href !== '/dashboard' && location.pathname.startsWith(item.href))
              
              return (
                <PermissionGuard key={item.name} permission={item.permission}>
                  <NavLink
                    to={item.href}
                    className={cn(
                      "group relative flex items-center justify-between px-3 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm font-medium rounded-2xl transition-all duration-300 font-['Inter']",
                      isActive 
                        ? 'bg-[#FFD369] text-[#222831] shadow-xl shadow-[#FFD369]/30 transform scale-105' 
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700/50 hover:text-gray-900 dark:hover:text-white hover:transform hover:scale-102'
                    )}
                    onClick={() => window.innerWidth < 1024 && setSidebarOpen(false)}
                  >
                    <div className="flex items-center">
                      <item.icon className={cn(
                        "mr-3 sm:mr-4 h-5 w-5 sm:h-6 sm:w-6 transition-all duration-200",
                        isActive ? 'text-[#222831]' : 'text-gray-500 dark:text-gray-400 group-hover:text-[#FFD369]'
                      )} />
                      <span className="font-medium">{item.name}</span>
                    </div>
                    
                    {isActive && (
                      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 sm:h-8 bg-[#222831] rounded-r-full"></div>
                    )}
                  </NavLink>
                </PermissionGuard>
              )
            })}
          </nav>

          {/* Información de Institución Mejorada */}
          {user.institution && (
            <div className="p-4 sm:p-6 border-t border-gray-200 dark:border-slate-700/50">
              <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-3 font-['Inter']">Institución</div>
              <div className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 bg-gray-100 dark:bg-white/5 rounded-xl">
                <Building className="h-4 w-4 sm:h-5 sm:w-5 text-[#3A6EA5]" />
                <div>
                  <div className="text-xs sm:text-sm font-medium text-gray-800 dark:text-gray-200 font-['Inter']">{user.institution}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 font-['Inter']">ID Usuario: {user.id}</div>
                </div>
              </div>
            </div>
          )}

          {/* Footer Mejorado */}
          <div className="p-4 sm:p-6 border-t border-gray-200 dark:border-slate-700/50">
            <div className="flex items-center justify-center p-2 sm:p-3 bg-gray-100 dark:bg-white/5 rounded-xl">
              <span className="text-xs text-gray-600 dark:text-gray-400 font-['Inter']">Desarrollado por</span>
              <div className="ml-2 flex items-center">
                <DrimSoftLogo className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="ml-1 sm:ml-2 text-xs sm:text-sm font-bold text-[#3A6EA5] font-['Poppins']">DrimSoft</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}