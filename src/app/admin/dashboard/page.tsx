import { getActivityStats } from '@/actions/content'; // We'll implement this simple stat getter later or just mock it for now
import { Users, FileText, Calendar } from 'lucide-react';

export default function DashboardPage() {
    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatCard
                    title="Total Guru"
                    value="Wait..."
                    icon={<Users className="text-blue-600" size={24} />}
                    color="bg-blue-50"
                />
                <StatCard
                    title="Total Jadwal"
                    value="Wait..."
                    icon={<Calendar className="text-green-600" size={24} />}
                    color="bg-green-50"
                />
                <StatCard
                    title="Content Sections"
                    value="4"
                    icon={<FileText className="text-purple-600" size={24} />}
                    color="bg-purple-50"
                />
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Selamat Datang di Admin Panel</h2>
                <p className="text-gray-600">
                    Silahkan pilih menu di sebelah kiri untuk mengelola konten website Anda.
                    Anda dapat mengubah latar belakang, informasi profil, data guru, dan jadwal kegiatan.
                </p>
            </div>
        </div>
    );
}

function StatCard({ title, value, icon, color }: any) {
    return (
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className={`p-3 rounded-lg ${color}`}>
                {icon}
            </div>
            <div>
                <p className="text-sm text-gray-500 font-medium">{title}</p>
                <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
            </div>
        </div>
    );
}
