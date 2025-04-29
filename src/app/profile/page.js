"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useUserInfo } from "@/hooks/useUser"
import PaymentCard from "@/components/profile/PaymentCard"
// Sample user data
const userData = {
  name: "Angelina",
  email: "angelina@example.com",
  phone: "+84 123 456 789",
  avatar: "/test1.jpg?height=150&width=150",
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("change-info")
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [showAvatarTooltip, setShowAvatarTooltip] = useState(false)
  const router = useRouter()
  const {data: user} = useUserInfo()

  // User profile state
  const [userProfile, setUserProfile] = useState({
    name: user?.body?.name,
    email: user?.body?.email,
    phone: user?.body?.phone || "",
    avatar: user?.body?.avatar,
  })

  // Handle profile form changes
  const handleProfileChange = (e) => {
    const { name, value } = e.target
    setUserProfile((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle avatar change
  const [avatarPreview, setAvatarPreview] = useState(null)

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle form submission
  const handleProfileSubmit = (e) => {
    e.preventDefault()
    // In a real app, you would send this data to your backend
    alert("Profile updated successfully!")
    // Update the userData object to reflect changes in the sidebar
    userData.name = userProfile.name
    userData.email = userProfile.email
    userData.phone = userProfile.phone
    if (avatarPreview) {
      userData.avatar = avatarPreview
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
                    className="object-cover"
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="20" height="14" x="2" y="5" rx="2" />
                      <line x1="2" x2="22" y1="10" y2="10" />
                    </svg>
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
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
                      onMouseEnter={() => setShowAvatarTooltip(true)}
                      onMouseLeave={() => setShowAvatarTooltip(false)}
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
                          className="object-cover"
                        />

                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="17 8 12 3 7 8" />
                            <line x1="12" x2="12" y1="3" y2="15" />
                          </svg>
                        </div>
                      </div>

                      <label
                        htmlFor="avatar-upload"
                        className="absolute bottom-2 right-0 bg-primary text-black p-2 rounded-full cursor-pointer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="17 8 12 3 7 8" />
                          <line x1="12" x2="12" y1="3" y2="15" />
                        </svg>
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
                        {userProfile.email}
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
                      <button type="submit" className="primary-button">
                        Save Changes
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Current Password</label>
                <input type="password" className="bg-input border" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">New Password</label>
                <input type="password" className="bg-input border" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Confirm New Password</label>
                <input type="password" className="bg-input border" />
              </div>

              <div className="pt-4 flex gap-3">
                <button className="primary-button">Update Password</button>
                <button className="secondary-button" onClick={() => setShowPasswordModal(false)}>
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
