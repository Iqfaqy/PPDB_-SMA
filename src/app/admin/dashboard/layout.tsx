import Link from 'next/link';
import { logout } from '@/actions/auth';
import {
    LayoutDashboard,
    Image as ImageIcon,
    User,
    Calendar,
    Users,
    LogOut,
    FileText
} from 'lucide-react';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 fixed h-full z-10 hidden md:block">
                <div className="p-6 border-b border-gray-100">
                    <h1 className="text-xl font-bold text-blue-600 flex items-center gap-2">
                        <LayoutDashboard />
                        Admin Panel
                    </h1>
                </div>

                <nav className="p-4 space-y-1">
                    <NavLink href="/admin/dashboard" icon={<LayoutDashboard size={20} />}>
                        Dashboard
                    </NavLink>
                    <NavLink href="/admin/dashboard/backgrounds" icon={<ImageIcon size={20} />}>
                        Backgrounds
                    </NavLink>
                    <NavLink href="/admin/dashboard/profile" icon={<User size={20} />}>
                        Profile Content
                    </NavLink>
                    <NavLink href="/admin/dashboard/teachers" icon={<Users size={20} />}>
                        Guru & Staff
                    </NavLink>
                    <NavLink href="/admin/dashboard/schedules" icon={<Calendar size={20} />}>
                        Jadwal
                    </NavLink>
                    <NavLink href="/admin/dashboard/facilities" icon={<ImageIcon size={20} />}>
                        Fasilitas
                    </NavLink>
                    <NavLink href="/admin/dashboard/contact" icon={<User size={20} />}>
                        Kontak
                    </NavLink>
                    <NavLink href="/admin/dashboard/ppdb" icon={<FileText size={20} />}>
                        PPDB & Pendaftar
                    </NavLink>
                </nav>

                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100">
                    <form action={logout}>
                        <button className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium">
                            <LogOut size={20} />
                            Logout
                        </button>
                    </form>
                </div>
            </aside>

            {/* Main Content */}
            <main className="md:ml-64 flex-1 p-8">
                {children}
            </main>
        </div>
    );
}

function NavLink({ href, icon, children }: { href: string; icon: React.ReactNode; children: React.ReactNode }) {
    return (
        <Link
            href={href}
            className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors font-medium"
        >
            {icon}
            {children}
        </Link>
    );
}
