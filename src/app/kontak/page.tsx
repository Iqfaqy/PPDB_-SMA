
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { getContact } from "@/actions/content";

export const revalidate = 0;

export default async function Kontak() {
    const contact = await getContact() || {};

    return (
        <main className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="bg-primary-dark text-white pt-32 pb-16 relative">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">Hubungi Kami</h1>
                    <p className="text-gray-300 max-w-2xl mx-auto">Kami siap melayani informasi seputar pendidikan dan pendaftaran santri baru.</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Contact Info */}
                    <div className="md:col-span-1 space-y-8">
                        <div className="bg-white p-6 rounded-2xl shadow-md flex items-center gap-4">
                            <div className="bg-primary/10 p-3 rounded-full text-primary">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-800">Alamat</h4>
                                <p className="text-sm text-gray-600">{contact.address || 'Alamat belum diatur'}</p>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-md flex items-center gap-4">
                            <div className="bg-primary/10 p-3 rounded-full text-primary">
                                <Phone size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-800">Telepon / WA</h4>
                                <p className="text-sm text-gray-600">{contact.phone || '-'}</p>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-md flex items-center gap-4">
                            <div className="bg-primary/10 p-3 rounded-full text-primary">
                                <Mail size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-800">Email</h4>
                                <p className="text-sm text-gray-600">{contact.email || '-'}</p>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-md flex items-center gap-4">
                            <div className="bg-primary/10 p-3 rounded-full text-primary">
                                <Clock size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-800">Jam Operasional</h4>
                                <p className="text-sm text-gray-600">{contact.hours || '-'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Google Map */}
                    <div className="md:col-span-2 bg-white rounded-2xl p-4 shadow-xl h-[500px]">
                        {contact.maps_embed ? (
                            <iframe
                                src={contact.maps_embed}
                                width="100%"
                                height="100%"
                                style={{ border: 0, borderRadius: '1rem' }}
                                allowFullScreen={true}
                                loading="lazy">
                            </iframe>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">Peta belum diatur</div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
