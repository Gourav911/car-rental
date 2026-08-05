import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Clock, User, Phone, Mail, Car, Search, ChevronDown, ArrowRight, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { submitBookingToGoogleSheets } from '../../services/googleSheets';

const vehicleTypes = ['Any Type', 'Economy', 'SUV', 'Luxury', 'Electric', 'Convertible', 'Van'];
const popularCities = ['Dubai', 'London', 'New York', 'Paris', 'Tokyo', 'Los Angeles', 'Sydney', 'Singapore'];

const Hero: React.FC = () => {
  const [form, setForm] = useState({
    vehicleType: 'Any Type',
    pickupLocation: '',
    dropoffLocation: '',
    pickupDate: '',
    pickupTime: '10:00',
    returnDate: '',
    returnTime: '10:00',
    customerName: '',
    phone: '',
    email: '',
  });
  const [sameLocation, setSameLocation] = useState(true);

  // Form submission state
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    // Validation rules
    if (!form.pickupLocation.trim()) {
      setErrorMessage('Pickup Location is required.');
      return;
    }
    if (!form.pickupDate) {
      setErrorMessage('Pickup Date is required.');
      return;
    }
    if (!form.returnDate) {
      setErrorMessage('Return Date is required.');
      return;
    }
    if (new Date(form.returnDate) < new Date(form.pickupDate)) {
      setErrorMessage('Return Date must not be earlier than Pickup Date.');
      return;
    }
    if (!form.customerName.trim()) {
      setErrorMessage('Driver Name is required.');
      return;
    }
    if (!form.phone.trim() && !form.email.trim()) {
      setErrorMessage('Please provide at least a Phone number or Email so we can reach you.');
      return;
    }

    setLoading(true);

    try {
      const returnType = sameLocation ? 'Same Location' : 'Different Location';
      const contactInfo = [form.phone.trim(), form.email.trim()].filter(Boolean).join(' / ');

      const response = await submitBookingToGoogleSheets({
        vehicleType: form.vehicleType,
        pickupLocation: form.pickupLocation,
        pickupDate: form.pickupDate,
        pickupTime: form.pickupTime,
        dropoffLocation: !sameLocation ? form.dropoffLocation : form.pickupLocation,
        returnDate: form.returnDate,
        returnTime: form.returnTime,
        returnType: returnType,
        customerName: form.customerName,
        phone: form.phone,
        email: form.email,
        contactInfo: contactInfo,
      });

      if (response.success) {
        setSuccessMessage(response.message || 'Thank you! Your request has been received. Our team will contact you shortly.');
        // Clear form on success
        setForm({
          vehicleType: 'Any Type',
          pickupLocation: '',
          dropoffLocation: '',
          pickupDate: '',
          pickupTime: '10:00',
          returnDate: '',
          returnTime: '10:00',
          customerName: '',
          phone: '',
          email: '',
        });
      } else {
        setErrorMessage(response.message || 'Failed to submit request.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An error occurred while submitting your request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&q=85"
          alt="Luxury car hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/95 via-primary-900/80 to-primary-900/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 via-transparent to-transparent" />
      </div>

      {/* Decorative circles */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-secondary-600/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-64 h-64 rounded-full bg-accent-500/10 blur-2xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 pt-28 pb-16 w-full">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-semibold px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-success-500 animate-pulse" />
              600+ Cities · 25,000+ Vehicles · Instant Confirmation
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-[1.1] mb-6"
          >
            Rent the{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent-500 to-yellow-300">
              Perfect Car
            </span>
            <br />
            Anywhere You Travel
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-blue-100 leading-relaxed mb-10 max-w-2xl"
          >
            Compare prices from trusted rental companies worldwide and reserve your ride in minutes. No hidden fees. No surprises.
          </motion.p>

          {/* Trust pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-3 mb-12"
          >
            {['Free Cancellation', 'Best Price Guarantee', '24/7 Support', 'Verified Partners'].map((pill) => (
              <span key={pill} className="flex items-center gap-1.5 bg-white/10 text-white text-xs font-medium px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10">
                <span className="text-success-500">✓</span> {pill}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Booking Lead Widget */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 md:p-8 max-w-5xl"
        >
          {/* Same/different location toggle */}
          <div className="flex items-center gap-4 mb-6">
            <button
              type="button"
              onClick={() => setSameLocation(true)}
              className={`text-sm font-semibold pb-1 border-b-2 transition-all ${
                sameLocation ? 'border-accent-500 text-white' : 'border-transparent text-blue-300 hover:text-white'
              }`}
            >
              Return to same location
            </button>
            <button
              type="button"
              onClick={() => setSameLocation(false)}
              className={`text-sm font-semibold pb-1 border-b-2 transition-all ${
                !sameLocation ? 'border-accent-500 text-white' : 'border-transparent text-blue-300 hover:text-white'
              }`}
            >
              Return to different location
            </button>
          </div>

          {/* Feedback messages */}
          {successMessage && (
            <div className="mb-4 p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 text-sm flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {errorMessage && (
            <div className="mb-4 p-4 rounded-xl bg-red-500/20 border border-red-500/40 text-red-200 text-sm flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSearch}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              
              {/* 1. Car Type / Vehicle Name */}
              <div className="relative">
                <label className="block text-white/70 text-xs font-semibold uppercase tracking-wider mb-2">
                  Car Type / Vehicle Name
                </label>
                <div className="relative">
                  <Car className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-400 pointer-events-none" />
                  <select
                    id="hero-vehicle-type"
                    value={form.vehicleType}
                    onChange={(e) => setForm({ ...form, vehicleType: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-xl pl-10 pr-8 py-3.5 text-white text-sm focus:outline-none focus:border-secondary-400 focus:bg-white/15 transition-all appearance-none [color-scheme:dark]"
                    disabled={loading}
                  >
                    {vehicleTypes.map((v) => <option key={v} value={v} className="bg-slate-900 text-white py-2">{v}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
                </div>
              </div>

              {/* 2. Driver Name */}
              <div className="relative">
                <label className="block text-white/70 text-xs font-semibold uppercase tracking-wider mb-2">
                  <span className="text-amber-400 mr-1">*</span>Driver Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-400" />
                  <input
                    type="text"
                    id="hero-driver-name"
                    placeholder="Full name"
                    value={form.customerName}
                    onChange={(e) => setForm({ ...form, customerName: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-xl pl-10 pr-4 py-3.5 text-white placeholder-white/40 text-sm focus:outline-none focus:border-secondary-400 focus:bg-white/15 transition-all"
                    disabled={loading}
                    required
                  />
                </div>
              </div>

              {/* 3. Phone Number */}
              <div className="relative">
                <label className="block text-white/70 text-xs font-semibold uppercase tracking-wider mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-400" />
                  <input
                    type="tel"
                    id="hero-phone"
                    placeholder="+1 (555) 000-0000"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-xl pl-10 pr-4 py-3.5 text-white placeholder-white/40 text-sm focus:outline-none focus:border-secondary-400 focus:bg-white/15 transition-all"
                    disabled={loading}
                  />
                </div>
              </div>

              {/* 4. Email Address */}
              <div className="relative">
                <label className="block text-white/70 text-xs font-semibold uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-400" />
                  <input
                    type="email"
                    id="hero-email"
                    placeholder="name@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-xl pl-10 pr-4 py-3.5 text-white placeholder-white/40 text-sm focus:outline-none focus:border-secondary-400 focus:bg-white/15 transition-all"
                    disabled={loading}
                  />
                </div>
              </div>

              {/* 5. Pickup Location */}
              <div className="relative">
                <label className="block text-white/70 text-xs font-semibold uppercase tracking-wider mb-2">
                  Pickup Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-400" />
                  <input
                    type="text"
                    list="pickup-cities"
                    id="hero-pickup-location"
                    placeholder="City or airport"
                    value={form.pickupLocation}
                    onChange={(e) => setForm({ ...form, pickupLocation: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-xl pl-10 pr-4 py-3.5 text-white placeholder-white/40 text-sm focus:outline-none focus:border-secondary-400 focus:bg-white/15 transition-all"
                    disabled={loading}
                    required
                  />
                  <datalist id="pickup-cities">
                    {popularCities.map((city) => <option key={city} value={city} />)}
                  </datalist>
                </div>
              </div>

              {/* Drop-off Location (If different location selected) */}
              {!sameLocation && (
                <div className="relative">
                  <label className="block text-white/70 text-xs font-semibold uppercase tracking-wider mb-2">
                    Drop-off Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-accent-400" />
                    <input
                      type="text"
                      list="dropoff-cities"
                      id="hero-dropoff-location"
                      placeholder="City or airport"
                      value={form.dropoffLocation}
                      onChange={(e) => setForm({ ...form, dropoffLocation: e.target.value })}
                      className="w-full bg-white/10 border border-white/20 rounded-xl pl-10 pr-4 py-3.5 text-white placeholder-white/40 text-sm focus:outline-none focus:border-accent-400 focus:bg-white/15 transition-all"
                      disabled={loading}
                    />
                    <datalist id="dropoff-cities">
                      {popularCities.map((city) => <option key={city} value={city} />)}
                    </datalist>
                  </div>
                </div>
              )}

              {/* 6. Pick-up Date & Time */}
              <div>
                <label className="block text-white/70 text-xs font-semibold uppercase tracking-wider mb-2">
                  Pick-up Date & Time
                </label>
                <div className="grid grid-cols-5 gap-2">
                  <div className="col-span-3 relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-400 pointer-events-none" />
                    <input
                      type="date"
                      id="hero-pickup-date"
                      value={form.pickupDate}
                      onChange={(e) => setForm({ ...form, pickupDate: e.target.value })}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full bg-white/10 border border-white/20 rounded-xl pl-9 pr-2 py-3.5 text-white text-xs sm:text-sm focus:outline-none focus:border-secondary-400 focus:bg-white/15 transition-all [color-scheme:dark]"
                      disabled={loading}
                      required
                    />
                  </div>
                  <div className="col-span-2 relative">
                    <Clock className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-secondary-400 pointer-events-none" />
                    <input
                      type="time"
                      id="hero-pickup-time"
                      value={form.pickupTime}
                      onChange={(e) => setForm({ ...form, pickupTime: e.target.value })}
                      className="w-full bg-white/10 border border-white/20 rounded-xl pl-7 pr-1 py-3.5 text-white text-xs focus:outline-none focus:border-secondary-400 focus:bg-white/15 transition-all [color-scheme:dark]"
                      disabled={loading}
                    />
                  </div>
                </div>
              </div>

              {/* 7. Drop-off Date & Time */}
              <div>
                <label className="block text-white/70 text-xs font-semibold uppercase tracking-wider mb-2">
                  Drop-off Date & Time
                </label>
                <div className="grid grid-cols-5 gap-2">
                  <div className="col-span-3 relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-accent-400 pointer-events-none" />
                    <input
                      type="date"
                      id="hero-return-date"
                      value={form.returnDate}
                      onChange={(e) => setForm({ ...form, returnDate: e.target.value })}
                      min={form.pickupDate || new Date().toISOString().split('T')[0]}
                      className="w-full bg-white/10 border border-white/20 rounded-xl pl-9 pr-2 py-3.5 text-white text-xs sm:text-sm focus:outline-none focus:border-accent-400 focus:bg-white/15 transition-all [color-scheme:dark]"
                      disabled={loading}
                      required
                    />
                  </div>
                  <div className="col-span-2 relative">
                    <Clock className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-accent-400 pointer-events-none" />
                    <input
                      type="time"
                      id="hero-return-time"
                      value={form.returnTime}
                      onChange={(e) => setForm({ ...form, returnTime: e.target.value })}
                      className="w-full bg-white/10 border border-white/20 rounded-xl pl-7 pr-1 py-3.5 text-white text-xs focus:outline-none focus:border-accent-400 focus:bg-white/15 transition-all [color-scheme:dark]"
                      disabled={loading}
                    />
                  </div>
                </div>
              </div>

            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <button
                type="submit"
                id="hero-search-btn"
                disabled={loading}
                className="w-full md:w-auto btn-accent text-base py-4 px-12 gap-3 font-bold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Submitting Request...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    Get Instant Quote & Reserve
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
