import Link from "next/link";
import { Facebook, Instagram, Youtube, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-primary-dark text-white pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold font-heading text-accent">Pesantren Islam</h3>
                        <p className="text-gray-300 leading-relaxed text-sm">
                            Mewujudkan generasi muda yang berakhlak mulia, cerdas, dan hafal Al-Qur&apos;an untuk kejayaan umat dan bangsa.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-accent hover:text-primary-dark transition-colors">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-accent hover:text-primary-dark transition-colors">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-accent hover:text-primary-dark transition-colors">
                                <Youtube size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6 font-heading">Tautan Cepat</h4>
                        <ul className="space-y-3 text-sm text-gray-300">
                            <li><Link href="/profil" className="hover:text-accent transition-colors">Profil Sekolah</Link></li>
                            <li><Link href="/pendidikan" className="hover:text-accent transition-colors">Program Pendidikan</Link></li>
                            <li><Link href="/guru" className="hover:text-accent transition-colors">Guru & Asatidz</Link></li>
                            <li><Link href="/ppdb" className="hover:text-accent transition-colors">Info PPDB</Link></li>
                            <li><Link href="/berita" className="hover:text-accent transition-colors">Berita Terbaru</Link></li>
                        </ul>
                    </div>

                    {/* Programs */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6 font-heading">Program Unggulan</h4>
                        <ul className="space-y-3 text-sm text-gray-300">
                            <li><span className="block text-white font-medium">Tahfidz Al-Qur&apos;an</span> Target 30 Juz</li>
                            <li><span className="block text-white font-medium">Kajian Kitab Kuning</span> Standar Pesantren Salaf</li>
                            <li><span className="block text-white font-medium">Bilingual</span> Arab & Inggris</li>
                            <li><span className="block text-white font-medium">Digital Skill</span> Coding & Design</li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6 font-heading">Kontak Kami</h4>
                        <ul className="space-y-4 text-sm text-gray-300">
                            <li className="flex gap-3">
                                <MapPin className="text-accent shrink-0" size={20} />
                                <span>Jl. Pesantren No. 123, Kota Santri, Jawa Barat, Indonesia 40123</span>
                            </li>
                            <li className="flex gap-3 items-center">
                                <Phone className="text-accent shrink-0" size={20} />
                                <span>+62 812-3456-7890</span>
                            </li>
                            <li className="flex gap-3 items-center">
                                <Mail className="text-accent shrink-0" size={20} />
                                <span>info@pesantren-islam.sch.id</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 text-center text-sm text-gray-400">
                    <p>&copy; {new Date().getFullYear()} SMA Islam / Pesantren Modern. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
