
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users } from 'lucide-react';

export default function AboutUsPage() {
  return (
    <div className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto shadow-xl rounded-2xl overflow-hidden border">
          <CardHeader className="text-center p-8 bg-muted/30">
            <Users className="mx-auto h-12 w-12 text-primary mb-4" />
            <CardTitle className="text-3xl md:text-4xl font-headline">About Fashion Frenzy</CardTitle>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              We believe fashion is more than just clothing — it's a form of self-expression, creativity, and a way to support independent art.
            </p>
          </CardHeader>
          <CardContent className="p-8 md:p-12 space-y-12">
            <div className="prose dark:prose-invert max-w-none text-lg text-foreground/90 text-justify leading-relaxed">
              <p>
                At Fashion Frenzy, our mission is to build a vibrant community where independent fashion designers and small brands can thrive. We are driven by a passion for unique designs and high-quality craftsmanship that stands apart from mass-produced trends. We provide a platform for creators to share their stories and for you to discover pieces that are as unique as you are.
              </p>
              <p>
                Every stitch, fabric, and design in our collection is a testament to the creativity and dedication of our partner brands. By choosing to shop with us, you are not just buying a piece of clothing; you are supporting a dream, empowering an artist, and investing in a more sustainable and diverse fashion industry. Thank you for joining us on this stylish journey.
              </p>
            </div>
            
            <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-headline font-semibold text-foreground mb-10">Meet The Founders</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
                    {/* Founder 1 */}
                    <div className="flex flex-col items-center space-y-2">
                        <Avatar className="w-32 h-32 mb-2 border-4 border-primary/20 shadow-lg">
                            <AvatarImage src="https://placehold.co/200x200.png" alt="Aqib Karamat" data-ai-hint="man portrait"/>
                            <AvatarFallback>AK</AvatarFallback>
                        </Avatar>
                        <h3 className="text-xl font-semibold font-headline text-foreground">samiullah</h3>
                        <p className="text-primary font-medium"> AI Developer </p>
                        <p className="mt-2 text-muted-foreground text-center max-w-xs">samiullah is the technical architect behind Fashion Frenzy, blending his love for code with a keen eye for user experience to build a seamless platform.</p>
                    </div>
                    {/* Founder 2 */}
                    <div className="flex flex-col items-center space-y-2">
                        <Avatar className="w-32 h-32 mb-2 border-4 border-primary/20 shadow-lg">
                            <AvatarImage src="https://placehold.co/200x200.png" alt="Adnan" data-ai-hint="man portrait"/>
                            <AvatarFallback>A</AvatarFallback>
                        </Avatar>
                        <h3 className="text-xl font-semibold font-headline text-foreground">araiz</h3>
                        <p className="text-primary font-medium">backend developer</p>
                         <p className="mt-2 text-muted-foreground text-center max-w-xs">araiz is the creative visionary, curating our collection and ensuring every piece reflects our commitment to style, quality, and originality.</p>
                    </div>
                        {/* Founder 3 */}
                          <div className="flex flex-col items-center space-y-2">
                        <Avatar className="w-32 h-32 mb-2 border-4 border-primary/20 shadow-lg">
                            <AvatarImage src="https://placehold.co/200x200.png" alt="Aqib Karamat" data-ai-hint="man portrait"/>
                            <AvatarFallback>AK</AvatarFallback>
                        </Avatar>
                        <h3 className="text-xl font-semibold font-headline text-foreground">sufyan </h3>
                        <p className="text-primary font-medium">ui designer </p>
                        <p className="mt-2 text-muted-foreground text-center max-w-xs">samiullah is the technical architect behind Fashion Frenzy, blending his love for code with a keen eye for user experience to build a seamless platform.</p>
                    </div>
                </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
