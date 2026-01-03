'use client';

import { useState, useEffect } from 'react';
import { getTeachers, saveTeacher, deleteTeacher } from '@/actions/content';
import { Loader2, Plus, Edit, Trash2, X, Upload } from 'lucide-react';
import Image from 'next/image';

export default function TeachersPage() {
    const [teachers, setTeachers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingTeacher, setEditingTeacher] = useState<any>(null);

    // Form State
    const [formData, setFormData] = useState<any>({});
    const [uploading, setUploading] = useState(false);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        loadTeachers();
    }, []);

    async function loadTeachers() {
        const data = await getTeachers();
        setTeachers(data || []);
        setLoading(false);
    }

    function handleEdit(teacher: any) {
        setEditingTeacher(teacher);
        setFormData(teacher);
        setModalOpen(true);
    }

    function handleAdd() {
        setEditingTeacher(null);
        setFormData({ name: '', subject: '', category: 'general', image: '' });
        setModalOpen(true);
    }

    async function handleDelete(id: string) {
        if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
            await deleteTeacher(id);
            loadTeachers();
        }
    }

    async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.files?.[0]) return;

        setUploading(true);
        const formPayload = new FormData();
        formPayload.append('file', e.target.files[0]);

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formPayload,
            });
            const data = await res.json();
            if (data.success) {
                setFormData({ ...formData, image: data.url });
            }
        } catch (err) {
            alert('Upload failed');
        } finally {
            setUploading(false);
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSaving(true);
        await saveTeacher({ ...formData, id: editingTeacher?.id });
        setSaving(false);
        setModalOpen(false);
        loadTeachers();
    }

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Manajemen Guru & Asatidz</h1>
                <button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2">
                    <Plus size={18} /> Tambah Pengajar
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teachers.map((teacher) => (
                    <div key={teacher.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex gap-4 items-center">
                        <div className="w-16 h-16 rounded-full bg-gray-100 relative overflow-hidden flex-shrink-0">
                            {teacher.image ? (
                                <Image src={teacher.image} alt={teacher.name} fill className="object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400">No Img</div>
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-gray-800 truncate">{teacher.name}</h3>
                            <p className="text-sm text-gray-500 truncate">{teacher.subject}</p>
                            <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-600 mt-1 inline-block">
                                {teacher.category === 'quran' ? 'Tahfidz' : 'Umum'}
                            </span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <button onClick={() => handleEdit(teacher)} className="p-2 text-gray-500 hover:bg-gray-50 rounded-lg"><Edit size={16} /></button>
                            <button onClick={() => handleDelete(teacher.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={16} /></button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="text-xl font-bold">{editingTeacher ? 'Edit Pengajar' : 'Tambah Pengajar Baru'}</h3>
                            <button onClick={() => setModalOpen(false)}><X size={24} className="text-gray-400 hover:text-gray-600" /></button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Nama Lengkap</label>
                                <input required type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full border rounded-lg p-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Mata Pelajaran / Bidang</label>
                                <input required type="text" value={formData.subject} onChange={e => setFormData({ ...formData, subject: e.target.value })} className="w-full border rounded-lg p-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Kategori</label>
                                <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="w-full border rounded-lg p-2">
                                    <option value="general">Guru Umum</option>
                                    <option value="quran">Guru Tahfidz/Quran</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Foto Profil</label>
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-full bg-gray-100 relative overflow-hidden">
                                        {formData.image && <Image src={formData.image} fill alt="Preview" className="object-cover" />}
                                    </div>
                                    <div>
                                        <input type="file" onChange={handleImageUpload} className="hidden" id="teacher-upload" accept="image/*" />
                                        <label htmlFor="teacher-upload" className="px-4 py-2 border rounded-lg hover:bg-gray-50 cursor-pointer text-sm font-medium inline-flex items-center gap-2">
                                            <Upload size={16} /> {uploading ? 'Uploading...' : 'Upload Foto'}
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 flex justify-end gap-3">
                                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">Batal</button>
                                <button type="submit" disabled={saving || uploading} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">
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
