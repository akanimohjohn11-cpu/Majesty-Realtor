import type { Metadata, Viewport } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import FloatingWhatsApp from '@/components/layout/FloatingWhatsApp';

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.APP_URL || 'https://majestyrealty.ng'),
  title: {
    default: 'Majesty Realty & Construction | The Trusted Real Estate Partner in Nigeria',
    template: '%s | Majesty Realty & Construction',
  },
  description:
    'Majesty Realty and Construction is the premier Nigerian real estate partner for residential sales, luxury rentals, commercial brokerage, property management, and investment advisory across Lagos, Abuja, and high-growth corridors.',
  keywords: [
    'Nigerian real estate',
    'Lagos luxury property',
    'Abuja houses for sale',
    'Ikoyi duplex',
    'Banana Island real estate',
    'Victoria Island commercial office',
    'Maitama Abuja villa',
    'Lekki property',
    'Majesty Realty and Construction',
    'Property management Lagos',
    'Real estate investment Nigeria',
  ],
  authors: [{ name: 'Majesty Realty & Construction' }],
  creator: 'Majesty Realty & Construction',
  publisher: 'Majesty Realty & Construction',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Majesty Realty & Construction | The Trusted Real Estate Partner',
    description:
      'Explore verified luxury homes, commercial spaces, and investment opportunities in Nigeria with Majesty Realty and Construction.',
    url: 'https://majestyrealty.ng',
    siteName: 'Majesty Realty & Construction',
    locale: 'en_NG',
    type: 'website',
    images: [
      {
        url: '/images/hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Majesty Realty and Construction Architecture',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Majesty Realty & Construction | The Trusted Real Estate Partner',
    description:
      'Verified luxury homes, commercial spaces, and investment advisory across Nigeria.',
    images: ['/images/hero.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: '#0D4A36',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="min-h-screen bg-[#FAF9F6] text-[#1E332B] antialiased flex flex-col font-sans selection:bg-[#DFBE6C] selection:text-[#0D4A36]">
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
