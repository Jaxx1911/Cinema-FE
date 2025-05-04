"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import userService from "@/services/userService"
import { authService } from "@/services/authService"
import { useUserInfo } from "@/hooks/useUser"
import PaymentCard from "@/components/profile/PaymentCard"
import { CreditCard, User, Lock, Upload, X, Eye, EyeOff } from "lucide-react"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("change-info")
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const {data: user} = useUserInfo()

  // User profile state
  const [userProfile, setUserProfile] = useState({
    name: "",
    email: "",
    phone: "",
    avatar: "",
  })

  // Track if there are any changes
  const [hasChanges, setHasChanges] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  console.log(hasChanges)
  // Initialize form data when user data is available
  useEffect(() => {
    if (user?.body) {
      setUserProfile({
        name: user.body.name || "",
        email: user.body.email || "",
        phone: user.body.phone || "",
        avatar: user.body.avatar || "",
      })
    }
  }, [user])

  // Handle profile form changes
  const handleProfileChange = (e) => {
    const { name, value } = e.target
    setUserProfile((prev) => {
      const newProfile = {
        ...prev,
        [name]: value,
      }
      
      // Check if there are actual changes
      const hasActualChanges = 
        newProfile.name !== user?.body?.name ||
        newProfile.phone !== user?.body?.phone ||
        avatarFile !== null

      setHasChanges(hasActualChanges)
      return newProfile
    })
  }

  // Handle avatar change
  const [avatarPreview, setAvatarPreview] = useState(null)
  const [avatarFile, setAvatarFile] = useState(null)

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setAvatarFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarPreview(reader.result)
      }
      reader.readAsDataURL(file)
      
      // Check if there are actual changes
      const hasActualChanges = 
        userProfile.name !== user?.body?.name ||
        userProfile.phone !== user?.body?.phone ||
        true // New avatar file means there are changes

      setHasChanges(hasActualChanges)
    }
  }

  // Handle form submission
  const handleProfileSubmit = async (e) => {
    e.preventDefault()
    if (!hasChanges) return

    setIsSubmitting(true)
    try {
      if (avatarFile) {
        const response = await userService.changeAvatar(avatarFile)
      }
      const response = await userService.updateUser(userProfile)

      if (response.message != "success") {
        throw new Error('Failed to update profile')
      }
      setHasChanges(false)
      setAvatarFile(null)
      alert("Profile updated successfully!")
    } catch (error) {
      alert("Failed to update profile. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Password change states
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState("")

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match!")
      return
    }
    try {
      const response = await authService.changePassword({
        old_password: oldPassword,
        new_password: newPassword,
        confirm_password: confirmPassword
      })
      if (response.message !== "success") {
        throw new Error('Failed to update password')
      }
      alert("Password updated successfully!")
      setShowPasswordModal(false)
      // Reset password fields
      setOldPassword("")
      setNewPassword("")
      setConfirmPassword("")
    } catch (error) {
      console.log(error)
      alert("Failed to update password. Please try again.")
    }
  }

  return (
    <div className="container p-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Profile Sidebar */}
        <div className="w-full lg:w-1/3">
          <div className="bg-card border rounded-lg overflow-hidden">
            <div className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-input border-2 border-primary mb-4">
                  <Image
                    src={user?.body?.avatar_url || "/test1.jpg"}
                    alt={user?.body?.name || "User Avatar"}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-xl font-bold mb-1">{user?.body?.name}</h2>
                <p className="text-muted-foreground text-sm mb-2">{user?.body?.email}</p>
              </div>
              <div className="mt-6">
                <nav className="space-y-2">
                  
                  <button
                    onClick={() => setActiveTab("change-info")}
                    className={`flex items-center gap-3 px-3 py-2 rounded-md w-full text-left ${
                      activeTab === "change-info"
                        ? "bg-primary-10 text-primary"
                        : "text-muted-foreground hover:text-white"
                    }`}
                  >
                    <User className="w-4 h-4" />
                    <span>User Profile</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("payment-history")}
                    className={`flex items-center gap-3 px-3 py-2 rounded-md w-full text-left ${
                      activeTab === "payment-history"
                        ? "bg-primary-10 text-primary"
                        : "text-muted-foreground hover:text-white"
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Payment History</span>
                  </button>
                  <button
                    onClick={() => setShowPasswordModal(true)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-md w-full text-left ${
                      activeTab === "change-password"
                        ? "bg-primary-10 text-primary"
                        : "text-muted-foreground hover:text-white"
                    }`}
                  >
                    <Lock className="w-4 h-4" />
                    <span>Change Password</span>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full lg:w-2/3">
          {/* Change Info Tab */}
          {activeTab === "change-info" && (
            <div data-active-tab="true">
              <h1 className="text-2xl font-bold mb-6">Edit Profile Information</h1>

              <div className="bg-card border rounded-lg overflow-hidden">
                <form onSubmit={handleProfileSubmit} className="p-6">
                  <div className="flex flex-col items-center mb-6">
                    <div
                      className="relative"
                    >
                      <div
                        className="w-32 h-32 rounded-full overflow-hidden bg-input border-2 border-primary mb-4 relative cursor-pointer"
                        onClick={() => document.getElementById("avatar-upload").click()}
                      >
                        <Image
                          src={avatarPreview || user?.body?.avatar_url || "/test1.jpg"}
                          alt={user?.body?.name || "User Avatar"}
                          width={128}
                          height={128}
                          className="w-full h-full object-cover"
                        />

                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <Upload className="w-4 h-4" />
                        </div>
                      </div>
                      <label
                        htmlFor="avatar-upload"
                        className="absolute bottom-2 right-0 bg-primary text-black p-2 rounded-full cursor-pointer"
                      >
                        <Upload className="w-4 h-4" />
                        <input
                          type="file"
                          id="avatar-upload"
                          className="hidden"
                          accept="image/*"
                          onChange={handleAvatarChange}
                        />
                      </label>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="text-sm .text-primary mb-1 block">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={userProfile.name}
                        onChange={handleProfileChange}
                        className="bg-input border w-full px-3 py-2 rounded-md"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="text-sm .text-primary mb-1 block">
                        Email Address
                      </label>
                      <div className="bg-input border w-full px-3 py-2 rounded-md text-muted-foreground">
                        {user?.body?.email}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Email address cannot be changed</p>
                    </div>

                    <div>
                      <label htmlFor="phone" className="text-sm .text-primary mb-1 block">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={userProfile.phone}
                        onChange={handleProfileChange}
                        className="bg-input border w-full px-3 py-2 rounded-md"
                        placeholder="Text your phone number"
                      />
                    </div>

                    <div className="pt-4">
                      <button 
                        type="submit" 
                        className="primary-button"
                        disabled={!hasChanges || isSubmitting}
                      >
                        {isSubmitting ? 'Saving...' : 'Save Changes'}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}

          {activeTab === "payment-history" && (
            <PaymentCard />
          )}
        </div>
      </div>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black-80 flex items-center justify-center p-4 z-30">
          <div className="bg-card border rounded-lg w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Change Password</h2>
              <button onClick={() => setShowPasswordModal(false)} className="text-muted-foreground hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <label className="text-sm text-muted-foreground mb-1 block">Current Password</label>
                <input 
                  type={showOldPassword ? "text" : "password"} 
                  className="bg-input border w-full px-3 py-2 rounded-md"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-10 text-muted-foreground hover:text-white"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                >
                  {showOldPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <div className="relative">
                <label className="text-sm text-muted-foreground mb-1 block">New Password</label>
                <input 
                  type={showNewPassword ? "text" : "password"} 
                  className="bg-input border w-full px-3 py-2 rounded-md"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-10 text-muted-foreground hover:text-white"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <div className="relative">
                <label className="text-sm text-muted-foreground mb-1 block">Confirm New Password</label>
                <input 
                  type={showConfirmPassword ? "text" : "password"} 
                  className="bg-input border w-full px-3 py-2 rounded-md"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-10 text-muted-foreground hover:text-white"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

              <div className="flex gap-3" style={{marginTop: "0px"}}>
                <button 
                  type="submit"
                  className="primary-button" 
                  onClick={handlePasswordSubmit}
                  disabled={!oldPassword || !newPassword || !confirmPassword}
                >
                  Update Password
                </button>
                <button 
                  className="secondary-button" 
                  onClick={() => {
                    setShowPasswordModal(false)
                    // Reset password fields
                    setOldPassword("")
                    setNewPassword("")
                    setConfirmPassword("")
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
