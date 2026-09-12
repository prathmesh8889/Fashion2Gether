import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Star, Truck, Shield, RotateCcw, Headphones, Sparkles, Crown } from 'lucide-react';
import { products, categories, banners } from '../data/products';
import ProductCard from '../components/ProductCard';

const HomePage: React.FC = () => {
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner(prev => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const trendingProducts = products.filter(p => p.trending);
  const newProducts = products.filter(p => p.newArrival);

  return (
    <div className="min-h-screen bg-[#faf7f5]">
      {/* Hero Banner */}
      <section className="relative overflow-hidden">
        <div className={`bg-gradient-to-r ${banners[currentBanner].gradient} transition-all duration-1000`}>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          </div>
          <div className="max-w-7xl mx-auto px-4 py-20 md:py-28 relative">
            <div className="text-center text-white">
              <img 
                src="https://raw.githubusercontent.com/prathmesh8889/Fashion2Gether/main/fashion2gether.jpeg" 
                alt="Fashion2gether" 
                className="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover border-4 border-white/20 mx-auto mb-8 shadow-2xl animate-float"
              />
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full mb-4">
                <Sparkles size={14} />
                <span className="text-xs md:text-sm uppercase tracking-wider font-medium">{banners[currentBanner].subtitle}</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold font-playfair mb-4 tracking-tight">
                {banners[currentBanner].title}
              </h1>
              <p className="text-lg md:text-xl opacity-90 mb-10 max-w-2xl mx-auto font-light">
                {banners[currentBanner].description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-800 font-semibold rounded-full hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 text-sm"
                >
                  {banners[currentBanner].cta} <ChevronRight size={18} />
                </Link>
                <Link
                  to="/products?filter=sale"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-all text-sm"
                >
                  View Sale <span className="text-yellow-300">💰</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* Banner dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentBanner(i)}
              className={`h-2 rounded-full transition-all duration-300 ${i === currentBanner ? 'bg-white w-8' : 'bg-white/40 w-2'}`}
            />
          ))}
        </div>
      </section>

      {/* Features bar */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Truck, text: 'Free Shipping ₹999+', color: 'text-blue-500' },
              { icon: Shield, text: '100% Genuine', color: 'text-green-500' },
              { icon: RotateCcw, text: 'Easy Returns', color: 'text-orange-500' },
              { icon: Headphones, text: '24/7 Support', color: 'text-purple-500' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 justify-center py-2">
                <item.icon size={20} className={item.color} />
                <span className="text-xs md:text-sm font-medium text-gray-700">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold font-playfair text-[#1a1a2e]">Shop by Category</h2>
          <div className="section-divider"></div>
          <p className="text-gray-500 mt-3">Explore our curated women's collections</p>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={`/products?category=${encodeURIComponent(cat.name)}`}
              className="group text-center"
            >
              <div className="relative mx-auto w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-3 border-gray-100 group-hover:border-pink-400 transition-all duration-300 shadow-md group-hover:shadow-xl group-hover:scale-105">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <p className="mt-3 text-xs md:text-sm font-semibold text-gray-700 group-hover:text-pink-600 transition-colors">
                {cat.icon} {cat.name}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Products */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-playfair text-[#1a1a2e]">🔥 Trending Now</h2>
              <div className="section-divider !mx-0 mt-2"></div>
              <p className="text-gray-500 mt-3">Most loved by our women customers</p>
            </div>
            <Link to="/products?filter=trending" className="hidden md:flex items-center gap-1 text-pink-600 font-semibold text-sm hover:underline">
              View All <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {trendingProducts.slice(0, 4).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="md:hidden text-center mt-6">
            <Link to="/products?filter=trending" className="inline-flex items-center gap-1 text-pink-600 font-semibold text-sm">
              View All <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Promotional Banners */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="relative rounded-3xl overflow-hidden h-56 md:h-64 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 flex items-center px-8 md:px-10 group cursor-pointer hover:shadow-2xl transition-all duration-300">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="text-white relative z-10">
              <span className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium mb-3">Limited Offer</span>
              <h3 className="text-3xl md:text-4xl font-bold font-playfair">Korean Collection</h3>
              <p className="text-lg mt-2 opacity-90">Starting at just ₹199</p>
              <Link to="/products?search=korean" className="inline-flex items-center gap-2 mt-5 px-6 py-2.5 bg-white text-pink-600 font-semibold rounded-full text-sm hover:bg-pink-50 transition-colors shadow-lg group-hover:shadow-xl">
                Shop Now <ChevronRight size={16} />
              </Link>
            </div>
            <div className="absolute right-6 bottom-6 text-7xl opacity-30 group-hover:opacity-50 transition-opacity">👗</div>
          </div>
          <div className="relative rounded-3xl overflow-hidden h-56 md:h-64 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 flex items-center px-8 md:px-10 group cursor-pointer hover:shadow-2xl transition-all duration-300">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="text-white relative z-10">
              <span className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium mb-3">New Arrivals</span>
              <h3 className="text-3xl md:text-4xl font-bold font-playfair">Ethnic Elegance</h3>
              <p className="text-lg mt-2 opacity-90">Up to 50% OFF</p>
              <Link to="/products?category=Ethnic+Wear" className="inline-flex items-center gap-2 mt-5 px-6 py-2.5 bg-white text-purple-600 font-semibold rounded-full text-sm hover:bg-purple-50 transition-colors shadow-lg group-hover:shadow-xl">
                Explore <ChevronRight size={16} />
              </Link>
            </div>
            <div className="absolute right-6 bottom-6 text-7xl opacity-30 group-hover:opacity-50 transition-opacity">🥻</div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-playfair text-[#1a1a2e]">✨ New Arrivals</h2>
            <div className="section-divider !mx-0 mt-2"></div>
            <p className="text-gray-500 mt-3">Fresh styles for girls just dropped</p>
          </div>
          <Link to="/products?filter=new" className="hidden md:flex items-center gap-1 text-pink-600 font-semibold text-sm hover:underline">
            View All <ChevronRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {newProducts.slice(0, 8).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-playfair text-[#1a1a2e]">Why Choose Fashion2gether?</h2>
            <div className="section-divider"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Crown, title: 'Premium Quality', desc: 'Handpicked fabrics and designs that ensure comfort and style for every woman.', color: 'from-pink-500 to-rose-500' },
              { icon: Sparkles, title: 'Latest Trends', desc: 'Stay ahead with Korean, ethnic, and western fashion trends updated weekly.', color: 'from-purple-500 to-indigo-500' },
              { icon: Shield, title: 'Trusted Since 2010', desc: '15+ years of serving women in Yavatmal with 4.6★ Google rating.', color: 'from-blue-500 to-cyan-500' },
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-soft hover:shadow-heavy transition-all duration-300 text-center group">
                <div className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform shadow-lg`}>
                  <item.icon size={28} className="text-white" />
                </div>
                <h3 className="text-lg font-bold text-[#1a1a2e] mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold font-playfair text-[#1a1a2e]">What Our Women Customers Say 💬</h2>
          <div className="section-divider"></div>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: "Bhoomika L.", text: "Amazing store with latest fashion under budget with friendly customer service. Love the Korean collection!", rating: 5 },
            { name: "Pooja T.", text: "Super shop and quality also good. All dresses are low price and quality high. My go-to store!", rating: 5 },
            { name: "Yash D.", text: "Great collection for girls shopping at affordable prices. Nice variety and trendy designs!", rating: 4 },
          ].map((review, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-soft border border-gray-100 hover:shadow-medium transition-all">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: review.rating }).map((_, j) => (
                  <Star key={j} size={16} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-4 italic">"{review.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-sm text-[#1a1a2e]">{review.name}</p>
                  <p className="text-xs text-gray-400">Verified Customer</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Store Info */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-soft border border-gray-100 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"></div>
          <img 
            src="https://raw.githubusercontent.com/prathmesh8889/Fashion2Gether/main/fashion2gether.jpeg" 
            alt="Fashion2gether" 
            className="w-16 h-16 rounded-full object-cover mx-auto mb-4 border-2 border-pink-100"
          />
          <h2 className="text-2xl md:text-3xl font-bold font-playfair mb-2 text-[#1a1a2e]">Visit Our Store in Yavatmal</h2>
          <p className="text-gray-500 mb-6">Experience the finest women's clothing collection in person — exclusively for girls!</p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2 bg-pink-50 px-4 py-2 rounded-full">
              <span>📍</span>
              <span className="font-medium">Tilakwadi, Yavatmal</span>
            </div>
            <div className="flex items-center gap-2 bg-purple-50 px-4 py-2 rounded-full">
              <span>🕐</span>
              <span className="font-medium">10 AM - 9:30 PM</span>
            </div>
            <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full">
              <span>📞</span>
              <span className="font-medium">+91 95955 35339</span>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-center gap-2">
            <div className="flex">
              {[1,2,3,4,5].map(i => (
                <Star key={i} size={18} className="fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="font-bold text-lg">4.6</span>
            <span className="text-gray-500 text-sm">(181+ Google Reviews)</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
