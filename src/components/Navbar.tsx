"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
    { name: "Beranda", href: "/" },
    { name: "Profil", href: "/profil" },
    { name: "Pendidikan", href: "/pendidikan" },
    { name: "Guru", href: "/guru" },
    { name: "Fasilitas", href: "/fasilitas" },
    // { name: "Prestasi", href: "/prestasi" },
    // { name: "Berita", href: "/berita" },
    // { name: "Galeri", href: "/galeri" },
    { name: "PPDB", href: "/ppdb" },
    { name: "Kontak", href: "/kontak" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                scrolled
                    ? "bg-white/90 backdrop-blur-md shadow-md py-3"
                    : "bg-transparent py-5"
            )}
        >
            <div className="container mx-auto px-4 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl group-hover:bg-accent transition-colors">
                        PI
                    </div>
                    <div className="flex flex-col">
                        <span className={cn("text-lg font-bold font-heading leading-tight", scrolled ? "text-primary" : "text-white")}>
                            Pesantren Islam
                        </span>
                        <span className={cn("text-xs font-medium", scrolled ? "text-gray-600" : "text-gray-200")}>
                            Membangun Generasi Qur&apos;ani
                        </span>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-accent relative py-1",
                                pathname === link.href
                                    ? "text-accent font-semibold"
                                    : scrolled ? "text-gray-700" : "text-white/90"
                            )}
                        >
                            {link.name}
                            {pathname === link.href && (
                                <motion.div
                                    layoutId="underline"
                                    className="absolute left-0 right-0 bottom-0 h-0.5 bg-accent"
                                />
                            )}
                        </Link>
                    ))}
                    <Link
                        href="/ppdb"
                        className="px-5 py-2 bg-accent hover:bg-accent-light text-primary-dark font-semibold rounded-full text-sm transition-transform hover:scale-105"
                    >
                        Daftar Sekarang
                    </Link>
                </nav>

                {/* Mobile Toggle */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={cn("lg:hidden p-2 rounded-md", scrolled ? "text-primary" : "text-white")}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden bg-white shadow-xl border-t"
                    >
                        <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className={cn(
                                        "block px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                                        pathname === link.href
                                            ? "bg-primary/10 text-primary"
                                            : "text-gray-600 hover:bg-gray-50 hover:text-primary"
                                    )}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Link
                                href="/ppdb"
                                onClick={() => setIsOpen(false)}
                                className="block text-center px-4 py-3 bg-primary text-white rounded-lg font-semibold mt-2"
                            >
                                Daftar Sekarang
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
