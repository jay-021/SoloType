import { Card, CardContent } from "@/components/ui/card"

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-8">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          
          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
              <p className="text-muted-foreground">
                This Privacy Policy explains how SoloType ("we," "us," or "our") collects, uses, and protects your personal information when you use our typing test platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Account information (email, username)</li>
                <li>Typing test performance data</li>
                <li>Usage statistics and preferences</li>
                <li>Technical information (browser type, device information)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>To provide and improve our typing test services</li>
                <li>To personalize your experience</li>
                <li>To maintain leaderboards and progress tracking</li>
                <li>To communicate with you about updates and features</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Data Protection Rights (GDPR)</h2>
              <p className="text-muted-foreground mb-4">
                Under GDPR, you have the following rights:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Right to access your personal data</li>
                <li>Right to rectification of inaccurate data</li>
                <li>Right to erasure ("right to be forgotten")</li>
                <li>Right to restrict processing</li>
                <li>Right to data portability</li>
                <li>Right to object to processing</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Cookies</h2>
              <p className="text-muted-foreground">
                We use cookies to enhance your experience. You can control cookie preferences through your browser settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Data Security</h2>
              <p className="text-muted-foreground">
                We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Contact Information</h2>
              <p className="text-muted-foreground">
                For any questions about this Privacy Policy, please contact us through our Contact page.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Updates to This Policy</h2>
              <p className="text-muted-foreground">
                We may update this Privacy Policy periodically. The latest version will always be posted on this page.
              </p>
            </section>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 