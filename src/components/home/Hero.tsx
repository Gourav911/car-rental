import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Users, Car, Search, ChevronDown, ArrowRight } from 'lucide-react';

const vehicleTypes = ['Any Type', 'Economy', 'SUV', 'Luxury', 'Electric', 'Convertible', 'Van'];
const popularCities = ['Dubai', 'London', 'New York', 'Paris', 'Tokyo', 'Los Angeles', 'Sydney', 'Singapore'];

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    pickupLocation: '',
    dropoffLocation: '',
    pickupDate: '',
    returnDate: '',
    driverAge: '25+',
    vehicleType: 'Any Type',
  });
  const [sameLocation, setSameLocation] = useState(true);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/cars');
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

        {/* Booking Widget */}
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

          <form onSubmit={handleSearch}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Pickup Location */}
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
                    required
                  />
                  <datalist id="pickup-cities">
                    {popularCities.map((city) => <option key={city} value={city} />)}
                  </datalist>
                </div>
              </div>

              {/* Dropoff Location */}
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
                    />
                    <datalist id="dropoff-cities">
                      {popularCities.map((city) => <option key={city} value={city} />)}
                    </datalist>
                  </div>
                </div>
              )}

              {/* Pickup Date */}
              <div>
                <label className="block text-white/70 text-xs font-semibold uppercase tracking-wider mb-2">
                  Pickup Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-400 pointer-events-none" />
                  <input
                    type="date"
                    id="hero-pickup-date"
                    value={form.pickupDate}
                    onChange={(e) => setForm({ ...form, pickupDate: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full bg-white/10 border border-white/20 rounded-xl pl-10 pr-4 py-3.5 text-white text-sm focus:outline-none focus:border-secondary-400 focus:bg-white/15 transition-all [color-scheme:dark]"
                    required
                  />
                </div>
              </div>

              {/* Return Date */}
              <div>
                <label className="block text-white/70 text-xs font-semibold uppercase tracking-wider mb-2">
                  Return Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-accent-400 pointer-events-none" />
                  <input
                    type="date"
                    id="hero-return-date"
                    value={form.returnDate}
                    onChange={(e) => setForm({ ...form, returnDate: e.target.value })}
                    min={form.pickupDate || new Date().toISOString().split('T')[0]}
                    className="w-full bg-white/10 border border-white/20 rounded-xl pl-10 pr-4 py-3.5 text-white text-sm focus:outline-none focus:border-accent-400 focus:bg-white/15 transition-all [color-scheme:dark]"
                    required
                  />
                </div>
              </div>

              {/* Driver Age */}
              <div>
                <label className="block text-white/70 text-xs font-semibold uppercase tracking-wider mb-2">
                  Driver Age
                </label>
                <div className="relative">
                  <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-400 pointer-events-none" />
                  <select
                    id="hero-driver-age"
                    value={form.driverAge}
                    onChange={(e) => setForm({ ...form, driverAge: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-xl pl-10 pr-8 py-3.5 text-white text-sm focus:outline-none focus:border-secondary-400 focus:bg-white/15 transition-all appearance-none [color-scheme:dark]"
                  >
                    <option value="18-20">18–20 years</option>
                    <option value="21-24">21–24 years</option>
                    <option value="25+">25+ years</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
                </div>
              </div>

              {/* Vehicle Type */}
              <div>
                <label className="block text-white/70 text-xs font-semibold uppercase tracking-wider mb-2">
                  Vehicle Type
                </label>
                <div className="relative">
                  <Car className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-400 pointer-events-none" />
                  <select
                    id="hero-vehicle-type"
                    value={form.vehicleType}
                    onChange={(e) => setForm({ ...form, vehicleType: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-xl pl-10 pr-8 py-3.5 text-white text-sm focus:outline-none focus:border-secondary-400 focus:bg-white/15 transition-all appearance-none [color-scheme:dark]"
                  >
                    {vehicleTypes.map((v) => <option key={v} value={v}>{v}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Search Button */}
            <div className="mt-6">
              <button
                type="submit"
                id="hero-search-btn"
                className="w-full md:w-auto btn-accent text-base py-4 px-12 gap-3 font-bold"
              >
                <Search className="w-5 h-5" />
                Search Available Cars
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
