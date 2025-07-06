// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast'; // For toast notifications
import Header from '@/components/layout/Header'; // A new component for the header
import Footer from '@/components/layout/Footer'; // A new component for the footer

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ArtisanGlow - Handcrafted Goods',
  description: 'Discover unique, handmade candles, pottery, and home decor.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 text-gray-800`}>
        {/* Toaster component for notifications, placed at the top level */}
        <Toaster position="bottom-right" />
        
        {/* Header will be on every page */}
        <Header />
        
        {/* Main content area for pages */}
        <main className="min-h-screen">
          {children}
        </main>
        
        {/* Footer will be on every page */}
        <Footer />
      </body>
    </html>
  );
}