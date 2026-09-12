import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, X, ChevronDown } from 'lucide-react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

const ProductsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('popularity');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 3000]);
  const [searchQuery] = useState(searchParams.get('search') || '');
  const [filterType] = useState(searchParams.get('filter') || '');

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.subCategory.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (selectedCategory) {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Filter type
    if (filterType === 'new') {
      result = result.filter(p => p.newArrival);
    } else if (filterType === 'trending') {
      result = result.filter(p => p.trending);
    } else if (filterType === 'sale') {
      result = result.filter(p => p.discount >= 40);
    }

    // Price filter
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'discount':
        result.sort((a, b) => b.discount - a.discount);
        break;
      default:
        result.sort((a, b) => b.reviews - a.reviews);
    }

    return result;
  }, [searchQuery, selectedCategory, filterType, priceRange, sortBy]);

  const categories = ['Western Wear', 'Ethnic Wear', 'Bottom Wear'];

  const getPageTitle = () => {
    if (searchQuery) return `Results for "${searchQuery}"`;
    if (selectedCategory) return selectedCategory;
    if (filterType === 'new') return 'New Arrivals';
    if (filterType === 'trending') return '🔥 Trending Now';
    if (filterType === 'sale') return '💰 Mega Sale';
    return 'All Products';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Page header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold font-playfair">{getPageTitle()}</h1>
          <p className="text-gray-500 text-sm mt-1">{filteredProducts.length} products found</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Sort dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white border rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:border-pink-500"
            >
              <option value="popularity">Popularity</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
              <option value="discount">Discount</option>
            </select>
            <ChevronDown size={16} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
          {/* Filter toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 bg-white border rounded-lg px-4 py-2 text-sm hover:border-pink-500 transition-colors lg:hidden"
          >
            <Filter size={16} /> Filters
          </button>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Sidebar filters */}
        <aside className={`${showFilters ? 'fixed inset-0 z-50 bg-white p-6 overflow-y-auto lg:relative lg:inset-auto lg:z-auto lg:p-0 lg:bg-transparent' : 'hidden lg:block'} w-full lg:w-64 shrink-0`}>
          {showFilters && (
            <div className="flex items-center justify-between mb-4 lg:hidden">
              <h3 className="text-lg font-bold">Filters</h3>
              <button onClick={() => setShowFilters(false)}>
                <X size={24} />
              </button>
            </div>
          )}
          
          <div className="bg-white rounded-xl p-4 shadow-sm border lg:sticky lg:top-32">
            <h3 className="font-semibold mb-4 hidden lg:block">Filters</h3>
            
            {/* Categories */}
            <div className="mb-6">
              <h4 className="font-medium text-sm mb-3 text-gray-700">CATEGORIES</h4>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === ''}
                    onChange={() => setSelectedCategory('')}
                    className="text-pink-500 focus:ring-pink-500"
                  />
                  <span className="text-sm">All Categories</span>
                </label>
                {categories.map(cat => (
                  <label key={cat} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === cat}
                      onChange={() => setSelectedCategory(cat)}
                      className="text-pink-500 focus:ring-pink-500"
                    />
                    <span className="text-sm">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h4 className="font-medium text-sm mb-3 text-gray-700">PRICE RANGE</h4>
              <div className="space-y-2">
                {[
                  { label: 'All Prices', range: [0, 3000] as [number, number] },
                  { label: 'Under ₹500', range: [0, 500] as [number, number] },
                  { label: '₹500 - ₹999', range: [500, 999] as [number, number] },
                  { label: '₹1000 - ₹1999', range: [1000, 1999] as [number, number] },
                  { label: 'Above ₹2000', range: [2000, 10000] as [number, number] },
                ].map(item => (
                  <label key={item.label} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="price"
                      checked={priceRange[0] === item.range[0] && priceRange[1] === item.range[1]}
                      onChange={() => setPriceRange(item.range)}
                      className="text-pink-500 focus:ring-pink-500"
                    />
                    <span className="text-sm">{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Quick Filters */}
            <div>
              <h4 className="font-medium text-sm mb-3 text-gray-700">QUICK FILTERS</h4>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => { setSelectedCategory(''); }}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                    !selectedCategory && !filterType ? 'bg-pink-500 text-white border-pink-500' : 'border-gray-300 hover:border-pink-500'
                  }`}
                >
                  All
                </button>
                <button className="px-3 py-1.5 rounded-full text-xs font-medium border border-gray-300 hover:border-pink-500 transition-colors">
                  In Stock
                </button>
                <button className="px-3 py-1.5 rounded-full text-xs font-medium border border-gray-300 hover:border-pink-500 transition-colors">
                  4+ Rating
                </button>
              </div>
            </div>

            {showFilters && (
              <button
                onClick={() => setShowFilters(false)}
                className="w-full mt-4 py-2.5 bg-pink-500 text-white rounded-lg font-medium lg:hidden"
              >
                Apply Filters ({filteredProducts.length} items)
              </button>
            )}
          </div>
        </aside>

        {/* Product grid */}
        <div className="flex-1">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-5xl mb-4">😔</p>
              <h3 className="text-xl font-semibold mb-2">No products found</h3>
              <p className="text-gray-500">Try adjusting your filters or search query</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
