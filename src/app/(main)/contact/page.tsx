
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4">
        <Card className="max-w-6xl mx-auto shadow-xl rounded-2xl overflow-hidden border">
          <div className="grid md:grid-cols-2">
            
            {/* Contact Form Section */}
            <div className="p-8 md:p-12">
              <CardHeader className="p-0 mb-6">
                <CardTitle className="text-3xl font-headline">Get in Touch</CardTitle>
                <CardDescription>We'd love to hear from you! Fill out the form below.</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <form className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="text-base">Name</Label>
                    <Input id="name" type="text" placeholder="Your Name" className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-base">Email</Label>
                    <Input id="email" type="email" placeholder="you@example.com" className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="message" className="text-base">Message</Label>
                    <Textarea id="message" placeholder="Your message..." rows={5} className="mt-2" />
                  </div>
                  <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Send className="mr-2 h-5 w-5" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </div>
            
            {/* Contact Info Section */}
            <div className="p-8 md:p-12 bg-muted/30 border-l border-border/40 flex flex-col justify-center">
              <CardHeader className="p-0 mb-8">
                <CardTitle className="text-3xl font-headline">Contact Information</CardTitle>
                <CardDescription>
                  Find us at our office or drop us a line via email or phone.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 bg-primary/10 text-primary p-3 rounded-full">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Email Us</h3>
                    <a href="mailto:aqibbrand784@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                      brandboy553340@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                   <div className="flex-shrink-0 bg-primary/10 text-primary p-3 rounded-full">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Call Us</h3>
                    <p className="text-muted-foreground">03174919129</p>
                  </div>
                </div>
                 <div className="flex items-start space-x-4">
                   <div className="flex-shrink-0 bg-primary/10 text-primary p-3 rounded-full">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Visit Us</h3>
                    <p className="text-muted-foreground">superior University, Lahore, Pakistan</p>
                  </div>
                </div>
              </CardContent>
            </div>

          </div>
        </Card>
      </div>
    </div>
  );
}
