import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { products } from '../data/products';
import { useStore } from '../context/StoreContext';

const WishlistPage: React.FC = () => {
  const { wishlist, toggleWishlist, addToCart } = useStore();
  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  if (wishlistProducts.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <Heart size={80} className="mx-auto text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Your wishlist is empty</h2>
        <p className="text-gray-500 mb-6">Save your favorite items to buy them later</p>
        <Link
          to="/products"
          className="inline-block px-8 py-3 bg-pink-500 text-white font-semibold rounded-lg hover:bg-pink-600 transition-colors"
        >
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold font-playfair mb-6">
        My Wishlist ({wishlistProducts.length} items)
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlistProducts.map(product => (
          <div key={product.id} className="bg-white rounded-xl border shadow-sm overflow-hidden">
            <Link to={`/product/${product.id}`} className="block aspect-[3/4] overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </Link>
            <div className="p-4">
              <Link to={`/product/${product.id}`}>
                <h3 className="font-medium text-gray-800 line-clamp-1 hover:text-pink-500">{product.name}</h3>
              </Link>
              <div className="flex items-center gap-2 mt-2">
                <span className="font-bold text-lg">₹{product.price}</span>
                <span className="text-sm text-gray-400 line-through">₹{product.originalPrice}</span>
                <span className="text-sm text-green-600">{product.discount}% off</span>
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => addToCart(product, product.sizes[0], product.colors[0])}
                  className="flex-1 py-2 bg-pink-500 text-white rounded-lg text-sm font-medium hover:bg-pink-600 flex items-center justify-center gap-1"
                >
                  <ShoppingBag size={14} /> Add to Bag
                </button>
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="w-10 h-10 border-2 border-red-200 rounded-lg flex items-center justify-center text-red-500 hover:bg-red-50"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
