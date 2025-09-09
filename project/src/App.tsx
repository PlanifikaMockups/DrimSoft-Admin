import React, { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './app/router'
import { Providers } from './app/providers'
import { useUIStore } from './stores/ui'

function App() {
  const theme = useUIStore(state => state.theme)

  useEffect(() => {
    // Apply theme to document
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  // Initialize MSW in development
  useEffect(() => {
    if (import.meta.env.DEV) {
      import('./mocks/browser').then(({ worker }) => {
        worker.start({
          onUnhandledRequest: 'bypass',
        })
      })
    }
  }, [])

  return (
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  )
}

export default App