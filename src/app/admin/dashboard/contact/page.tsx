'use client';

import { useState, useEffect } from 'react';
import { getContact, updateContact } from '@/actions/content';
import { Loader2, Save } from 'lucide-react';

export default function ContactPage() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        load();
    }, []);

    async function load() {
        const res = await getContact();
        setData(res || {});
        setLoading(false);
    }

    async function handleSave() {
        setSaving(true);
        await updateContact(data);
        setSaving(false);
        alert('Informasi kontak diperbarui');
    }

    if (loading) return <div>Loading...</div>;

    return (
        <div className="max-w-2xl">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Manajemen Kontak</h1>
                <button onClick={handleSave} disabled={saving} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2 disabled:opacity-50">
                    {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />} Simpan
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Alamat</label>
                    <textarea value={data.address || ''} onChange={e => setData({ ...data, address: e.target.value })} className="w-full border rounded-lg p-2 h-20" />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Telepon / WhatsApp</label>
                    <input type="text" value={data.phone || ''} onChange={e => setData({ ...data, phone: e.target.value })} className="w-full border rounded-lg p-2" />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input type="text" value={data.email || ''} onChange={e => setData({ ...data, email: e.target.value })} className="w-full border rounded-lg p-2" />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Jam Operasional</label>
                    <input type="text" value={data.hours || ''} onChange={e => setData({ ...data, hours: e.target.value })} className="w-full border rounded-lg p-2" />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Google Maps Embed URL</label>
                    <input type="text" value={data.maps_embed || ''} onChange={e => setData({ ...data, maps_embed: e.target.value })} className="w-full border rounded-lg p-2 text-sm font-mono text-gray-500" />
                    <p className="text-xs text-gray-400 mt-1">Paste the 'src' attribute from Google Maps Embed code here.</p>
                </div>
            </div>
        </div>
    );
}
