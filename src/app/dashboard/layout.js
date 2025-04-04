
import Sidebar from "@/components/dashboard/SideBar"

export default function DashboardLayout({ children }) {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="ml-72 flex-1">{children}</div>
        </div>
    )
}
