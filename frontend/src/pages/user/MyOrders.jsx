import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserSidebar from "../../components/UserSidebar.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { getMyOrders } from "../../api/orderApi.js";
import { Package, Clock, CheckCircle, X, Calendar, MapPin, Phone, Sparkles, UserCircle, ChevronLeft, ChevronRight } from "lucide-react";

const ORDERS_PER_PAGE = 5;

const MyOrders = () => {
  const navigate = useNavigate();
  const { token, isAuthenticated, user, formatName } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getMyOrders(token);
        setOrders(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [token]);

  // Reset to page 1 when orders change
  useEffect(() => {
    setCurrentPage(1);
  }, [orders]);

  const totalPages = Math.ceil(orders.length / ORDERS_PER_PAGE);
  const paginatedOrders = orders.slice(
    (currentPage - 1) * ORDERS_PER_PAGE,
    currentPage * ORDERS_PER_PAGE
  );

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600"></div>
          <p className="text-slate-600 font-semibold">Loading orders...</p>
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
            <h1 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-3xl font-bold text-transparent lg:text-4xl h-14">
              My Orders
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              View all your previous orders {orders.length > 0 && `(${orders.length} total)`}
            </p>
          </div>

          {/* Orders List */}
          <div className="rounded-3xl border border-slate-200 bg-white shadow-xl overflow-hidden">
            {orders.length === 0 ? (
              <div className="p-12 text-center">
                <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-purple-100">
                  <Package className="h-12 w-12 text-blue-600" />
                </div>
                <h3 className="mb-3 text-2xl font-bold text-slate-800">No orders yet</h3>
                <p className="mb-8 text-slate-600">Start designing your custom phone cover today!</p>
                <button
                  onClick={() => navigate("/design")}
                  className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-purple-500/30 transition-all hover:shadow-xl hover:shadow-purple-500/40"
                >
                  <Sparkles className="h-5 w-5" />
                  Create Your First Design
                </button>
              </div>
            ) : (
              <>
                <div className="divide-y divide-slate-100">
                  {paginatedOrders.map((order) => (
                    <div key={order._id} className="p-6 transition-all hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50">
                      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex items-start gap-4">
                          <div className="relative h-24 w-16 flex-shrink-0 overflow-hidden rounded-xl border-2 border-slate-200 bg-slate-50">
                            <img
                              src={order.designImage}
                              alt="design preview"
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-slate-800">{order.phoneModel}</h3>
                            <p className="mt-1 text-sm text-slate-500">
                              Order ID: <span className="font-mono font-semibold">#{order._id.slice(-8)}</span>
                            </p>
                            <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
                              <Calendar className="h-4 w-4" />
                              {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                            <p className="mt-1 text-sm font-medium text-slate-700">Quantity: {order.quantity}</p>
                          </div>
                        </div>

                        <div className="flex flex-col items-start gap-3 lg:items-end">
                          <span
                            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${order.status === "confirmed"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-amber-100 text-amber-700"
                              }`}
                          >
                            {order.status === "confirmed" ? (
                              <CheckCircle className="h-4 w-4" />
                            ) : (
                              <Clock className="h-4 w-4" />
                            )}
                            {order.status || "pending"}
                          </span>
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="rounded-full border-2 border-slate-200 bg-white px-6 py-2 text-sm font-semibold text-slate-700 transition-all hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-200 p-6 sm:flex-row">
                    <p className="text-sm text-slate-600">
                      Showing {(currentPage - 1) * ORDERS_PER_PAGE + 1} to{" "}
                      {Math.min(currentPage * ORDERS_PER_PAGE, orders.length)} of {orders.length} orders
                    </p>

                    <div className="flex items-center gap-2">
                      <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((p) => p - 1)}
                        className="flex items-center gap-1 rounded-lg border-2 border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:bg-white"
                      >
                        <ChevronLeft className="h-4 w-4" />
                        Previous
                      </button>

                      <span className="px-4 py-2 text-sm font-semibold text-slate-800">
                        {currentPage} / {totalPages}
                      </span>

                      <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((p) => p + 1)}
                        className="flex items-center gap-1 rounded-lg border-2 border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:bg-white"
                      >
                        Next
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </main>
      </div>

      {/* Order Details Modal - Responsive */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="my-8 w-full max-w-4xl rounded-3xl bg-white p-6 shadow-2xl md:p-8">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h2 className="bg-gradient-to-r from-blue-900 via-purple-400 to-[#fe7245] bg-clip-text text-xl font-bold text-transparent md:text-2xl">
                  Order Details
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  ID: <span className="font-mono font-semibold">#{selectedOrder._id.slice(-8)}</span>
                </p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="rounded-full bg-slate-100 p-2 text-slate-600 transition-all hover:bg-slate-200 hover:text-slate-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* Left: Design Image */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-6 md:p-8">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10"></div>
                <img
                  src={selectedOrder.designImage}
                  alt="full design"
                  className="relative z-10 mx-auto max-h-[400px] w-full rounded-xl object-contain shadow-2xl md:max-h-[500px]"
                />
              </div>

              {/* Right: All Details */}
              <div className="space-y-6">
                {/* Order Info */}
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 md:p-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Phone Model</p>
                      <p className="mt-1 text-sm font-semibold text-slate-800">{selectedOrder.phoneModel}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Quantity</p>
                      <p className="mt-1 text-sm font-semibold text-slate-800">{selectedOrder.quantity}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Status</p>
                      <span
                        className={`mt-1 inline-flex items-center gap-1 text-sm font-semibold ${selectedOrder.status === "confirmed"
                          ? "text-emerald-700"
                          : "text-amber-700"
                          }`}
                      >
                        {selectedOrder.status === "confirmed" ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <Clock className="h-4 w-4" />
                        )}
                        {selectedOrder.status || "pending"}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Order Date</p>
                      <p className="mt-1 text-sm font-semibold text-slate-800">
                        {new Date(selectedOrder.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Shipping Info */}
                <div className="rounded-2xl border border-slate-200 bg-white p-4 md:p-6">
                  <h3 className="mb-4 text-lg font-bold text-slate-800">Shipping Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <UserCircle className="h-5 w-5 flex-shrink-0 text-slate-400" />
                      <div className="flex-1">
                        <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Name</p>
                        <p className="mt-1 text-sm text-slate-800">{formatName(user?.name)}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 flex-shrink-0 text-slate-400" />
                      <div className="flex-1">
                        <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Address</p>
                        <p className="mt-1 text-sm text-slate-800">{selectedOrder.address}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 flex-shrink-0 text-slate-400" />
                      <div className="flex-1">
                        <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Contact</p>
                        <p className="mt-1 text-sm text-slate-800">{selectedOrder.phone}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrders;