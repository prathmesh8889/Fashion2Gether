import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, X, ChevronDown, Grid, List } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';

const CollectionsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { products } = useStore();
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('popularity');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [searchQuery] = useState(searchParams.get('search') || '');
  const [filterType] = useState(searchParams.get('filter') || '');

  const filteredProducts = useMemo(() => {
    let result = [...products];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.subCategory.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    if (selectedCategory) result = result.filter(p => p.category === selectedCategory);
    if (filterType === 'new') result = result.filter(p => p.newArrival);
    if (filterType === 'trending') result = result.filter(p => p.trending);
    if (filterType === 'sale') result = result.filter(p => p.discount >= 40);
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    switch (sortBy) {
      case 'price-low': result.sort((a, b) => a.price - b.price); break;
      case 'price-high': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'discount': result.sort((a, b) => b.discount - a.discount); break;
      default: result.sort((a, b) => b.reviews - a.reviews);
    }
    return result;
  }, [products, searchQuery, selectedCategory, filterType, priceRange, sortBy]);

  const categories = ['Ethnic Wear', 'Western Wear', 'Bottom Wear'];
  const allSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Free Size'];
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  const productsWithSizes = useMemo(() => {
    if (selectedSizes.length === 0) return filteredProducts;
    return filteredProducts.filter(p => p.sizes.some(s => selectedSizes.includes(s)));
  }, [filteredProducts, selectedSizes]);

  const toggleSize = (size: string) => {
    setSelectedSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]);
  };

  const resetFilters = () => {
    setSelectedCategory('');
    setPriceRange([0, 5000]);
    setSelectedSizes([]);
    setSortBy('popularity');
  };

  const getPageTitle = () => {
    if (searchQuery) return `Results for "${searchQuery}"`;
    if (selectedCategory) return selectedCategory;
    if (filterType === 'new') return 'New Arrivals';
    if (filterType === 'trending') return 'Trending Now';
    if (filterType === 'sale') return 'Sale';
    return 'All Collections';
  };

  return (
    <div className="bg-[var(--ivory)] min-h-screen">
      {/* Page Header */}
      <div className="bg-white border-b border-[var(--light-gray)]">
        <div className="container-custom py-6">
          <h1 className="text-2xl md:text-3xl font-playfair font-bold text-[var(--charcoal)]">{getPageTitle()}</h1>
          <p className="text-sm text-[var(--medium-gray)] mt-1">{productsWithSizes.length} products</p>
        </div>
      </div>

      <div className="container-custom py-6">
        <div className="flex gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="bg-white rounded-lg p-5 border border-[var(--light-gray)] sticky top-36">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-semibold text-sm uppercase tracking-wider">Filters</h3>
                <button onClick={resetFilters} className="text-xs text-[var(--rose)] hover:underline">Reset All</button>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h4 className="font-medium text-xs uppercase tracking-wider mb-3 text-[var(--medium-gray)]">Category</h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="category" checked={selectedCategory === ''} onChange={() => setSelectedCategory('')} className="accent-[var(--rose)]" />
                    <span className="text-sm">All</span>
                  </label>
                  {categories.map(cat => (
                    <label key={cat} className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="category" checked={selectedCategory === cat} onChange={() => setSelectedCategory(cat)} className="accent-[var(--rose)]" />
                      <span className="text-sm">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div className="mb-6">
                <h4 className="font-medium text-xs uppercase tracking-wider mb-3 text-[var(--medium-gray)]">Size</h4>
                <div className="flex flex-wrap gap-2">
                  {allSizes.map(size => (
                    <button key={size} onClick={() => toggleSize(size)} className={`px-3 py-1.5 text-xs border rounded transition-colors ${selectedSizes.includes(size) ? 'bg-[var(--rose)] text-white border-[var(--rose)]' : 'border-[var(--light-gray)] hover:border-[var(--rose)]'}`}>
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="mb-6">
                <h4 className="font-medium text-xs uppercase tracking-wider mb-3 text-[var(--medium-gray)]">Price</h4>
                <div className="space-y-2">
                  {[
                    { label: 'All Prices', range: [0, 5000] as [number, number] },
                    { label: 'Under ₹500', range: [0, 500] as [number, number] },
                    { label: '₹500 - ₹999', range: [500, 999] as [number, number] },
                    { label: '₹1000 - ₹1999', range: [1000, 1999] as [number, number] },
                    { label: 'Above ₹2000', range: [2000, 5000] as [number, number] },
                  ].map(item => (
                    <label key={item.label} className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="price" checked={priceRange[0] === item.range[0] && priceRange[1] === item.range[1]} onChange={() => setPriceRange(item.range)} className="accent-[var(--rose)]" />
                      <span className="text-sm">{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <button onClick={() => setShowFilters(!showFilters)} className="lg:hidden flex items-center gap-2 px-4 py-2 border border-[var(--light-gray)] rounded text-sm">
                <Filter size={16} /> Filters
              </button>
              <div className="flex items-center gap-3 ml-auto">
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="text-sm border border-[var(--light-gray)] rounded px-3 py-2 focus:outline-none focus:border-[var(--rose)] bg-white">
                  <option value="popularity">Popularity</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                  <option value="discount">Discount</option>
                </select>
              </div>
            </div>

            {/* Mobile Filters */}
            {showFilters && (
              <div className="lg:hidden bg-white rounded-lg p-5 border border-[var(--light-gray)] mb-6 animate-slideDown">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Filters</h3>
                  <button onClick={() => setShowFilters(false)}><X size={20} /></button>
                </div>
                <div className="mb-4">
                  <h4 className="text-xs font-medium uppercase mb-2 text-[var(--medium-gray)]">Category</h4>
                  <div className="flex flex-wrap gap-2">
                    <button onClick={() => setSelectedCategory('')} className={`px-3 py-1.5 text-xs border rounded ${!selectedCategory ? 'bg-[var(--rose)] text-white border-[var(--rose)]' : 'border-[var(--light-gray)]'}`}>All</button>
                    {categories.map(cat => (
                      <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-3 py-1.5 text-xs border rounded ${selectedCategory === cat ? 'bg-[var(--rose)] text-white border-[var(--rose)]' : 'border-[var(--light-gray)]'}`}>{cat}</button>
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <h4 className="text-xs font-medium uppercase mb-2 text-[var(--medium-gray)]">Size</h4>
                  <div className="flex flex-wrap gap-2">
                    {allSizes.map(size => (
                      <button key={size} onClick={() => toggleSize(size)} className={`px-3 py-1.5 text-xs border rounded ${selectedSizes.includes(size) ? 'bg-[var(--rose)] text-white border-[var(--rose)]' : 'border-[var(--light-gray)]'}`}>{size}</button>
                    ))}
                  </div>
                </div>
                <button onClick={() => setShowFilters(false)} className="w-full py-2.5 bg-[var(--rose)] text-white rounded text-sm font-medium">
                  Show {productsWithSizes.length} Results
                </button>
              </div>
            )}

            {/* Products */}
            {productsWithSizes.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {productsWithSizes.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-5xl mb-4">🔍</p>
                <h3 className="text-xl font-playfair font-bold mb-2">No products found</h3>
                <p className="text-[var(--medium-gray)] mb-6">Try adjusting your filters</p>
                <button onClick={resetFilters} className="px-6 py-2.5 bg-[var(--rose)] text-white rounded text-sm font-medium">
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionsPage;
