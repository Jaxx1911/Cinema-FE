"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import LoginForm from "@/components/auth/LoginForm"
import SignupForm from "@/components/auth/SignupForm"
import ForgotPassword from "@/components/auth/ForgotPassword"
import { redirect } from "next/navigation"

export default function Home() {
  if (localStorage.getItem("access_token")) {
    redirect("/dashboard")
  }
  const [authMode, setAuthMode] = useState("login")
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false
  })

  const [currentPoster, setCurrentPoster] = useState(0)
  const [nextPoster, setNextPoster] = useState(1)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const posters = [
    "/test1.jpg",
    "/test2.jpg",
    "/test3.jpg",
    "/test4.jpg"
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      const next = (currentPoster + 2) % posters.length;
      const nextNext = (nextPoster + 2) % posters.length;
      // Đợi 1 frame để đảm bảo next poster đã được render
      requestAnimationFrame(() => {
        // Bắt đầu transition
        setIsTransitioning(!isTransitioning);

        // Sau khi transition hoàn tất (1000ms)
        setTimeout(() => {
          if (!isTransitioning) {
            setCurrentPoster(next);
          } else {
            setNextPoster(nextNext);
          }
        }, 1000);
      });
      
    }, 5000);

    return () => clearInterval(interval);
  }, [currentPoster, nextPoster]);

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target
    setFormData((prev) => ({
      ...prev,
      // Use checked for checkbox, value for other inputs
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false
    })
    setShowPassword(false)
  }

  const toggleAuthMode = () => {
    resetForm() // Reset form when switching between login and signup
    setAuthMode(authMode === "login" ? "signup" : "login")
  }

  const forgotPassword = () => {
    setAuthMode("forgotPassword")
  }

  const toLoginMode = () => {
    setAuthMode("login")
  }

  // Filter formData based on authMode to only pass relevant fields
  const getFormDataByMode = () => {
    if (authMode === "login") {
      const { email, password } = formData
      return { email, password }
    }
    return formData
  }

  return (
    <div className="flex min-h-screen">
      {/* Poster side - 65% */}
      <div className="hidden lg:block lg:w-2/3 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-l from-black via-black/0 to-transparent z-10"></div>
        
        {/* Current poster */}
        <div 
          className="absolute inset-0 transition-opacity duration-1000" 
          style={{ opacity: isTransitioning ? 0 : 1 }}
        >
          <Image
            src={posters[currentPoster]}
            alt="Cinema"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Next poster */}
        <div 
          className="absolute inset-0 transition-opacity duration-1000" 
          style={{ opacity: isTransitioning ? 1 : 0 }}
        >
          <Image
            src={posters[nextPoster]}
            alt="Cinema"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="absolute bottom-4 right-0 left-0 p-12">
          <h2 className="text-3xl font-bold mb-2">Experience the magic of cinema</h2>
          <p className="text-xl text-white/80">Book your tickets for the latest blockbusters</p>
        </div>

        <div className="absolute bottom-8 right-0 left-0 flex justify-center gap-2 z-20">
          {posters.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                ((index === currentPoster && !isTransitioning) || (index === nextPoster && isTransitioning)) ? 'bg-primary' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Auth form side - 35% */}
      <div className="w-full lg:w-1/3 flex items-center justify-center p-6 bg-black">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-primary mb-2">BNC Cinema</h1>
            <p className="text-muted-foreground">Your premier cinema experience</p>
          </div>
          {authMode === "forgotPassword" ? (
            <ForgotPassword toLoginMode={toLoginMode} />
          ) : (
            <>
          {authMode === "login" ? (
            <LoginForm
              formData={getFormDataByMode()}
              handleChange={handleChange}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              forgotPassword={forgotPassword}
            />
          ) : (
            <SignupForm
              formData={getFormDataByMode()}
              handleChange={handleChange}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              toLoginMode={toLoginMode}
            />
          )}

          <div className="mt-8 text-center">
            <p className="text-muted-foreground">
              {authMode === "login" ? "Don't have an account? " : "Already have an account? "}
              <button onClick={toggleAuthMode} className="text-primary hover:underline bg-transparent border-none cursor-pointer">
                {authMode === "login" ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>
          </>)}
        </div>
      </div>
    </div>
  )
}

