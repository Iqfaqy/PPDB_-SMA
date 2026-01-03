
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Profil() {
    return (
        <main className="min-h-screen bg-gray-50">
            <Navbar />

            {/* Page Header */}
            <div className="bg-primary-dark text-white pt-32 pb-16 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">Profil Sekolah</h1>
                    <p className="text-gray-300 max-w-2xl mx-auto">Mengenal lebih dekat sejarah, visi, dan misi perjuangan kami dalam dunia pendidikan islam.</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                {/* History */}
                <section className="mb-20">
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        <div className="md:w-1/2">
                            <div className="rounded-2xl overflow-hidden shadow-xl h-[400px] bg-gray-200 bg-[url('https://images.unsplash.com/photo-1598155523122-38423bb4d693?q=80&w=1000')] bg-cover bg-center"></div>
                        </div>
                        <div className="md:w-1/2">
                            <h2 className="text-3xl font-bold font-heading text-primary-dark mb-6">Sejarah Singkat</h2>
                            <div className="w-16 h-1 bg-accent mb-6"></div>
                            <div className="space-y-4 text-gray-600 leading-relaxed text-lg">
                                <p>
                                    Didirikan pada tahun 1990 oleh K.H. Ahmad Dahlan, Pesantren ini bermula dari sebuah majelis taklim kecil di pinggiran kota. Dengan semangat menyebarkan dakwah islamiyah dan memajukan pendidikan umat, perlahan namun pasti lembaga ini berkembang.
                                </p>
                                <p>
                                    Pada tahun 2005, unit SMA Islam Terpadu resmi dibuka untuk menjawab kebutuhan masyarakat akan pendidikan formal yang berkualitas namun tetap memegang teguh nilai-nilai kepesantrenan. Hingga kini, kami telah meluluskan ribuan alumni yang tersebar di berbagai universitas terkemuka di dalam dan luar negeri.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Visi Misi */}
                <section className="grid md:grid-cols-2 gap-8 mb-20">
                    <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-primary">
                        <h3 className="text-2xl font-bold text-primary-dark mb-4 text-center">Visi</h3>
                        <p className="text-center text-xl text-gray-700 font-medium italic">
                            &quot;Menjadi Pusat Pendidikan Islam Terdepan dalam Mencetak Generasi Qur&apos;ani, Berwawasan Global, dan Berakhlak Mulia pada Tahun 2030&quot;
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-accent">
                        <h3 className="text-2xl font-bold text-primary-dark mb-4 text-center">Misi</h3>
                        <ul className="space-y-3 text-gray-700">
                            <li className="flex gap-3">
                                <span className="text-accent font-bold">1.</span>
                                <span>Menyelenggarakan pendidikan tahfidz Al-Qur&apos;an yang efektif dan bersanad.</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-accent font-bold">2.</span>
                                <span>Mengintegrasikan kurikulum nasional dengan nilai-nilai islam yang kaffah.</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-accent font-bold">3.</span>
                                <span>Membekali santri dengan kemampuan bahasa asing dan teknologi informasi.</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-accent font-bold">4.</span>
                                <span>Menanamkan adab dan akhlakul karimah dalam kehidupan sehari-hari.</span>
                            </li>
                        </ul>
                    </div>
                </section>

                {/* Structure */}
                <section className="text-center">
                    <h2 className="text-3xl font-bold font-heading text-primary-dark mb-12">Pimpinan Pesantren</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { name: "K.H. Abdullah S.Ag", role: "Pimpinan Pondok", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&fit=crop" },
                            { name: "Ust. Muhammad Ali Lc. MA", role: "Kepala SMA", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&fit=crop" },
                            { name: "Ustazah Fatimah S.Pd.I", role: "Kepala Kepengasuhan Putri", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&fit=crop" }
                        ].map((person, i) => (
                            <div key={i} className="bg-white rounded-xl overflow-hidden shadow-md group">
                                <div className="h-64 bg-gray-200 overflow-hidden">
                                    {/* Placeholder for real images */}
                                    <div className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: `url(${person.img})` }}></div>
                                </div>
                                <div className="p-6">
                                    <h4 className="text-xl font-bold text-gray-800">{person.name}</h4>
                                    <p className="text-accent font-medium">{person.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            <Footer />
        </main>
    );
}
