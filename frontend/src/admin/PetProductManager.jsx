import { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar.jsx";
import {
  adminCreatePetProduct,
  adminDeletePetProduct,
  adminAddTemplateToPet,
  adminRemoveTemplateFromPet,
  adminUpdatePetMockup,
  fetchPetProducts
} from "../api/petProductApi.js";

const ADMIN_STORAGE_KEY = "cpc_admin_token";

const PetProductManager = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: 0,
    templateFile: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [addingTemplate, setAddingTemplate] = useState(false);
  const [fetched, setFetched] = useState(false);
  const [coverSize, setCoverSize] = useState({ width: 300, height: 500 });

  const loadProducts = async () => {
    try {
      const data = await fetchPetProducts();
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setFetched(true);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "templateFile") {
      setForm((prev) => ({ ...prev, templateFile: files?.[0] || null }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.templateFile) {
      setError("Please choose a template image.");
      return;
    }

    if (!form.category) {
      setError("Please select a category.");
      return;
    }

    const token = localStorage.getItem(ADMIN_STORAGE_KEY);
    if (!token) {
      setError("Admin not authenticated.");
      return;
    }

    const generatedKey = form.name.toLowerCase().replace(/\s+/g, "-");

    setLoading(true);

    try {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          await adminCreatePetProduct(
            {
              name: form.name,
              category: form.category,
              key: generatedKey,
              price: Number(form.price) || 0,
              images: [reader.result],
              templates: [reader.result], // Initialize templates with simple image
            },
            token
          );

          setForm({
            name: "",
            category: "",
            price: 0,
            templateFile: null,
          });

          await loadProducts();
        } catch (err) {
          setError(err.response?.data?.message || "Unable to create product");
        } finally {
          setLoading(false);
        }
      };
      reader.readAsDataURL(form.templateFile);
    } catch (err) {
      console.error(err);
      setError("Unable to read template image.");
      setLoading(false);
    }
  };

  const handleAddMultipleTemplates = async (productId, files) => {
    if (!files || files.length === 0) return;

    const token = localStorage.getItem(ADMIN_STORAGE_KEY);
    if (!token) {
      setError("Admin not authenticated.");
      return;
    }

    setAddingTemplate(true);
    setError("");

    try {
      const filePromises = Array.from(files).map(
        (file) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
          })
      );

      const imageDataUrls = await Promise.all(filePromises);

      for (const imageData of imageDataUrls) {
        try {
          await adminAddTemplateToPet(productId, imageData, token);
        } catch (err) {
          console.error("Error adding template:", err);
          setError(err.response?.data?.message || "Some templates failed to add");
        }
      }

      await loadProducts();
      setSelectedProduct(null);
    } catch (err) {
      console.error(err);
      setError("Unable to read template images.");
    } finally {
      setAddingTemplate(false);
    }
  };

  const handleRemoveTemplate = async (productId, templateIndex) => {
    const token = localStorage.getItem(ADMIN_STORAGE_KEY);
    if (!token) {
      setError("Admin not authenticated.");
      return;
    }

    if (!window.confirm("Remove this template?")) return;

    try {
      await adminRemoveTemplateFromPet(productId, templateIndex, token);
      await loadProducts();
      setSelectedProduct(null);
    } catch (err) {
      console.error(err);
      setError("Unable to remove template.");
    }
  };

  useEffect(() => {
    if (selectedProduct?.coverSize) {
      setCoverSize(selectedProduct.coverSize);
    } else {
      setCoverSize({ width: 300, height: 500 });
    }
  }, [selectedProduct]);

  // Handle updating name & price
  const handleUpdateDetails = async (productId, key, value) => {
    const token = localStorage.getItem(ADMIN_STORAGE_KEY);
    if (!token) return setError("Admin not authenticated.");

    setAddingTemplate(true);
    try {
      await adminUpdatePetMockup(
        productId,
        undefined,
        selectedProduct.coverArea,
        selectedProduct.coverSize,
        token,
        key === 'name' ? value : selectedProduct.name,
        key === 'price' ? Number(value) : selectedProduct.price
      );

      const updated = { ...selectedProduct, [key]: key === 'price' ? Number(value) : value };
      setSelectedProduct(updated);

      await loadProducts();
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to update details");
    } finally {
      setAddingTemplate(false);
    }
  };

  const handleUpdateCoverSize = async (productId) => {
    const token = localStorage.getItem(ADMIN_STORAGE_KEY);
    if (!token) {
      setError("Admin not authenticated.");
      return;
    }

    if (coverSize.width <= 0 || coverSize.height <= 0) {
      setError("Cover size must be greater than 0");
      return;
    }

    setAddingTemplate(true);
    try {
      await adminUpdatePetMockup(
        productId,
        selectedProduct?.mockupImage || "",
        selectedProduct?.coverArea || { x: 0, y: 0, width: 1, height: 1 },
        coverSize,
        token
      );
      await loadProducts();
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to update cover size");
    } finally {
      setAddingTemplate(false);
    }
  };

  const handleUpdateMockup = async (productId, file) => {
    if (!file) return;

    const token = localStorage.getItem(ADMIN_STORAGE_KEY);
    if (!token) {
      setError("Admin not authenticated.");
      return;
    }

    setAddingTemplate(true);
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const coverArea = { x: 0, y: 0, width: 1, height: 1 };
          await adminUpdatePetMockup(productId, reader.result, coverArea, coverSize, token);
          await loadProducts();
          setSelectedProduct(null);
        } catch (err) {
          setError(err.response?.data?.message || "Unable to update mockup");
        } finally {
          setAddingTemplate(false);
        }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error(err);
      setAddingTemplate(false);
      setError("Unable to read mockup image.");
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem(ADMIN_STORAGE_KEY);
    if (!token) {
      setError("Admin not authenticated.");
      return;
    }
    if (!window.confirm("Delete this product?")) return;
    try {
      await adminDeletePetProduct(id, token);
      await loadProducts();
    } catch (err) {
      console.error(err);
      setError("Unable to delete product.");
    }
  };

  const getTemplates = (product) => {
    return product.templates && product.templates.length > 0
      ? product.templates
      : product.images || [];
  };

  const getCategoryStats = () => {
    const stats = {};
    products.forEach(p => {
      stats[p.category] = (stats[p.category] || 0) + 1;
    });
    return stats;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="mx-auto flex max-w-8xl flex-col gap-6 px-4 py-6 lg:py-8 md:flex-row">
        <AdminSidebar />

        <main className="flex-1 space-y-6">
          {/* Header */}
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/50">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 p-3">
                <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Pet Products</h1>
                <p className="mt-1 text-sm text-slate-600">Create and manage pet products with custom templates</p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Products</p>
                  <p className="mt-1 text-3xl font-bold text-slate-900">{products.length}</p>
                </div>
                <div className="rounded-xl bg-pink-50 p-3">
                  <svg className="h-6 w-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Templates</p>
                  <p className="mt-1 text-3xl font-bold text-emerald-600">
                    {products.reduce((sum, p) => sum + getTemplates(p).length, 0)}
                  </p>
                </div>
                <div className="rounded-xl bg-emerald-50 p-3">
                  <svg className="h-6 w-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Categories</p>
                  <p className="mt-1 text-3xl font-bold text-purple-600">
                    {Object.keys(getCategoryStats()).length}
                  </p>
                </div>
                <div className="rounded-xl bg-purple-50 p-3">
                  <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Avg Templates</p>
                  <p className="mt-1 text-3xl font-bold text-blue-600">
                    {products.length > 0
                      ? (products.reduce((sum, p) => sum + getTemplates(p).length, 0) / products.length).toFixed(1)
                      : 0}
                  </p>
                </div>
                <div className="rounded-xl bg-blue-50 p-3">
                  <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Create Form */}
          <form
            onSubmit={handleCreate}
            className="space-y-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/50 lg:p-8"
          >
            <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
              <div className="rounded-lg bg-pink-100 p-2">
                <svg className="h-5 w-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">Add New Pet Product</h2>
                <p className="text-sm text-slate-500">Fill in the details to create a new product</p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Product Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="e.g. Pet Bowl"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-sm transition-colors focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Category</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-sm transition-colors focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Daily Necessities">Daily Necessities</option>
                  <option value="3C Products">3C Products</option>
                  <option value="Home Goods">Home Goods</option>
                  <option value="Pet Supplies">Pet Supplies</option>
                  <option value="Pet Apparel">Pet Apparel</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Price ($)</label>
                <input
                  type="number"
                  name="price"
                  min="0"
                  placeholder="0"
                  value={form.price}
                  onChange={handleChange}
                  className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-sm transition-colors focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Template Image</label>
                <input
                  type="file"
                  name="templateFile"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full cursor-pointer rounded-xl border-2 border-dashed border-slate-300 px-4 py-3 text-sm transition-colors hover:border-pink-400 focus:border-pink-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="rounded-xl bg-rose-50 border-2 border-rose-200 p-4">
                <div className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm font-medium text-rose-800">{error}</p>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:shadow-xl hover:scale-[1.02] active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="h-4 w-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Product...
                </>
              ) : (
                <>
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Pet Product
                </>
              )}
            </button>
          </form>

          {/* Products Table/Grid */}
          <div className="rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/50">
            {/* Desktop Table View */}
            <div className="hidden overflow-x-auto lg:block">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">Preview</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">Name</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">Category</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">Key</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">Templates</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">Price</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">Created</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {!fetched ? (
                    <tr>
                      <td colSpan="8" className="px-6 py-12 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <svg className="h-5 w-5 animate-spin text-pink-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span className="text-sm text-slate-600">Loading products...</span>
                        </div>
                      </td>
                    </tr>
                  ) : products.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center gap-3">
                          <div className="rounded-full bg-slate-100 p-4">
                            <svg className="h-12 w-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-900">No pet products yet</p>
                            <p className="mt-1 text-xs text-slate-500">Create your first product above</p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    products.map((p) => {
                      const templates = getTemplates(p);
                      const firstTemplate = templates[0];
                      return (
                        <tr key={p._id} className="transition-colors hover:bg-slate-50">
                          <td className="px-6 py-4">
                            <div className="relative">
                              {firstTemplate ? (
                                <>
                                  <img
                                    src={firstTemplate}
                                    alt={p.name}
                                    className="h-20 w-20 rounded-lg border-2 border-slate-200 object-cover shadow-sm"
                                  />
                                  {templates.length > 1 && (
                                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-pink-600 text-xs font-bold text-white ring-2 ring-white">
                                      {templates.length}
                                    </span>
                                  )}
                                </>
                              ) : (
                                <div className="flex h-20 w-20 items-center justify-center rounded-lg border-2 border-dashed border-slate-200 bg-slate-50">
                                  <svg className="h-8 w-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                  </svg>
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <p className="font-semibold text-slate-900">{p.name}</p>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
                              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                              </svg>
                              {p.category}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <code className="rounded bg-slate-100 px-2 py-1 text-xs text-slate-700">{p.key}</code>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              {templates.length}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <p className="text-sm font-bold text-slate-900">$ {p.price || 0}</p>
                          </td>
                          <td className="px-6 py-4">
                            <p className="text-sm text-slate-600">
                              {p.createdAt ? new Date(p.createdAt).toLocaleDateString() : "-"}
                            </p>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => setSelectedProduct(p)}
                                className="rounded-lg bg-pink-50 px-3 py-1.5 text-xs font-semibold text-pink-700 transition-colors hover:bg-pink-100"
                              >
                                Manage
                              </button>
                              <button
                                onClick={() => handleDelete(p._id)}
                                className="rounded-lg bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-600 transition-colors hover:bg-rose-100"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="block space-y-4 p-4 lg:hidden">
              {!fetched ? (
                <div className="flex items-center justify-center py-12">
                  <div className="flex items-center gap-2">
                    <svg className="h-5 w-5 animate-spin text-pink-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="text-sm text-slate-600">Loading products...</span>
                  </div>
                </div>
              ) : products.length === 0 ? (
                <div className="flex flex-col items-center gap-3 py-12">
                  <div className="rounded-full bg-slate-100 p-4">
                    <svg className="h-12 w-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-slate-900">No pet products yet</p>
                    <p className="mt-1 text-xs text-slate-500">Create your first product above</p>
                  </div>
                </div>
              ) : (
                products.map((p) => {
                  const templates = getTemplates(p);
                  const firstTemplate = templates[0];
                  return (
                    <div key={p._id} className="rounded-xl border-2 border-slate-200 bg-white p-4 shadow-sm">
                      <div className="flex gap-4">
                        <div className="relative flex-shrink-0">
                          {firstTemplate ? (
                            <>
                              <img
                                src={firstTemplate}
                                alt={p.name}
                                className="h-24 w-24 rounded-lg border-2 border-slate-200 object-cover"
                              />
                              {templates.length > 1 && (
                                <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-pink-600 text-xs font-bold text-white ring-2 ring-white">
                                  {templates.length}
                                </span>
                              )}
                            </>
                          ) : (
                            <div className="flex h-24 w-24 items-center justify-center rounded-lg border-2 border-dashed border-slate-200 bg-slate-50">
                              <svg className="h-8 w-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 space-y-2">
                          <div>
                            <h3 className="font-bold text-slate-900">{p.name}</h3>
                            <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-700">
                              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                              </svg>
                              {p.category}
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              {templates.length}
                            </span>
                            <span className="text-sm font-bold text-slate-900">$ {p.price || 0}</span>
                          </div>
                          <p className="text-xs text-slate-500">
                            {p.createdAt ? new Date(p.createdAt).toLocaleDateString() : "-"}
                          </p>
                          <div className="flex gap-2 pt-2">
                            <button
                              onClick={() => setSelectedProduct(p)}
                              className="flex-1 rounded-lg bg-pink-50 px-3 py-2 text-xs font-semibold text-pink-700 transition-colors hover:bg-pink-100"
                            >
                              Manage
                            </button>
                            <button
                              onClick={() => handleDelete(p._id)}
                              className="flex-1 rounded-lg bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-600 transition-colors hover:bg-rose-100"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Manage Product Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="relative w-full max-w-4xl rounded-3xl bg-white shadow-2xl">
              {/* Modal Header */}
              <div className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-200 bg-white/95 px-6 py-5 backdrop-blur-sm rounded-t-3xl lg:px-8">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 p-2.5">
                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Manage Templates</h2>
                    <p className="text-sm text-slate-500">{selectedProduct.name} • {selectedProduct.category}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="rounded-xl bg-slate-100 p-2.5 text-slate-600 transition-all hover:bg-slate-200 hover:rotate-90"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="max-h-[calc(100vh-12rem)] overflow-y-auto p-6 lg:p-8">
                <div className="space-y-6">
                  {/* Product Details Section */}
                  <div className="rounded-2xl border-2 border-slate-200 bg-white p-6">
                    <div className="mb-4 flex items-center gap-2">
                      <svg className="h-5 w-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">Product Details</h3>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Name</label>
                        <input
                          type="text"
                          value={selectedProduct.name}
                          onChange={(e) => handleUpdateDetails(selectedProduct._id, 'name', e.target.value)}
                          className="w-full rounded-xl border-2 border-slate-300 px-4 py-3 text-sm transition-colors focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Price ($)</label>
                        <input
                          type="number"
                          min="0"
                          value={selectedProduct.price || 0}
                          onChange={(e) => handleUpdateDetails(selectedProduct._id, 'price', e.target.value)}
                          className="w-full rounded-xl border-2 border-slate-300 px-4 py-3 text-sm transition-colors focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Add Templates Section */}
                  <div className="rounded-2xl border-2 border-slate-200 bg-gradient-to-br from-pink-50 to-rose-50 p-6">
                    <div className="mb-4 flex items-center gap-2">
                      <svg className="h-5 w-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">Add New Templates</h3>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => {
                        const files = e.target.files;
                        if (files && files.length > 0) {
                          handleAddMultipleTemplates(selectedProduct._id, files);
                        }
                      }}
                      className="w-full cursor-pointer rounded-xl border-2 border-dashed border-pink-300 bg-white px-4 py-4 text-sm transition-colors hover:border-pink-500 focus:border-pink-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
                      disabled={addingTemplate}
                    />
                    <p className="mt-2 flex items-center gap-2 text-xs text-slate-600">
                      {addingTemplate ? (
                        <>
                          <svg className="h-4 w-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Uploading templates...
                        </>
                      ) : (
                        <>
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Select multiple images to upload at once
                        </>
                      )}
                    </p>
                  </div>

                  {/* Mockup Section */}
                  <div className="rounded-2xl border-2 border-slate-200 bg-white p-6">
                    <div className="mb-4 flex items-center gap-2">
                      <svg className="h-5 w-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">Product Mockup</h3>
                    </div>
                    <p className="mb-4 text-sm text-slate-600">
                      Upload a product mockup image. User designs will be applied to the product.
                    </p>
                    {selectedProduct.mockupImage && (
                      <div className="mb-4 flex items-center gap-4 rounded-xl border-2 border-purple-200 bg-purple-50 p-4">
                        <img
                          src={selectedProduct.mockupImage}
                          alt="Mockup"
                          className="h-28 w-28 rounded-lg border-2 border-purple-300 object-cover shadow-sm"
                        />
                        <div className="flex-1">
                          <p className="font-semibold text-slate-900">Current Mockup</p>
                          <p className="text-xs text-slate-600">Product mockup image</p>
                        </div>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handleUpdateMockup(selectedProduct._id, file);
                        }
                      }}
                      className="w-full cursor-pointer rounded-xl border-2 border-dashed border-slate-300 bg-white px-4 py-4 text-sm transition-colors hover:border-purple-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
                      disabled={addingTemplate}
                    />
                  </div>

                  {/* Cover Size Section */}
                  <div className="rounded-2xl border-2 border-slate-200 bg-white p-6">
                    <div className="mb-4 flex items-center gap-2">
                      <svg className="h-5 w-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                      </svg>
                      <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">Cover Dimensions</h3>
                    </div>
                    <p className="mb-4 text-sm text-slate-600">
                      Set the pixel dimensions for the phone cover area where designs appear.
                    </p>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Width (px)</label>
                        <input
                          type="number"
                          min="100"
                          max="2000"
                          value={selectedProduct?.coverSize?.width || coverSize.width}
                          onChange={(e) => {
                            const width = parseInt(e.target.value) || 300;
                            setCoverSize({ ...coverSize, width });
                            if (selectedProduct) {
                              const updatedProduct = { ...selectedProduct };
                              if (!updatedProduct.coverSize) updatedProduct.coverSize = {};
                              updatedProduct.coverSize.width = width;
                              setSelectedProduct(updatedProduct);
                            }
                          }}
                          className="w-full rounded-xl border-2 border-slate-300 px-4 py-3 text-sm font-mono transition-colors focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                          placeholder="300"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Height (px)</label>
                        <input
                          type="number"
                          min="100"
                          max="2000"
                          value={selectedProduct?.coverSize?.height || coverSize.height}
                          onChange={(e) => {
                            const height = parseInt(e.target.value) || 500;
                            setCoverSize({ ...coverSize, height });
                            if (selectedProduct) {
                              const updatedProduct = { ...selectedProduct };
                              if (!updatedProduct.coverSize) updatedProduct.coverSize = {};
                              updatedProduct.coverSize.height = height;
                              setSelectedProduct(updatedProduct);
                            }
                          }}
                          className="w-full rounded-xl border-2 border-slate-300 px-4 py-3 text-sm font-mono transition-colors focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                          placeholder="500"
                        />
                      </div>
                    </div>
                    {selectedProduct?.coverSize && (
                      <div className="mt-3 rounded-lg bg-emerald-50 px-4 py-2 text-xs text-emerald-700">
                        Current: {selectedProduct.coverSize.width} × {selectedProduct.coverSize.height} px
                      </div>
                    )}
                    <button
                      onClick={() => handleUpdateCoverSize(selectedProduct._id)}
                      disabled={addingTemplate}
                      className="mt-4 w-full rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white shadow-sm transition-all hover:bg-emerald-700 hover:shadow-md active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {addingTemplate ? "Updating..." : "Update Dimensions"}
                    </button>
                  </div>

                  {/* Templates List */}
                  <div className="rounded-2xl border-2 border-slate-200 bg-white p-6">
                    <div className="mb-4 flex items-center gap-2">
                      <svg className="h-5 w-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
                        Existing Templates ({getTemplates(selectedProduct).length})
                      </h3>
                    </div>

                    {getTemplates(selectedProduct).length === 0 ? (
                      <div className="flex flex-col items-center gap-3 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 py-12">
                        <svg className="h-12 w-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <div className="text-center">
                          <p className="text-sm font-semibold text-slate-700">No templates yet</p>
                          <p className="mt-1 text-xs text-slate-500">Add templates using the section above</p>
                        </div>
                      </div>
                    ) : (
                      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {getTemplates(selectedProduct).map((template, index) => (
                          <div
                            key={index}
                            className="group relative overflow-hidden rounded-xl border-2 border-slate-200 bg-white transition-all hover:border-pink-300 hover:shadow-lg"
                          >
                            <div className="aspect-square overflow-hidden bg-slate-50">
                              <img
                                src={template}
                                alt={`Template ${index + 1}`}
                                className="h-full w-full object-cover transition-transform group-hover:scale-105"
                              />
                            </div>
                            <div className="p-3">
                              <p className="text-sm font-semibold text-slate-900">Template {index + 1}</p>
                              <p className="text-xs text-slate-500">Product design option</p>
                              <button
                                onClick={() => handleRemoveTemplate(selectedProduct._id, index)}
                                className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-lg bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-600 transition-colors hover:bg-rose-100"
                              >
                                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Remove
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
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

export default PetProductManager;