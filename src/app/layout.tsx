
import type { Metadata } from 'next';
import './globals.css';
import { AppProviders } from '@/components/layout/AppProviders';
import { Toaster } from "@/components/ui/toaster";
import { firebaseError } from '@/lib/firebase/config';
import { FirebaseErrorOverlay } from '@/components/layout/FirebaseErrorOverlay';
import { ThemeProvider } from '@/components/layout/ThemeProvider';

export const metadata: Metadata = {
  title: 'Fashion Frenzy - Support Small Fashion Brands',
  description: 'Shop from hundreds of small fashion brands. Each purchase supports an independent creator.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // If there's a firebase configuration error, block the whole app and show the error overlay.
  if (firebaseError) {
    return (
      <html lang="en" suppressHydrationWarning>
         <head>
            <title>Configuration Error</title>
         </head>
        <body className="font-body bg-background text-foreground antialiased" suppressHydrationWarning>
          <FirebaseErrorOverlay message={firebaseError} />
        </body>
      </html>
    );
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Added Google Fonts for Alegreya and Belleza */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Alegreya:ital,wght@0,400;0,500;0,700;1,400&family=Belleza&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body bg-background text-foreground antialiased" suppressHydrationWarning> {/* Changed to font-body */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppProviders>
            {children}
            <Toaster />
          </AppProviders>
        </ThemeProvider>
      </body>
    </html>
  );
}
