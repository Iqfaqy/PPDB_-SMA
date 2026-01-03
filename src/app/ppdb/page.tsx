
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle, Calendar, FileText, Smartphone } from "lucide-react";
import { getPPBSettings } from "@/actions/content";
import Link from "next/link";

export const revalidate = 0;

export default async function PPDB() {
    const settings = await getPPBSettings() || {};

    return (
        <main className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="bg-gradient-to-r from-primary-dark to-primary pt-32 pb-20 relative text-white">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <span className="inline-block py-1 px-3 rounded-full bg-accent/20 border border-accent text-accent text-sm font-semibold mb-4">
                        Tahun Ajaran {settings.academic_year || '2026/2027'}
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6">Penerimaan Santri Baru</h1>
                    <p className="text-gray-200 text-lg max-w-2xl mx-auto">Bergabunglah bersama kami menjadi bagian dari generasi Qur&apos;ani yang cerdas dan berakhlak mulia.</p>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-10 relative z-20">
                <div className="bg-white rounded-2xl p-8 shadow-xl max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        {settings.is_open ? (
                            <>
                                <h3 className="text-2xl font-bold text-gray-800">
                                    {settings.wave_1?.active ? 'Gelombang 1 Dibuka!' :
                                        settings.wave_2?.active ? 'Gelombang 2 Dibuka!' : 'Pendaftaran Dibuka!'}
                                </h3>
                                <p className="text-gray-600">Segera daftarkan diri Anda sebelum kuota penuh.</p>
                            </>
                        ) : (
                            <>
                                <h3 className="text-2xl font-bold text-red-600">Pendaftaran Ditutup</h3>
                                <p className="text-gray-600">Mohon maaf, pendaftaran saat ini belum dibuka.</p>
                            </>
                        )}
                    </div>
                    {settings.is_open ? (
                        <Link href="/register" className="bg-accent hover:bg-accent-light text-primary-dark font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all text-lg">
                            Daftar Online Sekarang
                        </Link>
                    ) : (
                        <button disabled className="bg-gray-300 text-gray-500 font-bold py-3 px-8 rounded-full cursor-not-allowed">
                            Pendaftaran Tutup
                        </button>
                    )}
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">

                {/* Alur Pendaftaran */}
                <section className="mb-20">
                    <h2 className="text-3xl font-bold font-heading text-primary-dark mb-12 text-center">Alur Pendaftaran</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            { icon: Smartphone, title: "1. Daftar Online", desc: "Isi formulir pendaftaran di website ini." },
                            { icon: FileText, title: "2. Verifikasi Berkas", desc: "Upload dokumen persyaratan yang diminta." },
                            { icon: CheckCircle, title: "3. Tes Seleksi", desc: "Tes Akademik & Bacaan Al-Qur&apos;an (Online/Offline)." },
                            { icon: Calendar, title: "4. Daftar Ulang", desc: "Pembayaran biaya masuk dan pengukuran seragam." },
                        ].map((step, i) => (
                            <div key={i} className="flex flex-col items-center text-center relative">
                                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mb-6 shadow-lg z-10 relative">
                                    <step.icon size={32} />
                                </div>
                                {/* Connector Line */}
                                {i !== 3 && <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gray-300 -z-0"></div>}
                                <h4 className="text-xl font-bold text-gray-800 mb-2">{step.title}</h4>
                                <p className="text-gray-600 text-sm">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Syarat & Jadwal */}
                <div className="grid md:grid-cols-2 gap-12">
                    <section className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-primary">
                        <h3 className="text-2xl font-bold text-primary-dark mb-6 flex items-center gap-3">
                            <FileText className="text-accent" /> Syarat Pendaftaran
                        </h3>
                        <ul className="space-y-4">
                            {(settings.requirements || []).map((req: string, i: number) => (
                                <li key={i} className="flex items-center gap-3 text-gray-700">
                                    <span className="w-2 h-2 rounded-full bg-primary"></span>
                                    {req}
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-accent">
                        <h3 className="text-2xl font-bold text-primary-dark mb-6 flex items-center gap-3">
                            <Calendar className="text-accent" /> Jadwal Seleksi
                        </h3>
                        <div className="space-y-6">
                            <div className={settings.wave_1?.active ? 'bg-primary/5 p-3 rounded-lg border border-primary/20' : ''}>
                                <h4 className="font-bold text-gray-800">Gelombang 1 {settings.wave_1?.active && <span className="text-xs bg-primary text-white px-2 py-0.5 rounded-full ml-2">Aktif</span>}</h4>
                                <p className="text-sm text-gray-600">{settings.wave_1?.dates || '-'}</p>
                            </div>
                            <div className={settings.wave_2?.active ? 'bg-primary/5 p-3 rounded-lg border border-primary/20' : ''}>
                                <h4 className="font-bold text-gray-800">Gelombang 2 {settings.wave_2?.active && <span className="text-xs bg-primary text-white px-2 py-0.5 rounded-full ml-2">Aktif</span>}</h4>
                                <p className="text-sm text-gray-600">{settings.wave_2?.dates || '-'}</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-800">Tes Seleksi</h4>
                                <p className="text-sm text-gray-600">{settings.test_schedule || '-'}</p>
                            </div>
                        </div>
                    </section>
                </div>

            </div>
            <Footer />
        </main>
    );
}
