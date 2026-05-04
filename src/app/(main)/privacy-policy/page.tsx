
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Shield, Lock, UserCheck, Mail } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto shadow-xl rounded-2xl overflow-hidden border">
          <CardHeader className="text-center p-8 bg-muted/30">
            <Shield className="mx-auto h-12 w-12 text-primary mb-4" />
            <CardTitle className="text-3xl md:text-4xl font-headline">Privacy Policy</CardTitle>
            <CardDescription className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Your privacy is important to us. This policy explains what data we collect and why.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 md:p-12">
            <div className="prose dark:prose-invert max-w-none text-foreground/90 leading-relaxed space-y-8">
              <p>
                Welcome to Fashion Frenzy. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us.
              </p>
              
              <section>
                <h2 className="font-headline text-2xl font-semibold flex items-center">
                  <UserCheck className="mr-3 h-6 w-6 text-primary" />
                  1. What Information We Collect
                </h2>
                <p>
                  We collect personal information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products and services, when you participate in activities on the website, or otherwise when you contact us.
                </p>
                <p>
                  The personal information that we collect depends on the context of your interactions with us and the website, the choices you make, and the products and features you use. The personal information we collect may include the following:
                </p>
                <ul>
                  <li><strong>Personal Information You Disclose to Us:</strong> We collect names; email addresses; mailing addresses; phone numbers; passwords; contact preferences; and other similar information.</li>
                  <li><strong>Payment Data:</strong> We may collect data necessary to process your payment if you make purchases, such as your payment instrument number (such as a credit card number), and the security code associated with your payment instrument. All payment data is stored by our payment processor.</li>
                </ul>
              </section>

              <section>
                <h2 className="font-headline text-2xl font-semibold flex items-center">
                  <Lock className="mr-3 h-6 w-6 text-primary" />
                  2. How We Use Your Information
                </h2>
                <p>
                  We use personal information collected via our website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
                </p>
                <ul>
                  <li>To facilitate account creation and logon process.</li>
                  <li>To post testimonials with your consent.</li>
                  <li>To manage user accounts and keep them in working order.</li>
                  <li>To send administrative information to you for business purposes, legal reasons and/or possibly for contractual reasons.</li>
                  <li>To fulfill and manage your orders, payments, returns, and exchanges.</li>
                </ul>
              </section>

               <section>
                <h2 className="font-headline text-2xl font-semibold flex items-center">
                  <Shield className="mr-3 h-6 w-6 text-primary" />
                  3. Data Security
                </h2>
                <p>
                  We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information.
                </p>
              </section>

              <section>
                 <h2 className="font-headline text-2xl font-semibold flex items-center">
                  <Mail className="mr-3 h-6 w-6 text-primary" />
                  4. Contact Us
                </h2>
                <p>
                  If you have questions or comments about this policy, you may email us at <a href="mailto:privacy@fashionfrenzy.com" className="text-primary hover:underline">privacy@fashionfrenzy.com</a> or by post to:
                </p>
                <address className="not-italic bg-muted/50 p-4 rounded-md border-l-4 border-primary">
                  Fashion Frenzy<br />
                  Privacy Department<br />
                  Minhaj University, Lahore, Pakistan
                </address>
              </section>

            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
