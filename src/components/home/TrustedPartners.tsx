import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, CheckCircle2, Star, ArrowUpRight } from 'lucide-react';
import SectionHeader from '../shared/SectionHeader';

interface Partner {
  id: string;
  name: string;
  rating: number;
  reviews: string;
  perk: string;
  discount: string;
  logo: React.ReactNode;
  brandColor: string;
}

const partners: Partner[] = [
  {
    id: 'avis',
    name: 'Avis',
    rating: 4.8,
    reviews: '120k+',
    perk: 'Preferred Express Pickup',
    discount: 'Up to 25% Off',
    brandColor: '#D61827',
    logo: (
      <div className="flex items-baseline font-black tracking-tight select-none">
        <span className="text-3xl md:text-4xl text-[#D61827] font-serif font-black tracking-widest uppercase">
          AVIS
        </span>
        <span className="text-xs text-[#D61827] ml-0.5 font-sans font-bold">®</span>
      </div>
    ),
  },
  {
    id: 'budget',
    name: 'Budget',
    rating: 4.7,
    reviews: '95k+',
    perk: 'Pay Now & Save Big',
    discount: 'Up to 30% Off',
    brandColor: '#002855',
    logo: (
      <div className="flex items-center gap-2 select-none">
        <svg className="w-6 h-6 md:w-7 md:h-7" viewBox="0 0 32 32" fill="none">
          <path d="M4 6L28 6L16 26L4 6Z" fill="#FF5E00" />
          <path d="M12 6L28 6L20 19L12 6Z" fill="#D94B00" />
        </svg>
        <span className="text-2xl md:text-3xl font-extrabold text-[#002855] tracking-tight">
          Budget<span className="text-xs text-[#002855] font-normal align-top">®</span>
        </span>
      </div>
    ),
  },
  {
    id: 'hertz',
    name: 'Hertz',
    rating: 4.9,
    reviews: '150k+',
    perk: 'Gold Plus Rewards',
    discount: 'Member Pricing',
    brandColor: '#FFD100',
    logo: (
      <div className="relative inline-block select-none pb-1">
        <span className="text-3xl md:text-4xl font-extrabold italic text-slate-900 tracking-tighter">
          Hertz
        </span>
        <div className="h-1.5 w-full bg-[#FFD100] rounded-full mt-0.5 shadow-sm" />
      </div>
    ),
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    rating: 4.9,
    reviews: '200k+',
    perk: 'We\'ll Pick You Up',
    discount: 'Free Upgrades',
    brandColor: '#008453',
    logo: (
      <div className="flex items-center bg-[#181818] text-white px-3 py-1.5 rounded-lg shadow-sm select-none border border-slate-800">
        <div className="w-6 h-6 bg-[#008453] rounded flex items-center justify-center font-black text-xs mr-2 text-white">
          e
        </div>
        <span className="text-xl md:text-2xl font-bold tracking-tight text-white font-sans">
          enterprise
        </span>
      </div>
    ),
  },
  {
    id: 'dollar',
    name: 'Dollar',
    rating: 4.6,
    reviews: '80k+',
    perk: 'Express Lockers Available',
    discount: 'Best Economy Rates',
    brandColor: '#E31837',
    logo: (
      <div className="flex flex-col items-center select-none leading-none">
        <span className="text-3xl md:text-4xl font-extrabold text-[#E31837] tracking-tighter">
          dollar.
        </span>
        <span className="text-[10px] font-bold text-[#E31837] uppercase tracking-widest mt-0.5">
          Car Rental
        </span>
      </div>
    ),
  },
  {
    id: 'alamo',
    name: 'Alamo',
    rating: 4.8,
    reviews: '110k+',
    perk: 'Accelerated Check-in',
    discount: 'Drive Happy Deals',
    brandColor: '#0033A0',
    logo: (
      <div className="bg-[#0033A0] border-2 border-[#FFD100] px-4 py-1.5 rounded-xl shadow-md select-none">
        <span className="text-2xl md:text-3xl font-black text-[#FFD100] tracking-wide">
          Alamo
        </span>
      </div>
    ),
  },
  {
    id: 'thrifty',
    name: 'Thrifty',
    rating: 4.6,
    reviews: '75k+',
    perk: 'Wild Card Specials',
    discount: 'Save 15% Online',
    brandColor: '#00529B',
    logo: (
      <div className="flex flex-col items-center select-none leading-none">
        <span className="text-2xl md:text-3xl font-black italic text-[#00529B] tracking-tight">
          Thrifty
        </span>
        <span className="text-[9px] font-extrabold text-[#00529B] uppercase tracking-widest mt-1">
          CAR RENTAL
        </span>
      </div>
    ),
  },
  {
    id: 'ace',
    name: 'ACE Rent A Car',
    rating: 4.5,
    reviews: '45k+',
    perk: 'Local Service Experts',
    discount: 'Budget Friendly',
    brandColor: '#002B49',
    logo: (
      <div className="flex flex-col items-center select-none leading-none">
        <div className="relative">
          <span className="text-3xl md:text-4xl font-black italic text-[#002B49] tracking-tighter">
            ACE
          </span>
          <div className="absolute inset-x-0 bottom-1 h-0.5 bg-red-600" />
        </div>
        <span className="text-[9px] font-extrabold text-red-600 uppercase tracking-widest mt-1">
          RENT A CAR
        </span>
      </div>
    ),
  },
  {
    id: 'sixt',
    name: 'SIXT',
    rating: 4.8,
    reviews: '130k+',
    perk: 'Premium & Luxury Fleet',
    discount: 'Special Fleet Offers',
    brandColor: '#FF5F00',
    logo: (
      <div className="bg-[#FF5F00] text-black px-4 py-1.5 rounded-lg font-black text-2xl md:text-3xl tracking-tighter shadow-sm select-none">
        SIXT
      </div>
    ),
  },
];

const TrustedPartners: React.FC = () => {
  return (
    <section className="section bg-white border-b border-border relative overflow-hidden" id="rental-partners">
      {/* Decorative gradient background touches */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-secondary-50/60 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent-50/40 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="container-wide relative z-10">
        <SectionHeader
          badge="Compare & Save"
          title="Compare Prices From The Rental Car Companies "
          highlight="You Trust"
          subtitle="We scan real-time availability across top-tier suppliers worldwide to guarantee you get the best deal every single time."
        />

        {/* 3x3 Responsive Grid matching the screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group relative bg-surface border border-border/80 hover:border-secondary-500/40 rounded-2xl p-6 md:p-8 flex flex-col justify-between items-center text-center transition-all duration-300 hover:shadow-hover hover:-translate-y-1"
            >
              {/* Top rating badge */}
              <div className="w-full flex items-center justify-between text-xs text-muted font-medium mb-4">
                <span className="inline-flex items-center gap-1 bg-white px-2.5 py-1 rounded-full border border-border/60 shadow-2xs">
                  <Star className="w-3.5 h-3.5 text-accent-500 fill-accent-500" />
                  <span className="font-bold text-primary-900">{partner.rating}</span>
                  <span className="text-muted text-[11px]">({partner.reviews})</span>
                </span>
                <span className="text-[11px] font-semibold text-secondary-600 bg-secondary-50 px-2.5 py-1 rounded-full">
                  {partner.discount}
                </span>
              </div>

              {/* Central Logo Container */}
              <div className="h-20 flex items-center justify-center my-2 group-hover:scale-105 transition-transform duration-300">
                {partner.logo}
              </div>

              {/* Bottom Feature & Action link */}
              {/* <div className="w-full pt-4 mt-2 border-t border-border/60 flex items-center justify-between text-xs">
                <span className="text-muted font-medium flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-success-500 shrink-0" />
                  {partner.perk}
                </span>
                <span className="text-secondary-600 font-bold group-hover:translate-x-0.5 transition-transform duration-200 flex items-center gap-0.5">
                  Compare
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div> */}
            </motion.div>
          ))}
        </div>

        {/* Bottom Trust Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-gradient-to-r from-primary-900 via-slate-900 to-primary-900 text-white rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-card"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-secondary-600/20 border border-secondary-400/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-secondary-400" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white">CarRentalDesk Price Match Guarantee</h4>
              <p className="text-sm text-slate-300 mt-0.5">
                Find a lower price for the same vehicle & dates? We'll match it immediately.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-200">
            <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg border border-white/10">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Real-time Live Rates
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg border border-white/10">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Free Cancellation
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg border border-white/10">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              No Hidden Fees
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustedPartners;
