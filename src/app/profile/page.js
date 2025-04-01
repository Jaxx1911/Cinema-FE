"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

// Sample user data
const userData = {
  name: "Angelina",
  email: "angelina@example.com",
  phone: "+84 123 456 789",
  avatar: "/test1.jpg?height=150&width=150",
}

// Sample booking history
const bookingHistory = [
  {
    id: "B12345",
    movieTitle: "Dune: Part Two",
    poster: "/test1.jpg?height=450&width=300",
    date: "June 15, 2024",
    time: "7:30 PM",
    theater: "Cinema City - IMAX",
    seats: ["G12", "G13"],
    totalAmount: "125.000 VNĐ",
  },
  {
    id: "B12289",
    movieTitle: "Godzilla x Kong",
    poster: "/test1.jpg?height=450&width=300",
    date: "May 28, 2024",
    time: "8:45 PM",
    theater: "Cinema City - Screen 3",
    seats: ["F5", "F6", "F7"],
    totalAmount: "300.000 VNĐ",
  },
  {
    id: "B11987",
    movieTitle: "The Fall Guy",
    poster: "/test1.jpg?height=450&width=300",
    date: "May 10, 2024",
    time: "6:15 PM",
    theater: "Starlight Cinema",
    seats: ["D8", "D9"],
    totalAmount: "515.000 VNĐ",
  },
]

// Sample payment history
const paymentHistory = [
  {
    id: "P78901",
    date: "June 15, 2024",
    amount: "200.000 VNĐ",
    method: "VNPay",
    movieTitle: "Dune: Part Two",
    status: "Completed",
  },
  {
    id: "P78890",
    date: "May 28, 2024",
    amount: "515.000 VNĐ",
    method: "VietQR",
    movieTitle: "Godzilla x Kong",
    status: "Completed",
  },
  {
    id: "P78456",
    date: "May 10, 2024",
    amount: "231.000 VNĐ",
    method: "VNPay",
    movieTitle: "The Fall Guy",
    status: "Completed",
  },
  {
    id: "P77123",
    date: "April 22, 2024",
    amount: "235.000 VNĐ",
    method: "VietQR",
    movieTitle: "The Avengers: Endgame",
    status: "Completed",
  },
  {
    id: "P76890",
    date: "March 22, 2024",
    amount: "150.000 VNĐ",
    method: "VNPay",
    movieTitle: "Interstellar",
    status: "Completed",
  },
]

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("change-info")
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [showAvatarTooltip, setShowAvatarTooltip] = useState(false)
  const router = useRouter()

  // User profile state
  const [userProfile, setUserProfile] = useState({
    name: userData.name,
    email: userData.email,
    phone: userData.phone || "",
    avatar: userData.avatar,
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
                    src={userData.avatar || "/test1.jpg"}
                    alt={userData.name}
                    width={96}
                    height={96}
                    className="object-cover"
                  />
                </div>
                <h2 className="text-xl font-bold mb-1">{userData.name}</h2>
                <p className="text-muted-foreground text-sm mb-2">{userData.email}</p>
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
                          src={avatarPreview || userData.avatar || "/test1.jpg"}
                          alt={userData.name}
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

          {/* My Tickets Tab */}
          {activeTab === "tickets" && (
            <div data-active-tab="true">
              <h1 className="text-2xl font-bold mb-6">My Tickets</h1>

              <div className="space-y-6">
                {bookingHistory.map((booking) => (
                  <div key={booking.id} className="bg-card border rounded-lg overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="max-w-2xl md:w-1/4 relative" style={{ minHeight: "200px" }}>
                        <Image
                          src={booking.poster || "/test1.jpg"}
                          alt={booking.movieTitle}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-6 flex-1">
                        <div className="flex flex-col md:flex-row justify-between mb-4">
                          <div>
                            <h2 className="text-xl font-bold">{booking.movieTitle}</h2>
                            <p className="text-muted-foreground text-sm">Booking ID: {booking.id}</p>
                          </div>
                          <div className="mt-2 md:mt-0">
                            <span className="text-primary font-bold">{booking.totalAmount}</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                          <div>
                            <p className="text-muted-foreground text-xs mb-1">Date & Time</p>
                            <div className="flex items-center gap-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-primary"
                              >
                                <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                                <line x1="16" x2="16" y1="2" y2="6" />
                                <line x1="8" x2="8" y1="2" y2="6" />
                                <line x1="3" x2="21" y1="10" y2="10" />
                              </svg>
                              <span>{booking.date}</span>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-primary"
                              >
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="12 6 12 12 16 14" />
                              </svg>
                              <span>{booking.time}</span>
                            </div>
                          </div>
                          <div>
                            <p className="text-muted-foreground text-xs mb-1">Theater</p>
                            <div className="flex items-center gap-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-primary"
                              >
                                <path d="M19.5 14c-1.4 0-2.5 1.1-2.5 2.5 0 .2 0 .5.1.7l-3.5 3.5c-.2-.1-.5-.1-.7-.1-1.4 0-2.5 1.1-2.5 2.5s1.1 2.5 2.5 2.5 2.5-1.1 2.5-2.5c0-.2 0-.5-.1-.7l3.5-3.5c.2.1.5.1.7.1 1.4 0 2.5-1.1 2.5-2.5s-1.1-2.5-2.5-2.5z" />
                                <path d="M12 2C6.5 2 2 6.5 2 12c0 2.3.8 4.5 2.3 6.3" />
                                <path d="M9 22v-1c0-1.1.9-2 2-2h2a2 2 0 0 1 2 2v1" />
                                <path d="M12 11h.01" />
                              </svg>
                              <span>{booking.theater}</span>
                            </div>
                          </div>
                          <div>
                            <p className="text-muted-foreground text-xs mb-1">Seats</p>
                            <div className="flex flex-wrap gap-2">
                              {booking.seats.map((seat, index) => (
                                <span key={index} className="bg-input px-2 py-1 rounded-md text-sm">
                                  {seat}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div>
                          <button className="primary-button">View Ticket</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "payment-history" && (
            <div data-active-tab="true">
              <h1 className="text-2xl font-bold mb-6">Payment History</h1>

              <div className="bg-card border rounded-lg overflow-hidden">
                <div className="p-4">
                  {paymentHistory.map((payment) => (
                    <div key={payment.id} className="flex justify-between items-center py-3 border-b">
                      <div>
                        <h3 className="font-medium">{payment.movieTitle}</h3>
                        <p className="text-sm text-muted-foreground">{payment.date}</p>
                      </div>

                      <div>
                        <span className="text-primary font-bold">{payment.amount}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
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

