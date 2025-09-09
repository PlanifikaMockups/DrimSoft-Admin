import React, { useState, useEffect, useRef } from 'react'
import { Menu, Search, Bell, Sun, Moon, LogOut, User, Settings, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useUIStore } from '@/stores/ui'
import { useAuthStore } from '@/stores/auth'

export function Header() {
  const { sidebarOpen, setSidebarOpen, theme, toggleTheme } = useUIStore()
  const { user, logout } = useAuthStore()
  const [userDropdownOpen, setUserDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleLogout = () => {
    logout()
    window.location.href = '/login'
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 px-4 lg:px-6 py-4 sticky top-0 z-40">
      <div className="flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-gray-100 dark:hover:bg-slate-800"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            title={sidebarOpen ? "Ocultar sidebar" : "Mostrar sidebar"}
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Global search */}
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar... (Presiona / para enfocar)"
              className="pl-10 w-80 bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-600"
              onKeyDown={(e) => {
                if (e.key === '/') {
                  e.preventDefault()
                  e.currentTarget.focus()
                }
              }}
            />
          </div>
          
          {/* Planifika Logo */}
          <div className="flex items-center space-x-2 ml-4">
            <img 
              src="/assets/images/planifika_logo.png" 
              alt="Planifika" 
              className="h-6 w-auto"
            />
            <span className="text-sm text-muted-foreground hidden lg:block">Powered by Planifika</span>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="hover:bg-gray-100 dark:hover:bg-slate-800">
            <Bell className="h-5 w-5" />
          </Button>
          
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="hover:bg-gray-100 dark:hover:bg-slate-800">
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          {/* User Dropdown */}
          <div ref={dropdownRef} className="relative pl-2 border-l border-gray-200 dark:border-slate-700">
            <Button
              variant="ghost"
              className="flex items-center space-x-3 px-3 py-2 hover:bg-gray-100 dark:hover:bg-slate-800"
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
            >
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.name}
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {user?.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{user?.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </Button>

            {/* Dropdown Menu */}
            {userDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-gray-200 dark:border-slate-700 py-2 z-50">
                <div className="px-4 py-3 border-b border-gray-200 dark:border-slate-700">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{user?.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
                </div>
                
                <div className="py-1">
                  <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700">
                    <User className="h-4 w-4 mr-3" />
                    Mi Perfil
                  </button>
                  <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700">
                    <Settings className="h-4 w-4 mr-3" />
                    Configuración
                  </button>
                </div>
                
                <div className="border-t border-gray-200 dark:border-slate-700 py-1">
                  <button 
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <LogOut className="h-4 w-4 mr-3" />
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}