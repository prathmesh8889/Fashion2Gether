import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, MessageCircle, CheckCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart, addOrder, storeInfo } = useStore();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', address: '', notes: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const deliveryCharge = cartTotal >= 999 ? 0 : 49;
  const finalTotal = cartTotal + deliveryCharge;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.phone.trim()) errs.phone = 'Phone is required';
    if (!formData.address.trim()) errs.address = 'Address is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    addOrder({
      items: cart,
      customerName: formData.name,
      customerPhone: formData.phone,
      customerAddress: formData.address,
      total: finalTotal,
      notes: formData.notes
    });
    setOrderPlaced(true);
    clearCart();
  };

  const handleWhatsAppOrder = () => {
    let message = `🛍️ *New Order Request from Fashion2gether Website*\n\n`;
    message += `*Customer:* ${formData.name}\n*Phone:* ${formData.phone}\n*Address:* ${formData.address}\n\n`;
    message += `*Items:*\n`;
    cart.forEach((item, i) => {
      message += `${i + 1}. ${item.product.name}\n   Size: ${item.size} | Color: ${item.color} | Qty: ${item.quantity} | ₹${item.product.price * item.quantity}\n`;
    });
    message += `\n*Subtotal:* ₹${cartTotal}\n*Delivery:* ${deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}\n*Total:* ₹${finalTotal}`;
    if (formData.notes) message += `\n\n*Notes:* ${formData.notes}`;
    const url = `https://wa.me/${storeInfo.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  if (orderPlaced) {
    return (
      <div className="container-custom py-20 text-center">
        <CheckCircle size={80} className="mx-auto text-green-500 mb-6" />
        <h2 className="text-2xl font-playfair font-bold mb-2">Order Request Submitted!</h2>
        <p className="text-[var(--medium-gray)] mb-4">Thank you! We'll confirm your order via WhatsApp shortly.</p>
        <div className="bg-[var(--cream)] rounded-lg p-4 max-w-md mx-auto mb-6 text-sm text-left">
          <p className="font-semibold mb-2">What happens next?</p>
          <p className="text-[var(--medium-gray)]">• Our team will review your order request</p>
          <p className="text-[var(--medium-gray)]">• We'll confirm availability and total on WhatsApp</p>
          <p className="text-[var(--medium-gray)]">• Payment will be collected via UPI/COD after confirmation</p>
        </div>
        <Link to="/collections" className="inline-flex items-center gap-2 px-8 py-3 bg-[var(--rose)] text-white rounded font-medium hover:bg-[var(--burgundy)] transition-colors">
          Continue Shopping
        </Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="container-custom py-20 text-center">
        <div className="w-20 h-20 bg-[var(--cream)] rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingBag size={32} className="text-[var(--rose)]" />
        </div>
        <h2 className="text-2xl font-playfair font-bold mb-2">Your bag is empty</h2>
        <p className="text-[var(--medium-gray)] mb-6">Explore our collections and add your favorites</p>
        <Link to="/collections" className="inline-flex items-center gap-2 px-8 py-3 bg-[var(--rose)] text-white rounded font-medium hover:bg-[var(--burgundy)] transition-colors">
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[var(--ivory)] min-h-screen">
      <div className="container-custom py-6">
        <div className="flex items-center gap-3 mb-8">
          <Link to="/collections" className="w-10 h-10 rounded-full bg-white border border-[var(--light-gray)] flex items-center justify-center hover:border-[var(--rose)] transition-colors">
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-2xl font-playfair font-bold">Shopping Bag</h1>
            <p className="text-sm text-[var(--medium-gray)]">{cart.length} item{cart.length > 1 ? 's' : ''}</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map(item => (
              <div key={`${item.product.id}-${item.size}-${item.color}`} className="bg-white rounded-lg p-4 border border-[var(--light-gray)] flex gap-4">
                <Link to={`/product/${item.product.id}`} className="w-20 h-24 md:w-24 md:h-28 rounded overflow-hidden shrink-0 bg-[var(--cream)]">
                  <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link to={`/product/${item.product.id}`}><h3 className="font-semibold text-sm line-clamp-1 hover:text-[var(--rose)]">{item.product.name}</h3></Link>
                  <p className="text-xs text-[var(--medium-gray)] mt-1">Size: {item.size} | Color: {item.color}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-bold">₹{item.product.price}</span>
                    <span className="text-xs text-[var(--medium-gray)] line-through">₹{item.product.originalPrice}</span>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-[var(--light-gray)] rounded">
                      <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center hover:bg-[var(--cream)]"><Minus size={12} /></button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center hover:bg-[var(--cream)]"><Plus size={12} /></button>
                    </div>
                    <button onClick={() => removeFromCart(item.product.id)} className="text-[var(--medium-gray)] hover:text-red-500 p-1"><Trash2 size={16} /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-5 border border-[var(--light-gray)] sticky top-36">
              <h3 className="font-bold text-lg mb-4">Order Summary</h3>
              <div className="space-y-2 mb-4 text-sm">
                <div className="flex justify-between"><span className="text-[var(--medium-gray)]">Subtotal</span><span>₹{cartTotal}</span></div>
                <div className="flex justify-between"><span className="text-[var(--medium-gray)]">Delivery</span><span className={deliveryCharge === 0 ? 'text-green-600 font-medium' : ''}>{deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}</span></div>
                <div className="border-t border-[var(--light-gray)] pt-2 flex justify-between font-bold text-lg"><span>Total</span><span>₹{finalTotal}</span></div>
              </div>

              <form onSubmit={handleSubmitOrder} className="space-y-3 mb-4">
                <div>
                  <input type="text" placeholder="Full Name *" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className={`w-full px-3 py-2.5 bg-[var(--cream)] border rounded text-sm focus:outline-none focus:border-[var(--rose)] ${errors.name ? 'border-red-400' : 'border-[var(--light-gray)]'}`} />
                  {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                </div>
                <div>
                  <input type="tel" placeholder="Phone Number *" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className={`w-full px-3 py-2.5 bg-[var(--cream)] border rounded text-sm focus:outline-none focus:border-[var(--rose)] ${errors.phone ? 'border-red-400' : 'border-[var(--light-gray)]'}`} />
                  {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <textarea placeholder="Delivery Address *" rows={2} value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} className={`w-full px-3 py-2.5 bg-[var(--cream)] border rounded text-sm focus:outline-none focus:border-[var(--rose)] resize-none ${errors.address ? 'border-red-400' : 'border-[var(--light-gray)]'}`} />
                  {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
                </div>
                <input type="text" placeholder="Notes (optional)" value={formData.notes} onChange={(e) => setFormData({...formData, notes: e.target.value})} className="w-full px-3 py-2.5 bg-[var(--cream)] border border-[var(--light-gray)] rounded text-sm focus:outline-none focus:border-[var(--rose)]" />
              </form>

              <button onClick={handleSubmitOrder} className="w-full py-3 bg-[var(--rose)] text-white rounded font-semibold hover:bg-[var(--burgundy)] transition-colors mb-2">
                Submit Order Request
              </button>
              <button onClick={handleWhatsAppOrder} className="w-full py-3 bg-green-600 text-white rounded font-semibold flex items-center justify-center gap-2 hover:bg-green-700 transition-colors">
                <MessageCircle size={16} /> Send via WhatsApp
              </button>
              <p className="text-[10px] text-[var(--medium-gray)] text-center mt-3">
                This is an order request, not a confirmed purchase. We'll confirm availability via WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
