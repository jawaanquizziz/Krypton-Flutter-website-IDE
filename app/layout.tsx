import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'Krypton — Browser-based Flutter IDE',
  description:
    'Build Flutter apps directly from your browser. No Flutter SDK, Dart SDK, or Android Studio required. Krypton is a professional cloud IDE for Flutter and Dart development.',
  keywords: ['Flutter', 'Dart', 'Cloud IDE', 'Browser IDE', 'Flutter Web'],
  openGraph: {
    title: 'Krypton — Browser-based Flutter IDE',
    description: 'Build Flutter apps directly from your browser.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: 'dark' }} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
