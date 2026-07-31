import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Users, Fuel, Settings, ArrowRight, Heart, MapPin, CheckCircle, ChevronLeft, Calendar, Shield, Zap } from 'lucide-react';
import { cars } from '../data/cars';
import { testimonials } from '../data/testimonials';

const CarDetailPage: React.FC = () => {
  const { id } = useParams();
  const car = cars.find((c) => c.id === id);
  const [activeImage, setActiveImage] = useState(0);
  const [liked, setLiked] = useState(false);
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  if (!car) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-surface pt-20">
        <h2 className="text-2xl font-bold text-primary-900 mb-4">Vehicle Not Found</h2>
        <Link to="/cars" className="btn-primary">Back to Cars</Link>
      </div>
    );
  }

  const days = pickupDate && returnDate
    ? Math.max(1, Math.ceil((new Date(returnDate).getTime() - new Date(pickupDate).getTime()) / (1000 * 60 * 60 * 24)))
    : 1;
  const total = days * car.pricePerDay;

  const relatedCars = cars.filter((c) => c.id !== car.id && c.category === car.category).slice(0, 3);

  return (
    <main className="min-h-screen bg-surface pt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted mb-8">
          <Link to="/" className="hover:text-secondary-600 transition-colors">Home</Link>
          <ChevronLeft className="w-3.5 h-3.5 rotate-180" />
          <Link to="/cars" className="hover:text-secondary-600 transition-colors">Cars</Link>
          <ChevronLeft className="w-3.5 h-3.5 rotate-180" />
          <span className="text-primary-900 font-medium">{car.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left: Gallery + Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Gallery */}
            <div className="card overflow-hidden">
              <div className="relative aspect-video">
                <img
                  src={car.images[activeImage]}
                  alt={car.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setLiked(!liked)}
                  className={`absolute top-4 right-4 w-11 h-11 rounded-2xl flex items-center justify-center backdrop-blur-sm transition-all ${liked ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-500'}`}
                >
                  <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
                </button>
                {car.badge && (
                  <div className="absolute top-4 left-4">
                    <span className="badge badge-amber text-xs">{car.badge}</span>
                  </div>
                )}
              </div>
              {car.images.length > 1 && (
                <div className="flex gap-3 p-4">
                  {car.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`w-20 h-16 rounded-xl overflow-hidden border-2 transition-all ${activeImage === i ? 'border-secondary-600' : 'border-transparent'}`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Overview */}
            <div className="card p-7">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="badge badge-blue">{car.category}</span>
                    <span className={`badge ${car.available ? 'badge-green' : 'bg-red-50 text-red-500'}`}>
                      {car.available ? 'Available' : 'Unavailable'}
                    </span>
                  </div>
                  <p className="text-muted text-sm">{car.brand}</p>
                  <h1 className="text-3xl font-extrabold text-primary-900">{car.name}</h1>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 justify-end mb-1">
                    <Star className="w-5 h-5 text-accent-500 fill-accent-500" />
                    <span className="font-extrabold text-xl text-primary-900">{car.rating}</span>
                  </div>
                  <p className="text-muted text-xs">{car.reviewCount} reviews</p>
                </div>
              </div>

              {/* Quick Specs */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                  { icon: Settings, label: 'Transmission', value: car.transmission },
                  { icon: Users, label: 'Seats', value: `${car.seats} passengers` },
                  { icon: Fuel, label: 'Fuel', value: car.fuel },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="bg-surface rounded-2xl p-4 text-center">
                    <Icon className="w-5 h-5 text-secondary-600 mx-auto mb-2" />
                    <p className="text-xs text-muted mb-0.5">{label}</p>
                    <p className="font-bold text-primary-900 text-sm">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Specifications */}
            <div className="card p-7">
              <h2 className="text-xl font-bold text-primary-900 mb-5">Technical Specifications</h2>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(car.specs).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                    <span className="text-muted text-sm capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                    <span className="font-bold text-primary-900 text-sm">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="card p-7">
              <h2 className="text-xl font-bold text-primary-900 mb-5">Included Features</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {car.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-success-500 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews Preview */}
            <div className="card p-7">
              <h2 className="text-xl font-bold text-primary-900 mb-5">Recent Reviews</h2>
              <div className="space-y-5">
                {testimonials.slice(0, 2).map((t) => (
                  <div key={t.id} className="flex gap-4 pb-5 border-b border-border last:border-0 last:pb-0">
                    <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-2xl object-cover flex-shrink-0" />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-primary-900 text-sm">{t.name}</span>
                        <div className="flex gap-0.5">
                          {[...Array(t.rating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 text-accent-500 fill-accent-500" />
                          ))}
                        </div>
                      </div>
                      <p className="text-muted text-sm leading-relaxed">"{t.review.slice(0, 120)}..."</p>
                      <p className="text-xs text-gray-400 mt-1">{t.date} · {t.country}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Cars */}
            {relatedCars.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-primary-900 mb-5">Similar Vehicles</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {relatedCars.map((rc) => (
                    <Link key={rc.id} to={`/cars/${rc.id}`} className="card p-4 group hover:border-secondary-200">
                      <img src={rc.image} alt={rc.name} className="w-full aspect-video object-cover rounded-2xl mb-3 group-hover:scale-105 transition-transform duration-300" />
                      <p className="font-bold text-sm text-primary-900">{rc.name}</p>
                      <p className="text-secondary-600 font-extrabold text-sm">${rc.pricePerDay}/day</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Sticky Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="card p-6">
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-extrabold text-primary-900">${car.pricePerDay}</span>
                  <span className="text-muted text-sm">/day</span>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                      <Calendar className="w-3.5 h-3.5 inline mr-1" /> Pickup Date
                    </label>
                    <input
                      type="date"
                      id="detail-pickup-date"
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                      <Calendar className="w-3.5 h-3.5 inline mr-1" /> Return Date
                    </label>
                    <input
                      type="date"
                      id="detail-return-date"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      min={pickupDate || new Date().toISOString().split('T')[0]}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                      <MapPin className="w-3.5 h-3.5 inline mr-1" /> Pickup Location
                    </label>
                    <input
                      type="text"
                      id="detail-pickup-location"
                      placeholder="Enter city or airport"
                      className="input-field"
                    />
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="bg-surface rounded-2xl p-4 mb-6 space-y-2 text-sm">
                  <div className="flex justify-between text-muted">
                    <span>${car.pricePerDay} × {days} day{days > 1 ? 's' : ''}</span>
                    <span>${car.pricePerDay * days}</span>
                  </div>
                  <div className="flex justify-between text-muted">
                    <span>Taxes & fees</span>
                    <span>${Math.round(total * 0.12)}</span>
                  </div>
                  <div className="h-px bg-border" />
                  <div className="flex justify-between font-extrabold text-primary-900 text-base">
                    <span>Total</span>
                    <span>${total + Math.round(total * 0.12)}</span>
                  </div>
                </div>

                <button
                  className="btn-primary w-full py-4 text-base font-bold mb-3"
                  id="detail-book-now"
                  disabled={!car.available}
                >
                  {car.available ? 'Reserve This Vehicle' : 'Currently Unavailable'}
                  {car.available && <ArrowRight className="w-5 h-5" />}
                </button>

                <div className="flex items-center gap-2 justify-center text-xs text-muted mb-4">
                  <Shield className="w-3.5 h-3.5 text-success-500" />
                  Free cancellation · No hidden fees
                </div>

                <div className="border-t border-border pt-4 space-y-2">
                  {[
                    { icon: Zap, text: 'Instant confirmation via email' },
                    { icon: Shield, text: 'Basic CDW insurance included' },
                    { icon: CheckCircle, text: 'Verified, rated partner' },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-2 text-xs text-muted">
                      <Icon className="w-3.5 h-3.5 text-success-500 flex-shrink-0" />
                      {text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CarDetailPage;
