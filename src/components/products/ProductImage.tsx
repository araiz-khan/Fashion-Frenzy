import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ProductImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  aiHint?: string;
}

const WHITELISTED_HOSTNAMES = ['placehold.co', 'firebasestorage.googleapis.com'];

export function ProductImage({ src, alt, width, height, className, priority = false, aiHint = "fashion clothing" }: ProductImageProps) {
  const placeholderSrc = `https://placehold.co/${width}x${height}.png`;
  
  let isWhitelisted = false;
  if (src) {
    try {
      // Check for local paths first, which are always "whitelisted"
      if (src.startsWith('/')) {
        isWhitelisted = true;
      } else {
        const url = new URL(src);
        if (WHITELISTED_HOSTNAMES.includes(url.hostname)) {
          isWhitelisted = true;
        }
      }
    } catch (error) {
      // Invalid URL format, treat as not whitelisted.
      isWhitelisted = false;
    }
  }


  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = placeholderSrc;
  };

  const imageClasses = "object-cover transition-transform duration-300 group-hover:scale-105 w-full h-full";

  return (
    <div className={cn("relative overflow-hidden rounded-md bg-muted", className)} style={{ width, height }}>
      {isWhitelisted ? (
        <Image
          src={src || placeholderSrc}
          alt={alt}
          width={width}
          height={height}
          className={imageClasses}
          priority={priority}
          data-ai-hint={aiHint}
          onError={handleError}
        />
      ) : (
        // Using a standard <img> tag for non-whitelisted domains to avoid Next.js errors.
        <img
          src={src || placeholderSrc}
          alt={alt}
          width={width}
          height={height}
          className={imageClasses}
          data-ai-hint={aiHint}
          onError={handleError}
          style={{ objectFit: 'cover' }}
          loading={priority ? 'eager' : 'lazy'}
        />
      )}
    </div>
  );
}
