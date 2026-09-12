import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Truck, Shield, RotateCcw, Headphones, Instagram, MapPin, Clock, Phone } from 'lucide-react';
import { products, categories, banners } from '../data/products';
import ProductCard from '../components/ProductCard';
import { useStore } from '../context/StoreContext';

const HomePage: React.FC = () => {
  const [currentBanner, setCurrentBanner] = useState(0);
  const { storeInfo } = useStore();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner(prev => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const featuredProducts = products.filter(p => p.featured).slice(0, 8);
  const newProducts = products.filter(p => p.newArrival).slice(0, 4);

  return (
    <div className="bg-[var(--ivory)]">
      {/* Hero Banner */}
      <section className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentBanner ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={banner.image}
              alt={banner.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
            <div className="absolute inset-0 flex items-center">
              <div className="container-custom">
                <div className="max-w-xl text-white animate-fadeInUp">
                  <p className="text-sm uppercase tracking-widest mb-3 text-[var(--rose)]">
                    {banner.subtitle}
                  </p>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold mb-4 leading-tight">
                    {banner.title}
                  </h1>
                  <p className="text-base md:text-lg text-white/90 mb-8 leading-relaxed">
                    {banner.description}
                  </p>
                  <Link
                    to={banner.link}
                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-[var(--rose)] text-white font-medium rounded hover:bg-[var(--burgundy)] transition-colors"
                  >
                    {banner.cta}
                    <ChevronRight size={18} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
        {/* Banner Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentBanner(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === currentBanner ? 'bg-white w-8' : 'bg-white/50'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Features Bar */}
      <section className="bg-white border-b border-[var(--light-gray)]">
        <div className="container-custom py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Truck, text: 'Free Shipping', sub: 'On orders above ₹999' },
              { icon: Shield, text: '100% Genuine', sub: 'Quality assured' },
              { icon: RotateCcw, text: 'Easy Returns', sub: '7 days policy' },
              { icon: Headphones, text: '24/7 Support', sub: 'WhatsApp available' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <item.icon size={24} className="text-[var(--rose)] shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-[var(--charcoal)]">{item.text}</p>
                  <p className="text-xs text-[var(--medium-gray)]">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-[var(--charcoal)] mb-2">
              Shop by Category
            </h2>
            <div className="section-divider"></div>
            <p className="text-[var(--medium-gray)] mt-3">Explore our curated collections</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                to={`/collections?category=${encodeURIComponent(cat.name)}`}
                className="group card-hover"
              >
                <div className="aspect-square rounded-lg overflow-hidden bg-[var(--cream)] mb-3">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-center text-sm font-semibold text-[var(--charcoal)] group-hover:text-[var(--rose)] transition-colors">
                  {cat.name}
                </h3>
                <p className="text-center text-xs text-[var(--medium-gray)] mt-1">
                  {cat.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-[var(--charcoal)] mb-2">
                Featured Collection
              </h2>
              <div className="section-divider !mx-0"></div>
            </div>
            <Link
              to="/collections"
              className="hidden md:flex items-center gap-1 text-sm font-medium text-[var(--rose)] hover:underline"
            >
              View All <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="md:hidden text-center mt-8">
            <Link to="/collections" className="inline-flex items-center gap-1 text-sm font-medium text-[var(--rose)]">
              View All Collections <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-[var(--charcoal)] mb-2">
                New Arrivals
              </h2>
              <div className="section-divider !mx-0"></div>
            </div>
            <Link
              to="/collections?filter=new"
              className="hidden md:flex items-center gap-1 text-sm font-medium text-[var(--rose)] hover:underline"
            >
              View All <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {newProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Fashion Reels Section */}
      <section className="section-padding bg-[var(--cream)]">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-[var(--charcoal)] mb-2">
              Fashion Reels & Style Inspiration
            </h2>
            <div className="section-divider"></div>
            <p className="text-[var(--medium-gray)] mt-3">Watch our latest styling videos and trend showcases</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Ethnic Elegance Collection", category: "Ethnic Wear", thumbnail: products[0]?.image || "" },
              { title: "Western Chic Styles", category: "Western Wear", thumbnail: products[1]?.image || "" },
              { title: "Festive Season Special", category: "Festive Wear", thumbnail: products[3]?.image || "" },
              { title: "Kurti Styling Tips", category: "Kurtis", thumbnail: products[2]?.image || "" },
              { title: "Party Wear Looks", category: "Party Wear", thumbnail: products[1]?.image || "" },
              { title: "Saree Draping Styles", category: "Sarees", thumbnail: products[3]?.image || "" },
            ].map((reel, i) => (
              <a
                key={i}
                href={storeInfo.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-[9/16] rounded-lg overflow-hidden bg-[var(--charcoal)]"
              >
                <img
                  src={reel.thumbnail}
                  alt={reel.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-[var(--rose)] ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <p className="text-xs uppercase tracking-wider text-[var(--rose)] mb-1">{reel.category}</p>
                  <h3 className="font-semibold text-sm">{reel.title}</h3>
                </div>
              </a>
            ))}
          </div>
          <div className="text-center mt-8">
            <a
              href={storeInfo.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--rose)] text-white font-medium rounded hover:bg-[var(--burgundy)] transition-colors"
            >
              <Instagram size={18} />
              Watch More on Instagram
            </a>
          </div>
        </div>
      </section>

      {/* Instagram Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-[var(--charcoal)] mb-2">
              Follow Us on Instagram
            </h2>
            <div className="section-divider"></div>
            <p className="text-[var(--medium-gray)] mt-3">
              <a href={storeInfo.instagram} target="_blank" rel="noopener noreferrer" className="text-[var(--rose)] hover:underline font-medium">
                @fashion2gether_
              </a>
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products.slice(0, 4).map((product, i) => (
              <a
                key={i}
                href={storeInfo.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square rounded-lg overflow-hidden"
              >
                <img
                  src={product.image}
                  alt={`Instagram post ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <Instagram size={32} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </a>
            ))}
          </div>
          <div className="text-center mt-8">
            <a
              href={storeInfo.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[var(--rose)] text-[var(--rose)] font-medium rounded hover:bg-[var(--rose)] hover:text-white transition-colors"
            >
              <Instagram size={18} />
              Follow on Instagram
            </a>
          </div>
        </div>
      </section>

      {/* Store Visit */}
      <section className="section-padding bg-[var(--cream)]">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-[var(--charcoal)] mb-4">
              Visit Our Store
            </h2>
            <div className="section-divider"></div>
            <p className="text-[var(--medium-gray)] mt-4 mb-8 leading-relaxed">
              Experience our collection in person. Our friendly staff will help you find the perfect outfit for every occasion.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg">
                <MapPin size={24} className="text-[var(--rose)] mx-auto mb-3" />
                <h3 className="font-semibold text-sm mb-1">Address</h3>
                <p className="text-xs text-[var(--medium-gray)]">{storeInfo.address}</p>
              </div>
              <div className="bg-white p-6 rounded-lg">
                <Clock size={24} className="text-[var(--rose)] mx-auto mb-3" />
                <h3 className="font-semibold text-sm mb-1">Hours</h3>
                <p className="text-xs text-[var(--medium-gray)]">{storeInfo.hours}</p>
              </div>
              <div className="bg-white p-6 rounded-lg">
                <Phone size={24} className="text-[var(--rose)] mx-auto mb-3" />
                <h3 className="font-semibold text-sm mb-1">Contact</h3>
                <p className="text-xs text-[var(--medium-gray)]">{storeInfo.phone}</p>
              </div>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[var(--rose)] text-white font-medium rounded hover:bg-[var(--burgundy)] transition-colors"
            >
              Get Directions
              <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
