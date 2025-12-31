import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { saveOrder } from "../api/orderApi.js";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

// Replace with your Stripe public key
const stripePromise = loadStripe("pk_test_51Om8diJsNbczZewUdSZtHpeUV3SgKA5Ts0euC9HyfXX6YLRCfAo9OcC8FsbLB6OeSJtPxdhob5pynwDzWHCPthuq00RyEHaT8p"); // put your real Stripe key here

// Stripe payment form component
const StripePaymentForm = ({ amount, onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setMessage("");

    try {
      // Call backend to create PaymentIntent
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/create-payment-intent`,
        {
          amount: Math.round(amount * 100), // amount in cents
          currency: "usd",
        }
      );

      const clientSecret = data.clientSecret;

      // Confirm card payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        setMessage(result.error.message);
      } else if (result.paymentIntent?.status === "succeeded") {
        setMessage("Payment successful!");
        onPaymentSuccess(); // Save order after payment
      }
    } catch (err) {
      console.error(err);
      setMessage("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <CardElement className="border p-3 rounded-lg" />
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full rounded-2xl bg-accent px-6 py-3 text-white font-semibold hover:bg-accent-dark disabled:opacity-60"
      >
        {loading ? "Processing..." : `Pay $ ${amount}`}
      </button>
      {message && <p className="text-sm mt-2 text-red-500">{message}</p>}
    </form>
  );
};

const Checkout = () => {
  const { items, clear, removeItem, total } = useCart();
  const { token, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    quantity: 1,
  });
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!items || items.length === 0) navigate("/");
  }, [items, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "quantity" ? Number(value) || 1 : value,
    }));
  };

  const handlePaymentSuccess = async () => {
    if (!isAuthenticated) {
      setStatus("Please login to place your order.");
      navigate("/login");
      return;
    }

    try {
      const payloadItems = items.map((i) => ({
        productName: i.productName,
        productId: i.productId,
        designImage: i.designImage,
        templateImage: i.templateImage || "",
        userCustomImage: i.userCustomImage || "",
        customText: i.customText || "",
        price: i.price || 0,
        quantity: i.quantity || 1,
        category: i.category || "phone_case"
      }));

      await saveOrder(
        {
          items: payloadItems,
          fullName: form.fullName,
          email: form.email,
          phone: form.phone,
          address: form.address,
          total,
        },
        token
      );

      clear();
      navigate("/success");
    } catch (error) {
      console.error(error);
      setStatus(error.response?.data?.message || "Unable to place order after payment");
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8 md:flex-row">
      {/* User Details Form */}
      <div className="flex-1 space-y-4">
        <h1 className="text-2xl font-semibold text-slate-800">Checkout</h1>
        <p className="text-sm text-slate-500">
          Review your design, enter your details, and pay securely.
        </p>
        <form className="space-y-4 rounded-3xl bg-white p-6 shadow-sm">
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              type="text"
              name="fullName"
              placeholder="Full name"
              value={form.fullName}
              onChange={handleChange}
              className="rounded-xl border border-slate-200 px-4 py-3 text-sm"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="rounded-xl border border-slate-200 px-4 py-3 text-sm"
              required
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              type="tel"
              name="phone"
              placeholder="Mobile number"
              value={form.phone}
              onChange={handleChange}
              className="rounded-xl border border-slate-200 px-4 py-3 text-sm"
              required
            />
            <input
              type="number"
              name="quantity"
              min="1"
              placeholder="Quantity"
              value={form.quantity}
              onChange={handleChange}
              className="rounded-xl border border-slate-200 px-4 py-3 text-sm"
              required
            />
          </div>
          <textarea
            name="address"
            placeholder="Shipping address"
            value={form.address}
            onChange={handleChange}
            rows="3"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
            required
          />
        </form>

        {status && <p className="text-sm text-red-500">{status}</p>}

        {/* Stripe Payment */}
        <Elements stripe={stripePromise}>
          <StripePaymentForm amount={total} onPaymentSuccess={handlePaymentSuccess} />
        </Elements>
      </div>

      {/* Cart Summary */}
      <div className="flex-1">
        <div className="rounded-3xl bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-800">Your Cart</h2>
            <p className="text-sm font-semibold text-slate-700">Total: $ {total}</p>
          </div>
          <div className="space-y-3">
            {items.map((cartItem, idx) => (
              <div
                key={`${cartItem.productId}-${idx}`}
                className="flex gap-3 rounded-2xl border border-slate-100 p-3"
              >
                <img
                  src={cartItem.designImage}
                  alt={cartItem.productName}
                  className="h-24 w-16 rounded-lg border border-slate-200 object-cover"
                />
                <div className="flex-1 space-y-1 text-sm text-slate-700">
                  <p className="font-semibold text-slate-800">{cartItem.productName}</p>
                  <p className="text-xs text-slate-500">Qty: {cartItem.quantity || 1}</p>
                  <p className="font-semibold text-accent">$ {cartItem.price || 0}</p>
                </div>
                <button
                  onClick={() => removeItem(idx)}
                  className="self-start rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-600 hover:bg-rose-100"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
