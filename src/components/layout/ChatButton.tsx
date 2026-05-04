// src/components/layout/ChatButton.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaWhatsapp } from "react-icons/fa";

// Optional: custom SVG if you want instead of react-icons
const WhatsAppIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-7 w-7 text-white"
  >
    <path d="M19.33,4.67A9.85,9.85,0,0,0,12.06,2.06,10,10,0,0,0,2.16,12a10.08,10.08,0,0,0,3,7.27L3.5,21.5l2.29-1.63A10,10,0,0,0,12.06,22,10,10,0,0,0,22,12,9.91,9.91,0,0,0,19.33,4.67ZM12.06,20.3a8.23,8.23,0,0,1-4.22-1.18L7.5,19.36,5.34,20.78l1.45-2.16a8.33,8.33,0,0,1-1.28-4.62,8.28,8.28,0,0,1,8.54-8.28,8.32,8.32,0,0,1,5.88,2.44,8.44,8.44,0,0,1,2.44,5.88,8.29,8.29,0,0,1-8.54,8.28ZM16.5,14.65c-.22-.11-1.28-.63-1.48-.7s-.34-.11-.49.11-.56.7-.68.85-.25.17-.47.06a5.89,5.89,0,0,1-2.19-1.34,6.65,6.65,0,0,1-1.51-1.87c-.16-.28,0-.43.09-.56s.22-.28.33-.42a1.4,1.4,0,0,0,.22-.38.38.38,0,0,0,0-.36c-.05-.11-.49-1.18-.67-1.62s-.36-.37-.49-.38h-.4c-.14,0-.37.05-.56.28s-.73.72-.73,1.75.75,2,0.85,2.16,1.48,2.25,3.6,3.18.5.11.8.09.68-.28.78-.56.1-.28.07-.44S16.72,14.76,16.5,14.65Z" />
  </svg>
);

export function ChatButton() {
  const WHATSAPP_NUMBER = "923174919129"; // your WhatsApp number in intl format

  return (
    <Link
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
    >
      <Button
        variant="default"
        size="icon"
        className="fixed bottom-6 right-6 bg-green-500 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-xl hover:bg-green-600 hover:scale-110 transition-transform duration-300"
      >
        {/* Use FaWhatsapp (react-icons) OR WhatsAppIcon (custom SVG) */}
        <FaWhatsapp className="text-3xl" />
        {/* <WhatsAppIcon /> */}
      </Button>
    </Link>
  );
}
