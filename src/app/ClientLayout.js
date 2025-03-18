"use client"

import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Providers from './providers'
import { tokenStorage } from '@/utils/tokenStorage'

// Define protected routes
const protectedRoutes = [
  '/dashboard',
  '/profile',
  '/bookings',
  // Add any other protected routes here
]

export default function ClientLayout({ children }) {
  const pathname = usePathname()
  const router = useRouter()
  
  useEffect(() => {
    // Check if we're on client-side
    if (typeof window !== 'undefined') {
      // Check if current route is protected
      const isProtectedRoute = protectedRoutes.some(route => 
        pathname.startsWith(route)
      )
      
      if (isProtectedRoute) {
        // Check for token
        const hasTokens = tokenStorage.hasTokens()
        
        if (!hasTokens) {
          router.replace('/')
        }
      }
    }
  }, [pathname, router])

  return <Providers>{children}</Providers>
} 