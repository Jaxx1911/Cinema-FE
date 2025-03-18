"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { tokenStorage } from "@/utils/tokenStorage"

export default function ProtectedRoute({ children }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if we have tokens
    const accessToken = tokenStorage.getAccessToken()
    
    if (!accessToken) {
      // Redirect to homepage if no token
      router.replace('/')
      return
    }
    
    setIsLoading(false)
  }, [router])

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return children
} 