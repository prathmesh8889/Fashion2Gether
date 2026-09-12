import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, ShoppingBag, Eye } from 'lucide-react';
import { Product } from '../data/products';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { wishlist, toggleWishlist, addToCart } = useStore();
  const isWishlisted = wishlist.includes(product.id);

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-heavy transition-all duration-500 border border-gray-100/50 card-hover">
      {/* Image Container */}
      <Link to={`/product/${product.id}`} className="block relative overflow-hidden">
        <div className="aspect-[3/4] bg-gradient-to-b from-gray-50 to-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        </div>
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.discount > 0 && (
            <span className="badge-sale">{product.discount}% OFF</span>
          )}
          {product.newArrival && (
            <span className="badge-new">NEW</span>
          )}
          {product.trending && !product.newArrival && (
            <span className="badge-trending">🔥 HOT</span>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300">
          <button
            onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); }}
            className={`w-9 h-9 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 ${
              isWishlisted 
                ? 'bg-pink-500 text-white scale-100' 
                : 'bg-white text-gray-600 hover:bg-pink-500 hover:text-white'
            }`}
          >
            <Heart size={15} className={isWishlisted ? 'fill-current' : ''} />
          </button>
          <button
            onClick={(e) => { e.preventDefault(); }}
            className="w-9 h-9 rounded-full bg-white text-gray-600 flex items-center justify-center shadow-lg hover:bg-purple-500 hover:text-white transition-all duration-200"
          >
            <Eye size={15} />
          </button>
        </div>

        {/* Add to cart button on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={(e) => { e.preventDefault(); addToCart(product, product.sizes[0], product.colors[0]); }}
            className="w-full py-2.5 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-2 shadow-lg hover:shadow-pink-500/30 transition-all"
          >
            <ShoppingBag size={14} /> Add to Bag
          </button>
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4">
        {/* Brand/Category */}
        <p className="text-[10px] uppercase tracking-wider text-pink-500 font-semibold mb-1">{product.category}</p>
        
        {/* Name */}
        <Link to={`/product/${product.id}`}>
          <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 group-hover:text-pink-600 transition-colors leading-snug">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mt-2">
          <div className="flex items-center gap-0.5 bg-green-600 text-white px-1.5 py-0.5 rounded text-[11px] font-bold">
            <span>{product.rating}</span>
            <Star size={10} className="fill-current" />
          </div>
          <span className="text-xs text-gray-400">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-2.5">
          <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
          <span className="text-sm text-gray-400 line-through">₹{product.originalPrice}</span>
          <span className="text-xs font-semibold text-green-600">{product.discount}% off</span>
        </div>

        {/* Colors preview */}
        <div className="flex items-center gap-1 mt-2.5">
          {product.colors.slice(0, 4).map((color, i) => {
            const colorMap: Record<string, string> = {
              'pink': '#ec4899', 'black': '#1a1a1a', 'white': '#f5f5f5', 'red': '#ef4444',
              'blue': '#3b82f6', 'green': '#22c55e', 'navy': '#1e3a5f', 'maroon': '#800000',
              'gold': '#d4a574', 'purple': '#8b5cf6', 'yellow': '#eab308', 'coral': '#f97316',
            };
            const bgColor = colorMap[color.toLowerCase()] || '#9ca3af';
            return (
              <div key={i} className="w-4 h-4 rounded-full border border-gray-200 shadow-sm" 
                style={{ backgroundColor: bgColor }}
              />
            );
          })}
          {product.colors.length > 4 && (
            <span className="text-[10px] text-gray-400">+{product.colors.length - 4}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
