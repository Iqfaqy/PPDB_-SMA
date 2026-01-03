'use client';

import { useState, useEffect } from 'react';
import { getPPBSettings, updatePPDBSettings, getApplications } from '@/actions/content';
import { Loader2, Save, FileText, CheckCircle, Clock } from 'lucide-react';
import Link from 'next/link';

export default function PPDBAdminPage() {
    const [settings, setSettings] = useState<any>(null);
    const [applications, setApplications] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        const [s, a] = await Promise.all([getPPBSettings(), getApplications()]);
        setSettings(s || {});
        setApplications(a || []);
        setLoading(false);
    }

    async function handleSaveSettings() {
        setSaving(true);
        await updatePPDBSettings(settings);
        setSaving(false);
        alert('Pengaturan PPDB disimpan');
    }

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Manajemen PPDB</h1>

            {/* Settings Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold">Pengaturan PPDB</h2>
                    <button onClick={handleSaveSettings} disabled={saving} className="text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg font-medium flex items-center gap-2">
                        {saving ? 'Saving...' : 'Simpan Pengaturan'}
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium mb-1">Tahun Ajaran</label>
                        <input value={settings.academic_year || ''} onChange={e => setSettings({ ...settings, academic_year: e.target.value })} className="w-full border rounded-lg p-2" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Status Pendaftaran</label>
                        <select
                            value={settings.is_open ? 'open' : 'closed'}
                            onChange={e => setSettings({ ...settings, is_open: e.target.value === 'open' })}
                            className="w-full border rounded-lg p-2"
                        >
                            <option value="open">Dibuka</option>
                            <option value="closed">Ditutup</option>
                        </select>
                    </div>

                    {/* Wave 1 */}
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                            <input type="checkbox" checked={settings.wave_1?.active} onChange={e => setSettings({ ...settings, wave_1: { ...settings.wave_1, active: e.target.checked } })} />
                            <span className="font-bold">Gelombang 1</span>
                        </div>
                        <input value={settings.wave_1?.dates || ''} onChange={e => setSettings({ ...settings, wave_1: { ...settings.wave_1, dates: e.target.value } })} className="w-full border rounded-lg p-2 text-sm" placeholder="Tanggal..." />
                    </div>

                    {/* Wave 2 */}
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                            <input type="checkbox" checked={settings.wave_2?.active} onChange={e => setSettings({ ...settings, wave_2: { ...settings.wave_2, active: e.target.checked } })} />
                            <span className="font-bold">Gelombang 2</span>
                        </div>
                        <input value={settings.wave_2?.dates || ''} onChange={e => setSettings({ ...settings, wave_2: { ...settings.wave_2, dates: e.target.value } })} className="w-full border rounded-lg p-2 text-sm" placeholder="Tanggal..." />
                    </div>
                </div>
            </div>

            {/* Applicants List */}
            <h2 className="text-lg font-bold mb-4">Daftar Pendaftar ({applications.length})</h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4">Nama</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Tanggal Test</th>
                            <th className="px-6 py-4 text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {applications.map((app) => (
                            <tr key={app.userId} className="hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium">{app.name}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${app.status === 'verified' ? 'bg-green-100 text-green-700' :
                                            app.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-600'
                                        }`}>
                                        {app.status || 'New'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">{app.testDate || '-'}</td>
                                <td className="px-6 py-4 text-right">
                                    <Link href={`/admin/dashboard/ppdb/${app.userId}`} className="text-blue-600 hover:underline text-sm font-medium">
                                        Detail / Verifikasi
                                    </Link>
                                </td>
                            </tr>
                        ))}
                        {applications.length === 0 && (
                            <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-400">Belum ada pendaftar masuk.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
