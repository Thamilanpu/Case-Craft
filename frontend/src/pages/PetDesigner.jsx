import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { fetchPetProducts } from "../api/petProductApi.js";
import { useCart } from "../context/CartContext.jsx";

const PetDesigner = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isAuthenticated } = useAuth();
  const { addItem } = useCart();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProductId, setSelectedProductId] = useState("");
  const [selectedTemplateIndex, setSelectedTemplateIndex] = useState(0);
  const [userCustomImage, setUserCustomImage] = useState(null);
  const [textValue, setTextValue] = useState("");
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        const loadedProducts = await fetchPetProducts();
        setProducts(loadedProducts);

        const uniqueCategories = [...new Set(loadedProducts.map((p) => p.category || "Uncategorized"))];
        setCategories(uniqueCategories);

        // Check URL params for pre-selection
        const paramCategory = searchParams.get("category");
        const paramProductId = searchParams.get("productId");

        if (paramProductId) {
          const product = loadedProducts.find(p => p._id === paramProductId);
          if (product) {
            setSelectedCategory(product.category || uniqueCategories[0]);
            setSelectedProductId(product._id);
            return; // Exit early if product found
          }
        }

        if (paramCategory && uniqueCategories.includes(paramCategory)) {
          setSelectedCategory(paramCategory);
          const firstProduct = loadedProducts.find(p => p.category === paramCategory);
          if (firstProduct) setSelectedProductId(firstProduct._id);
        } else if (uniqueCategories.length > 0) {
          // Default fallback
          setSelectedCategory(uniqueCategories[0]);
          const firstProduct = loadedProducts.find((p) => p.category === uniqueCategories[0]);
          if (firstProduct) setSelectedProductId(firstProduct._id);
        }
      } catch (error) {
        console.error(error);
        setStatus("Unable to load pet products. Please contact admin.");
      }
    };
    init();
  }, [searchParams]);

  const getTemplates = (product) => {
    if (!product) return [];
    return product.templates && product.templates.length > 0
      ? product.templates
      : product.images || [];
  };

  const selectedProduct = products.find((p) => p._id === selectedProductId);
  const templates = selectedProduct ? getTemplates(selectedProduct) : [];
  const selectedTemplate = templates[selectedTemplateIndex] || templates[0] || null;

  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setUserCustomImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      setStatus("Please login to add your design to cart.");
      navigate("/login");
      return;
    }

    if (!selectedProduct) {
      setStatus("Please select a product.");
      return;
    }

    if (!userCustomImage && !textValue) {
      if (!window.confirm("You haven't uploaded an image or added text. Continue anyway?")) return;
    }

    setSaving(true);
    setStatus("");

    try {
      addItem({
        productName: selectedProduct.name,
        productId: selectedProduct._id,
        price: selectedProduct.price || 0,
        designImage: selectedTemplate || userCustomImage, // Fallback for cart thumbnail
        templateImage: selectedTemplate || "",
        userCustomImage: userCustomImage || "",
        customText: textValue,
        quantity: 1,
        category: "pet_asset"
      });

      navigate("/checkout");
    } catch {
      setStatus("Unable to add to cart");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/50">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 p-3">
              <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Custom Pet Products</h1>
              <p className="mt-1 text-sm text-slate-600">Select a template and upload your pet's photo!</p>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* LEFT COLUMN: SELECTION & UPLOADS */}
          <div className="space-y-6">

            {/* 1. Category & Product Selection */}
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/50">
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-slate-700 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-xs">1</span>
                Select Product
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => {
                      setSelectedCategory(e.target.value);
                      const firstProduct = products.find((p) => p.category === e.target.value);
                      if (firstProduct) setSelectedProductId(firstProduct._id);
                      setSelectedTemplateIndex(0);
                    }}
                    className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-sm transition-colors focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20"
                  >
                    {categories.map((cat, idx) => (
                      <option key={idx} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Product</label>
                  <select
                    value={selectedProductId}
                    onChange={(e) => {
                      setSelectedProductId(e.target.value);
                      setSelectedTemplateIndex(0);
                    }}
                    className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-sm transition-colors focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20"
                  >
                    {products
                      .filter((p) => p.category === selectedCategory)
                      .map((p) => (
                        <option key={p._id} value={p._id}>
                          {p.name} - $ {p.price}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>

            {/* 2. Template Selection */}
            {templates.length > 0 && (
              <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/50">
                <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-slate-700 flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-xs">2</span>
                  Choose Design Template
                </h3>
                <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                  {templates.map((template, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedTemplateIndex(index)}
                      className={`group relative overflow-hidden rounded-xl border-2 transition-all ${selectedTemplateIndex === index
                        ? "border-pink-500 ring-4 ring-pink-500/20 shadow-lg"
                        : "border-slate-200 hover:border-pink-300 hover:shadow-md"
                        }`}
                    >
                      <div className="aspect-square overflow-hidden bg-slate-50">
                        <img
                          src={template}
                          alt={`Template ${index + 1}`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      {selectedTemplateIndex === index && (
                        <div className="absolute inset-0 flex items-center justify-center bg-pink-500/20">
                          <div className="rounded-full bg-pink-600 p-1">
                            <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Upload & Text */}
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/50">
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-slate-700 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-xs">3</span>
                Customize
              </h3>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Upload Your Photo</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleUpload}
                    className="w-full cursor-pointer rounded-xl border-2 border-dashed border-purple-300 bg-purple-50 px-4 py-4 text-sm transition-colors hover:border-purple-500 focus:border-purple-500 focus:outline-none"
                  />
                  <p className="text-xs text-slate-500">We will place this photo into the design for you.</p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Add Text (Optional)</label>
                  <input
                    type="text"
                    value={textValue}
                    onChange={(e) => setTextValue(e.target.value)}
                    placeholder="e.g. Fluffy's Bowl"
                    className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-sm transition-colors focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20"
                  />
                </div>
              </div>
            </div>

            {/* Status & Action */}
            <div className="space-y-4">
              {status && (
                <div className="rounded-xl border-2 border-rose-200 bg-rose-50 p-4 text-sm font-medium text-rose-800">
                  {status}
                </div>
              )}

              <button
                onClick={handleAddToCart}
                disabled={saving}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 px-6 py-4 text-base font-bold text-white shadow-lg transition-all hover:shadow-xl hover:scale-[1.02] active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {saving ? "Processing..." : "Add to Cart"}
              </button>
            </div>

          </div>

          {/* RIGHT COLUMN: PREVIEW */}
          <div className="lg:sticky lg:top-8 space-y-6">
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/50">
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-slate-700">Selection Preview</h3>

              <div className="space-y-6">
                {/* Template Preview */}
                <div className="relative overflow-hidden rounded-xl border-2 border-slate-200 bg-slate-50">
                  {selectedTemplate ? (
                    <img src={selectedTemplate} alt="Selected Template" className="w-full object-cover" />
                  ) : (
                    <div className="flex h-64 items-center justify-center text-slate-400">No template selected</div>
                  )}
                  <div className="absolute top-2 right-2 rounded bg-black/50 px-2 py-1 text-xs font-bold text-white backdrop-blur-sm">
                    Template
                  </div>
                </div>

                {/* User Image Preview */}
                {userCustomImage && (
                  <div className="relative overflow-hidden rounded-xl border-2 border-purple-200 bg-purple-50">
                    <img src={userCustomImage} alt="Your Upload" className="h-48 w-full object-cover" />
                    <div className="absolute top-2 right-2 rounded bg-purple-600 px-2 py-1 text-xs font-bold text-white">
                      Your Photo
                    </div>
                  </div>
                )}

                {/* Text Preview */}
                {textValue && (
                  <div className="rounded-xl border-2 border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs font-semibold text-slate-500 uppercase">Your Text</p>
                    <p className="mt-1 text-lg font-bold text-slate-900">{textValue}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetDesigner;