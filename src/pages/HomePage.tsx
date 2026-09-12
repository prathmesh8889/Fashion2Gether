import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Star, Truck, Shield, RotateCcw, Headphones } from 'lucide-react';
import { products, categories, banners } from '../data/products';
import ProductCard from '../components/ProductCard';

const HomePage: React.FC = () => {
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner(prev => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const trendingProducts = products.filter(p => p.trending);
  const newProducts = products.filter(p => p.newArrival);

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="relative overflow-hidden">
        <div className={`bg-gradient-to-r ${banners[currentBanner].gradient} transition-all duration-700`}>
          <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
            <div className="text-center text-white">
              <img 
                src="https://raw.githubusercontent.com/prathmesh8889/Fashion2Gether/main/fashion2gether.jpeg" 
                alt="Fashion2gether" 
                className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white/30 mx-auto mb-6 shadow-2xl"
              />
              <p className="text-sm md:text-base uppercase tracking-widest mb-2 opacity-90">{banners[currentBanner].subtitle}</p>
              <h1 className="text-4xl md:text-6xl font-bold font-playfair mb-4">{banners[currentBanner].title}</h1>
              <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto">{banners[currentBanner].description}</p>
              <Link
                to="/products"
                className="inline-block px-8 py-3 bg-white text-gray-800 font-semibold rounded-full hover:bg-gray-100 transition-colors shadow-lg"
              >
                {banners[currentBanner].cta} <ChevronRight className="inline" size={18} />
              </Link>
            </div>
          </div>
        </div>
        {/* Banner dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentBanner(i)}
              className={`w-3 h-3 rounded-full transition-all ${i === currentBanner ? 'bg-white w-8' : 'bg-white/50'}`}
            />
          ))}
        </div>
      </section>

      {/* Features bar */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2 justify-center">
              <Truck size={20} className="text-pink-500" />
              <span className="text-xs md:text-sm font-medium">Free Shipping ₹999+</span>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <Shield size={20} className="text-pink-500" />
              <span className="text-xs md:text-sm font-medium">100% Genuine Products</span>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <RotateCcw size={20} className="text-pink-500" />
              <span className="text-xs md:text-sm font-medium">Easy Returns</span>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <Headphones size={20} className="text-pink-500" />
              <span className="text-xs md:text-sm font-medium">24/7 Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold font-playfair">Shop by Category</h2>
          <p className="text-gray-500 mt-2">Explore our curated women's collections</p>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={`/products?category=${encodeURIComponent(cat.name)}`}
              className="group text-center"
            >
              <div className="w-20 h-20 md:w-24 md:h-24 mx-auto rounded-full overflow-hidden border-3 border-pink-100 group-hover:border-pink-400 transition-all group-hover:scale-105 shadow-md">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
              </div>
              <p className="mt-2 text-xs md:text-sm font-medium text-gray-700 group-hover:text-pink-500 transition-colors">
                {cat.icon} {cat.name}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Products */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold font-playfair">🔥 Trending Now</h2>
              <p className="text-gray-500 mt-1">Most loved by our women customers</p>
            </div>
            <Link to="/products?filter=trending" className="text-pink-500 font-medium text-sm hover:underline flex items-center gap-1">
              View All <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {trendingProducts.slice(0, 4).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="relative rounded-2xl overflow-hidden h-48 md:h-64 bg-gradient-to-r from-pink-400 to-rose-500 flex items-center px-8">
            <div className="text-white">
              <p className="text-sm uppercase tracking-wider opacity-90">Limited Offer</p>
              <h3 className="text-2xl md:text-3xl font-bold font-playfair mt-1">Korean Collection</h3>
              <p className="text-lg mt-2 opacity-90">Starting at just ₹99</p>
              <Link to="/products?search=korean" className="inline-block mt-4 px-5 py-2 bg-white text-pink-600 font-semibold rounded-full text-sm hover:bg-pink-50 transition-colors">
                Shop Now
              </Link>
            </div>
            <div className="absolute right-4 top-4 text-6xl opacity-20">👗</div>
          </div>
          <div className="relative rounded-2xl overflow-hidden h-48 md:h-64 bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center px-8">
            <div className="text-white">
              <p className="text-sm uppercase tracking-wider opacity-90">New Arrivals</p>
              <h3 className="text-2xl md:text-3xl font-bold font-playfair mt-1">Ethnic Elegance</h3>
              <p className="text-lg mt-2 opacity-90">Up to 50% OFF</p>
              <Link to="/products?category=Ethnic+Wear" className="inline-block mt-4 px-5 py-2 bg-white text-purple-600 font-semibold rounded-full text-sm hover:bg-purple-50 transition-colors">
                Explore
              </Link>
            </div>
            <div className="absolute right-4 top-4 text-6xl opacity-20">🥻</div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold font-playfair">✨ New Arrivals</h2>
            <p className="text-gray-500 mt-1">Fresh styles for girls just dropped</p>
          </div>
          <Link to="/products?filter=new" className="text-pink-500 font-medium text-sm hover:underline flex items-center gap-1">
            View All <ChevronRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {newProducts.slice(0, 4).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gradient-to-br from-pink-50 to-purple-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold font-playfair text-center mb-8">What Our Women Customers Say 💬</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Bhoomika L.", text: "Amazing store with latest fashion under budget with friendly customer service.", rating: 5 },
              { name: "Pooja T.", text: "Super shop and quality also good. All dresses are low price and quality high.", rating: 5 },
              { name: "Yash D.", text: "Great collection for girls shopping at affordable prices. Nice variety!", rating: 4 },
            ].map((review, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <Star key={j} size={16} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm mb-3">"{review.text}"</p>
                <p className="font-semibold text-sm">- {review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Store Info */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl p-8 shadow-sm border text-center">
          <h2 className="text-2xl font-bold font-playfair mb-2">Visit Our Store in Yavatmal</h2>
          <p className="text-gray-500 mb-4">Experience the finest women's clothing collection in person — exclusively for girls!</p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-pink-500">📍</span>
              <span>Near Veer Vamanrao Chowk, Tilakwadi, Yavatmal</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-pink-500">🕐</span>
              <span>10:00 AM - 9:30 PM (All Days)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-pink-500">📞</span>
              <span>+91 95955 35339</span>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-center gap-1">
            <Star size={16} className="fill-yellow-400 text-yellow-400" />
            <span className="font-semibold">4.6</span>
            <span className="text-gray-500">(181+ Google Reviews)</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
