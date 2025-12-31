import { useCallback, useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar.jsx";
import { getAdminOrders } from "../api/adminApi.js";
import { useNavigate } from "react-router-dom";

const ADMIN_STORAGE_KEY = "cpc_admin_token";

const AdminPaymentDetails = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState({ pages: 1, total: 0 });
    const [search, setSearch] = useState("");
    const [totalRevenue, setTotalRevenue] = useState(0);

    const fetchOrders = useCallback(async () => {
        const token = localStorage.getItem(ADMIN_STORAGE_KEY);
        if (!token) {
            navigate("/admin/login");
            return;
        }

        setLoading(true);
        try {
            // Fetch orders for payment history
            const data = await getAdminOrders({ page, search, token, limit: 15 });
            setOrders(data.data);
            setPagination(data.pagination);

            // Calculate revenue for current view (or fetch total stats if API supported)
            // Ideally backend sends this, but for now we sum displayed
            const displayedRevenue = data.data.reduce((sum, o) => sum + (o.total || 0), 0);
            setTotalRevenue(displayedRevenue);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [page, search, navigate]);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            <div className="mx-auto flex max-w-8xl flex-col gap-6 px-4 py-6 lg:py-8 md:flex-row">
                <AdminSidebar />

                <main className="flex-1 space-y-6">
                    {/* Header */}
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900">Payment Details</h1>
                            <p className="mt-1 text-sm text-slate-600">Track all incoming payments and transactions</p>
                        </div>
                        <div className="flex gap-2">
                            <button className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50">
                                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                Export CSV
                            </button>
                        </div>
                    </div>

                    {/* Stats Summary (Current View) */}
                    <div className="grid gap-4 sm:grid-cols-3">
                        <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200/50">
                            <p className="text-xs font-semibold uppercase text-slate-500">Total Transactions</p>
                            <p className="mt-1 text-2xl font-bold text-slate-900">{pagination.total}</p>
                        </div>
                        <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200/50">
                            <p className="text-xs font-semibold uppercase text-slate-500">View Revenue</p>
                            <p className="mt-1 text-2xl font-bold text-emerald-600">$ {totalRevenue.toLocaleString()}</p>
                        </div>
                        <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200/50">
                            <p className="text-xs font-semibold uppercase text-slate-500">Status</p>
                            <div className="mt-1 flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                                <span className="text-sm font-medium text-slate-700">All Systems Healthy</span>
                            </div>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200/50">
                        <div className="relative flex-1 max-w-md">
                            <svg className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            <input
                                type="text"
                                placeholder="Search by name, email, or order ID..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full rounded-lg border-none bg-slate-50 py-2.5 pl-10 pr-4 text-sm font-medium text-slate-900 ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/50">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-slate-200">
                                <thead className="bg-slate-50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">Transaction Ref</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">Customer</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">Amount</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">Payment Date</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">Status</th>
                                        <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-600">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 bg-white">
                                    {loading ? (
                                        <tr>
                                            <td colSpan="6" className="px-6 py-12 text-center">
                                                <div className="flex items-center justify-center gap-2">
                                                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-blue-600"></div>
                                                    <span className="text-sm text-slate-600">Loading payments...</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : orders.length === 0 ? (
                                        <tr>
                                            <td colSpan="6" className="px-6 py-12 text-center">
                                                <div className="flex flex-col items-center justify-center">
                                                    <div className="mb-2 rounded-full bg-slate-100 p-3">
                                                        <svg className="h-6 w-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                                    </div>
                                                    <p className="text-sm font-medium text-slate-900">No payment records found</p>
                                                    <p className="text-xs text-slate-500">Try adjusting your search terms</p>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        orders.map((order) => (
                                            <tr key={order._id} className="transition-colors hover:bg-slate-50">
                                                <td className="px-6 py-4">
                                                    <span className="font-mono text-xs text-slate-500">#{order._id.slice(-8)}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 text-xs font-bold text-blue-700">
                                                            {order.fullName?.charAt(0) || "U"}
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-medium text-slate-900">{order.fullName || "Unknown"}</p>
                                                            <p className="text-xs text-slate-500">{order.email}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-sm font-bold text-emerald-600">$ {order.total?.toLocaleString()}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-col">
                                                        <span className="text-sm text-slate-900">{new Date(order.createdAt).toLocaleDateString()}</span>
                                                        <span className="text-xs text-slate-500">{new Date(order.createdAt).toLocaleTimeString()}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700 ring-1 ring-emerald-600/20">
                                                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                                                        Paid via Stripe
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button className="text-xs font-medium text-blue-600 hover:text-blue-800 hover:underline">
                                                        View Receipt
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="flex items-center justify-between border-t border-slate-200 px-6 py-4">
                            <div className="text-sm text-slate-500">
                                Showing page <span className="font-medium">{pagination.page}</span> of <span className="font-medium">{pagination.pages}</span> ({pagination.total} transactions)
                            </div>
                            <div className="flex gap-2">
                                <button
                                    disabled={page === 1}
                                    onClick={() => setPage(p => p - 1)}
                                    className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 disabled:opacity-50"
                                >
                                    Previous
                                </button>
                                <button
                                    disabled={page >= pagination.pages}
                                    onClick={() => setPage(p => p + 1)}
                                    className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 disabled:opacity-50"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminPaymentDetails;
