import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  LayoutDashboard, CreditCard, ShoppingBag, Heart, Smartphone, Package, Users, Menu, X, Home, ShieldCheck, Clock
} from "lucide-react";

const AdminSidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const baseClass =
    "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 group relative";

  const activeClass =
    "text-[#fe7245] bg-transparent hover:bg-gray-50 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-8 before:bg-gradient-to-b before:from-[#fe7245] before:to-[#ff6b3d] before:rounded-r-full";

  const inactiveClass = "text-gray-600 hover:bg-gray-50 hover:text-gray-900";

  const menuItems = [
    {
      to: "/admin/dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5 flex-shrink-0" />,
    },
    {
      to: "/admin/payments",
      label: "Payment Details",
      icon: <CreditCard className="h-5 w-5 flex-shrink-0" />,
    },
    {
      to: "/admin/orders",
      label: "Orders",
      icon: <ShoppingBag className="h-5 w-5 flex-shrink-0" />,
    },
    {
      to: "/admin/pet-orders",
      label: "Pet Orders",
      icon: <Heart className="h-5 w-5 flex-shrink-0" />,
    },
    {
      to: "/admin/models",
      label: "Phone Models",
      icon: <Smartphone className="h-5 w-5 flex-shrink-0" />,
    },
    {
      to: "/admin/pet-products",
      label: "Pet Products",
      icon: <Package className="h-5 w-5 flex-shrink-0" />,
    },
    {
      to: "/admin/users",
      label: "Users",
      icon: <Users className="h-5 w-5 flex-shrink-0" />,
    },
  ];

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed top-20 left-4 z-50 w-12 h-12 rounded-xl bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors border border-gray-200"
      >
        {isMobileMenuOpen ? (
          <X className="w-6 h-6 text-gray-700" />
        ) : (
          <Menu className="w-6 h-6 text-gray-700" />
        )}
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-64 lg:w-72 transform transition-transform duration-300 ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          } bg-white z-40 shadow-lg md:shadow-none`}
      >
        <div className="h-full p-6 border-r border-gray-100">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Admin Panel</h2>
                <p className="text-xs text-gray-500">Manage your store</p>
              </div>
            </div>
          </div>

          {/* Home Button */}
          <a
            href="/"
            onClick={handleLinkClick}
            className="mb-6 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 to-orange-500 px-4 py-3 text-sm font-semibold text-white shadow-md hover:scale-105 transition"
          >
            <Home className="h-5 w-5 flex-shrink-0" />
            Back to Home
          </a>

          {/* Menu */}
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={handleLinkClick}
                className={({ isActive }) => `${baseClass} ${isActive ? activeClass : inactiveClass}`}
              >
                <span>{item.icon}</span>
                <span className="flex-1">{item.label}</span>
              </NavLink>
            ))}
          </nav>


          {/* Clock Widget */}
          <div className="mt-6 rounded-xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-4 text-white shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-4 h-4 opacity-80" />
              <p className="text-xs font-semibold uppercase tracking-wide opacity-90">
                System Time
              </p>
            </div>
            <p className="text-2xl font-bold tracking-tight">
              {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </p>
            <p className="mt-1 text-xs opacity-80 font-medium">
              {currentTime.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' })}
            </p>
          </div>

          <div className="mt-4 rounded-xl bg-gray-50 border border-gray-100 p-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Admin Access
            </p>
            <p className="mt-1 text-sm font-medium text-gray-700">
              Full system control
            </p>
          </div>
          {/* Quick Info */}
          <div className="mt-6 pt-6 border-t border-gray-200">

          </div>


        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
