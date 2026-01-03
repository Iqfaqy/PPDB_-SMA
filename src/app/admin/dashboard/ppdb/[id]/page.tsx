'use client';

// Basic detail page implementation
import { useState, useEffect } from 'react';
import { getApplications, saveApplication } from '@/actions/content';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Check, X, FileText } from 'lucide-react';
import Link from 'next/link';

export default function PPDBDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [app, setApp] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        load();
    }, []);

    async function load() {
        const list = await getApplications();
        const found = list?.find((a: any) => a.userId === params.id);
        setApp(found);
        setLoading(false);
    }

    async function handleVerify() {
        if (!app) return;
        // Prompt for test date
        const date = prompt('Masukkan Tanggal Test Seleksi:', 'Ahad, 15 Januari 2026');
        if (date) {
            const updated = { ...app, status: 'verified', testDate: date };
            await saveApplication(updated);
            alert('Berkas diverifikasi & Jadwal test dikirim ke user.');
            router.push('/admin/dashboard/ppdb');
        }
    }

    if (loading) return <div>Loading...</div>;
    if (!app) return <div>Data tidak ditemukan.</div>;

    return (
        <div>
            <Link href="/admin/dashboard/ppdb" className="flex items-center gap-2 text-gray-500 hover:text-gray-800 mb-6 font-medium">
                <ArrowLeft size={18} /> Kembali
            </Link>

            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">{app.name}</h1>
                    <p className="text-gray-500">Calon Santri Baru</p>
                </div>
                <div className="flex gap-3">
                    <button onClick={handleVerify} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 disabled:opacity-50">
                        <Check size={18} /> Verifikasi Berkas
                    </button>
                    {/* Add Rejected logic if needed later */}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <h3 className="font-bold text-lg mb-4">Biodata</h3>
                    <div className="space-y-3">
                        <div><label className="text-sm text-gray-500 block">NISN</label>{app.nisn || '-'}</div>
                        <div><label className="text-sm text-gray-500 block">Asal Sekolah</label>{app.schoolOrigin || '-'}</div>
                        <div><label className="text-sm text-gray-500 block">Email / Akun</label>{app.email || '-'}</div>
                        <div><label className="text-sm text-gray-500 block">No. HP</label>{app.phone || '-'}</div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <h3 className="font-bold text-lg mb-4">Berkas Dokumen</h3>
                    <div className="space-y-4">
                        {app.documents?.map((doc: any, i: number) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <FileText className="text-blue-600" size={20} />
                                    <span className="font-medium text-sm text-gray-700">{doc.type}</span>
                                </div>
                                <a href={doc.url} target="_blank" className="text-blue-600 text-sm hover:underline">Lihat</a>
                            </div>
                        )) || <p className="text-gray-400 text-sm">Belum ada berkas diupload.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}
