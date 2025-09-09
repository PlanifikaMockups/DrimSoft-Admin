import React from 'react'
import { cn } from '@/lib/utils'

interface DrimSoftLogoProps {
  className?: string
}

export function DrimSoftLogo({ className }: DrimSoftLogoProps) {
  return (
    <img 
      src="/assets/images/DrimSoft logo.png" 
      alt="DrimSoft" 
      className={cn("h-auto", className)}
    />
  )
}
