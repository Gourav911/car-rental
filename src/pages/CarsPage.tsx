import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, SlidersHorizontal, Grid3X3, List, Star, Users, Fuel, Settings, ArrowRight, Heart, ChevronDown } from 'lucide-react';
import { cars } from '../data/cars';
import type { Car } from '../types';

const brands = ['All', 'BMW', 'Tesla', 'Toyota', 'Land Rover', 'Porsche', 'Mercedes-Benz', 'Volkswagen', 'Audi', 'Lamborghini', 'Ferrari', 'Honda'];
const categories = ['All', 'Economy', 'SUV', 'Luxury', 'Electric', 'Convertible', 'Van'];
const fuelTypes = ['All', 'Petrol', 'Diesel', 'Electric', 'Hybrid'];
const transmissions = ['All', 'Automatic', 'Manual'];
const sortOptions = [
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'rating_desc', label: 'Top Rated' },
  { value: 'name_asc', label: 'Name A–Z' },
];

const CarCard: React.FC<{ car: Car; layout: 'grid' | 'list' }> = ({ car, layout }) => {
  const [liked, setLiked] = useState(false);

  if (layout === 'list') {
    return (
      <div className="card flex flex-col sm:flex-row gap-0 overflow-hidden hover:shadow-hover transition-all">
        <div className="relative sm:w-64 lg:w-80 flex-shrink-0">
          <img src={car.image} alt={car.name} className="w-full h-48 sm:h-full object-cover" />
          <div className="absolute top-3 left-3 flex gap-2">
            <span className="badge badge-dark">{car.category}</span>
            {car.badge && <span className="badge badge-amber">{car.badge}</span>}
          </div>
        </div>
        <div className="p-6 flex flex-col flex-1">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-xs text-muted font-medium">{car.brand}</p>
              <h3 className="font-bold text-primary-900 text-xl">{car.name}</h3>
            </div>
            <div className="flex items-center gap-1 bg-accent-50 px-2.5 py-1 rounded-xl">
              <Star className="w-3.5 h-3.5 text-accent-500 fill-accent-500" />
              <span className="text-sm font-bold text-accent-600">{car.rating}</span>
              <span className="text-xs text-muted">({car.reviewCount})</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 text-xs text-muted mb-4">
            <span className="flex items-center gap-1.5"><Settings className="w-3.5 h-3.5" /> {car.transmission}</span>
            <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> {car.seats} seats</span>
            <span className="flex items-center gap-1.5"><Fuel className="w-3.5 h-3.5" /> {car.fuel}</span>
          </div>
          <div className="flex flex-wrap gap-2 mb-5">
            {car.features.slice(0, 4).map((f) => (
              <span key={f} className="text-xs bg-gray-50 border border-border px-2.5 py-1 rounded-lg text-gray-600">{f}</span>
            ))}
          </div>
          <div className="flex items-center justify-between mt-auto">
            <div>
              <span className="text-3xl font-extrabold text-primary-900">${car.pricePerDay}</span>
              <span className="text-muted text-xs ml-1">/day</span>
            </div>
            <Link to={`/cars/${car.id}`} className="btn-primary py-2.5 px-6 text-sm">
              View Details <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card group flex flex-col">
      <div className="relative overflow-hidden aspect-video rounded-t-3xl">
        <img src={car.image} alt={car.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="badge badge-dark">{car.category}</span>
          {car.badge && <span className="badge badge-amber">{car.badge}</span>}
        </div>
        <button
          onClick={() => setLiked(!liked)}
          className={`absolute top-3 right-3 w-9 h-9 rounded-xl flex items-center justify-center backdrop-blur-sm transition-all duration-200 ${liked ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-500 hover:bg-white'}`}
        >
          <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
        </button>
      </div>
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
        <div className="flex items-center gap-4 text-xs text-muted mb-4 py-3 border-y border-border">
          <span className="flex items-center gap-1.5"><Settings className="w-3.5 h-3.5" /> {car.transmission}</span>
          <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> {car.seats} seats</span>
          <span className="flex items-center gap-1.5"><Fuel className="w-3.5 h-3.5" /> {car.fuel}</span>
        </div>
        <div className="flex items-center justify-between mt-auto">
          <div>
            <span className="text-2xl font-extrabold text-primary-900">${car.pricePerDay}</span>
            <span className="text-muted text-xs ml-1">/day</span>
          </div>
          <Link to={`/cars/${car.id}`} className="flex items-center gap-1.5 text-sm font-semibold px-4 py-2.5 rounded-xl bg-secondary-600 text-white hover:bg-secondary-700 transition-all duration-200">
            Book Now <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

const CarsPage: React.FC = () => {
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    brand: 'All', category: 'All', fuel: 'All', transmission: 'All',
    minPrice: 0, maxPrice: 1000,
  });
  const [sort, setSort] = useState('price_asc');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [page, setPage] = useState(1);
  const perPage = 6;

  const filtered = useMemo(() => {
    let result = [...cars];
    if (search) result = result.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.brand.toLowerCase().includes(search.toLowerCase()));
    if (filters.brand !== 'All') result = result.filter((c) => c.brand === filters.brand);
    if (filters.category !== 'All') result = result.filter((c) => c.category === filters.category);
    if (filters.fuel !== 'All') result = result.filter((c) => c.fuel === filters.fuel);
    if (filters.transmission !== 'All') result = result.filter((c) => c.transmission === filters.transmission);
    result = result.filter((c) => c.pricePerDay >= filters.minPrice && c.pricePerDay <= filters.maxPrice);
    switch (sort) {
      case 'price_asc': result.sort((a, b) => a.pricePerDay - b.pricePerDay); break;
      case 'price_desc': result.sort((a, b) => b.pricePerDay - a.pricePerDay); break;
      case 'rating_desc': result.sort((a, b) => b.rating - a.rating); break;
      case 'name_asc': result.sort((a, b) => a.name.localeCompare(b.name)); break;
    }
    return result;
  }, [search, filters, sort]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const setFilter = (key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  };

  const FilterSelect: React.FC<{ label: string; value: string; options: string[]; filterKey: string }> = ({ label, value, options, filterKey }) => (
    <div className="mb-5">
      <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">{label}</label>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => setFilter(filterKey, opt)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${value === opt ? 'bg-secondary-600 text-white border-secondary-600' : 'bg-white text-gray-600 border-border hover:border-secondary-300'}`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-surface pt-20">
      {/* Page Header */}
      <div className="bg-gradient-hero py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3">Browse All Vehicles</h1>
          <p className="text-blue-100">Find the perfect car from our curated fleet of {cars.length}+ vehicles worldwide.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              id="cars-search"
              placeholder="Search by name or brand..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="input-field pl-10"
            />
          </div>
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm border transition-all ${filtersOpen ? 'bg-secondary-600 text-white border-secondary-600' : 'bg-white text-gray-700 border-border hover:border-secondary-300'}`}
            id="toggle-filters"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => { setSort(e.target.value); setPage(1); }}
              className="input-field pr-8 appearance-none"
              id="cars-sort"
            >
              {sortOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
          <div className="flex border border-border rounded-xl overflow-hidden bg-white">
            <button
              onClick={() => setLayout('grid')}
              className={`p-3 transition-colors ${layout === 'grid' ? 'bg-secondary-600 text-white' : 'text-gray-500 hover:bg-gray-50'}`}
              id="layout-grid"
              aria-label="Grid view"
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setLayout('list')}
              className={`p-3 transition-colors ${layout === 'list' ? 'bg-secondary-600 text-white' : 'text-gray-500 hover:bg-gray-50'}`}
              id="layout-list"
              aria-label="List view"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Expanded Filters */}
        {filtersOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white border border-border rounded-2xl p-6 mb-8"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <FilterSelect label="Brand" value={filters.brand} options={brands} filterKey="brand" />
              <FilterSelect label="Category" value={filters.category} options={categories} filterKey="category" />
              <FilterSelect label="Fuel Type" value={filters.fuel} options={fuelTypes} filterKey="fuel" />
              <FilterSelect label="Transmission" value={filters.transmission} options={transmissions} filterKey="transmission" />
            </div>
            <div className="mb-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
                Price Range: <span className="text-secondary-600">${filters.minPrice} – ${filters.maxPrice}</span>/day
              </label>
              <input
                type="range"
                min={0}
                max={1000}
                value={filters.maxPrice}
                onChange={(e) => setFilter('maxPrice', Number(e.target.value))}
                className="w-full accent-secondary-600"
                id="price-range"
              />
            </div>
            <button
              onClick={() => { setFilters({ brand: 'All', category: 'All', fuel: 'All', transmission: 'All', minPrice: 0, maxPrice: 1000 }); setSearch(''); setPage(1); }}
              className="text-sm text-secondary-600 hover:underline font-semibold"
            >
              Reset all filters
            </button>
          </motion.div>
        )}

        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-muted">
            Showing <span className="font-bold text-primary-900">{paginated.length}</span> of{' '}
            <span className="font-bold text-primary-900">{filtered.length}</span> vehicles
          </p>
        </div>

        {/* Car Grid/List */}
        {paginated.length > 0 ? (
          <div className={layout === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
            {paginated.map((car, i) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <CarCard car={car} layout={layout} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-2xl font-bold text-gray-300 mb-2">No vehicles found</p>
            <p className="text-muted text-sm">Try adjusting your filters or search query.</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 rounded-xl border border-border text-sm font-medium disabled:opacity-40 hover:border-secondary-300 transition-colors"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${page === p ? 'bg-secondary-600 text-white' : 'border border-border hover:border-secondary-300 text-gray-600'}`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 rounded-xl border border-border text-sm font-medium disabled:opacity-40 hover:border-secondary-300 transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default CarsPage;
