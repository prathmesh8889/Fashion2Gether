import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, Star, Truck, Shield, RotateCcw, Minus, Plus, ShoppingBag, ChevronRight, MessageCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products, addToCart, wishlist, toggleWishlist, storeInfo } = useStore();
  const product = products.find(p => p.id === Number(id));
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return (
      <div className="container-custom py-20 text-center">
        <p className="text-5xl mb-4">😕</p>
        <h2 className="text-2xl font-playfair font-bold mb-2">Product Not Found</h2>
        <Link to="/collections" className="text-[var(--rose)] hover:underline">← Back to Collections</Link>
      </div>
    );
  }

  const isWishlisted = wishlist.includes(product.id);
  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize) { alert('Please select a size'); return; }
    if (!selectedColor) { alert('Please select a color'); return; }
    for (let i = 0; i < quantity; i++) addToCart(product, selectedSize, selectedColor);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleWhatsAppEnquiry = () => {
    const message = `Hi! I'm interested in:\n\n*${product.name}*\nPrice: ₹${product.price}\nSize: ${selectedSize || 'Not selected'}\nColor: ${selectedColor || 'Not selected'}\n\nProduct Link: ${window.location.href}\n\nPlease share more details.`;
    const url = `https://wa.me/${storeInfo.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="bg-[var(--ivory)] min-h-screen">
      <div className="container-custom py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[var(--medium-gray)] mb-6 overflow-x-auto">
          <Link to="/" className="hover:text-[var(--rose)] whitespace-nowrap">Home</Link>
          <ChevronRight size={12} />
          <Link to="/collections" className="hover:text-[var(--rose)] whitespace-nowrap">Collections</Link>
          <ChevronRight size={12} />
          <Link to={`/collections?category=${encodeURIComponent(product.category)}`} className="hover:text-[var(--rose)] whitespace-nowrap">{product.category}</Link>
          <ChevronRight size={12} />
          <span className="text-[var(--charcoal)] truncate">{product.name}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Images */}
          <div>
            <div className="aspect-[3/4] rounded-lg overflow-hidden bg-white border border-[var(--light-gray)] mb-4">
              <img src={product.images[selectedImage] || product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button key={i} onClick={() => setSelectedImage(i)} className={`w-16 h-20 rounded overflow-hidden border-2 transition-colors ${i === selectedImage ? 'border-[var(--rose)]' : 'border-[var(--light-gray)]'}`}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <p className="text-xs uppercase tracking-widest text-[var(--rose)] font-semibold mb-1">{product.category}</p>
            <h1 className="text-2xl md:text-3xl font-playfair font-bold text-[var(--charcoal)] mb-3">{product.name}</h1>
            
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-1 bg-green-600 text-white px-2 py-0.5 rounded text-xs font-bold">
                {product.rating} <Star size={10} className="fill-current" />
              </div>
              <span className="text-sm text-[var(--medium-gray)]">{product.reviews} reviews</span>
            </div>

            <div className="bg-[var(--cream)] rounded-lg p-4 mb-6">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-[var(--charcoal)]">₹{product.price}</span>
                <span className="text-lg text-[var(--medium-gray)] line-through">₹{product.originalPrice}</span>
                <span className="text-sm font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded">{product.discount}% off</span>
              </div>
              <p className="text-xs text-[var(--medium-gray)] mt-1">Inclusive of all taxes</p>
            </div>

            {/* Size */}
            <div className="mb-5">
              <h3 className="font-semibold text-sm mb-3">SELECT SIZE</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <button key={size} onClick={() => setSelectedSize(size)} className={`min-w-[3rem] h-10 rounded border-2 text-sm font-medium transition-all ${selectedSize === size ? 'border-[var(--rose)] bg-[var(--rose)] text-white' : 'border-[var(--light-gray)] hover:border-[var(--rose)]'}`}>
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color */}
            <div className="mb-5">
              <h3 className="font-semibold text-sm mb-3">SELECT COLOR {selectedColor && <span className="font-normal text-[var(--rose)]">— {selectedColor}</span>}</h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map(color => (
                  <button key={color} onClick={() => setSelectedColor(color)} className={`px-4 py-2 rounded border-2 text-sm font-medium transition-all ${selectedColor === color ? 'border-[var(--rose)] bg-[var(--blush)] text-[var(--rose)]' : 'border-[var(--light-gray)] hover:border-[var(--rose)]'}`}>
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <h3 className="font-semibold text-sm mb-3">QUANTITY</h3>
              <div className="flex items-center gap-1 border border-[var(--light-gray)] rounded w-fit">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center hover:bg-[var(--cream)]"><Minus size={14} /></button>
                <span className="w-10 text-center font-semibold">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 flex items-center justify-center hover:bg-[var(--cream)]"><Plus size={14} /></button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mb-4">
              <button onClick={handleAddToCart} className={`flex-1 py-3.5 rounded font-semibold flex items-center justify-center gap-2 transition-all ${addedToCart ? 'bg-green-600 text-white' : 'bg-[var(--rose)] text-white hover:bg-[var(--burgundy)]'}`}>
                <ShoppingBag size={18} />
                {addedToCart ? 'Added ✓' : 'Add to Bag'}
              </button>
              <button onClick={() => toggleWishlist(product.id)} className={`w-12 h-12 rounded border-2 flex items-center justify-center transition-all ${isWishlisted ? 'border-[var(--rose)] bg-[var(--rose)] text-white' : 'border-[var(--light-gray)] hover:border-[var(--rose)]'}`}>
                <Heart size={20} className={isWishlisted ? 'fill-current' : ''} />
              </button>
            </div>

            {/* WhatsApp Enquiry */}
            <button onClick={handleWhatsAppEnquiry} className="w-full py-3.5 bg-green-600 text-white rounded font-semibold flex items-center justify-center gap-2 hover:bg-green-700 transition-colors mb-6">
              <MessageCircle size={18} />
              Enquire on WhatsApp
            </button>

            {/* Features */}
            <div className="border border-[var(--light-gray)] rounded-lg p-4 space-y-3">
              {[
                { icon: Truck, text: 'Free Delivery', sub: 'On orders above ₹999' },
                { icon: RotateCcw, text: 'Easy Returns', sub: '7 days return policy' },
                { icon: Shield, text: '100% Genuine', sub: 'Quality assured' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <item.icon size={18} className="text-[var(--rose)] shrink-0" />
                  <div>
                    <p className="text-sm font-medium">{item.text}</p>
                    <p className="text-xs text-[var(--medium-gray)]">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="mt-6">
              <h3 className="font-semibold text-sm mb-2">Product Description</h3>
              <p className="text-sm text-[var(--medium-gray)] leading-relaxed">{product.description}</p>
            </div>
          </div>
        </div>

        {/* Related */}
        {relatedProducts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-playfair font-bold mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
