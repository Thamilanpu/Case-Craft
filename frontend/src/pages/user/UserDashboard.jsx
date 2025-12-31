import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserSidebar from "../../components/UserSidebar.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { getMyOrders } from "../../api/orderApi.js";
import { useCart } from "../../context/CartContext.jsx";
import { Package, Clock, CheckCircle, Sparkles, ArrowRight, ShoppingBag, TrendingUp } from "lucide-react";

const StatCard = ({ label, value, icon: Icon, gradient = "from-blue-500 to-purple-500" }) => (
  <div className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-md hover:shadow-xl transition-all duration-300">
    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-5 group-hover:opacity-10 transition-opacity`} />
    <div className="relative">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <TrendingUp className="h-5 w-5 text-emerald-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
      <p className="text-sm font-medium text-gray-600 mb-1 leading-relaxed">{label}</p>
      <p className="text-3xl font-bold text-gray-900 leading-tight">{value}</p>
    </div>
  </div>
);

const UserDashboard = () => {
  const navigate = useNavigate();
  const { token, isAuthenticated, user, formatName } = useAuth();
  const { item } = useCart();
  const [stats, setStats] = useState({ totalOrders: 0, pendingOrders: 0, confirmedOrders: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const orders = await getMyOrders(token);
        const total = orders.length;
        const pending = orders.filter((o) => o.status === "pending").length;
        const confirmed = orders.filter((o) => o.status === "confirmed").length;
        setStats({ totalOrders: total, pendingOrders: pending, confirmedOrders: confirmed });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [token, isAuthenticated, navigate]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600"></div>
          <p className="text-slate-600 font-semibold">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
      <div className="mx-auto flex max-w-8xl flex-col gap-6 px-4 py-6 lg:py-8 md:flex-row">
        <UserSidebar />
        <main className="flex-1 space-y-6">
          {/* Header */}
          <div>
            <h1 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-3xl font-bold text-transparent lg:text-4xl">

              Welcome back, {formatName(user?.name)}
            </h1>
            <p className="text-gray-600">Overview of your account and orders</p>
          </div>

          {/* Stats Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <StatCard
              label="Total Orders"
              value={stats.totalOrders}
              icon={Package}
              gradient="from-blue-500 to-purple-500"
            />
            <StatCard
              label="Pending Orders"
              value={stats.pendingOrders}
              icon={Clock}
              gradient="from-pink-500 to-orange-500"
            />
            <StatCard
              label="Confirmed Orders"
              value={stats.confirmedOrders}
              icon={CheckCircle}
              gradient="from-green-500 to-teal-500"
            />
          </div>

          {/* Cart Alert */}
          {item && (
            <div className="overflow-hidden rounded-3xl border border-purple-200 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 p-6 shadow-xl lg:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg">
                    <ShoppingBag className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800">Item in Cart</h3>
                    <p className="mt-1 text-slate-600">You have a design ready to checkout</p>
                  </div>
                </div>
                <button
                  onClick={() => navigate("/checkout")}
                  className="group flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-purple-500/30 transition-all hover:shadow-xl hover:shadow-purple-500/40"
                >
                  Go to Checkout
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl lg:p-8">
            <h3 className="mb-6 text-2xl font-bold text-slate-800">Quick Actions</h3>
            <div className="grid gap-4 sm:grid-cols-2 mb-4">
              <button
                onClick={() => navigate("/case-design")}
                className="group flex items-center gap-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-left shadow-lg shadow-purple-500/30 transition-all hover:shadow-xl hover:shadow-purple-500/40"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-white/20">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-white">Create New Design</p>
                  <p className="text-sm text-white/80">Start designing your cover</p>
                </div>
                <ArrowRight className="h-5 w-5 flex-shrink-0 text-white transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => navigate("/pet-design")}
                className="group flex items-center gap-4 rounded-2xl bg-gradient-to-r from-[#fe7245] to-pink-600 text-white p-6 text-left shadow-lg shadow-orange-500/30 transition-all hover:shadow-xl hover:shadow-orange-500/40"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-white/20">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-white">Create New Design for pet</p>
                  <p className="text-sm text-white/80">Start designing your cover for pet</p>
                </div>
                <ArrowRight className="h-5 w-5 flex-shrink-0 text-white transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <button
                onClick={() => navigate("/user/orders")}
                className="group flex items-center gap-4 rounded-2xl border-2 border-slate-200 bg-white p-6 text-left transition-all hover:border-slate-300 hover:bg-slate-50"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-purple-100">
                  <Package className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-slate-800">View All Orders</p>
                  <p className="text-sm text-slate-600">Check order history</p>
                </div>
                <ArrowRight className="h-5 w-5 flex-shrink-0 text-slate-400 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => navigate("/user/cart")}
                className="group flex items-center gap-4 rounded-2xl border-2 border-purple-200 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 p-6 text-left transition-all hover:border-purple-300 hover:shadow-md"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg">
                  <ShoppingBag className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-slate-800">My Cart</p>
                  <p className="text-sm text-slate-600">View cart items</p>
                </div>
                <ArrowRight className="h-5 w-5 flex-shrink-0 text-purple-600 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            {/* Recent Activity */}
            <div className="mt-8 border-t border-slate-200 pt-6">
              <h4 className="mb-4 text-lg font-bold text-slate-800">Recent Activity</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-4 rounded-xl bg-slate-50 p-4 transition-all hover:bg-slate-100">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-100">
                    <CheckCircle className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-800"> {stats.confirmedOrders} Orders confirmed</p>
                    <p className="text-xs text-slate-500">Recently</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 rounded-xl bg-slate-50 p-4 transition-all hover:bg-slate-100">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100">
                    <Package className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-800">New design created</p>
                    <p className="text-xs text-slate-500">1 day ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;