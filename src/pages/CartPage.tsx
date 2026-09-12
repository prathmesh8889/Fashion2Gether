import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, Tag, ArrowLeft, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useStore();
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [discount, setDiscount] = useState(0);

  const deliveryCharge = cartTotal >= 999 ? 0 : 49;
  const finalTotal = cartTotal - discount + deliveryCharge;

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === 'FASHION50') {
      setDiscount(Math.round(cartTotal * 0.1));
      setCouponApplied(true);
    } else if (couponCode.toUpperCase() === 'FIRST100') {
      setDiscount(100);
      setCouponApplied(true);
    } else {
      alert('Invalid coupon code');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center bg-[#faf7f5] min-h-[70vh]">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={40} className="text-pink-300" />
          </div>
          <h2 className="text-2xl font-bold font-playfair mb-2 text-[#1a1a2e]">Your bag is empty!</h2>
          <p className="text-gray-500 mb-8">Looks like you haven't added anything to your bag yet</p>
          <Link to="/products" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-full hover:shadow-xl hover:shadow-pink-500/20 transition-all">
            <Sparkles size={18} /> Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 bg-[#faf7f5] min-h-screen">
      <div className="flex items-center gap-3 mb-8">
        <Link to="/products" className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-pink-500 hover:border-pink-300 transition-colors">
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold font-playfair text-[#1a1a2e]">Shopping Bag</h1>
          <p className="text-sm text-gray-500">{cart.length} item{cart.length > 1 ? 's' : ''} in your bag</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map(item => (
            <div key={`${item.product.id}-${item.size}-${item.color}`} className="bg-white rounded-2xl p-4 md:p-5 border border-gray-100 shadow-soft flex gap-4 hover:shadow-medium transition-all">
              <Link to={`/product/${item.product.id}`} className="w-24 h-28 md:w-28 md:h-32 rounded-xl overflow-hidden shrink-0 bg-gray-50">
                <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
              </Link>
              <div className="flex-1 min-w-0">
                <Link to={`/product/${item.product.id}`}>
                  <h3 className="font-semibold text-gray-800 line-clamp-1 hover:text-pink-500 transition-colors">{item.product.name}</h3>
                </Link>
                <p className="text-xs text-gray-500 mt-1">Size: <span className="font-medium text-gray-700">{item.size}</span> | Color: <span className="font-medium text-gray-700">{item.color}</span></p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="font-bold text-lg">₹{item.product.price}</span>
                  <span className="text-sm text-gray-400 line-through">₹{item.product.originalPrice}</span>
                  <span className="text-xs text-green-600 font-semibold bg-green-50 px-2 py-0.5 rounded-full">{item.product.discount}% off</span>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-1 bg-gray-50 rounded-lg p-0.5 border border-gray-200">
                    <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="w-8 h-8 rounded-md flex items-center justify-center hover:bg-white transition-colors">
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center font-bold text-sm">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="w-8 h-8 rounded-md flex items-center justify-center hover:bg-white transition-colors">
                      <Plus size={14} />
                    </button>
                  </div>
                  <button onClick={() => removeFromCart(item.product.id)} className="text-gray-300 hover:text-red-500 transition-colors p-2">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          <button onClick={clearCart} className="text-sm text-red-400 hover:text-red-500 font-medium transition-colors">
            Remove all items
          </button>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-soft sticky top-32">
            <h3 className="text-lg font-bold mb-5 flex items-center gap-2">
              Order Summary
              <span className="text-xs bg-pink-50 text-pink-500 px-2 py-0.5 rounded-full font-medium">{cart.length} items</span>
            </h3>
            
            {/* Coupon */}
            <div className="mb-5">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/10"
                    disabled={couponApplied}
                  />
                </div>
                <button
                  onClick={applyCoupon}
                  disabled={couponApplied}
                  className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    couponApplied ? 'bg-green-50 text-green-600 border border-green-200' : 'bg-[#1a1a2e] text-white hover:bg-[#2d2d4e]'
                  }`}
                >
                  {couponApplied ? '✓' : 'Apply'}
                </button>
              </div>
              <p className="text-[10px] text-gray-400 mt-1.5">Try: FASHION50 or FIRST100</p>
            </div>

            <div className="space-y-3 border-t border-gray-100 pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-medium">₹{cartTotal}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Coupon Discount</span>
                  <span className="font-medium">-₹{discount}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Delivery</span>
                <span className={deliveryCharge === 0 ? 'text-green-600 font-semibold' : 'font-medium'}>
                  {deliveryCharge === 0 ? 'FREE ✨' : `₹${deliveryCharge}`}
                </span>
              </div>
              <div className="border-t border-gray-100 pt-3 flex justify-between">
                <span className="font-bold text-lg">Total</span>
                <span className="font-bold text-xl text-[#1a1a2e]">₹{finalTotal}</span>
              </div>
              {cartTotal < 999 && (
                <div className="bg-amber-50 border border-amber-100 p-3 rounded-xl">
                  <p className="text-xs text-amber-700">
                    🚚 Add <strong>₹{999 - cartTotal}</strong> more for FREE delivery!
                  </p>
                </div>
              )}
            </div>

            <Link
              to="/checkout"
              className="block w-full mt-6 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-center font-bold rounded-xl hover:shadow-xl hover:shadow-pink-500/20 transition-all hover:-translate-y-0.5"
            >
              Proceed to Checkout →
            </Link>

            <div className="mt-4 flex items-center justify-center gap-4 text-[10px] text-gray-400">
              <span>🔒 Secure Payment</span>
              <span>📦 Easy Returns</span>
              <span>✅ Genuine Products</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
