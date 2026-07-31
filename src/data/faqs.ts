import type { FAQ } from '../types';

export const faqs: FAQ[] = [
  {
    id: 'faq-001',
    category: 'Booking',
    question: 'How do I make a reservation on CarRentalDesk?',
    answer:
      "Booking is simple: enter your pickup location, dates, and preferences in the search widget, browse available vehicles, select your preferred car, and complete the secure checkout. You'll receive an instant confirmation email with all your booking details.",
  },
  {
    id: 'faq-002',
    category: 'Booking',
    question: 'Can I modify my booking after confirmation?',
    answer:
      'Yes. You can modify your booking up to 24 hours before the pickup time at no charge. Changes to dates, location, or vehicle type are all supported through your booking dashboard. Some modifications may affect the total price.',
  },
  {
    id: 'faq-003',
    category: 'Insurance',
    question: 'What insurance coverage is included with my rental?',
    answer:
      'All rentals include basic Collision Damage Waiver (CDW) and Third-Party Liability Insurance. We also offer optional Super CDW (zero excess), Personal Accident Insurance, and Tire & Windscreen Protection. You can add these during checkout.',
  },
  {
    id: 'faq-004',
    category: 'Insurance',
    question: 'Does my personal auto insurance or credit card cover rentals?',
    answer:
      'Many credit cards and personal auto insurance policies provide rental coverage — check with your provider before adding extra coverage. We recommend Super CDW for maximum peace of mind, particularly for luxury vehicles.',
  },
  {
    id: 'faq-005',
    category: 'Cancellation',
    question: 'What is your cancellation policy?',
    answer:
      'Free cancellation is available up to 48 hours before your pickup time for most bookings. Cancellations within 24–48 hours incur a 50% fee. Cancellations within 24 hours or no-shows are charged in full. Special rates may have stricter policies, which are clearly indicated before booking.',
  },
  {
    id: 'faq-006',
    category: 'Cancellation',
    question: 'How quickly will I receive my refund after cancellation?',
    answer:
      'Eligible refunds are processed within 3–5 business days. The time to appear in your account depends on your payment provider (typically 5–10 business days). You will receive a confirmation email as soon as the refund is initiated.',
  },
  {
    id: 'faq-007',
    category: 'License',
    question: 'What documents do I need to pick up a rental car?',
    answer:
      "You'll need: (1) A valid driver's license held for at least 1 year, (2) A passport or national ID for international rentals, (3) A credit card in the driver's name for the security deposit, and (4) Your booking confirmation. International travelers may need an International Driving Permit (IDP).",
  },
  {
    id: 'faq-008',
    category: 'License',
    question: 'Is there a minimum age to rent a car?',
    answer:
      'The standard minimum age is 21 years in most countries. Drivers aged 18–20 may rent with an additional Young Driver Surcharge. For luxury and exotic vehicles, the minimum age is typically 25. Age restrictions vary by country and are shown during the booking process.',
  },
  {
    id: 'faq-009',
    category: 'Payments',
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major credit and debit cards (Visa, Mastercard, Amex, Discover), PayPal, Apple Pay, and Google Pay. For corporate bookings, we support invoiced payment with an approved account. Cryptocurrency payments are not currently supported.',
  },
  {
    id: 'faq-010',
    category: 'Payments',
    question: 'When is my card charged?',
    answer:
      'For standard bookings, your card is charged in full at the time of booking. A security deposit (authorization hold) is placed by the rental partner at pickup and released within 5–7 business days after return. Pay-at-pickup options are available on selected vehicles.',
  },
  {
    id: 'faq-011',
    category: 'Booking',
    question: 'Can I rent a car for someone else?',
    answer:
      'Yes, you can book on behalf of another driver as long as the primary driver meets all age and license requirements and presents their own documents at pickup. The booking name and payment card do not need to match the driver.',
  },
];
