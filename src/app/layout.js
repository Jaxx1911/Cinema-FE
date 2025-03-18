import { Inter } from "next/font/google"
import "./globals.css"
import ClientLayout from "./ClientLayout"

const inter = Inter({ subsets: ["latin"] })

// Define protected routes
const protectedRoutes = [
  '/dashboard',
  '/profile',
  '/bookings',
  // Add any other protected routes here
]

export const metadata = {
  title: "MBCKing - Cinema Booking App",
  description: "Book your favorite movies",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}

