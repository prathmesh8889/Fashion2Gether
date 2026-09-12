import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star } from 'lucide-react';
import { Product } from '../data/products';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { wishlist, toggleWishlist } = useStore();
  const isWishlisted = wishlist.includes(product.id);

  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
      <Link to={`/product/${product.id}`} className="block relative">
        <div className="aspect-[3/4] overflow-hidden bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.discount > 0 && (
            <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded font-medium">
              {product.discount}% OFF
            </span>
          )}
          {product.newArrival && (
            <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded font-medium">
              NEW
            </span>
          )}
          {product.trending && (
            <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded font-medium">
              🔥 HOT
            </span>
          )}
        </div>
        {/* Wishlist button */}
        <button
          onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); }}
          className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            isWishlisted ? 'bg-pink-500 text-white' : 'bg-white/80 text-gray-600 hover:bg-pink-500 hover:text-white'
          }`}
        >
          <Heart size={16} className={isWishlisted ? 'fill-current' : ''} />
        </button>
      </Link>
      <div className="p-3">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-sm font-medium text-gray-800 line-clamp-2 group-hover:text-pink-500 transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-1 mt-1">
          <Star size={12} className="fill-yellow-400 text-yellow-400" />
          <span className="text-xs text-gray-600">{product.rating}</span>
          <span className="text-xs text-gray-400">({product.reviews})</span>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
          <span className="text-sm text-gray-400 line-through">₹{product.originalPrice}</span>
        </div>
        <div className="mt-1">
          <span className="text-xs text-green-600 font-medium">
            Save ₹{product.originalPrice - product.price}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
