import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, Users, Fuel, Settings, ArrowRight, Heart } from 'lucide-react';
import { cars } from '../../data/cars';
import type { Car } from '../../types';
import SectionHeader from '../shared/SectionHeader';

const categories = ['All', 'Economy', 'SUV', 'Luxury', 'Electric', 'Convertible'];

const CarCard: React.FC<{ car: Car; index: number }> = ({ car, index }) => {
  const [liked, setLiked] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="card group flex flex-col"
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-video rounded-t-3xl">
        <img
          src={car.image}
          alt={car.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="badge badge-dark">{car.category}</span>
          {car.badge && (
            <span className="badge badge-amber">{car.badge}</span>
          )}
        </div>
        {/* Wishlist */}
        <button
          onClick={() => setLiked(!liked)}
          className={`absolute top-3 right-3 w-9 h-9 rounded-xl flex items-center justify-center backdrop-blur-sm transition-all duration-200 ${
            liked ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-500 hover:bg-white'
          }`}
          aria-label="Add to wishlist"
        >
          <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
        </button>
        {/* Availability */}
        {!car.available && (
          <div className="absolute inset-0 bg-primary-900/60 flex items-center justify-center">
            <span className="text-white font-bold text-lg">Unavailable</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-xs text-muted font-medium mb-0.5">{car.brand}</p>
            <h3 className="font-bold text-primary-900 text-lg">{car.name}</h3>
          </div>
          <div className="flex items-center gap-1 bg-accent-50 px-2.5 py-1 rounded-xl">
            <Star className="w-3.5 h-3.5 text-accent-500 fill-accent-500" />
            <span className="text-sm font-bold text-accent-600">{car.rating}</span>
          </div>
        </div>

        {/* Specs Row */}
        <div className="flex items-center gap-4 text-xs text-muted mb-4 py-3 border-y border-border">
          <span className="flex items-center gap-1.5">
            <Settings className="w-3.5 h-3.5" />
            {car.transmission}
          </span>
          <span className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5" />
            {car.seats} seats
          </span>
          <span className="flex items-center gap-1.5">
            <Fuel className="w-3.5 h-3.5" />
            {car.fuel}
          </span>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between mt-auto">
          <div>
            <span className="text-2xl font-extrabold text-primary-900">${car.pricePerDay}</span>
            <span className="text-muted text-xs ml-1">/day</span>
          </div>
          <Link
            to={`/cars/${car.id}`}
            className={`flex items-center gap-1.5 text-sm font-semibold px-4 py-2.5 rounded-xl transition-all duration-200 ${
              car.available
                ? 'bg-secondary-600 text-white hover:bg-secondary-700 hover:shadow-glow'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed pointer-events-none'
            }`}
            id={`book-${car.id}`}
          >
            {car.available ? 'Book Now' : 'Unavailable'}
            {car.available && <ArrowRight className="w-4 h-4" />}
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const FeaturedVehicles: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? cars.slice(0, 8)
    : cars.filter((c) => c.category === activeCategory).slice(0, 8);

  return (
    <section className="section bg-surface">
      <div className="container-wide">
        <SectionHeader
          badge="Featured Vehicles"
          title="Find Your "
          highlight="Perfect Ride"
          subtitle="From budget-friendly economy cars to exotic supercars — every vehicle meticulously maintained and ready for the road."
        />

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              id={`filter-${cat.toLowerCase()}`}
              className={`px-5 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-secondary-600 text-white shadow-glow'
                  : 'bg-white text-gray-600 border border-border hover:border-secondary-200 hover:text-secondary-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cars Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((car, i) => (
              <CarCard key={car.id} car={car} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <Link to="/cars" className="btn-secondary inline-flex" id="view-all-cars">
            View All Vehicles
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedVehicles;
