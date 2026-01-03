import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getTeachers } from "@/actions/content";

export const revalidate = 0;

export default async function Guru() {
    const teachers = await getTeachers() || [];
    const t_quran = teachers.filter((t: any) => t.category === 'quran');
    const t_general = teachers.filter((t: any) => t.category === 'general');

    return (
        <main className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="bg-primary-dark text-white pt-32 pb-16 relative">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">Guru & Asatidz</h1>
                    <p className="text-gray-300 max-w-2xl mx-auto">Para pendidik profesional dan berdedikasi tinggi dalam membimbing santri menuju kesuksesan dunia akhirat.</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">

                {/* Asatidz Tahfidz */}
                <section className="mb-20">
                    <div className="flex items-center justify-center gap-4 mb-12">
                        <div className="h-1 w-12 bg-accent"></div>
                        <h2 className="text-3xl font-bold font-heading text-primary-dark text-center">Musyrif Tahfidz & Kepesantrenan</h2>
                        <div className="h-1 w-12 bg-accent"></div>
                    </div>
                    {t_quran.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-center">
                            {t_quran.map((teacher: any, i: number) => (
                                <div key={i} className="bg-white rounded-xl shadow-lg p-6 text-center hover:-translate-y-2 transition-transform">
                                    <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4 border-4 border-primary/20 bg-gray-100">
                                        <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('${teacher.image}')` }}></div>
                                    </div>
                                    <h4 className="font-bold text-lg text-gray-800">{teacher.name}</h4>
                                    <span className="text-accent text-sm font-medium">{teacher.subject}</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500">Belum ada data pengajar tahfidz.</p>
                    )}
                </section>

                {/* Guru Umum */}
                <section>
                    <div className="flex items-center justify-center gap-4 mb-12">
                        <div className="h-1 w-12 bg-accent"></div>
                        <h2 className="text-3xl font-bold font-heading text-primary-dark text-center">Dewan Guru SMA</h2>
                        <div className="h-1 w-12 bg-accent"></div>
                    </div>
                    {t_general.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                            {t_general.map((teacher: any, i: number) => (
                                <div key={i} className="bg-white rounded-xl shadow-lg p-6 text-center hover:-translate-y-2 transition-transform">
                                    <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4 border-4 border-gray-100 bg-gray-100">
                                        <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('${teacher.image}')` }}></div>
                                    </div>
                                    <h4 className="font-bold text-lg text-gray-800">{teacher.name}</h4>
                                    <span className="text-gray-500 text-sm font-medium">{teacher.subject}</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500">Belum ada data guru umum.</p>
                    )}
                </section>

            </div>
            <Footer />
        </main>
    );
}
