import React from 'react'
import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
}

export function Logo({ className }: LogoProps) {
  return (
    <img 
      src="/assets/images/planifika_logo.png" 
      alt="Planifika" 
      className={cn("h-auto", className)}
    />
  )
}
