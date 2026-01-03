'use client';

import { useState, useEffect } from 'react';
import { getFacilities, saveFacility, deleteFacility } from '@/actions/content';
import { Loader2, Plus, Edit, Trash2, X, Upload } from 'lucide-react';
import Image from 'next/image';

export default function FacilitiesPage() {
    const [facilities, setFacilities] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);

    const [formData, setFormData] = useState<any>({});
    const [uploading, setUploading] = useState(false);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        loadFacilities();
    }, []);

    async function loadFacilities() {
        const data = await getFacilities();
        setFacilities(data || []);
        setLoading(false);
    }

    function handleAdd() {
        setEditingItem(null);
        setFormData({ name: '', desc: '', img: '' });
        setModalOpen(true);
    }

    function handleEdit(item: any) {
        setEditingItem(item);
        setFormData(item);
        setModalOpen(true);
    }

    async function handleDelete(id: string) {
        if (confirm('Hapus fasilitas ini?')) {
            await deleteFacility(id);
            loadFacilities();
        }
    }

    async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.files?.[0]) return;
        setUploading(true);
        const body = new FormData();
        body.append('file', e.target.files[0]);

        try {
            const res = await fetch('/api/upload', { method: 'POST', body });
            const json = await res.json();
            if (json.success) setFormData({ ...formData, img: json.url });
        } catch {
            alert('Upload failed');
        } finally {
            setUploading(false);
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSaving(true);
        await saveFacility({ ...formData, id: editingItem?.id });
        setSaving(false);
        setModalOpen(false);
        loadFacilities();
    }

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Manajemen Fasilitas</h1>
                <button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2">
                    <Plus size={18} /> Tambah Fasilitas
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {facilities.map((item) => (
                    <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="relative h-48 bg-gray-100">
                            {item.img && <Image src={item.img} fill alt={item.name} className="object-cover" />}
                        </div>
                        <div className="p-4">
                            <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                            <p className="text-gray-500 text-sm mb-4 line-clamp-2">{item.desc}</p>
                            <div className="flex justify-end gap-2">
                                <button onClick={() => handleEdit(item)} className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg"><Edit size={18} /></button>
                                <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg"><Trash2 size={18} /></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {modalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="text-xl font-bold">{editingItem ? 'Edit Fasilitas' : 'Tambah Fasilitas'}</h3>
                            <button onClick={() => setModalOpen(false)}><X size={24} className="text-gray-400" /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Nama Fasilitas</label>
                                <input required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full border rounded-lg p-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Deskripsi</label>
                                <textarea required value={formData.desc} onChange={e => setFormData({ ...formData, desc: e.target.value })} className="w-full border rounded-lg p-2 h-24" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Foto</label>
                                <div className="flex items-center gap-4">
                                    <div className="w-24 h-24 bg-gray-100 rounded-lg relative overflow-hidden">
                                        {formData.img && <Image src={formData.img} fill alt="Preview" className="object-cover" />}
                                    </div>
                                    <div>
                                        <input type="file" onChange={handleImageUpload} className="hidden" id="fac-upload" accept="image/*" />
                                        <label htmlFor="fac-upload" className="px-4 py-2 border rounded-lg cursor-pointer hover:bg-gray-50 text-sm font-medium flex items-center gap-2">
                                            <Upload size={16} /> {uploading ? 'Uploading...' : 'Upload Foto'}
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-4 flex justify-end gap-3">
                                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">Batal</button>
                                <button type="submit" disabled={saving} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">Simpan</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
