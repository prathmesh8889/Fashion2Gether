import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, Star, Truck, Shield, RotateCcw, Minus, Plus, ShoppingBag, ChevronRight } from 'lucide-react';
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
        <p className="text-5xl mb-4">😕</p>
        <h2 className="text-2xl font-bold mb-2">Product Not Found</h2>
        <Link to="/products" className="text-pink-500 hover:underline">Back to Products</Link>
      </div>
    );
  }

  const isWishlisted = wishlist.includes(product.id);
  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    if (!selectedColor) {
      alert('Please select a color');
      return;
    }
    for (let i = 0; i < quantity; i++) {
      addToCart(product, selectedSize, selectedColor);
    }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-pink-500">Home</Link>
        <ChevronRight size={14} />
        <Link to="/products" className="hover:text-pink-500">Products</Link>
        <ChevronRight size={14} />
        <Link to={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-pink-500">{product.category}</Link>
        <ChevronRight size={14} />
        <span className="text-gray-800">{product.name}</span>
      </div>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Image */}
        <div className="relative">
          <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100 border">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.discount > 0 && (
              <span className="bg-red-500 text-white text-sm px-3 py-1 rounded-full font-medium">
                {product.discount}% OFF
              </span>
            )}
            {product.newArrival && (
              <span className="bg-green-500 text-white text-sm px-3 py-1 rounded-full font-medium">NEW</span>
            )}
          </div>
          {/* Wishlist */}
          <button
            onClick={() => toggleWishlist(product.id)}
            className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all ${
              isWishlisted ? 'bg-pink-500 text-white' : 'bg-white text-gray-600 hover:bg-pink-500 hover:text-white'
            }`}
          >
            <Heart size={20} className={isWishlisted ? 'fill-current' : ''} />
          </button>
        </div>

        {/* Product Info */}
        <div>
          <div className="mb-2">
            <span className="text-sm text-pink-500 font-medium">{product.category}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold font-playfair mb-3">{product.name}</h1>
          
          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1 bg-green-600 text-white px-2 py-0.5 rounded text-sm">
              <span>{product.rating}</span>
              <Star size={12} className="fill-current" />
            </div>
            <span className="text-sm text-gray-500">{product.reviews} Reviews</span>
          </div>

          {/* Price */}
          <div className="mb-6">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold">₹{product.price}</span>
              <span className="text-xl text-gray-400 line-through">₹{product.originalPrice}</span>
              <span className="text-lg text-green-600 font-medium">{product.discount}% off</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">Inclusive of all taxes</p>
          </div>

          {/* Size Selection */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">SELECT SIZE</h3>
            <div className="flex flex-wrap gap-3">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-medium text-sm transition-all ${
                    selectedSize === size
                      ? 'border-pink-500 bg-pink-500 text-white'
                      : 'border-gray-300 hover:border-pink-500'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">SELECT COLOR: <span className="text-pink-500 font-normal">{selectedColor || 'None'}</span></h3>
            <div className="flex flex-wrap gap-3">
              {product.colors.map(color => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 rounded-full border-2 text-sm font-medium transition-all ${
                    selectedColor === color
                      ? 'border-pink-500 bg-pink-50 text-pink-600'
                      : 'border-gray-300 hover:border-pink-500'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">QUANTITY</h3>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-full border-2 flex items-center justify-center hover:border-pink-500 transition-colors"
              >
                <Minus size={16} />
              </button>
              <span className="text-lg font-semibold w-8 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-full border-2 flex items-center justify-center hover:border-pink-500 transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Add to Cart / Buy Now */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={handleAddToCart}
              className={`flex-1 py-3.5 rounded-lg font-semibold text-lg flex items-center justify-center gap-2 transition-all ${
                addedToCart
                  ? 'bg-green-500 text-white'
                  : 'bg-pink-500 text-white hover:bg-pink-600'
              }`}
            >
              <ShoppingBag size={20} />
              {addedToCart ? 'Added ✓' : 'Add to Bag'}
            </button>
            <Link
              to="/cart"
              className="flex-1 py-3.5 rounded-lg font-semibold text-lg border-2 border-pink-500 text-pink-500 hover:bg-pink-50 transition-colors text-center"
            >
              Buy Now
            </Link>
          </div>

          {/* Delivery info */}
          <div className="border rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-3">
              <Truck size={20} className="text-gray-500" />
              <div>
                <p className="text-sm font-medium">Free Delivery</p>
                <p className="text-xs text-gray-500">On orders above ₹999</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <RotateCcw size={20} className="text-gray-500" />
              <div>
                <p className="text-sm font-medium">Easy Returns</p>
                <p className="text-xs text-gray-500">7 days return policy</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Shield size={20} className="text-gray-500" />
              <div>
                <p className="text-sm font-medium">100% Genuine</p>
                <p className="text-xs text-gray-500">Quality assured products</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Product Description</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold font-playfair mb-6">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetailPage;
