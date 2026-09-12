import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, Star, Truck, Shield, RotateCcw, Minus, Plus, ShoppingBag, ChevronRight, Check } from 'lucide-react';
import { products } from '../data/products';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find(p => p.id === Number(id));
  const { addToCart, wishlist, toggleWishlist } = useStore();
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-6xl mb-4">😕</p>
        <h2 className="text-2xl font-bold mb-2 font-playfair">Product Not Found</h2>
        <Link to="/products" className="text-pink-500 hover:underline font-medium">← Back to Products</Link>
      </div>
    );
  }

  const isWishlisted = wishlist.includes(product.id);
  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize) { alert('Please select a size'); return; }
    if (!selectedColor) { alert('Please select a color'); return; }
    for (let i = 0; i < quantity; i++) { addToCart(product, selectedSize, selectedColor); }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 bg-[#faf7f5] min-h-screen">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-8 overflow-x-auto scrollbar-hide">
        <Link to="/" className="hover:text-pink-500 whitespace-nowrap">Home</Link>
        <ChevronRight size={14} />
        <Link to="/products" className="hover:text-pink-500 whitespace-nowrap">Products</Link>
        <ChevronRight size={14} />
        <Link to={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-pink-500 whitespace-nowrap">{product.category}</Link>
        <ChevronRight size={14} />
        <span className="text-gray-800 font-medium truncate">{product.name}</span>
      </div>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
        {/* Product Image */}
        <div className="relative">
          <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-white border border-gray-100 shadow-medium">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.discount > 0 && <span className="badge-sale">{product.discount}% OFF</span>}
            {product.newArrival && <span className="badge-new">NEW ARRIVAL</span>}
          </div>
          {/* Wishlist */}
          <button
            onClick={() => toggleWishlist(product.id)}
            className={`absolute top-4 right-4 w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-all ${
              isWishlisted ? 'bg-pink-500 text-white' : 'bg-white text-gray-600 hover:bg-pink-500 hover:text-white'
            }`}
          >
            <Heart size={20} className={isWishlisted ? 'fill-current' : ''} />
          </button>
        </div>

        {/* Product Info */}
        <div className="py-2">
          <span className="text-xs uppercase tracking-widest text-pink-500 font-semibold">{product.category} • {product.subCategory}</span>
          <h1 className="text-3xl md:text-4xl font-bold font-playfair mt-2 mb-3 text-[#1a1a2e]">{product.name}</h1>
          
          {/* Rating */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex items-center gap-1 bg-green-600 text-white px-2.5 py-1 rounded-lg text-sm font-bold">
              <span>{product.rating}</span>
              <Star size={13} className="fill-current" />
            </div>
            <span className="text-sm text-gray-500">{product.reviews} Reviews</span>
            <span className="text-sm text-green-600 font-medium">✓ Verified</span>
          </div>

          {/* Price */}
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-5 mb-6">
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-[#1a1a2e]">₹{product.price}</span>
              <span className="text-xl text-gray-400 line-through">₹{product.originalPrice}</span>
              <span className="text-lg font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-lg">{product.discount}% off</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">Inclusive of all taxes | You save ₹{product.originalPrice - product.price}</p>
          </div>

          {/* Size Selection */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-sm uppercase tracking-wider">Select Size</h3>
              <button className="text-xs text-pink-500 font-medium hover:underline">Size Guide</button>
            </div>
            <div className="flex flex-wrap gap-3">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`min-w-[3rem] h-12 rounded-xl border-2 flex items-center justify-center font-semibold text-sm transition-all duration-200 ${
                    selectedSize === size
                      ? 'border-pink-500 bg-pink-500 text-white shadow-lg shadow-pink-500/20'
                      : 'border-gray-200 hover:border-pink-400 bg-white'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div className="mb-6">
            <h3 className="font-bold text-sm uppercase tracking-wider mb-3">
              Select Color {selectedColor && <span className="text-pink-500 normal-case font-normal">— {selectedColor}</span>}
            </h3>
            <div className="flex flex-wrap gap-2">
              {product.colors.map(color => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2.5 rounded-xl border-2 text-sm font-medium transition-all duration-200 ${
                    selectedColor === color
                      ? 'border-pink-500 bg-pink-50 text-pink-600 shadow-sm'
                      : 'border-gray-200 hover:border-pink-400 bg-white'
                  }`}
                >
                  {selectedColor === color && <Check size={12} className="inline mr-1" />}
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-8">
            <h3 className="font-bold text-sm uppercase tracking-wider mb-3">Quantity</h3>
            <div className="flex items-center gap-1 bg-gray-50 rounded-xl p-1 w-fit border border-gray-200">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-white transition-colors">
                <Minus size={16} />
              </button>
              <span className="w-12 text-center font-bold text-lg">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-white transition-colors">
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Add to Cart / Buy Now */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={handleAddToCart}
              className={`flex-1 py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 transition-all duration-300 ${
                addedToCart ? 'bg-green-500 text-white shadow-lg shadow-green-500/20' : 'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:shadow-xl hover:shadow-pink-500/20 hover:-translate-y-0.5'
              }`}
            >
              <ShoppingBag size={20} />
              {addedToCart ? 'Added to Bag ✓' : 'Add to Bag'}
            </button>
            <Link to="/cart" className="flex-1 py-4 rounded-2xl font-bold text-base border-2 border-[#1a1a2e] text-[#1a1a2e] hover:bg-[#1a1a2e] hover:text-white transition-all text-center">
              Buy Now
            </Link>
          </div>

          {/* Delivery info */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-soft">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <Truck size={22} className="mx-auto text-pink-500 mb-2" />
                <p className="text-xs font-semibold">Free Delivery</p>
                <p className="text-[10px] text-gray-400">Above ₹999</p>
              </div>
              <div className="text-center border-x border-gray-100">
                <RotateCcw size={22} className="mx-auto text-purple-500 mb-2" />
                <p className="text-xs font-semibold">Easy Returns</p>
                <p className="text-[10px] text-gray-400">7 days policy</p>
              </div>
              <div className="text-center">
                <Shield size={22} className="mx-auto text-green-500 mb-2" />
                <p className="text-xs font-semibold">100% Genuine</p>
                <p className="text-[10px] text-gray-400">Quality assured</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mt-6 bg-white rounded-2xl p-5 border border-gray-100">
            <h3 className="font-bold mb-2">Product Description</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold font-playfair text-[#1a1a2e]">You May Also Like</h2>
            <div className="section-divider"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {relatedProducts.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetailPage;
