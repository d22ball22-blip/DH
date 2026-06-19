import type { Metadata, Viewport } from "next";
import { Inter, Fraunces } from "next/font/google";
import { site, allServices, serviceAreas } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const description =
  "Premium landscaping & property maintenance for homeowners and businesses. Lawn care, mulching, land clearing, brush removal, snow removal & seasonal cleanups. Fully insured. Free estimates.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Professional Landscaping & Property Maintenance`,
    template: `%s | ${site.name}`,
  },
  description,
  keywords: [
    "landscaping",
    "lawn care",
    "lawn mowing",
    "mulch installation",
    "land clearing",
    "lot clearing",
    "brush removal",
    "snow removal",
    "property maintenance",
    "commercial landscaping",
    "spring cleanup",
    "fall cleanup",
    ...serviceAreas.map((a) => `landscaping ${a}`),
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title: `${site.name} | Professional Landscaping & Property Maintenance`,
    description,
    images: [
      {
        url: "https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: `${site.name} — premium landscaping and property maintenance`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Professional Landscaping & Property Maintenance`,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "Landscaping",
};

export const viewport: Viewport = {
  themeColor: "#12321f",
  width: "device-width",
  initialScale: 1,
};

function StructuredData() {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LandscapingBusiness",
    "@id": `${site.url}/#business`,
    name: site.name,
    legalName: site.legalName,
    description,
    url: site.url,
    telephone: site.phoneDisplay,
    email: site.email,
    priceRange: "$$",
    foundingDate: String(site.foundedYear),
    image:
      "https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&w=1200&q=80",
    logo: `${site.url}/logo.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.postal,
      addressCountry: site.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    areaServed: serviceAreas.map((a) => ({ "@type": "City", name: a })),
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "07:00",
      closes: "19:00",
    },
    sameAs: [
      site.social.facebook,
      site.social.instagram,
      site.social.google,
      site.social.youtube,
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "127",
      bestRating: "5",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Landscaping & Property Maintenance Services",
      itemListElement: allServices.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s },
      })),
    },
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    publisher: { "@id": `${site.url}/#business` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body>
        <StructuredData />
        {children}
      </body>
    </html>
  );
}
