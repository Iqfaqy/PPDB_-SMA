'use client';

import { useState, useEffect } from 'react';
import { getContent, updateContent } from '@/actions/content';
import { Loader2, Save, Upload } from 'lucide-react';
import Image from 'next/image';

export default function BackgroundsPage() {
    const [content, setContent] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        loadContent();
    }, []);

    async function loadContent() {
        const data = await getContent();
        setContent(data);
        setLoading(false);
    }

    async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>, section: string, key: string) {
        if (!e.target.files?.[0]) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('file', e.target.files[0]);

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();

            if (data.success) {
                setContent((prev: any) => ({
                    ...prev,
                    [section]: {
                        ...prev[section],
                        [key]: data.url
                    }
                }));
            }
        } catch (err) {
            console.error(err);
            alert('Upload failed');
        } finally {
            setUploading(false);
        }
    }

    async function handleSave() {
        setSaving(true);
        try {
            const success = await updateContent(content);
            if (success) alert('Perubahan berhasil disimpan!');
            else alert('Gagal menyimpan perubahan.');
        } catch (err) {
            alert('Terjadi kesalahan.');
        } finally {
            setSaving(false);
        }
    }

    if (loading) return <div className="p-8 flex justify-center"><Loader2 className="animate-spin text-blue-600" size={32} /></div>;

    return (
        <div className="max-w-4xl">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Edit Latar Belakang & Hero</h1>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors disabled:opacity-50"
                >
                    {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                    Simpan Perubahan
                </button>
            </div>

            <div className="space-y-8">
                {/* Helper to update text fields */}
                {['hero'].map((section) => (
                    <div key={section} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <h2 className="text-lg font-bold text-gray-800 mb-4 capitalize">{section} Section</h2>

                        {/* Text Fields */}
                        <div className="grid gap-4 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Title Line 1</label>
                                <input
                                    type="text"
                                    value={content[section]?.title_line1 || ''}
                                    onChange={e => setContent({ ...content, [section]: { ...content[section], title_line1: e.target.value } })}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Highlighted Title</label>
                                <input
                                    type="text"
                                    value={content[section]?.title_highlight || ''}
                                    onChange={e => setContent({ ...content, [section]: { ...content[section], title_highlight: e.target.value } })}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    value={content[section]?.description || ''}
                                    onChange={e => setContent({ ...content, [section]: { ...content[section], description: e.target.value } })}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 h-24"
                                />
                            </div>
                        </div>

                        {/* Image Upload */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Background Image</label>
                            <div className="flex items-start gap-6">
                                <div className="relative w-64 h-36 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                                    {content[section]?.bg_image && (
                                        <Image
                                            src={content[section].bg_image}
                                            alt="Preview"
                                            fill
                                            className="object-cover"
                                        />
                                    )}
                                </div>
                                <div>
                                    <input
                                        type="file"
                                        id="hero-bg"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={(e) => handleImageUpload(e, section, 'bg_image')}
                                    />
                                    <label
                                        htmlFor="hero-bg"
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
                                    >
                                        <Upload size={16} />
                                        {uploading ? 'Uploading...' : 'Ganti Gambar'}
                                    </label>
                                    <p className="mt-2 text-xs text-gray-500">Recommended: 1920x1080px (JPG/PNG)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
