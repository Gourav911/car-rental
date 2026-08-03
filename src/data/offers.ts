import type { Offer } from '../types';

export const offers: Offer[] = [
  {
    id: 'offer-001',
    title: 'Weekend Escape',
    description: 'Book any vehicle Friday to Sunday and save 25% on your total rental. Perfect for quick getaways and city explorations.',
    discount: '25% OFF',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&q=80',
    badge: 'Most Popular',
    validUntil: '2026-12-31',
    code: 'WEEKEND25',
  },
  {
    id: 'offer-002',
    title: 'Monthly Long-Stay',
    description: 'Renting for 28+ days? Enjoy our best monthly rate with free unlimited mileage and one driver addition at no cost.',
    discount: '40% OFF',
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&q=80',
    badge: 'Best Value',
    validUntil: '2026-12-31',
    code: 'MONTHLY40',
  },
  {
    id: 'offer-003',
    title: 'Airport Express',
    description: 'Fly in and drive off. Book airport pickup 48 hours in advance and we waive the pickup surcharge  a saving of up to $35.',
    discount: 'FREE PICKUP',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&q=80',
    badge: 'New Offer',
    validUntil: '2026-09-30',
    code: 'AIRPORT25',
  },
  {
    id: 'offer-004',
    title: 'Corporate Fleet',
    description: 'Exclusive pricing for businesses booking 3+ vehicles. Includes priority support, consolidated billing, and 24/7 fleet management.',
    discount: '30% OFF',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80',
    badge: 'Enterprise',
    validUntil: '2026-12-31',
    code: 'CORP30',
  },
];
