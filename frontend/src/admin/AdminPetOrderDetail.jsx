import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar.jsx";
import { getAdminOrders, confirmAdminOrder, deleteAdminOrder } from "../api/adminApi.js";
// Note: deleteAdminOrder imported if needed, but primary actions are in list or here.

const ADMIN_STORAGE_KEY = "cpc_admin_token";

const AdminPetOrderDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [selectedOrder, setSelectedOrder] = useState(null); // Naming it selectedOrder to match OrderList style for easier copy-paste logic
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            const token = localStorage.getItem(ADMIN_STORAGE_KEY);
            if (!token) {
                navigate("/admin/login");
                return;
            }
            try {
                const data = await getAdminOrders({ token, limit: 1000 });
                const found = data.data.find((o) => o._id === id);
                if (found) {
                    setSelectedOrder(found);
                } else {
                    console.error("Order not found");
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrder();
    }, [id, navigate]);

    const handleConfirm = async () => {
        const token = localStorage.getItem(ADMIN_STORAGE_KEY);
        if (!window.confirm("Confirm this order?")) return;
        try {
            await confirmAdminOrder(id, token);
            alert("Order Confirmed!");
            setSelectedOrder(prev => ({ ...prev, status: "confirmed" }));
        } catch (error) {
            console.error(error);
            alert("Failed to confirm");
        }
    };

    const handleDelete = async () => {
        const token = localStorage.getItem(ADMIN_STORAGE_KEY);
        if (!window.confirm("Delete this order?")) return;
        try {
            await deleteAdminOrder(id, token);
            navigate("/admin/pet-orders");
        } catch (error) {
            console.error(error);
            alert("Failed to delete");
        }
    };

    const downloadImage = async (url, filename) => {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("Download failed", error);
            window.open(url, "_blank");
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
            <div className="flex items-center gap-2">
                <svg className="h-6 w-6 animate-spin text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="text-slate-600 font-medium">Loading Order Details...</span>
            </div>
        </div>
    );

    if (!selectedOrder) return <div className="p-10 text-center">Order not found.</div>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            <div className="mx-auto flex max-w-8xl flex-col gap-6 px-4 py-6 md:flex-row">
                <AdminSidebar />

                <main className="flex-1 space-y-8">
                    {/* Main Card */}
                    <div className="relative w-full rounded-3xl bg-white shadow-xl ring-1 ring-slate-200/50">

                        {/* Sticky Header */}
                        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-200 bg-white/95 px-8 py-6 backdrop-blur-sm rounded-t-3xl">
                            <div>
                                <div className="flex items-center gap-3 mb-1">
                                    <button onClick={() => navigate("/admin/pet-orders")} className="text-slate-400 hover:text-indigo-600 transition-colors">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                                    </button>
                                    <h2 className="text-2xl font-bold text-slate-900">Order Details</h2>
                                </div>
                                <p className="flex items-center gap-2 text-sm text-slate-500 ml-9">
                                    <span className="font-mono">#{selectedOrder._id.slice(-6)}</span>
                                    <span className="h-1 w-1 rounded-full bg-slate-300"></span>
                                    <span>{new Date(selectedOrder.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                </p>
                            </div>

                            <div className="flex gap-3">
                                {selectedOrder.status !== 'confirmed' && (
                                    <button onClick={handleConfirm} className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-emerald-200 transition-all hover:-translate-y-0.5 active:scale-95 flex items-center gap-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                        Mark as Confirmed
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="p-8">
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
                                            <h3 className="text-lg font-bold text-slate-900">Order Assets</h3>
                                            <p className="text-sm text-slate-500">Production files for {selectedOrder.items?.length || 0} item(s)</p>
                                        </div>
                                    </div>

                                    {selectedOrder.items && selectedOrder.items.length > 0 ? (
                                        <div className="space-y-8">
                                            {selectedOrder.items.map((item, idx) => (
                                                <div key={idx} className="overflow-hidden rounded-2xl border-2 border-slate-200 bg-white shadow-sm hover:border-indigo-200 transition-colors">
                                                    {/* Item Header */}
                                                    <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 px-6 py-4">
                                                        <div>
                                                            <h4 className="text-lg font-bold text-slate-800">{item.productName}</h4>
                                                            <p className="text-sm text-slate-500 font-mono text-xs">ID: {item.productId}</p>
                                                        </div>
                                                        <div className="text-right">
                                                            <div className="rounded-xl bg-white border border-slate-200 px-4 py-2 shadow-sm">
                                                                <p className="text-xs font-bold uppercase text-slate-400">Qty</p>
                                                                <p className="text-xl font-black text-slate-800">{item.quantity || 1}</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="p-6 grid gap-8">

                                                        <div className="grid md:grid-cols-2 gap-6">
                                                            {/* Template Image - Large */}
                                                            {item.templateImage && (
                                                                <div className="space-y-3">
                                                                    <div className="flex items-center justify-between">
                                                                        <div className="flex items-center gap-2">
                                                                            <svg className="h-4 w-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                                                            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Template Used</p>
                                                                        </div>
                                                                        <button onClick={() => downloadImage(item.templateImage, `template-${idx}.png`)} className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline">Download</button>
                                                                    </div>
                                                                    <div className="relative aspect-[3/4] overflow-hidden rounded-xl border-2 border-blue-100 bg-blue-50/30">
                                                                        <img src={item.templateImage} alt="template" className="h-full w-full object-contain p-2" />
                                                                    </div>
                                                                </div>
                                                            )}

                                                            {/* User Custom Image - Large */}
                                                            {item.userCustomImage && (
                                                                <div className="space-y-3">
                                                                    <div className="flex items-center justify-between">
                                                                        <div className="flex items-center gap-2">
                                                                            <svg className="h-4 w-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                                                            <p className="text-xs font-bold uppercase tracking-wide text-purple-600">User Upload (Raw)</p>
                                                                        </div>
                                                                        <button onClick={() => downloadImage(item.userCustomImage, `user-upload-${idx}.png`)} className="text-xs font-bold text-purple-600 hover:text-purple-700 hover:underline">Download High-Res</button>
                                                                    </div>
                                                                    <div className="relative aspect-[3/4] overflow-hidden rounded-xl border-2 border-dashed border-purple-200 bg-purple-50">
                                                                        <img src={item.userCustomImage} alt="user upload" className="h-full w-full object-contain" />
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>

                                                        {/* Custom Text */}
                                                        {item.customText && (
                                                            <div>
                                                                <div className="mb-3 flex items-center gap-2">
                                                                    <svg className="h-5 w-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                                    </svg>
                                                                    <p className="text-sm font-bold uppercase tracking-wide text-slate-700">Custom Text</p>
                                                                </div>
                                                                <div className="rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-6 shadow-sm relative overflow-hidden">
                                                                    <div className="absolute top-0 right-0 p-2 opacity-10">
                                                                        <svg className="w-24 h-24 text-emerald-900" fill="currentColor" viewBox="0 0 24 24"><path d="M14.408 20.985c-1.353.486-2.522-.72-1.92-1.942l3.414-7.464c.264-.577.878-.577 1.142 0l3.414 7.464c.602 1.222-.567 2.428-1.92 1.942l-2.065-.724-2.065.724zM3 3h18v2H3V3zm0 4h18v2H3V7zm0 4h14v2H3v-2z" /></svg>
                                                                    </div>
                                                                    <p className="text-3xl font-black text-slate-800 font-mono tracking-wide relative z-10">{item.customText}</p>
                                                                </div>
                                                            </div>
                                                        )}

                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-12 text-slate-400">No items found</div>
                                    )}
                                </div>

                                {/* Order Information Sidebar */}
                                <div className="space-y-6 lg:col-span-1">
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
                                    <div className="overflow-hidden rounded-2xl border-2 border-slate-200 bg-white shadow-sm">
                                        <div className="border-b border-slate-100 bg-slate-50/80 p-5">
                                            <div className="flex items-center gap-2">
                                                <svg className="h-4 w-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Customer</p>
                                            </div>
                                        </div>
                                        <div className="p-5">
                                            <div className="flex items-center gap-4">
                                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-lg font-bold text-white shadow-md">
                                                    {(selectedOrder.fullName || "U").charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="text-base font-bold text-slate-900">{selectedOrder.fullName}</p>
                                                    <p className="text-sm text-slate-500">{selectedOrder.email}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Status Card */}
                                    <div className="rounded-2xl border-2 border-slate-200 bg-white p-5 shadow-sm">
                                        <div className="mb-3 flex items-center gap-2">
                                            <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Current Status</p>
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

                                    {/* Contact & Address */}
                                    <div className="rounded-2xl border-2 border-slate-200 bg-white shadow-sm overflow-hidden">
                                        <div className="p-5 border-b border-slate-100">
                                            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Contact Number</p>
                                            <p className="text-base font-bold text-slate-900">{selectedOrder.phone}</p>
                                        </div>
                                        <div className="p-5 bg-slate-50">
                                            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Shipping Address</p>
                                            <p className="text-sm leading-relaxed text-slate-700 font-medium">{selectedOrder.address}</p>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="space-y-3 pt-4">
                                        {selectedOrder.status !== "confirmed" && (
                                            <button
                                                onClick={handleConfirm}
                                                className="flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4 text-base font-bold text-white shadow-lg shadow-emerald-200 transition-all hover:shadow-xl hover:-translate-y-0.5"
                                            >
                                                Confirm Order
                                            </button>
                                        )}
                                        <button
                                            onClick={handleDelete}
                                            className="flex w-full items-center justify-center gap-3 rounded-xl bg-white border-2 border-rose-100 text-rose-600 px-6 py-4 text-base font-bold transition-all hover:bg-rose-50 hover:border-rose-200"
                                        >
                                            Delete Order
                                        </button>
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

export default AdminPetOrderDetail;
