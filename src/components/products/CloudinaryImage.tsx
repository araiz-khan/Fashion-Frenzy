"use client";

import React from 'react';
import Image from 'next/image';

interface Props {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
}

function isFullUrl(s: string) {
  try {
    return Boolean(new URL(s));
  } catch (e) {
    return false;
  }
}

export default function CloudinaryImage({ src, alt, width, height, className, priority = false }: Props) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  let url = src;

  if (!isFullUrl(src)) {
    // treat src as public id
    if (!cloudName) {
      // fallback to using the src directly
      url = src;
    } else {
      url = `https://res.cloudinary.com/${cloudName}/image/upload/c_fill,w_${width},h_${height}/${encodeURIComponent(src)}`;
    }
  }

  return (
    <div className={className} style={{ width, height }}>
      <Image
        src={url}
        alt={alt}
        width={width}
        height={height}
        className="object-cover"
        priority={priority}
        onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/${width}x${height}.png`; }}
      />
    </div>
  );
}
