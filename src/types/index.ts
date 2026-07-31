export interface Car {
  id: string;
  name: string;
  brand: string;
  category: 'Economy' | 'SUV' | 'Luxury' | 'Electric' | 'Convertible' | 'Van';
  image: string;
  images: string[];
  transmission: 'Automatic' | 'Manual';
  seats: number;
  fuel: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid';
  pricePerDay: number;
  rating: number;
  reviewCount: number;
  features: string[];
  specs: {
    engine: string;
    power: string;
    acceleration: string;
    topSpeed: string;
    range?: string;
  };
  available: boolean;
  badge?: string;
}

export interface Destination {
  id: string;
  city: string;
  country: string;
  image: string;
  carsAvailable: number;
  startingPrice: number;
  popular: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  country: string;
  avatar: string;
  rating: number;
  review: string;
  date: string;
  tripType: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: 'Booking' | 'Insurance' | 'Cancellation' | 'License' | 'Payments';
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  discount: string;
  image: string;
  badge: string;
  validUntil: string;
  code: string;
}

export interface BookingFormData {
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: string;
  returnDate: string;
  driverAge: string;
  vehicleType: string;
}
