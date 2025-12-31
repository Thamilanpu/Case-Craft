import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar.jsx";
import { confirmAdminOrder, deleteAdminOrder, getAdminOrders } from "../api/adminApi.js";

const ADMIN_STORAGE_KEY = "cpc_admin_token";

const OrderList = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({ pages: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = useCallback(async () => {
    const token = localStorage.getItem(ADMIN_STORAGE_KEY);
    if (!token) {
      navigate("/admin/login");
      return;
    }

    setLoading(true);
    try {
      const data = await getAdminOrders({ page, search, token, type: "phone_case" });
      setOrders(data.data);
      setPagination(data.pagination);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [navigate, page, search]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleDelete = async (id) => {
    const token = localStorage.getItem(ADMIN_STORAGE_KEY);
    if (!token) {
      navigate("/admin/login");
      return;
    }
    if (!window.confirm("Delete this order?")) return;
    try {
      await deleteAdminOrder(id, token);
      fetchOrders();
    } catch (error) {
      console.error(error);
    }
  };

  const handleConfirm = async (id) => {
    const token = localStorage.getItem(ADMIN_STORAGE_KEY);
    if (!token) {
      navigate("/admin/login");
      return;
    }
    if (!window.confirm("Confirm this order and send email?")) return;
    try {
      await confirmAdminOrder(id, token);
      fetchOrders();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="mx-auto flex max-w-8xl flex-col gap-6 px-4 py-6 lg:py-8 md:flex-row">
        <AdminSidebar />

        <main className="flex-1 space-y-6">
          {/* Header Section */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Orders</h1>
              <p className="mt-1 text-sm text-slate-600">Manage and track customer orders</p>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <svg className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="search"
                placeholder="Search orders..."
                className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm shadow-sm transition-all focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 sm:w-64"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
              />
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Orders</p>
                  <p className="mt-1 text-2xl font-bold text-slate-900">{pagination.total || 0}</p>
                </div>
                <div className="rounded-xl bg-indigo-50 p-3">
                  <svg className="h-6 w-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Pending</p>
                  <p className="mt-1 text-2xl font-bold text-amber-600">
                    {orders.filter(o => o.status !== "confirmed").length}
                  </p>
                </div>
                <div className="rounded-xl bg-amber-50 p-3">
                  <svg className="h-6 w-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Confirmed</p>
                  <p className="mt-1 text-2xl font-bold text-emerald-600">
                    {orders.filter(o => o.status === "confirmed").length}
                  </p>
                </div>
                <div className="rounded-xl bg-emerald-50 p-3">
                  <svg className="h-6 w-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Current Page</p>
                  <p className="mt-1 text-2xl font-bold text-slate-900">
                    {pagination.page || 1}/{pagination.pages || 1}
                  </p>
                </div>
                <div className="rounded-xl bg-slate-100 p-3">
                  <svg className="h-6 w-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Orders Table */}
          <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/50">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">Order ID</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">Customer</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">Product</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">Preview</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">Date</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">Status</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {loading ? (
                    <tr>
                      <td colSpan="7" className="px-6 py-12 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <svg className="h-5 w-5 animate-spin text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span className="text-sm text-slate-600">Loading orders...</span>
                        </div>
                      </td>
                    </tr>
                  ) : orders.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center justify-center gap-2">
                          <svg className="h-12 w-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                          </svg>
                          <p className="text-sm font-medium text-slate-600">No orders found</p>
                          <p className="text-xs text-slate-500">Try adjusting your search criteria</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    orders.map((order) => (
                      <tr key={order._id} className="transition-colors hover:bg-slate-50">
                        <td className="px-6 py-4">
                          <span className="font-mono text-xs text-slate-600">#{order._id.slice(-8)}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-sm font-semibold text-white">
                              {(order.userId?.name || order.fullName || "U").charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-slate-900">{order.userId?.name || order.fullName || "N/A"}</p>
                              <p className="text-xs text-slate-500">{order.userId?.email || order.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-sm font-medium text-slate-900">
                              {order.items && order.items.length > 0
                                ? order.items[0].productName
                                : order.phoneModel || "N/A"}
                            </p>
                            {order.items && order.items.length > 1 && (
                              <span className="mt-1 inline-block rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                                +{order.items.length - 1} more
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {order.items && order.items[0]?.designImage ? (
                            <img
                              src={order.items[0].designImage}
                              alt="design preview"
                              className="h-16 w-12 rounded-lg border-2 border-slate-200 object-cover shadow-sm"
                            />
                          ) : (
                            <div className="flex h-16 w-12 items-center justify-center rounded-lg border-2 border-dashed border-slate-200 bg-slate-50">
                              <svg className="h-6 w-6 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-slate-600">{new Date(order.createdAt).toLocaleDateString()}</p>
                          <p className="text-xs text-slate-400">{new Date(order.createdAt).toLocaleTimeString()}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${order.status === "confirmed"
                              ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20"
                              : "bg-amber-50 text-amber-700 ring-1 ring-amber-600/20"
                              }`}
                          >
                            <span className={`h-1.5 w-1.5 rounded-full ${order.status === "confirmed" ? "bg-emerald-600" : "bg-amber-600"
                              }`}></span>
                            {order.status || "pending"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setSelectedOrder(order)}
                              className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-200"
                            >
                              View
                            </button>
                            {order.status !== "confirmed" && (
                              <button
                                onClick={() => handleConfirm(order._id)}
                                className="rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 transition-colors hover:bg-emerald-100"
                              >
                                Confirm
                              </button>
                            )}
                            <button
                              onClick={() => handleDelete(order._id)}
                              className="rounded-lg bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-600 transition-colors hover:bg-rose-100"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-slate-600">
              Showing <span className="font-semibold text-slate-900">{orders.length}</span> of{" "}
              <span className="font-semibold text-slate-900">{pagination.total}</span> orders
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, pagination.pages || 1) }, (_, i) => {
                  const pageNum = i + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setPage(pageNum)}
                      className={`h-10 w-10 rounded-lg text-sm font-medium transition-colors ${page === pageNum
                        ? "bg-indigo-600 text-white"
                        : "bg-white text-slate-700 hover:bg-slate-50 border border-slate-200"
                        }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              <button
                onClick={() => setPage((p) => (p < (pagination.pages || 1) ? p + 1 : p))}
                disabled={page >= (pagination.pages || 1)}
                className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* Order Detail Modal - COMPLETELY REDESIGNED */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="relative w-full max-w-7xl rounded-3xl bg-white shadow-2xl">
              {/* Sticky Header */}
              <div className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-200 bg-white/95 px-8 py-6 backdrop-blur-sm rounded-t-3xl">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Order Details</h2>
                  <p className="mt-1 flex items-center gap-2 text-sm text-slate-500">
                    <span className="font-mono">#{selectedOrder._id.slice(-12)}</span>
                    <span className="h-1 w-1 rounded-full bg-slate-300"></span>
                    <span>{new Date(selectedOrder.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </p>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="rounded-xl bg-slate-100 p-3 text-slate-600 transition-all hover:bg-slate-200 hover:rotate-90"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="max-h-[calc(100vh-12rem)] overflow-y-auto p-8">
                <div className="grid gap-8 lg:grid-cols-3">
                  {/* Order Items - Takes 2 columns */}
                  <div className="space-y-6 lg:col-span-2">
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-indigo-100 p-2">
                        <svg className="h-6 w-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">Order Items</h3>
                        <p className="text-sm text-slate-500">{selectedOrder.items?.length || 0} item(s) in this order</p>
                      </div>
                    </div>

                    {selectedOrder.items && selectedOrder.items.length > 0 ? (
                      <div className="space-y-6">
                        {selectedOrder.items.map((item, idx) => (
                          <div key={`${item.productId}-${idx}`} className="overflow-hidden rounded-2xl border-2 border-slate-200 bg-gradient-to-br from-white to-slate-50 shadow-sm">
                            {/* Item Header */}
                            <div className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
                              <div>
                                <h4 className="text-lg font-bold text-slate-900">{item.productName}</h4>
                                <p className="text-sm text-slate-500">Product #{idx + 1}</p>
                              </div>
                              <div className="text-right">
                                <div className="rounded-xl bg-indigo-100 px-4 py-2">
                                  <p className="text-xs font-semibold text-indigo-600">Quantity</p>
                                  <p className="text-2xl font-bold text-indigo-900">{item.quantity || 1}</p>
                                </div>
                              </div>
                            </div>

                            <div className="p-6">
                              {/* Design Preview - Large Image */}
                              <div className="mb-6">
                                <div className="mb-3 flex items-center gap-2">
                                  <svg className="h-5 w-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                  </svg>
                                  <p className="text-sm font-bold uppercase tracking-wide text-slate-700">Final Design</p>
                                </div>
                                <div className="overflow-hidden rounded-2xl border-2 border-slate-300 bg-white shadow-lg">
                                  <img
                                    src={item.designImage}
                                    alt="design"
                                    className="h-auto w-full max-h-[500px] object-contain p-4"
                                  />
                                </div>
                              </div>

                              {/* User Custom Image - Large */}
                              {item.userCustomImage && (
                                <div className="mb-6">
                                  <div className="mb-3 flex items-center gap-2">
                                    <svg className="h-5 w-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                    <p className="text-sm font-bold uppercase tracking-wide text-slate-700">Customer Upload</p>
                                  </div>
                                  <div className="overflow-hidden rounded-2xl border-2 border-purple-300 bg-white shadow-lg">
                                    <img
                                      src={item.userCustomImage}
                                      alt="user upload"
                                      className="h-auto w-full max-h-[500px] object-contain p-4"
                                    />
                                  </div>
                                </div>
                              )}

                              {/* Template Image - Large */}
                              {item.templateImage && (
                                <div className="mb-6">
                                  <div className="mb-3 flex items-center gap-2">
                                    <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                                    </svg>
                                    <p className="text-sm font-bold uppercase tracking-wide text-slate-700">Template Used</p>
                                  </div>
                                  <div className="overflow-hidden rounded-2xl border-2 border-blue-300 bg-white shadow-lg">
                                    <img
                                      src={item.templateImage}
                                      alt="template"
                                      className="h-auto w-full max-h-[500px] object-contain p-4"
                                    />
                                  </div>
                                </div>
                              )}

                              {/* Custom Text */}
                              {item.customText && (
                                <div className="mb-6">
                                  <div className="mb-3 flex items-center gap-2">
                                    <svg className="h-5 w-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    <p className="text-sm font-bold uppercase tracking-wide text-slate-700">Custom Text</p>
                                  </div>
                                  <div className="rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-6 shadow-sm">
                                    <p className="text-lg font-bold text-slate-800 font-mono tracking-wide">{item.customText}</p>
                                  </div>
                                </div>
                              )}

                              {/* Price Tag */}
                              <div className="flex items-center justify-between rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 p-4 ring-2 ring-emerald-200">
                                <p className="text-sm font-semibold text-slate-700">Item Price</p>
                                <p className="text-2xl font-bold text-emerald-900">$ {item.price || 0}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 py-12">
                        <svg className="h-16 w-16 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                        <p className="mt-4 text-sm font-medium text-slate-600">No items found</p>
                      </div>
                    )}
                  </div>

                  {/* Order Information Sidebar */}
                  <div className="space-y-4 lg:col-span-1">
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-emerald-100 p-2">
                        <svg className="h-6 w-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">Order Info</h3>
                        <p className="text-sm text-slate-500">Customer details</p>
                      </div>
                    </div>

                    {/* Customer Card */}
                    <div className="overflow-hidden rounded-2xl border-2 border-slate-200 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 shadow-sm">
                      <div className="border-b border-slate-200 bg-white/80 backdrop-blur px-5 py-3">
                        <div className="flex items-center gap-2">
                          <svg className="h-5 w-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <p className="text-xs font-bold uppercase tracking-wider text-slate-600">Customer</p>
                        </div>
                      </div>
                      <div className="p-5">
                        <div className="mb-4 flex items-center gap-3">
                          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-xl font-bold text-white shadow-lg">
                            {(selectedOrder.fullName || "U").charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-lg font-bold text-slate-900">{selectedOrder.fullName}</p>
                            <p className="text-sm text-slate-600">{selectedOrder.email}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-2xl border-2 border-slate-200 bg-white p-4 shadow-sm">
                        <div className="mb-2 rounded-lg bg-slate-100 p-2 w-fit">
                          <svg className="h-5 w-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                          </svg>
                        </div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Items</p>
                        <p className="mt-1 text-2xl font-bold text-slate-900">{selectedOrder.items?.length || 0}</p>
                      </div>

                      <div className="rounded-2xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-4 shadow-sm">
                        <div className="mb-2 rounded-lg bg-emerald-100 p-2 w-fit">
                          <svg className="h-5 w-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">Total</p>
                        <p className="mt-1 text-2xl font-bold text-emerald-900">$ {selectedOrder.total || 0}</p>
                      </div>
                    </div>

                    {/* Status Card */}
                    <div className="rounded-2xl border-2 border-slate-200 bg-white p-5 shadow-sm">
                      <div className="mb-3 flex items-center gap-2">
                        <svg className="h-5 w-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-600">Order Status</p>
                      </div>
                      <span
                        className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold ${selectedOrder.status === "confirmed"
                          ? "bg-emerald-100 text-emerald-800 ring-2 ring-emerald-300"
                          : "bg-amber-100 text-amber-800 ring-2 ring-amber-300"
                          }`}
                      >
                        <span className={`h-2.5 w-2.5 rounded-full ${selectedOrder.status === "confirmed" ? "bg-emerald-600" : "bg-amber-600"
                          }`}></span>
                        {(selectedOrder.status || "pending").toUpperCase()}
                      </span>
                    </div>

                    {/* Contact Card */}
                    <div className="rounded-2xl border-2 border-slate-200 bg-white p-5 shadow-sm">
                      <div className="mb-3 flex items-center gap-2">
                        <svg className="h-5 w-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-600">Contact Number</p>
                      </div>
                      <p className="text-base font-bold text-slate-900">{selectedOrder.phone}</p>
                    </div>

                    {/* Address Card */}
                    <div className="rounded-2xl border-2 border-slate-200 bg-white p-5 shadow-sm">
                      <div className="mb-3 flex items-center gap-2">
                        <svg className="h-5 w-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-600">Shipping Address</p>
                      </div>
                      <p className="text-sm leading-relaxed text-slate-700">{selectedOrder.address}</p>
                    </div>

                    {/* Date Card */}
                    <div className="rounded-2xl border-2 border-slate-200 bg-white p-5 shadow-sm">
                      <div className="mb-3 flex items-center gap-2">
                        <svg className="h-5 w-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-600">Order Date</p>
                      </div>
                      <p className="text-base font-bold text-slate-900">
                        {new Date(selectedOrder.createdAt).toLocaleDateString('en-US', {
                          weekday: 'short',
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        {new Date(selectedOrder.createdAt).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3 pt-4">
                      {selectedOrder.status !== "confirmed" && (
                        <button
                          onClick={() => {
                            handleConfirm(selectedOrder._id);
                            setSelectedOrder(null);
                          }}
                          className="flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4 text-base font-bold text-white shadow-lg transition-all hover:shadow-xl hover:scale-[1.02] active:scale-95"
                        >
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Confirm Order
                        </button>
                      )}
                      <button
                        onClick={() => {
                          handleDelete(selectedOrder._id);
                          setSelectedOrder(null);
                        }}
                        className="flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 px-6 py-4 text-base font-bold text-white shadow-lg transition-all hover:shadow-xl hover:scale-[1.02] active:scale-95"
                      >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete Order
                      </button>
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

export default OrderList;