import type { ReactNode } from 'react';
import { Outfit } from 'next/font/google';
import '../globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
});

export const metadata = {
  title: 'BOLD Admin',
  description: 'Bold Kosova Admin Dashboard',
};

export default function AdminRootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={outfit.variable}>
      <body className="font-sans bg-gray-50 text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}
