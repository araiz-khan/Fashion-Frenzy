
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';

const faqData = [
  {
    question: "What is your return policy?",
    answer: "We accept returns within 30 days of purchase, provided the item is unworn, unwashed, and in its original condition with all tags attached. To initiate a return, please visit our Shipping & Returns page for detailed instructions."
  },
  {
    question: "How long does shipping take?",
    answer: "Standard shipping typically takes 5-7 business days within the continental US. Expedited shipping options are available at checkout. You will receive a tracking number via email once your order has shipped."
  },
  {
    question: "How does Fashion Frenzy support independent designers?",
    answer: "Our entire business model is built around supporting small brands and independent creators. We provide a platform for them to reach a wider audience, and a significant portion of every sale goes directly to the designer of the product you purchase."
  },
  {
    question: "Are the clothes true to size?",
    answer: "Sizing can vary slightly between our independent brands. We provide detailed size charts on each product page with measurements. If you're between sizes, we generally recommend sizing up. For specific sizing questions, feel free to contact our support team!"
  },
  {
    question: "How can I track my order?",
    answer: "Once your order is shipped, you will receive an email with a tracking number and a link to the carrier's website. You can use this to monitor your package's journey to your doorstep."
  }
];

export default function FAQPage() {
  return (
    <div className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto shadow-xl rounded-2xl overflow-hidden border">
           <CardHeader className="text-center p-8 bg-muted/30">
            <HelpCircle className="mx-auto h-12 w-12 text-primary mb-4" />
            <CardTitle className="text-3xl md:text-4xl font-headline">Frequently Asked Questions</CardTitle>
             <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions? We're here to help. Find answers to common queries below.
            </p>
          </CardHeader>
          <CardContent className="p-8 md:p-12">
            <Accordion type="single" collapsible className="w-full">
              {faqData.map((faq, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                  <AccordionTrigger className="text-lg text-left font-semibold hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="prose dark:prose-invert max-w-none text-base text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
