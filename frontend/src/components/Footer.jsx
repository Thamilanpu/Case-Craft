import React from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  Sparkles,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  ChevronRight
} from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-b from-[#0a214f] via-[#0f2a63] to-[#0a214f] text-white overflow-hidden">

      {/* Background Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#fe7245]/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-pink-600/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-20 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">

          {/* Brand & Love Message */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#fe7245] to-pink-600 rounded-full flex items-center justify-center shadow-xl">
                <Heart className="w-7 h-7 text-white fill-white" />
              </div>
              <h3 className="text-2xl font-black bg-gradient-to-r from-[#fe7245] to-pink-500 bg-clip-text text-transparent">
                CaseCraft
              </h3>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed">
              We don’t just make phone cases — we help you keep your best friend with you, every single day.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-12 h-12 bg-white/10 backdrop-blur rounded-full flex items-center justify-center hover:bg-[#fe7245] hover:scale-110 transition-all duration-300 shadow-lg">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="w-12 h-12 bg-white/10 backdrop-blur rounded-full flex items-center justify-center hover:bg-[#fe7245] hover:scale-110 transition-all duration-300 shadow-lg">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="w-12 h-12 bg-white/10 backdrop-blur rounded-full flex items-center justify-center hover:bg-[#fe7245] hover:scale-110 transition-all duration-300 shadow-lg">
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold text-[#fe7245] mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Explore
            </h4>
            <ul className="space-y-4">
              {[
                { label: "Home", to: "/" },
                { label: "Custom Phone Cases", to: "/custom-mobilecase" },
                { label: "Pet Gifts", to: "/pet-center" },
                { label: "Start Design", to: "/case-design" },
                { label: "Gallery", to: "/custom-mobilecase#gallery" }
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="group flex items-center gap-3 text-gray-300 hover:text-white transition-all duration-300"
                  >
                    <ChevronRight className="w-4 h-4 text-[#fe7245] group-hover:translate-x-2 transition-transform" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-xl font-bold text-[#fe7245] mb-6">Need Help?</h4>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#fe7245] mt-0.5" />
                <div>
                  <p className="font-medium text-white">Email Us</p>
                  <a href="mailto:hello@petcase.com" className="hover:text-[#fe7245] transition">hello@casecraft.com</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#fe7245] mt-0.5" />
                <div>
                  <p className="font-medium text-white">Call or Text</p>
                  <a href="tel:+1234567890" className="hover:text-[#fe7245] transition">+(61) 123-567-890</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#fe7245] mt-0.5" />
                <div>
                  <p className="font-medium text-white">We’re Online Only</p>
                  <p className="text-sm">Shipping worldwide from the AUSTRALIA</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-1">
            <h4 className="text-xl font-bold text-[#fe7245] mb-4">
              Get First Dibs on New Drops
            </h4>
            <p className="text-gray-300 mb-6">
              Be the first to know about new collections, restocks, and exclusive discounts.
            </p>
            <form className="space-y-4">
              <input
                type="email"
                placeholder="Your email"
                className="
    w-full
    px-4 py-3 md:px-6 md:py-4
    rounded-full
    bg-white/10 backdrop-blur
    border border-white/20
    text-white placeholder-gray-400
    text-sm md:text-base
    focus:outline-none focus:ring-2 focus:ring-[#fe7245]
    transition-all duration-300
  "
              />

              <button
                className="
    w-full
    bg-gradient-to-r from-[#fe7245] to-pink-600
    text-white
    py-3 md:py-4
    rounded-full
    font-bold
    text-sm md:text-base
    shadow-lg md:shadow-xl
    hover:shadow-[#fe7245]/50
    hover:scale-105
    flex items-center justify-center
    gap-2 md:gap-3
    transition-all duration-300
  "
              >
                Subscribe Now
                <Sparkles className="w-4 h-4 md:w-5 md:h-5" />
              </button>

            </form>
            <p className="text-xs text-gray-400 mt-4">
              We respect your inbox. Unsubscribe anytime. No spam, ever.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-10 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <p className="text-gray-400 text-sm">
              © {year} <span className="text-[#fe7245] font-bold">CaseCraft</span>. Made with love for pet parents everywhere.
            </p>
            <div className="flex items-center gap-8 text-sm text-gray-400">
              <Link to="/privacy" className="hover:text-[#fe7245] transition">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-[#fe7245] transition">Terms of Service</Link>
              <Link to="/shipping" className="hover:text-[#fe7245] transition">Shipping Info</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;