import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { locales } from "@/i18n/config";
import { getDictionary, hasLocale } from "./dictionaries";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <html
      lang={lang}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body>
        <Navbar lang={lang} dict={dict.nav} />
        <main>{children}</main>
      </body>
    </html>
  );
}
