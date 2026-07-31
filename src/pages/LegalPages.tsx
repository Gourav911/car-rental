import React from 'react';

const PrivacyPage: React.FC = () => (
  <main className="min-h-screen bg-surface pt-20">
    <div className="bg-gradient-hero py-16 text-center">
      <h1 className="text-4xl font-extrabold text-white mb-3">Privacy Policy</h1>
      <p className="text-blue-100">Last updated: July 2025</p>
    </div>
    <div className="max-w-3xl mx-auto px-4 md:px-8 py-16">
      <div className="card p-8 prose prose-sm max-w-none">
        {[
          { title: '1. Information We Collect', content: 'We collect information you provide when creating an account, making a booking, or contacting us. This includes name, email address, phone number, payment details, and driver\'s license information as required by rental partners.' },
          { title: '2. How We Use Your Information', content: 'Your information is used to process bookings, communicate with you about your reservations, provide customer support, improve our platform, and send promotional offers (with your consent).' },
          { title: '3. Data Sharing', content: 'We share your booking details with rental partner companies to fulfill your reservation. We do not sell your personal data to third parties. We may share aggregated, anonymized analytics data.' },
          { title: '4. Data Security', content: 'We use industry-standard encryption (TLS 1.3) for all data in transit and AES-256 for data at rest. Payment information is handled via PCI-DSS compliant processors and never stored on our servers.' },
          { title: '5. Cookies', content: 'We use essential cookies for session management, analytics cookies (with consent) to improve our service, and preference cookies to remember your settings. You may manage cookie preferences in your browser settings.' },
          { title: '6. Your Rights', content: 'You have the right to access, correct, or delete your personal data at any time. To submit a data request, contact privacy@carrentaldesk.net. We respond within 30 days.' },
          { title: '7. Contact', content: 'For privacy-related inquiries, contact our Data Protection Officer at privacy@carrentaldesk.net or write to CarRentalDesk, 350 Fifth Avenue, New York, NY 10118.' },
        ].map((section) => (
          <div key={section.title} className="mb-8">
            <h2 className="text-lg font-bold text-primary-900 mb-3">{section.title}</h2>
            <p className="text-muted leading-relaxed text-sm">{section.content}</p>
          </div>
        ))}
      </div>
    </div>
  </main>
);

const TermsPage: React.FC = () => (
  <main className="min-h-screen bg-surface pt-20">
    <div className="bg-gradient-hero py-16 text-center">
      <h1 className="text-4xl font-extrabold text-white mb-3">Terms of Service</h1>
      <p className="text-blue-100">Last updated: July 2025</p>
    </div>
    <div className="max-w-3xl mx-auto px-4 md:px-8 py-16">
      <div className="card p-8">
        {[
          { title: '1. Acceptance of Terms', content: 'By accessing or using CarRentalDesk, you agree to these Terms of Service. If you do not agree, please do not use our platform.' },
          { title: '2. Booking & Reservations', content: 'CarRentalDesk acts as an intermediary between travelers and rental partner companies. We confirm your booking but the rental agreement is between you and the rental company.' },
          { title: '3. Pricing & Fees', content: 'Prices shown are in USD unless otherwise noted and include all mandatory fees. Optional extras (insurance upgrades, child seats, GPS) are charged at pickup. We guarantee the price shown at time of booking.' },
          { title: '4. Cancellations', content: 'Free cancellation is available up to 48 hours before pickup for standard rates. Special rates may have stricter policies. Refunds are processed within 3–10 business days.' },
          { title: '5. Driver Requirements', content: 'All drivers must hold a valid license and meet the minimum age requirements for the rental country. International drivers may require an International Driving Permit.' },
          { title: '6. Liability', content: 'CarRentalDesk is not liable for the condition, quality, or performance of vehicles provided by partner companies. We are not responsible for accidents, thefts, or losses occurring during the rental period.' },
          { title: '7. Governing Law', content: 'These terms are governed by the laws of the State of New York, USA. Disputes shall be resolved through binding arbitration.' },
        ].map((section) => (
          <div key={section.title} className="mb-8 pb-8 border-b border-border last:border-0 last:mb-0">
            <h2 className="text-lg font-bold text-primary-900 mb-3">{section.title}</h2>
            <p className="text-muted leading-relaxed text-sm">{section.content}</p>
          </div>
        ))}
      </div>
    </div>
  </main>
);

export { PrivacyPage, TermsPage };
