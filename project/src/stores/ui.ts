import { create } from 'zustand'

interface UIState {
  theme: 'light' | 'dark'
  sidebarOpen: boolean
  toggleTheme: () => void
  setSidebarOpen: (open: boolean) => void
}

export const useUIStore = create<UIState>((set) => ({
  theme: 'dark',
  sidebarOpen: true,
  
  toggleTheme: () => set((state) => ({
    theme: state.theme === 'light' ? 'dark' : 'light'
  })),
  
  setSidebarOpen: (open: boolean) => set({ sidebarOpen: open }),
}))