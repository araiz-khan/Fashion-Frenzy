
import type { Metadata } from 'next';
import './globals.css';
import { AppProviders } from '@/components/layout/AppProviders';
import { Toaster } from "@/components/ui/toaster";
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
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
      </head>
      <body className="bg-background text-foreground antialiased" suppressHydrationWarning>
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
