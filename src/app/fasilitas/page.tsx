
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getFacilities } from "@/actions/content";

export const revalidate = 0;

export default async function Fasilitas() {
    const facilities = await getFacilities() || [];

    return (
        <main className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="bg-primary-dark text-white pt-32 pb-16 relative">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">Fasilitas Pesantren</h1>
                    <p className="text-gray-300 max-w-2xl mx-auto">Kami menyediakan lingkungan belajar yang kondusif, nyaman, dan modern untuk mendukung prestasi santri.</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {facilities.map((item: any) => (
                        <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group">
                            <div className="h-64 overflow-hidden relative">
                                {item.img ? (
                                    <div className="w-full h-full bg-cover bg-center duration-500 group-hover:scale-110" style={{ backgroundImage: `url(${item.img})` }}></div>
                                ) : (
                                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">No Image</div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                                    <span className="text-white font-medium">Lihat Detail</span>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h3>
                                <p className="text-gray-500 text-sm">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                    {facilities.length === 0 && (
                        <div className="col-span-3 text-center py-12 text-gray-500">
                            Belum ada data fasilitas.
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </main>
    );
}
