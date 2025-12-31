import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserSidebar from "../../components/UserSidebar.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { useCart } from "../../context/CartContext.jsx";
import { ShoppingCart, Trash2, ArrowRight, Sparkles, Package, X, Plus, Minus } from "lucide-react";

const MyCart = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { items, clear, removeItem, updateQuantity, total } = useCart();
  const [removingIndex, setRemovingIndex] = useState(null);



  if (!items || items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
        <div className="mx-auto flex max-w-8xl flex-col gap-6 px-4 py-6 lg:py-8 md:flex-row">
          <UserSidebar />
          <main className="flex-1 space-y-6">
            <div>
              <h1 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-3xl font-bold text-transparent lg:text-4xl h-14">
                My Cart
              </h1>
              <p className="mt-3 text-lg text-slate-600">Your cart items will appear here</p>
            </div>
            <div className="group rounded-3xl border border-slate-200/60 bg-white p-12 text-center shadow-xl shadow-slate-200/50 backdrop-blur-sm transition-all hover:shadow-2xl hover:shadow-slate-300/50">
              <div className="mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-1 shadow-lg shadow-purple-500/30 transition-transform group-hover:scale-105">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-white">
                  <ShoppingCart className="h-16 w-16 text-purple-600" strokeWidth={1.5} />
                </div>
              </div>
              <h3 className="mb-3 text-2xl font-bold text-slate-800">Your cart is empty</h3>
              <p className="mb-8 max-w-md mx-auto text-slate-600">
                Start designing a custom phone cover to add items to your cart and bring your ideas to life.
              </p>
              <button
                onClick={() => navigate("/design")}
                className="group/btn inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-purple-500/30 transition-all hover:scale-105 hover:shadow-xl hover:shadow-purple-500/50"
              >
                <Sparkles className="h-5 w-5 transition-transform group-hover/btn:rotate-12" />
                Create a Design
                <ArrowRight className="h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
              </button>
            </div>
          </main>
        </div>
      </div>
    );
  }

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleQuantityChange = (idx, delta) => {
    const item = items[idx];
    const newQuantity = item.quantity + delta;
    if (newQuantity >= 1) {
      updateQuantity(idx, newQuantity);
    }
  };

  const handleRemoveItem = (idx) => {
    setRemovingIndex(idx);
    setTimeout(() => {
      removeItem(idx);
      setRemovingIndex(null);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
      <div className="mx-auto flex max-w-8xl flex-col gap-6 px-4 py-6 lg:py-8 md:flex-row">
        <UserSidebar />
        <main className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent lg:text-3xl h-14">
                My Cart
              </h1>
              <p className="mt-3 text-lg text-slate-600">
                {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
              </p>
            </div>
            <button
              onClick={() => {
                if (window.confirm("Remove all items from cart?")) clear();
              }}
              className="hidden md:flex items-center gap-2 rounded-full border-2 border-rose-200 bg-rose-50 px-6 py-3 text-sm font-semibold text-rose-600 transition-all hover:border-rose-300 hover:bg-rose-100 hover:scale-105"
            >
              <Trash2 className="h-4 w-4" />
              Clear Cart
            </button>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="space-y-4 lg:col-span-2">
              {items.map((item, idx) => (
                <div
                  key={idx}
                  className={`group rounded-2xl border border-slate-200/60 bg-white shadow-lg shadow-slate-200/50 backdrop-blur-sm transition-all hover:shadow-xl hover:shadow-slate-300/50 ${removingIndex === idx ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                    }`}
                >
                  <div className="flex flex-col gap-6 p-6 md:flex-row">
                    {/* Image */}
                    <div className="relative flex-shrink-0">
                      <div className="overflow-hidden rounded-xl bg-gradient-to-br from-slate-900 to-slate-700 p-4 shadow-inner">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10"></div>
                        <img
                          src={item.designImage}
                          alt={item.phoneModel}
                          className="relative z-10 h-48 w-full rounded-lg object-cover shadow-2xl transition-transform group-hover:scale-105 md:w-40"
                        />
                      </div>
                      <div className="absolute -right-2 -top-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-3 py-1 text-xs font-bold text-white shadow-lg">
                        Custom
                      </div>
                    </div>

                    {/* Details */}
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-bold text-slate-800">{item.phoneModel}</h3>
                            <p className="mt-1 text-sm text-slate-500">Custom Phone Cover Design</p>
                          </div>
                          <button
                            onClick={() => handleRemoveItem(idx)}
                            className="rounded-full p-2 text-slate-400 transition-all hover:bg-rose-50 hover:text-rose-600 hover:scale-110"
                            title="Remove item"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </div>

                        <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-2 text-sm">
                          <Package className="h-4 w-4 text-purple-600" />
                          <span className="font-semibold text-slate-700">Ships in 3-5 days</span>
                        </div>
                      </div>

                      {/* Quantity and Price */}
                      <div className="mt-6 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-semibold text-slate-600">Quantity:</span>
                          <div className="flex items-center gap-2 rounded-full border-2 border-slate-200 bg-slate-50 p-1">
                            <button
                              onClick={() => handleQuantityChange(idx, -1)}
                              disabled={item.quantity === 1}
                              className="rounded-full p-1.5 text-slate-600 transition-all hover:bg-white hover:text-purple-600 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-slate-600"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="min-w-[2rem] text-center text-sm font-bold text-slate-800">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleQuantityChange(idx, 1)}
                              className="rounded-full p-1.5 text-slate-600 transition-all hover:bg-white hover:text-purple-600"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-slate-500">$ {item.price} each</p>
                          <p className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            $ {(item.price * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary - Sticky */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-4">
                <div className="overflow-hidden rounded-2xl border border-slate-200/60 bg-white shadow-lg shadow-slate-200/50 backdrop-blur-sm">
                  <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-6">
                    <h2 className="text-xl font-bold text-white">Order Summary</h2>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between text-slate-600">
                        <span>Subtotal ({itemCount} items)</span>
                        <span className="font-semibold text-slate-800">$ {total.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>Shipping</span>
                        <span className="font-semibold text-green-600">Free</span>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>Tax</span>
                        <span className="font-semibold text-slate-800">Calculated at checkout</span>
                      </div>
                    </div>

                    <div className="border-t-2 border-dashed border-slate-200 pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-slate-800">Total</span>
                        <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                          $ {total.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => navigate("/checkout")}
                      className="group/btn w-full rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-purple-500/30 transition-all hover:scale-105 hover:shadow-xl hover:shadow-purple-500/50"
                    >
                      <span className="flex items-center justify-center gap-2">
                        Proceed to Checkout
                        <ArrowRight className="h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
                      </span>
                    </button>

                    <button
                      onClick={() => navigate("/")}
                      className="w-full rounded-full border-2 border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-50 hover:scale-105"
                    >
                      Add More Designs
                    </button>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-lg shadow-slate-200/50">
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                        <span className="text-lg">✓</span>
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800">Secure Payment</p>
                        <p className="text-xs text-slate-500">SSL encrypted checkout</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                        <span className="text-lg">🚚</span>
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800">Free Shipping</p>
                        <p className="text-xs text-slate-500">On all orders</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                        <span className="text-lg">↩️</span>
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800">Easy Returns</p>
                        <p className="text-xs text-slate-500">30-day return policy</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Clear Cart Button */}
          <div className="md:hidden">
            <button
              onClick={() => {
                if (window.confirm("Remove all items from cart?")) clear();
              }}
              className="w-full flex items-center justify-center gap-2 rounded-full border-2 border-rose-200 bg-rose-50 px-6 py-3 text-sm font-semibold text-rose-600 transition-all hover:border-rose-300 hover:bg-rose-100"
            >
              <Trash2 className="h-4 w-4" />
              Clear Cart
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MyCart;