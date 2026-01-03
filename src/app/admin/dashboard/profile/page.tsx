'use client';

import { useState, useEffect } from 'react';
import { getContent, updateContent } from '@/actions/content';
import { Loader2, Save, Upload, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';

export default function ProfilePage() {
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

    async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>, section: string) {
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
                        image: data.url
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

    function handleFeatureChange(index: number, val: string) {
        const newFeatures = [...content.about.list_items];
        newFeatures[index] = val;
        setContent({ ...content, about: { ...content.about, list_items: newFeatures } });
    }

    function addFeature() {
        setContent({
            ...content,
            about: {
                ...content.about,
                list_items: [...content.about.list_items, ""]
            }
        });
    }

    function removeFeature(index: number) {
        const newFeatures = content.about.list_items.filter((_: any, i: number) => i !== index);
        setContent({ ...content, about: { ...content.about, list_items: newFeatures } });
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
                <h1 className="text-2xl font-bold text-gray-800">Edit Profil & Tentang Kami</h1>
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
                {/* About Section */}
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <h2 className="text-lg font-bold text-gray-800 mb-4">Tentang Kami</h2>

                    <div className="grid gap-4 mb-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Badge Text</label>
                            <input
                                type="text"
                                value={content.about?.badge || ''}
                                onChange={e => setContent({ ...content, about: { ...content.about, badge: e.target.value } })}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                            <input
                                type="text"
                                value={content.about?.title || ''}
                                onChange={e => setContent({ ...content, about: { ...content.about, title: e.target.value } })}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                                value={content.about?.description || ''}
                                onChange={e => setContent({ ...content, about: { ...content.about, description: e.target.value } })}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 h-24"
                            />
                        </div>

                        {/* Features List */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Poin Keunggulan</label>
                            {content.about?.list_items?.map((item: string, i: number) => (
                                <div key={i} className="flex gap-2">
                                    <input
                                        type="text"
                                        value={item}
                                        onChange={(e) => handleFeatureChange(i, e.target.value)}
                                        className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                                    />
                                    <button onClick={() => removeFeature(i)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}
                            <button onClick={addFeature} className="flex items-center gap-2 text-sm text-blue-600 font-medium mt-2">
                                <Plus size={16} /> Tambah Poin
                            </button>
                        </div>
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">About Image</label>
                        <div className="flex items-start gap-6">
                            <div className="relative w-48 h-48 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                                {content.about?.image && (
                                    <Image
                                        src={content.about.image}
                                        alt="Preview"
                                        fill
                                        className="object-cover"
                                    />
                                )}
                            </div>
                            <div>
                                <input
                                    type="file"
                                    id="about-img"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(e, 'about')}
                                />
                                <label
                                    htmlFor="about-img"
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
                                >
                                    <Upload size={16} />
                                    {uploading ? 'Uploading...' : 'Ganti Gambar'}
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quote Section */}
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <h2 className="text-lg font-bold text-gray-800 mb-4">Quote / Ayat Hari Ini</h2>
                    <div className="grid gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Arabic Text</label>
                            <textarea
                                value={content.quote?.arabic || ''}
                                onChange={e => setContent({ ...content, quote: { ...content.quote, arabic: e.target.value } })}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 h-20 text-right font-arabic text-xl"
                                dir="rtl"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Translation</label>
                            <textarea
                                value={content.quote?.translation || ''}
                                onChange={e => setContent({ ...content, quote: { ...content.quote, translation: e.target.value } })}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 h-20"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Source (Surah/Hadith)</label>
                            <input
                                type="text"
                                value={content.quote?.source || ''}
                                onChange={e => setContent({ ...content, quote: { ...content.quote, source: e.target.value } })}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
