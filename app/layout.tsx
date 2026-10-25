import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans, IM_Fell_English } from "next/font/google";
import { AMAZON_URL, site } from "@/lib/site";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const sans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const press = IM_Fell_English({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-press",
  display: "swap",
});

const fullTitle = `${site.title} ${site.subtitle} — ${site.author}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: fullTitle,
    template: `%s — ${site.title}`,
  },
  description: site.description,
  keywords: [
    "divorce",
    "co-parenting",
    "children and divorce",
    "custody",
    "family law",
    "Sharon L. Kalemkiarian",
    "What I Want to Tell You Is",
    "Sahag-Mesrob Press West",
  ],
  authors: [{ name: site.author }],
  creator: site.author,
  publisher: site.publisher,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.title,
    title: fullTitle,
    description: site.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: fullTitle,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#FAF6EE",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Book",
  name: `${site.title} ${site.subtitle}`,
  author: { "@type": "Person", name: site.author },
  publisher: { "@type": "Organization", name: site.publisher },
  description: site.description,
  inLanguage: "en",
  url: site.url,
  offers: { "@type": "Offer", url: AMAZON_URL, seller: { "@type": "Organization", name: "Amazon" } },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${press.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-4 focus:py-2 focus:text-ivory"
        >
          Skip to content
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
