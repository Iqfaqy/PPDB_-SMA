'use client';

import { useState, useEffect } from 'react';
import { getSchedules, saveSchedule, deleteSchedule } from '@/actions/content';
import { Loader2, Plus, Edit, Trash2, X, Clock } from 'lucide-react';

export default function SchedulesPage() {
    const [schedules, setSchedules] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);

    // Form State
    const [formData, setFormData] = useState<any>({});
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        loadSchedules();
    }, []);

    async function loadSchedules() {
        const data = await getSchedules();
        setSchedules(data || []);
        setLoading(false);
    }

    function handleEdit(item: any) {
        setEditingItem(item);
        setFormData(item);
        setModalOpen(true);
    }

    function handleAdd() {
        setEditingItem(null);
        setFormData({ activity: '', time: '', description: '' });
        setModalOpen(true);
    }

    async function handleDelete(id: string) {
        if (confirm('Apakah Anda yakin ingin menghapus jadwal ini?')) {
            await deleteSchedule(id);
            loadSchedules();
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSaving(true);
        await saveSchedule({ ...formData, id: editingItem?.id });
        setSaving(false);
        setModalOpen(false);
        loadSchedules();
    }

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Manajemen Jadwal Kegiatan</h1>
                <button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2">
                    <Plus size={18} /> Tambah Kegiatan
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-gray-700">Waktu</th>
                            <th className="px-6 py-4 font-semibold text-gray-700">Kegiatan</th>
                            <th className="px-6 py-4 font-semibold text-gray-700">Deskripsi</th>
                            <th className="px-6 py-4 font-semibold text-gray-700 text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {schedules.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 font-mono text-blue-600 font-medium whitespace-nowrap">
                                    <div className="flex items-center gap-2">
                                        <Clock size={16} />
                                        {item.time}
                                    </div>
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-800">{item.activity}</td>
                                <td className="px-6 py-4 text-gray-500">{item.description}</td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button onClick={() => handleEdit(item)} className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"><Edit size={16} /></button>
                                        <button onClick={() => handleDelete(item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={16} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {schedules.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-6 py-8 text-center text-gray-400">Belum ada jadwal kegiatan</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="text-xl font-bold">{editingItem ? 'Edit Jadwal' : 'Tambah Jadwal Baru'}</h3>
                            <button onClick={() => setModalOpen(false)}><X size={24} className="text-gray-400 hover:text-gray-600" /></button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Waktu (Jam)</label>
                                <input required placeholder="07:00 - 08:00" type="text" value={formData.time} onChange={e => setFormData({ ...formData, time: e.target.value })} className="w-full border rounded-lg p-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Nama Kegiatan</label>
                                <input required type="text" value={formData.activity} onChange={e => setFormData({ ...formData, activity: e.target.value })} className="w-full border rounded-lg p-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Deskripsi & Keterangan</label>
                                <textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full border rounded-lg p-2 h-24" />
                            </div>

                            <div className="pt-4 flex justify-end gap-3">
                                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">Batal</button>
                                <button type="submit" disabled={saving} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">
                                    {saving ? 'Menyimpan...' : 'Simpan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
