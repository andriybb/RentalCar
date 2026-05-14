import type { Metadata } from 'next';
import { Manrope, Inter } from 'next/font/google';
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

const inter = Inter({
  subsets: ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext'],
  weight: ['500'],
  variable: '--second-family',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Rental Car',
  description: 'Car rental service',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable}`}>
      <body>
        <Toaster
          position="top-right"
          toastOptions={{
            className: 'customToast',
          }}
        />
        <TanStackProvider>
          <Header />
          {children} </TanStackProvider>
      </body>
    </html>
  );
}
