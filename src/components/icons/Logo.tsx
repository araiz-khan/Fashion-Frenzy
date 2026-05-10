import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2 group">
      <img src="/logo.png" alt="Fashion Frenzy Logo" className="h-8 w-8 object-contain" />
      <h1 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
        Fashion Frenzy
      </h1>
    </Link>
  );
}
