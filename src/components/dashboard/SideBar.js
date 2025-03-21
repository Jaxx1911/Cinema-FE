"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Search, Ticket, User, Film, Calendar, Heart, Settings, LogOut } from "lucide-react"
import Image from "next/image"
import { useAuth } from "@/hooks/useAuth"

export default function Sidebar() {
    const pathname = usePathname()
    const { logout } = useAuth()
    const isActive = (path) => {
        return pathname === path
    }

    const handleLogout = async (e) => {
        e.preventDefault()
        logout()
    }

    return (
        <div className="w-68 h-screen bg-card border-r border fixed left-0 top-0 flex flex-col">
            <div className="p-6">
                <h1 className="text-2xl font-bold text-primary mb-8">MBCKing</h1>

                <div className="flex items-center gap-3 mb-8 p-3 bg-input rounded-lg">
                    <Image
                        src="/test1.jpg?height=40&width=40"
                        alt="Profile"
                        width={40}
                        height={40}
                        className="rounded-full"
                    />
                    <div>
                        <p className="font-medium">Angelina</p>
                        <p className="text-xs text-muted-foreground">Premium Member</p>
                    </div>
                </div>

                <div className="space-y-1 mb-8">
                    <h2 className="text-xs uppercase text-muted-foreground mb-2 px-3">Menu</h2>
                    <SidebarLink href="/dashboard" icon={<Home />} label="Home" active={isActive("/dashboard")} />
                    <SidebarLink href="/movies" icon={<Film />} label="Movies" active={isActive("/movies")} />
                    <SidebarLink href="/showtimes" icon={<Calendar />} label="Showtimes" active={isActive("/cinemas")} />
                    <SidebarLink href="/search" icon={<Search />} label="Search" active={isActive("/search")} />
                </div>

                <div className="space-y-1 mb-8">
                    <h2 className="text-xs uppercase text-muted-foreground mb-2 px-3">Personal</h2>
                    <SidebarLink href="/tickets" icon={<Ticket />} label="My Tickets" active={isActive("/tickets")} />
                    <SidebarLink href="/favorites" icon={<Heart />} label="Favorites" active={isActive("/favorites")} />
                    <SidebarLink href="/profile" icon={<User />} label="Profile" active={isActive("/profile")} />
                    <SidebarLink href="/settings" icon={<Settings />} label="Settings" active={isActive("/settings")} />
                </div>
            </div>

            <div className="mt-auto p-6">
                <div className="p-4 bg-input rounded-lg mb-6">
                    <p className="text-sm font-medium mb-2">Upgrade to Premium</p>
                    <p className="text-xs text-muted-foreground mb-3">Get access to exclusive movies and discounts</p>
                    <button className="primary-button text-sm py-2">Upgrade Now</button>
                </div>

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

