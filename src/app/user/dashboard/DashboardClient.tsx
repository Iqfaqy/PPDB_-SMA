'use client';

import { useState } from 'react';
import { saveApplication } from '@/actions/content';
import { logout } from '@/actions/auth';
import { LogOut, Upload, CheckCircle, Clock, FileText } from 'lucide-react';

interface Props {
    user: any;
    initialApplication: any;
}

export default function DashboardClient({ user, initialApplication }: Props) {
    const [application, setApplication] = useState<any>(initialApplication);
    const [uploading, setUploading] = useState(false);

    async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>, type: string) {
        if (!e.target.files?.[0]) return;
        setUploading(true);

        const formData = new FormData();
        formData.append('file', e.target.files[0]);

        try {
            const res = await fetch('/api/upload', { method: 'POST', body: formData });
            const json = await res.json();
            if (json.success) {
                const newDocs = [...(application.documents || [])];
                const existingIdx = newDocs.findIndex(d => d.type === type);
                if (existingIdx !== -1) newDocs.splice(existingIdx, 1);

                newDocs.push({ type, url: json.url, uploadedAt: new Date().toISOString() });

                const updatedApp = {
                    ...application,
                    userId: user.id,
                    name: user.name,
                    email: user.email,
                    status: 'pending',
                    documents: newDocs
                };

                await saveApplication(updatedApp);
                setApplication(updatedApp);
                alert(`${type} berhasil diupload!`);
            }
        } catch {
            alert('Upload gagal');
        } finally {
            setUploading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white border-b border-gray-200 px-4 py-4">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="font-bold text-xl text-primary">Portal PPDB</div>
                    <div className="flex items-center gap-4">
                        <span className="text-gray-600 hidden md:block">Halo, {user.name}</span>
                        <form action={logout}>
                            <button className="text-red-600 text-sm font-medium hover:bg-red-50 p-2 rounded-lg flex items-center gap-2">
                                <LogOut size={16} /> Logout
                            </button>
                        </form>
                    </div>
                </div>
            </nav>

            <div className="container mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
                    <h2 className="text-xl font-bold mb-4">Status Pendaftaran</h2>
                    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                        <div className={`px-4 py-2 rounded-full font-bold text-sm inline-flex items-center gap-2 ${application.status === 'verified' ? 'bg-green-100 text-green-700' :
                                application.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                    'bg-gray-100 text-gray-600'
                            }`}>
                            {application.status === 'verified' ? <CheckCircle size={18} /> :
                                application.status === 'pending' ? <Clock size={18} /> : <FileText size={18} />}
                            {application.status === 'verified' ? 'TERVERIFIKASI' :
                                application.status === 'pending' ? 'MENUNGGU VERIFIKASI' : 'BELUM LENGKAP'}
                        </div>
                        {application.status === 'verified' && (
                            <div className="text-gray-700">
                                <strong>Jadwal Tes:</strong> {application.testDate}
                            </div>
                        )}
                    </div>
                    {application.status === 'new' && (
                        <p className="mt-4 text-gray-600">Silahkan lengkapi dokumen persyaratan di bawah ini untuk diproses.</p>
                    )}
                </div>

                <h2 className="text-lg font-bold mb-4 text-gray-800">Dokumen Persyaratan</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {['Kartu Keluarga', 'Akte Kelahiran', 'Pas Foto', 'Ijazah/SKL', 'Surat Keterangan Sehat'].map((type) => {
                        const uploadedDoc = application.documents?.find((d: any) => d.type === type);
                        return (
                            <div key={type} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="font-bold text-gray-700">{type}</h3>
                                    {uploadedDoc && <CheckCircle className="text-green-500" size={20} />}
                                </div>

                                {uploadedDoc ? (
                                    <div className="mb-4">
                                        <div className="text-xs text-gray-400 mb-2">Terupload pada {new Date(uploadedDoc.uploadedAt).toLocaleDateString()}</div>
                                        <a href={uploadedDoc.url} target="_blank" className="text-blue-600 hover:underline text-sm block truncate">Lihat File</a>
                                    </div>
                                ) : (
                                    <div className="h-10"></div>
                                )}

                                <div className="relative">
                                    <input
                                        type="file"
                                        className="hidden"
                                        id={`upload-${type}`}
                                        onChange={(e) => handleFileUpload(e, type)}
                                        disabled={uploading || application.status === 'verified'}
                                    />
                                    <label
                                        htmlFor={`upload-${type}`}
                                        className={`w-full py-2 rounded-lg border border-dashed border-gray-300 flex items-center justify-center gap-2 cursor-pointer transition-colors ${uploading || application.status === 'verified' ? 'bg-gray-50 opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
                                            }`}
                                    >
                                        <Upload size={16} className="text-gray-500" />
                                        <span className="text-sm font-medium text-gray-500">
                                            {uploadedDoc ? 'Ganti File' : 'Upload File'}
                                        </span>
                                    </label>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
