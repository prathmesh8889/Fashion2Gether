import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CreditCard, MapPin, ArrowLeft, CheckCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const CheckoutPage: React.FC = () => {
  const { cart, cartTotal, clearCart, isLoggedIn } = useStore();
  const navigate = useNavigate();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', address: '', city: '', state: '', pincode: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('cod');

  const deliveryCharge = cartTotal >= 999 ? 0 : 49;
  const finalTotal = cartTotal + deliveryCharge;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderPlaced(true);
    clearCart();
  };

  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Please login to continue</h2>
        <p className="text-gray-500 mb-6">You need to login before placing an order</p>
        <Link to="/login" className="px-8 py-3 bg-pink-500 text-white font-semibold rounded-lg hover:bg-pink-600">
          Login Now
        </Link>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <CheckCircle size={80} className="mx-auto text-green-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Order Placed Successfully! 🎉</h2>
        <p className="text-gray-500 mb-2">Thank you for shopping with Fashion2gether</p>
        <p className="text-sm text-gray-400 mb-6">Order ID: #F2G{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</p>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 text-sm text-green-700">
          <p>✓ Your order has been confirmed</p>
          <p>✓ You'll receive a confirmation on WhatsApp</p>
          <p>✓ Estimated delivery: 3-5 business days</p>
        </div>
        <Link to="/products" className="px-8 py-3 bg-pink-500 text-white font-semibold rounded-lg hover:bg-pink-600 inline-block">
          Continue Shopping
        </Link>
      </div>
    );
  }

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex items-center gap-3 mb-6">
        <Link to="/cart" className="text-gray-500 hover:text-pink-500">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold font-playfair">Checkout</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Address */}
            <div className="bg-white rounded-xl border p-6">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <MapPin size={20} className="text-pink-500" /> Shipping Address
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border-2 rounded-lg px-4 py-2.5 focus:border-pink-500 focus:outline-none"
                    placeholder="Enter full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full border-2 rounded-lg px-4 py-2.5 focus:border-pink-500 focus:outline-none"
                    placeholder="Enter phone number"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full border-2 rounded-lg px-4 py-2.5 focus:border-pink-500 focus:outline-none"
                    placeholder="Enter email"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Address *</label>
                  <textarea
                    required
                    rows={2}
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full border-2 rounded-lg px-4 py-2.5 focus:border-pink-500 focus:outline-none resize-none"
                    placeholder="Enter complete address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">City *</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full border-2 rounded-lg px-4 py-2.5 focus:border-pink-500 focus:outline-none"
                    placeholder="City"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">State *</label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full border-2 rounded-lg px-4 py-2.5 focus:border-pink-500 focus:outline-none"
                    placeholder="State"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Pincode *</label>
                  <input
                    type="text"
                    required
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    className="w-full border-2 rounded-lg px-4 py-2.5 focus:border-pink-500 focus:outline-none"
                    placeholder="Pincode"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-xl border p-6">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <CreditCard size={20} className="text-pink-500" /> Payment Method
              </h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer hover:border-pink-500 transition-colors">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-pink-500"
                  />
                  <div>
                    <p className="font-medium text-sm">Cash on Delivery (COD)</p>
                    <p className="text-xs text-gray-500">Pay when your order arrives</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer hover:border-pink-500 transition-colors">
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={paymentMethod === 'upi'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-pink-500"
                  />
                  <div>
                    <p className="font-medium text-sm">UPI Payment</p>
                    <p className="text-xs text-gray-500">GPay, PhonePe, Paytm</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer hover:border-pink-500 transition-colors">
                  <input
                    type="radio"
                    name="payment"
                    value="bank"
                    checked={paymentMethod === 'bank'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-pink-500"
                  />
                  <div>
                    <p className="font-medium text-sm">Bank Transfer</p>
                    <p className="text-xs text-gray-500">Direct bank transfer</p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border p-6 sticky top-32">
              <h3 className="font-bold text-lg mb-4">Order Summary</h3>
              <div className="space-y-3 mb-4">
                {cart.map(item => (
                  <div key={item.product.id} className="flex items-center gap-3">
                    <img src={item.product.image} alt={item.product.name} className="w-12 h-12 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium line-clamp-1">{item.product.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity} | {item.size}</p>
                    </div>
                    <span className="text-sm font-medium">₹{item.product.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span>₹{cartTotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery</span>
                  <span className={deliveryCharge === 0 ? 'text-green-600 font-medium' : ''}>
                    {deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}
                  </span>
                </div>
                <div className="border-t pt-2 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹{finalTotal}</span>
                </div>
              </div>
              <button
                type="submit"
                className="w-full mt-6 py-3.5 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
              >
                Place Order - ₹{finalTotal}
              </button>
              <p className="text-xs text-gray-500 text-center mt-3">
                🔒 Your payment information is secure
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
