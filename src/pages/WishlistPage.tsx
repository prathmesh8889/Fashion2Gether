import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';

const WishlistPage: React.FC = () => {
  const { wishlist, toggleWishlist, addToCart, products } = useStore();
  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  if (wishlistProducts.length === 0) {
    return (
      <div className="container-custom py-20 text-center">
        <div className="w-20 h-20 bg-[var(--cream)] rounded-full flex items-center justify-center mx-auto mb-6">
          <Heart size={32} className="text-[var(--rose)]" />
        </div>
        <h2 className="text-2xl font-playfair font-bold mb-2">Your wishlist is empty</h2>
        <p className="text-[var(--medium-gray)] mb-6">Save your favorites to buy later</p>
        <Link to="/collections" className="inline-flex items-center gap-2 px-8 py-3 bg-[var(--rose)] text-white rounded font-medium hover:bg-[var(--burgundy)] transition-colors">
          Explore Collections
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[var(--ivory)] min-h-screen">
      <div className="container-custom py-8">
        <h1 className="text-2xl font-playfair font-bold mb-8">My Wishlist ({wishlistProducts.length})</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {wishlistProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
