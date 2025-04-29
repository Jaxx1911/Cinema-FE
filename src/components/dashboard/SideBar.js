"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Search, Ticket, User, Film, Calendar, Heart, Settings, LogOut } from "lucide-react"
import Image from "next/image"
import { useAuth } from "@/hooks/useAuth"
import { useUserInfo } from "@/hooks/useUser"
import { useRouter } from "next/navigation"
import { tokenStorage } from "@/utils/tokenStorage"

export default function Sidebar() {
    const router = useRouter()

    const pathname = usePathname()
    const { logout } = useAuth()
    const { data: userInfo, isError: isErrorUserInfo } = useUserInfo()
    
    if (isErrorUserInfo) {
        console.log(isErrorUserInfo)
        localStorage.clear()
        router.push("/")
    }

    const isActive = (path) => {
        return pathname.includes(path)
    }

    const handleLogout = async (e) => {
        e.preventDefault()
        logout()
    }

    return (
        <div className="w-68 h-screen bg-card hover:bg-card/80 transition-colors border-r border fixed left-0 top-0 flex flex-col">
            <div className="p-6">
                <h1 className="text-2xl font-bold text-primary mb-8">MBCKing</h1>

                <div className="flex items-center gap-3 mb-8 p-3 bg-input rounded-lg">
                    <Image
                        src={userInfo?.body?.avatar_url || "/test1.jpg?height=40&width=40"}
                        alt="Profile"
                        width={40}
                        height={40}
                        className="rounded-full"
                    />
                    <div>
                        <p className="font-medium">{userInfo?.body?.name}</p>
                        <p className="text-xs text-muted-foreground">Premium Member</p>
                    </div>
                </div>

                <div className="space-y-1 mb-8">
                    <h2 className="text-xs uppercase text-muted-foreground mb-2 px-3">Menu</h2>
                    <SidebarLink href="/dashboard" icon={<Home />} label="Home" active={isActive("/dashboard")} />
                    <SidebarLink href="/movies" icon={<Film />} label="Movies" active={isActive("/movies")} />
                    <SidebarLink href="/cinemas" icon={<Calendar />} label="Cinemas" active={isActive("/cinemas")} />
                </div>

                <div className="space-y-1 mb-8">
                    <h2 className="text-xs uppercase text-muted-foreground mb-2 px-3">Personal</h2>
                    <SidebarLink href="/tickets" icon={<Ticket />} label="My Tickets" active={isActive("/tickets")} />
                    <SidebarLink href="/profile" icon={<User />} label="Profile" active={isActive("/profile")} />
                </div>
            </div>

            <div className="mt-auto p-6">
                <button className="flex items-center gap-2 text-red-500 hover:text-red-400 transition-colors"
                    onClick={handleLogout}
                >
                    <LogOut className="w-5 h-5" />
                    <span>Log out</span>
                </button>
            </div>
        </div>
    )
}

function SidebarLink({ href, icon, label, active = false }) {
    return (
        <Link href={href} className={`sidebar-link ${active ? "active" : ""}`}>
            <span className="w-5 h-5">{icon}</span>
            <span>{label}</span>
        </Link>
    )
}

