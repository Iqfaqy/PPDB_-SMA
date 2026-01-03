import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Book, Globe, Code } from "lucide-react";

export default function Pendidikan() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            <div className="bg-primary-dark text-white pt-32 pb-16 relative">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">Program Pendidikan</h1>
                    <p className="text-gray-300 max-w-2xl mx-auto">Kami memadukan kurikulum nasional dengan kurikulum kepesantrenan untuk menyeimbangkan ilmu dunia dan akhirat.</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">

                {/* Curriculums */}
                <div className="grid md:grid-cols-2 gap-12 mb-20">
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="bg-primary/10 p-3 rounded-lg text-primary"><Book size={28} /></div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">Kurikulum Nasional (K-13 / Merdeka)</h3>
                                <p className="text-gray-600">Mengacu pada standar pendidikan nasional untuk mempersiapkan santri melanjutkan ke jenjang perguruan tinggi negeri maupun swasta favorit. Fokus pada MIPA dan Bahasa.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="bg-primary/10 p-3 rounded-lg text-primary"><Book size={28} /></div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">Kurikulum Kepesantrenan</h3>
                                <p className="text-gray-600">Berbasis pada Turats (Kitab Kuning) dan Tahfidzul Qur&apos;an. Materi meliputi Aqidah, Fiqih, Nahwu Shorof, Hadits, dan Tafsir.</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="bg-primary/10 p-3 rounded-lg text-primary"><Globe size={28} /></div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">Pengembangan Bahasa</h3>
                                <p className="text-gray-600">Wajib berbahasa Arab dan Inggris dalam percakapan sehari-hari. Didukung dengan laboratorium bahasa dan native speaker tamu.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="bg-primary/10 p-3 rounded-lg text-primary"><Code size={28} /></div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">Ekstrakurikuler & Skill</h3>
                                <p className="text-gray-600">Beragam kegiatan untuk mengasah bakat: Pramuka, Silat, Memanah, Hadroh, Jurnalistik, Coding, dan Desain Grafis.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Daily Schedule */}
                <section>
                    <h2 className="text-3xl font-bold font-heading text-primary-dark mb-8 text-center">Kegiatan Harian Santri</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse bg-white shadow-lg rounded-xl overflow-hidden">
                            <thead className="bg-primary text-white">
                                <tr>
                                    <th className="py-4 px-6 text-left">Waktu</th>
                                    <th className="py-4 px-6 text-left">Kegiatan</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {[
                                    { time: "03.30 - 04.30", activity: "Qiyamul Lail & Sahur (Puasa Sunnah)" },
                                    { time: "04.30 - 06.00", activity: "Sholat Subuh berjamaah & Tahfidz Al-Qur&apos;an" },
                                    { time: "06.00 - 07.00", activity: "Mandi, Sarapan, Persiapan Sekolah" },
                                    { time: "07.00 - 12.00", activity: "KBM Sekolah Formal" },
                                    { time: "12.00 - 13.00", activity: "Ishoma & Sholat Dzuhur" },
                                    { time: "13.00 - 15.00", activity: "Istirahat Siang / Ekstrakurikuler" },
                                    { time: "15.00 - 16.00", activity: "Sholat Ashar & Dzikir Pagi Petang" },
                                    { time: "16.00 - 17.30", activity: "Kajian Kitab Kuning / Bahasa" },
                                    { time: "18.00 - 20.00", activity: "Sholat Maghrib, Makan Malam, Sholat Isya" },
                                    { time: "20.00 - 22.00", activity: "Belajar Mandiri / Murojaah Hafalan" },
                                    { time: "22.00 - 03.30", activity: "Istirahat Malam" },
                                ].map((item, idx) => (
                                    <tr key={idx} className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                                        <td className="py-3 px-6 font-medium text-gray-800 border-l-4 border-transparent hover:border-accent transition-colors">{item.time}</td>
                                        <td className="py-3 px-6 text-gray-600">{item.activity}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

            </div>
            <Footer />
        </main>
    );
}
