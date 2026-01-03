
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, BookOpen, UserCheck, Award, Star } from "lucide-react";
import { getContent } from "@/actions/content";

export const revalidate = 0; // Ensure fresh data on every request

export default async function Home() {
  const content = await getContent();
  const hero = content?.hero || {};
  const about = content?.about || {};
  const quote = content?.quote || {};
  const features = content?.features || [];

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/90 to-primary/80 z-10" />
          <div
            className="w-full h-full bg-cover bg-center transition-all duration-1000"
            style={{ backgroundImage: `url('${hero.bg_image}')` }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-20 text-center text-white">
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-sm font-medium tracking-wide">{hero.badge_text || "Penerimaan Santri Baru Telah Dibuka"}</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-heading mb-6 leading-tight">
            {hero.title_line1} <br />
            <span className="text-accent text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-light">
              {hero.title_highlight}
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto font-light">
            {hero.description}
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Link
              href="/ppdb"
              className="px-8 py-4 bg-accent hover:bg-accent-light text-primary-dark font-bold rounded-full transition-all hover:scale-105 shadow-lg shadow-accent/20 flex items-center gap-2"
            >
              Daftar Sekarang <ArrowRight size={20} />
            </Link>
            <Link
              href="/profil"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-full backdrop-blur-md border border-white/20 transition-all"
            >
              Tentang Kami
            </Link>
          </div>
        </div>

        {/* Decorative Islamic Pattern */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-20" />
      </section>

      {/* Values / Features */}
      <section className="py-20 bg-background relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 -mt-32 relative z-30">
            {features.map((feature: any, idx: number) => {
              const Icon = feature.icon === 'BookOpen' ? BookOpen : feature.icon === 'UserCheck' ? UserCheck : Award;
              return (
                <div key={idx} className="bg-white p-8 rounded-2xl shadow-xl border-b-4 border-accent hover:-translate-y-2 transition-transform duration-300">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
                    <Icon size={32} />
                  </div>
                  <h3 className="text-xl font-bold font-heading mb-3 text-primary-dark">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-islamic-pattern">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 relative">
              <div className="absolute -inset-4 bg-accent/20 rounded-3xl transform rotate-3" />
              <div
                className="relative rounded-3xl overflow-hidden shadow-2xl h-[500px] w-full bg-cover bg-center"
                style={{ backgroundImage: `url('${about.image}')` }}
              >
              </div>
              <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-2xl shadow-xl max-w-xs animate-bounce-slow">
                <div className="flex items-center gap-4">
                  <div className="bg-primary text-white p-3 rounded-full">
                    <Star size={24} fill="currentColor" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary-dark">A</p>
                    <p className="text-sm text-gray-500">Akreditasi Unggul</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2">
              <span className="text-accent font-bold tracking-wider uppercase text-sm mb-2 block">{about.badge || "Tentang Kami"}</span>
              <h2 className="text-4xl font-bold font-heading text-primary-dark mb-6">{about.title}</h2>
              <div className="bg-accent h-1 w-20 mb-8" />
              <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                {about.description}
              </p>
              <ul className="space-y-4 mb-8">
                {about.list_items?.map((item: string, i: number) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs">✓</span>
                    <span className="text-gray-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/profil" className="text-primary font-semibold hover:text-accent transition-colors flex items-center gap-2">
                Selengkapnya Tentang Kami <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quote / Ayat */}
      <section className="py-24 bg-primary-dark text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <span className="font-arabic text-4xl md:text-5xl mb-6 block text-accent leading-relaxed" dir="rtl">
            {quote.arabic}
          </span>
          <p className="text-xl md:text-2xl italic font-light max-w-3xl mx-auto opacity-90">
            {quote.translation}
          </p>
          <p className="mt-4 text-accent font-medium">{quote.source}</p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
