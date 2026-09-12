import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ShoppingBag } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[var(--ivory)]">
      <div className="container-custom text-center py-20">
        <div className="max-w-md mx-auto">
          <div className="text-8xl font-playfair font-bold text-[var(--rose)] mb-4">404</div>
          <h1 className="text-3xl font-playfair font-bold text-[var(--charcoal)] mb-4">
            Page Not Found
          </h1>
          <p className="text-[var(--medium-gray)] mb-8">
            Sorry, the page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[var(--rose)] text-white font-medium rounded hover:bg-[var(--burgundy)] transition-colors"
            >
              <Home size={18} />
              Go Home
            </Link>
            <Link
              to="/collections"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-[var(--rose)] text-[var(--rose)] font-medium rounded hover:bg-[var(--rose)] hover:text-white transition-colors"
            >
              <ShoppingBag size={18} />
              Shop Collections
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
