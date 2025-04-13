import { Card, CardContent } from "@/components/ui/card"

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-8">
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          
          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground">
                By accessing and using SoloType, you accept and agree to be bound by these Terms of Service.
                If you do not agree to these terms, please do not use our service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
              <p className="text-muted-foreground">
                SoloType provides an online typing test and practice platform. We reserve the right to modify,
                suspend, or discontinue any aspect of the service at any time.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>You are responsible for maintaining the confidentiality of your account</li>
                <li>You must provide accurate and complete information</li>
                <li>You are responsible for all activities under your account</li>
                <li>We reserve the right to suspend or terminate accounts</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. User Conduct</h2>
              <p className="text-muted-foreground mb-4">
                Users agree not to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Use automated systems or scripts</li>
                <li>Attempt to gain unauthorized access</li>
                <li>Interfere with the proper functioning of the service</li>
                <li>Engage in any form of cheating or manipulation</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Intellectual Property</h2>
              <p className="text-muted-foreground">
                All content, features, and functionality are owned by SoloType and are protected by
                international copyright, trademark, and other intellectual property laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Limitation of Liability</h2>
              <p className="text-muted-foreground">
                SoloType shall not be liable for any indirect, incidental, special, consequential,
                or punitive damages resulting from your use or inability to use the service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Changes to Terms</h2>
              <p className="text-muted-foreground">
                We reserve the right to modify these terms at any time. Continued use of the service
                after changes constitutes acceptance of the new terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Governing Law</h2>
              <p className="text-muted-foreground">
                These terms shall be governed by and construed in accordance with the laws of the
                jurisdiction in which SoloType operates.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Contact</h2>
              <p className="text-muted-foreground">
                For any questions about these Terms of Service, please contact us through our Contact page.
              </p>
            </section>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 