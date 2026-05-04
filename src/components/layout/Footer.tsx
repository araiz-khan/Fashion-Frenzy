
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { Logo } from '@/components/icons/Logo';

const VisaIcon = () => (
  <svg width="38" height="24" viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="pi-visa">
    <title id="pi-visa">Visa</title>
    <path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"/>
    <path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"/>
    <path d="M28.8 10.1c-.1-.3-.3-.5-.5-.7-.2-.2-.5-.3-.9-.3-.3 0-.6.1-.9.2-.3.1-.5.3-.6.6-.2.2-.3.5-.3.8s.1.6.2.8c.2.2.4.3.7.3.2 0 .4 0 .6-.1.2-.1.3-.2.4-.3.1-.2.2-.3.2-.5l1-5.1c-.1-.4-.2-.7-.4-.9-.2-.2-.5-.3-.8-.3-.4 0-.7.1-1 .2-.3.2-.5.4-.6.7-.2.3-.3.6-.3.9s.1.6.2.8l.5 2.5c.1.4.2.8.4 1.1.2.4.4.6.7.8.3.2.6.3.9.3.6 0 1.1-.2 1.5-.5.4-.3.6-.8.7-1.3.1-.5.1-1 .1-1.4.1-.4.1-.8 0-1.2zM24 16h2.1l-3.3-10h-2.1l3.3 10zm-3.3 0h2.1l-1.9-10h-2.1l1.9 10zm-3.1 0h2.1l-3.3-10h-2.1l3.3 10zm-4.4-4.8c-.1-.3-.3-.5-.5-.7-.2-.2-.5-.3-.9-.3-.3 0-.6.1-.9.2-.3.1-.5.3-.6.6-.2.2-.3.5-.3.8s.1.6.2.8c.2.2.4.3.7.3.2 0 .4 0 .6-.1.2-.1.3-.2.4-.3.1-.2.2-.3.2-.5l1-5.1c-.1-.4-.2-.7-.4-.9-.2-.2-.5-.3-.8-.3-.4 0-.7.1-1 .2-.3.2-.5.4-.6.7-.2.3-.3.6-.3.9s.1.6.2.8l.5 2.5c.1.4.2.8.4 1.1.2.4.4.6.7.8.3.2.6.3.9.3.6 0 1.1-.2 1.5-.5.4-.3.6-.8.7-1.3.1-.5.1-1 .1-1.4.1-.4.1-.8 0-1.2zM10.2 6l-3.6 10H8.9l1.1-3.1h2.5l.4 3.1h2.1L11.7 6h-1.5zm-1.1 5.1l.7-2.3.4 2.3h-1.1z" fill="#142688"/>
  </svg>
);

const MastercardIcon = () => (
    <svg width="38" height="24" viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="pi-mastercard">
        <title id="pi-mastercard">Mastercard</title>
        <path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"/>
        <path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"/>
        <circle fill="#EB001B" cx="15" cy="12" r="7"/>
        <circle fill="#F79E1B" cx="23" cy="12" r="7"/>
        <path fill="#FF5F00" d="M22 12c0-3.9-3.1-7-7-7s-7 3.1-7 7 3.1 7 7 7 7-3.1 7-7z"/>
    </svg>
);

const AmexIcon = () => (
    <svg width="38" height="24" viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="pi-amex">
        <title id="pi-amex">American Express</title>
        <path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"/>
        <path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"/>
        <path d="M35,2c0.6,0,1,0.4,1,1v18c0,0.6-0.4,1-1,1H3c-0.6,0-1-0.4-1-1V3c0-0.6,0.4-1,1-1H35z" fill="#006FCF"/>
        <path d="M22.9,15.6h-3.8c0,0-0.1,0-0.2-0.1l-0.2-0.8c0,0-0.1-0.2,0-0.3l3.5-6.4c0.1-0.1,0.2-0.1,0.3,0l0.3,0.5 c0,0,0.1,0.1,0,0.2l-3,5.6c0,0-0.1,0.1,0,0.2L22.9,15.6z M23.9,15.6h-0.9l-1.3-2.6h1.4c0.2,0,0.3-0.1,0.3-0.3V12 c0-0.2-0.1-0.3-0.3-0.3h-1.6l-1.3-2.7h1.7c0.2,0,0.3-0.1,0.3-0.3v-0.6c0-0.2-0.1-0.3-0.3-0.3h-3.2c-0.2,0-0.3,0.1-0.3,0.3l-1.9,8 c0,0.2,0.1,0.3,0.3,0.3h3.2c0.2,0,0.3-0.1,0.3-0.3v-0.6c0-0.2-0.1-0.3-0.3-0.3h-1.7L23.9,15.6z M16,15.6h-1.5L13.2,8h1.6L16,15.6z M11.8,12.8h-1c-0.2,0-0.3,0.1-0.3,0.3v0.6c0,0.2,0.1,0.3,0.3,0.3h1c0.2,0,0.3-0.1,0.3-0.3v-0.6C12.1,12.9,12,12.8,11.8,12.8z M15.1,8.1h-0.9L13,11.3c0,0.1,0,0.2-0.1,0.2l-0.7-3.4H11c0,0,0,0-0.1-0.1L9.7,11c0,0.1-0.1,0.1-0.1-0.1L8.3,8.1H7.2c0,0-0.1,0-0.1,0.1l1.7,6.8c0,0,0.1,0.1,0.1,0.1h1.2c0,0,0,0,0,0l1.9-6.3C15.1,8.2,15.1,8.1,15.1,8.1z M11.8,10.6h-1c-0.2,0-0.3,0.1-0.3,0.3v0.6c0,0.2,0.1,0.3,0.3,0.3h1c0.2,0,0.3-0.1,0.3-0.3v-0.6C12.1,10.7,12,10.6,11.8,10.6z M11.8,11.7h-1c-0.2,0-0.3,0.1-0.3,0.3v0.6c0,0.2,0.1,0.3,0.3,0.3h1c0.2,0,0.3-0.1,0.3-0.3v-0.6C12.1,11.8,12,11.7,11.8,11.7z" fill="#FFFFFF"/>
    </svg>
);

const PayPalIcon = () => (
    <svg width="38" height="24" viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="pi-paypal">
        <title id="pi-paypal">PayPal</title>
        <path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"/>
        <path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"/>
        <path fill="#003087" d="M23.9 8.6c.1-2.4-1.9-4.1-4.5-4.1H10l-3 14.1h4.2c.2 0 .4-.2.5-.4l.7-4.4c.1-.3.4-.5.7-.5h2.8c2.4 0 4-1.2 4.4-3.7zm-6.8 2.5H15c-.3 0-.5-.2-.6-.5L14 8.4c-.1-.3.2-.6.5-.6h2.1c.9 0 1.5.3 1.4 1.2-.1.7-1 1.1-1.9 1.1z"/>
        <path fill="#009cde" d="M23.3 8.1c-.2-1.9-1.8-3.1-3.8-3.1H10.4l-1.1 5.1h3c.2 0 .4-.2.5-.4l.4-2.4c.1-.6.6-1 1.2-1h.4c1.1 0 1.7.5 1.6 1.4-.2 1-1.2 1.5-2.2 1.5H13c-.6 0-1 .3-1.1.9l-.7 4.3h3.4c.2 0 .4-.2.5-.4l.4-2.4c.1-.6.6-1 1.2-1h.5c1.1 0 1.7.5 1.6 1.4-.2 1-1.2 1.5-2.2 1.5H14c-.6 0-1 .3-1.1.9l-.7 4.3h3c.2 0 .4-.2.5-.4l.7-4.4c.1-.3.4-.5.7-.5h2.8c2.4 0 4-1.2 4.4-3.7.2-1-.2-1.9-.9-2.6z"/>
    </svg>
);

export function Footer() {
  return (
    <footer className="bg-muted/40 border-t border-border/40 text-sm text-muted-foreground">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Logo & About */}
          <div className="space-y-4 md:col-span-1">
            <Logo />
            <p className="max-w-xs">
              Shop from hundreds of small fashion brands. Each purchase supports an independent creator.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-1">
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/shop" className="hover:text-primary transition-colors">Shop</Link></li>
              <li><Link href="/about-us" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Column 3: Customer Service */}
           <div className="md:col-span-1">
            <h3 className="font-semibold text-foreground mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><Link href="/shipping" className="hover:text-primary transition-colors">Shipping & Returns</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Column 4: Follow Us & Socials */}
          <div className="md:col-span-1">
             <h3 className="font-semibold text-foreground mb-4">Follow Us</h3>
             <div className="flex space-x-4">
              <Link href="#" aria-label="Facebook" className="text-muted-foreground hover:text-primary transition-colors"><Facebook /></Link>
              <Link href="#" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors"><Instagram /></Link>
              <Link href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary transition-colors"><Twitter /></Link>
              <Link href="#" aria-label="Youtube" className="text-muted-foreground hover:text-primary transition-colors"><Youtube /></Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <p className="mb-4 md:mb-0">&copy; {new Date().getFullYear()} Fashion Frenzy. All Rights Reserved.</p>
          <div className="flex items-center space-x-2">
            <span className="font-medium text-foreground">We Accept:</span>
            <div className="flex items-center space-x-1">
                <VisaIcon />
                <MastercardIcon />
                <AmexIcon />
                <PayPalIcon />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
