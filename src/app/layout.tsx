import type { Metadata } from "next";
import { Poppins, Inter, Amiri } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const amiri = Amiri({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  variable: "--font-amiri",
});

export const metadata: Metadata = {
  title: "SMA Islam / Pesantren Modern",
  description: "Mewujudkan Generasi Qur'ani, Berakhlak Mulia, dan Berprestasi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${poppins.variable} ${inter.variable} ${amiri.variable}`}>
      <body className="font-sans bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
