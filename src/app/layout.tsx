import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Test Frontend",
    template: "%s | Test Frontend",
  },
  description: "Учебный проект на Next.js с разными вариантами рендеринга.",
  keywords: ["Next.js", "Frontend", "React", "SSR", "CSR", "ISR", "SSG"],
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    siteName: "Test Frontend",
    locale: "ru_RU",
    url: siteUrl,
    title: "Test Frontend",
    description: "Учебный проект на Next.js с разными вариантами рендеринга.",
    images: [`${siteUrl}/og-image.png`], // создай картинку 1200x630
  },
  twitter: {
    card: "summary_large_image",
    site: "@yoursite", // если есть аккаунт
    creator: "@yoursite",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
