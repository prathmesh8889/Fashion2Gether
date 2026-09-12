import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, ShoppingBag } from 'lucide-react';
import { Product } from '../data/products';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { wishlist, toggleWishlist, addToCart } = useStore();
  const isWishlisted = wishlist.includes(product.id);

  return (
    <div className="group card-hover bg-white rounded-lg overflow-hidden border border-[var(--light-gray)]">
      <Link to={`/product/${product.id}`} className="block relative overflow-hidden">
        <div className="aspect-[3/4] bg-[var(--cream)]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="500" fill="%23f5f0eb"><rect width="400" height="500"/><text x="50%" y="50%" text-anchor="middle" fill="%23999" font-size="14">Image unavailable</text></svg>';
            }}
          />
        </div>
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.discount > 0 && <span className="badge badge-sale">{product.discount}% OFF</span>}
          {product.newArrival && <span className="badge badge-new">NEW</span>}
        </div>
        {/* Wishlist */}
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(product.id); }}
          className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all ${isWishlisted ? 'bg-[var(--rose)] text-white' : 'bg-white/90 text-gray-600 opacity-0 group-hover:opacity-100 hover:bg-[var(--rose)] hover:text-white'}`}
          aria-label="Add to wishlist"
        >
          <Heart size={14} className={isWishlisted ? 'fill-current' : ''} />
        </button>
        {/* Quick Add */}
        <div className="absolute bottom-0 left-0 right-0 p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToCart(product, product.sizes[0], product.colors[0]); }}
            className="w-full py-2 bg-[var(--charcoal)] text-white text-xs font-medium rounded flex items-center justify-center gap-1.5 hover:bg-[var(--rose)] transition-colors"
          >
            <ShoppingBag size={12} /> Quick Add
          </button>
        </div>
      </Link>
      <div className="p-3">
        <p className="text-[10px] uppercase tracking-wider text-[var(--rose)] font-semibold mb-0.5">{product.category}</p>
        <Link to={`/product/${product.id}`}>
          <h3 className="text-sm font-medium text-[var(--charcoal)] line-clamp-2 group-hover:text-[var(--rose)] transition-colors leading-snug">{product.name}</h3>
        </Link>
        <div className="flex items-center gap-1 mt-1.5">
          <Star size={11} className="fill-yellow-400 text-yellow-400" />
          <span className="text-xs text-[var(--medium-gray)]">{product.rating} ({product.reviews})</span>
        </div>
        <div className="flex items-baseline gap-2 mt-1.5">
          <span className="text-base font-bold text-[var(--charcoal)]">₹{product.price}</span>
          <span className="text-xs text-[var(--medium-gray)] line-through">₹{product.originalPrice}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
