import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-gray-700">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Privacy Policy</h1>
      <p className="mb-4">
        This privacy policy outlines how MeeGuide uses and processes your personal data when you use MeeGuide's services, such as through our website and mobile apps. It also informs you about your rights regarding your personal data and how you can contact us.
      </p>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">1. Controller and Contact</h2>
        <p className="mb-2">
          The Controller responsible for processing your personal data is:
        </p>
        <p>
          <strong>Controller:</strong> MeeGuide Inc.<br />
          <strong>Address:</strong> 123 Travel Street, Adventure City, AC 12345, USA<br />
          <strong>Contact:</strong>{" "}
          <a href="https://www.meeguide.com/contact/" className="text-blue-600 underline hover:text-blue-800">
            https://www.meeguide.com/contact/
          </a>
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">2. Automated Data Collection</h2>
        <p className="mb-2">
          When you visit our websites or mobile apps, we automatically collect certain information:
        </p>
        <ul className="list-disc list-inside mb-2">
          <li>URL of the page accessed</li>
          <li>Date and time</li>
          <li>Information about your device's hardware and software</li>
          <li>Information about clicks and pages viewed</li>
        </ul>
        <p>
          We store this data for purposes such as load balancing, security, and proper system operations. Your IP address is encrypted and retained for 45 days.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">3. MeeGuide Account</h2>
        <h3 className="text-xl font-medium mt-2 mb-2">3.1 Registration</h3>
        <p className="mb-2">
          When you create a MeeGuide account, you may provide your name, email address, and password. You can also log in with your Facebook, Google, or Apple account.
        </p>
        <h3 className="text-xl font-medium mt-4 mb-2">3.2 Wishlists</h3>
        <p>
          After creating an account, you can create and share wishlists of attractions and tours.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">4. Reviews and Ratings</h2>
        <p>
          You can rate and comment on tours or activities. Submitting a rating is voluntary and can be done anonymously.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">5. Customer Support</h2>
        <p>
          We use secure systems to handle customer inquiries and may use translation services for international support.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">6. Technical Service Providers</h2>
        <p>
          We use trusted service providers for hosting and other technical services. These providers act as processors and follow our instructions for data handling.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">7. Newsletter</h2>
        <p>
          You can subscribe to our newsletter for personalized offers and promotions. You can unsubscribe at any time.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">8. Bookings & Payments</h2>
        <p>
          When you book a tour or activity, we collect necessary data to process your booking and payment.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">9. Fraud Prevention</h2>
        <p>
          We use fraud prevention measures to protect ourselves and our partners from fraudulent bookings.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">10. Cookies and Tracking Technologies</h2>
        <p>
          We use cookies and similar technologies for various purposes, including website functionality, analytics, and marketing. You can manage your cookie preferences in our Cookie Settings.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">11. Marketing and Remarketing Services</h2>
        <p>
          With your consent, we may use your data for marketing purposes, including personalized advertising.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">12. Your Rights</h2>
        <ul className="list-disc list-inside">
          <li>Access your personal data</li>
          <li>Correct inaccurate data</li>
          <li>Request deletion of your data</li>
          <li>Restrict processing of your data</li>
          <li>Data portability</li>
          <li>Object to processing</li>
          <li>Lodge a complaint with a supervisory authority</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">13. Changes to this Privacy Policy</h2>
        <p>
          We may update this privacy policy from time to time. The current version is always available at{" "}
          <a href="https://www.meeguide.com/privacy-policy" className="text-blue-600 underline hover:text-blue-800">
            https://www.meeguide.com/privacy-policy
          </a>.
        </p>
        <p className="mt-4">Last updated: [Current Date]</p>
      </section>
    </div>
  );
}
