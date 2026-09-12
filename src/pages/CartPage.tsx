import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, Tag, ArrowLeft } from 'lucide-react';
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
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <ShoppingBag size={80} className="mx-auto text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Your bag is empty!</h2>
        <p className="text-gray-500 mb-6">Looks like you haven't added anything to your bag yet</p>
        <Link
          to="/products"
          className="inline-block px-8 py-3 bg-pink-500 text-white font-semibold rounded-lg hover:bg-pink-600 transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex items-center gap-3 mb-6">
        <Link to="/products" className="text-gray-500 hover:text-pink-500">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold font-playfair">Shopping Bag ({cart.length} items)</h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map(item => (
            <div key={`${item.product.id}-${item.size}-${item.color}`} className="bg-white rounded-xl p-4 border flex gap-4">
              <Link to={`/product/${item.product.id}`} className="w-24 h-32 rounded-lg overflow-hidden shrink-0">
                <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
              </Link>
              <div className="flex-1 min-w-0">
                <Link to={`/product/${item.product.id}`}>
                  <h3 className="font-medium text-gray-800 line-clamp-1 hover:text-pink-500">{item.product.name}</h3>
                </Link>
                <p className="text-sm text-gray-500 mt-1">Size: {item.size} | Color: {item.color}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="font-bold">₹{item.product.price}</span>
                  <span className="text-sm text-gray-400 line-through">₹{item.product.originalPrice}</span>
                  <span className="text-sm text-green-600">{item.product.discount}% off</span>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-full border flex items-center justify-center hover:border-pink-500"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-full border flex items-center justify-center hover:border-pink-500"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          <button
            onClick={clearCart}
            className="text-sm text-red-500 hover:underline"
          >
            Remove all items
          </button>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl p-6 border sticky top-32">
            <h3 className="text-lg font-bold mb-4">Order Summary</h3>
            
            {/* Coupon */}
            <div className="mb-4">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-pink-500"
                    disabled={couponApplied}
                  />
                </div>
                <button
                  onClick={applyCoupon}
                  disabled={couponApplied}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    couponApplied ? 'bg-green-100 text-green-600' : 'bg-pink-500 text-white hover:bg-pink-600'
                  }`}
                >
                  {couponApplied ? '✓ Applied' : 'Apply'}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">Try: FASHION50 or FIRST100</p>
            </div>

            <div className="space-y-3 border-t pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span>₹{cartTotal}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Coupon Discount</span>
                  <span>-₹{discount}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Delivery</span>
                <span className={deliveryCharge === 0 ? 'text-green-600 font-medium' : ''}>
                  {deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}
                </span>
              </div>
              <div className="border-t pt-3 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₹{finalTotal}</span>
              </div>
              {cartTotal < 999 && (
                <p className="text-xs text-orange-600 bg-orange-50 p-2 rounded">
                  Add ₹{999 - cartTotal} more for FREE delivery!
                </p>
              )}
            </div>

            <Link
              to="/checkout"
              className="block w-full mt-6 py-3.5 bg-pink-500 text-white text-center font-semibold rounded-lg hover:bg-pink-600 transition-colors"
            >
              Proceed to Checkout
            </Link>

            <div className="mt-4 flex items-center justify-center gap-4 text-xs text-gray-500">
              <span>🔒 Secure Payment</span>
              <span>📦 Easy Returns</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
