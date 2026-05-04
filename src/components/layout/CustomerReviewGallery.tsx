
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';
import Link from 'next/link';

const reviews = [
  {
    id: 1,
    customerName: 'Jessica L.',
    customerInitial: 'JL',
    avatarUrl: 'https://placehold.co/100x100.png',
    avatarAiHint: 'woman portrait',
    review: "Absolutely in love with this dress! The fabric is so soft and it fits perfectly. I got so many compliments.",
    productName: 'Elegant Summer Maxi Dress',
    productUrl: '/products/1',
    imageUrl: 'https://placehold.co/400x550.png',
    imageAiHint: 'woman dress fashion'
  },
  {
    id: 2,
    customerName: 'Ben R.',
    customerInitial: 'BR',
    avatarUrl: 'https://placehold.co/100x100.png',
    avatarAiHint: 'man portrait',
    review: "This jacket is my new favorite. It's stylish, comfortable, and great for city life. Quality is top-notch.",
    productName: 'Urban Explorer Jacket',
    productUrl: '/products/12',
    imageUrl: 'https://placehold.co/400x450.png',
    imageAiHint: 'man jacket fashion'
  },
  {
    id: 3,
    customerName: 'Chloe T.',
    customerInitial: 'CT',
    avatarUrl: 'https://placehold.co/100x100.png',
    avatarAiHint: 'woman portrait smiling',
    review: "The perfect pair of jeans. They have just the right amount of stretch. I've been living in them!",
    productName: 'Slim Fit Denim Jeans',
    productUrl: '/products/3',
    imageUrl: 'https://placehold.co/400x600.png',
    imageAiHint: 'woman jeans fashion'
  },
  {
    id: 4,
    customerName: 'Marcus W.',
    customerInitial: 'MW',
    avatarUrl: 'https://placehold.co/100x100.png',
    avatarAiHint: 'man smiling portrait',
    review: "Great quality tee. It's held up so well after multiple washes. Worth every penny.",
    productName: 'Classic Cotton Tee',
    productUrl: '/products/2',
    imageUrl: 'https://placehold.co/400x500.png',
    imageAiHint: 'man t-shirt'
  },
];

const ReviewCard = ({ review }: { review: (typeof reviews)[0] }) => (
  <Card className="overflow-hidden group break-inside-avoid">
    <Link href={review.productUrl}>
      <div className="relative">
        <Image
          src={review.imageUrl}
          alt={`Customer photo for ${review.productName}`}
          width={400}
          height={550}
          className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
          data-ai-hint={review.imageAiHint}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </Link>
    <CardContent className="p-4 bg-card">
      <div className="flex items-center mb-2">
        <Avatar className="h-10 w-10 mr-3">
          <AvatarImage src={review.avatarUrl} alt={review.customerName} data-ai-hint={review.avatarAiHint} />
          <AvatarFallback>{review.customerInitial}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold text-sm text-foreground">{review.customerName}</p>
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
          </div>
        </div>
      </div>
      <p className="text-sm text-muted-foreground italic">"{review.review}"</p>
      <Link href={review.productUrl}>
        <p className="text-xs text-primary hover:underline mt-2">
          on: {review.productName}
        </p>
      </Link>
    </CardContent>
  </Card>
);

export function CustomerReviewGallery() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-foreground">
            How You Wear It
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            See how our community brings their Fashion Frenzy pieces to life. Tag us @FashionFrenzy to be featured!
          </p>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 sm:gap-6 space-y-4 sm:space-y-6">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
