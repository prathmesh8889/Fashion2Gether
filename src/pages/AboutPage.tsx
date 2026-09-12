import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock, Instagram, Heart, Star } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const ABOUT_IMAGE = "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=600&fit=crop";

const AboutPage: React.FC = () => {
  const { storeInfo } = useStore();

  return (
    <div className="bg-[var(--ivory)]">
      {/* Hero */}
      <section className="relative h-64 md:h-80 overflow-hidden">
        <img src={ABOUT_IMAGE} alt="Fashion2gether Store" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-2">Our Story</h1>
            <p className="text-white/80">Serving women's fashion since 2010</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-playfair font-bold text-[var(--charcoal)] mb-4">About Fashion2gether</h2>
              <div className="section-divider"></div>
            </div>

            <div className="prose prose-lg text-[var(--medium-gray)] space-y-6 text-center">
              <p className="leading-relaxed">
                Fashion2gether is Yavatmal's premier destination for women's fashion. Established in 2010, we have been serving our customers with a carefully curated collection of ethnic wear, western wear, and accessories for over 15 years.
              </p>
              <p className="leading-relaxed">
                Our store is exclusively dedicated to women's and girls' clothing. From beautiful kurtis and elegant sarees to trendy western dresses and comfortable everyday wear — we bring you the latest styles at affordable prices.
              </p>
              <p className="leading-relaxed">
                We believe every woman deserves to feel confident and beautiful. That's why we handpick each piece in our collection, ensuring quality fabrics, trendy designs, and comfortable fits for every body type.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
              {[
                { number: '15+', label: 'Years of Service' },
                { number: '10K+', label: 'Happy Customers' },
                { number: '500+', label: 'Products' },
                { number: '4.6★', label: 'Google Rating' },
              ].map((stat, i) => (
                <div key={i} className="text-center bg-white p-6 rounded-lg border border-[var(--light-gray)]">
                  <p className="text-2xl md:text-3xl font-bold text-[var(--rose)] font-playfair">{stat.number}</p>
                  <p className="text-xs text-[var(--medium-gray)] mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Visit Us */}
            <div className="mt-16 bg-white rounded-lg p-8 border border-[var(--light-gray)] text-center">
              <h3 className="text-2xl font-playfair font-bold mb-6">Visit Our Store</h3>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="flex flex-col items-center gap-2">
                  <MapPin size={24} className="text-[var(--rose)]" />
                  <p className="text-sm text-[var(--medium-gray)]">{storeInfo.address}</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Clock size={24} className="text-[var(--rose)]" />
                  <p className="text-sm text-[var(--medium-gray)]">{storeInfo.hours}</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Phone size={24} className="text-[var(--rose)]" />
                  <p className="text-sm text-[var(--medium-gray)]">{storeInfo.phone}</p>
                </div>
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/contact" className="px-6 py-2.5 bg-[var(--rose)] text-white rounded font-medium hover:bg-[var(--burgundy)] transition-colors text-sm">
                  Contact Us
                </Link>
                <a href={storeInfo.instagram} target="_blank" rel="noopener noreferrer" className="px-6 py-2.5 border-2 border-[var(--rose)] text-[var(--rose)] rounded font-medium hover:bg-[var(--rose)] hover:text-white transition-colors text-sm flex items-center gap-2">
                  <Instagram size={16} /> Follow Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
