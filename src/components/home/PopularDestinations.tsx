import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Car, ArrowRight } from 'lucide-react';
import { destinations } from '../../data/destinations';
import SectionHeader from '../shared/SectionHeader';

const PopularDestinations: React.FC = () => {
  return (
    <section className="section bg-white">
      <div className="container-wide">
        <SectionHeader
          badge="Popular Destinations"
          title="Where Do You Want to "
          highlight="Drive Next?"
          subtitle="Explore our most-booked cities and find your perfect rental in minutes."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {destinations.map((dest, i) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="group relative rounded-3xl overflow-hidden cursor-pointer"
              style={{ aspectRatio: '4/3' }}
            >
              {/* Image */}
              <img
                src={dest.image}
                alt={`${dest.city} car rentals`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/90 via-primary-900/30 to-transparent" />

              {/* Top badge */}
              <div className="absolute top-4 left-4">
                <span className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm border border-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                  <Car className="w-3.5 h-3.5" />
                  {dest.carsAvailable.toLocaleString()} cars
                </span>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex items-center gap-1.5 text-white/70 text-xs mb-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {dest.country}
                </div>
                <h3 className="text-white text-xl font-bold mb-2">{dest.city}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-white text-sm">
                    From <span className="font-bold text-accent-400 text-base">${dest.startingPrice}</span>/day
                  </span>
                  <Link
                    to="/cars"
                    className="flex items-center gap-1 text-xs font-semibold text-white bg-white/20 hover:bg-secondary-600 px-3 py-1.5 rounded-xl backdrop-blur-sm transition-all duration-200 group/btn"
                    id={`explore-${dest.city.toLowerCase().replace(' ', '-')}`}
                  >
                    Explore
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularDestinations;
