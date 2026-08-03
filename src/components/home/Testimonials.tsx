import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Star, Quote } from 'lucide-react';
import { testimonials } from '../../data/testimonials';
import SectionHeader from '../shared/SectionHeader';

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        className={`w-4 h-4 ${star <= rating ? 'text-accent-500 fill-accent-500' : 'text-gray-200 fill-gray-200'}`}
      />
    ))}
  </div>
);

const Testimonials: React.FC = () => {
  return (
    <section className="section bg-white overflow-hidden">
      <div className="container-wide">
        <SectionHeader
          badge="Customer Stories"
          title="Trusted by Millions of "
          highlight="Happy Travelers"
          subtitle="Don't take our word for it  here's what our community of drivers has to say."
        />

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1.5 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          pagination={{ clickable: true, dynamicBullets: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          className="pb-14"
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t.id}>
              <div className="card p-7 h-full flex flex-col hover:border-secondary-100 relative">
                {/* Quote icon */}
                <Quote className="w-10 h-10 text-secondary-100 fill-secondary-100 mb-4 flex-shrink-0" />

                {/* Review */}
                <p className="text-gray-700 text-sm leading-relaxed flex-1 mb-6 line-clamp-5">"{t.review}"</p>

                {/* Footer */}
                <div>
                  <StarRating rating={t.rating} />
                  <div className="flex items-center gap-3 mt-4">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-12 h-12 rounded-2xl object-cover"
                    />
                    <div>
                      <p className="font-bold text-primary-900 text-sm">{t.name}</p>
                      <p className="text-muted text-xs">{t.country} · {t.date}</p>
                    </div>
                    <span className="ml-auto badge badge-blue text-[10px]">{t.tripType}</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
