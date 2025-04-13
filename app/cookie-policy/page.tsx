import { Card, CardContent } from "@/components/ui/card"

export default function CookiePolicyPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-8">
          <h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>
          
          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. What Are Cookies</h2>
              <p className="text-muted-foreground">
                Cookies are small text files that are stored on your computer or mobile device when you visit
                our website. They help us make the site work better for you and provide a more personalized experience.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. How We Use Cookies</h2>
              <p className="text-muted-foreground mb-4">We use cookies for the following purposes:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Essential cookies: Required for the website to function properly</li>
                <li>Performance cookies: Help us understand how visitors interact with our website</li>
                <li>Functionality cookies: Remember your preferences and settings</li>
                <li>Analytics cookies: Help us improve our website and services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Types of Cookies We Use</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Essential Cookies</h3>
                  <p className="text-muted-foreground">
                    These cookies are necessary for the website to function and cannot be switched off.
                    They are usually set in response to actions you take, such as logging in or filling forms.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Performance Cookies</h3>
                  <p className="text-muted-foreground">
                    These cookies allow us to count visits and traffic sources so we can measure and
                    improve the performance of our site.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Functionality Cookies</h3>
                  <p className="text-muted-foreground">
                    These cookies enable the website to provide enhanced functionality and personalization.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Managing Cookies</h2>
              <p className="text-muted-foreground mb-4">
                Most web browsers allow you to control cookies through their settings. You can:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>View cookies stored on your computer</li>
                <li>Delete all or specific cookies</li>
                <li>Block cookies from being set</li>
                <li>Allow or block cookies from specific websites</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Your Consent</h2>
              <p className="text-muted-foreground">
                When you first visit our website, we will ask for your consent to use cookies.
                You can change your cookie preferences at any time through our cookie settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Updates to This Policy</h2>
              <p className="text-muted-foreground">
                We may update this Cookie Policy from time to time. Any changes will be posted on this page
                and, where appropriate, notified to you when you next visit our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Contact Us</h2>
              <p className="text-muted-foreground">
                If you have any questions about our Cookie Policy, please contact us through our Contact page.
              </p>
            </section>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 