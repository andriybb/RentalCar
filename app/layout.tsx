import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import Header from '@/components/header/header';
import { Toaster } from 'react-hot-toast';

const manrope = Manrope({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600'],
  variable: '--font-family',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Car Rental | Rent the Perfect Car',
    template: '%s | Car Rental',
  },
  description:
    'Find and rent the perfect car for your journey. Explore our wide selection of vehicles with the best prices and conditions.',
  keywords: ['car rental', 'rent a car', 'auto rental', 'vehicle rental'],
  openGraph: {
    title: "Car Rental | Rent the Perfect Car",
    description: "Find and rent the perfect car for your journey.", // Можете змінити опис
    url: 'https://rental-car-ten-omega.vercel.app',
    siteName: 'Car Rental',
    images: [
      {
        url: '/public/hero-image.jpg', 
        width: 1440,
        height: 696,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable}`} data-scroll-behavior="smooth">
      <body>
        <Toaster
          position="top-right"
          toastOptions={{
            className: 'customToast',
          }}
        />
        <TanStackProvider>
          <Header />
          {children}{' '}
        </TanStackProvider>
      </body>
    </html>
  );
}
