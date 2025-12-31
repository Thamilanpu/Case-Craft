import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Heart, Star, ArrowRight } from 'lucide-react';
import pro1 from "../../assets/pro1.webp"
import pro2 from "../../assets/pro2.webp"
import pro3 from "../../assets/pro3.webp"
import pet5 from "../../assets/gallery/pet5.jpg"
import pet10 from "../../assets/gallery/pet10.png"

// --- Sub-Component: Product Card ---
const ProductCard = ({ product }) => {
  return (
    <div className="group relative flex flex-col gap-3">

      {/* 1. Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-gray-100">

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
            {product.badge}
          </div>
        )}

        {/* Wishlist Button */}
        <button className="absolute top-3 right-3 z-10 bg-white/50 backdrop-blur p-2.5 rounded-full text-gray-900 hover:bg-white hover:text-red-500 transition-all duration-300">
          <Heart className="w-4 h-4" />
        </button>

        {/* Main Image with Zoom Effect */}
        <img
          src={product.img}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
        />

        {/* Hover Action: Slide Up Add to Cart */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
          <Link
            to={`/pet-design?productId=${product.id}`}
            className="flex-1 flex items-center justify-center gap-2 bg-slate-900 text-white px-4 py-2.5 rounded-xl font-semibold text-sm hover:bg-slate-800 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Customize
          </Link>
        </div>
      </div>

      {/* 2. Product Details */}
      <div className="space-y-1">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-lg text-gray-900 leading-tight group-hover:text-[#fe7245] transition-colors cursor-pointer">
            {product.name}
          </h3>
          <span className="font-serif italic text-lg font-medium text-gray-900">
            ${product.price}
          </span>
        </div>

        <p className="text-sm text-gray-500">{product.desc}</p>

        {/* Rating Mockup */}
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          ))}
          <span className="text-xs text-gray-400 ml-1">(42)</span>
        </div>
      </div>
    </div>
  );
};

// --- Main Section Component ---
export default function FeaturedProducts() {
  // Updated with better mock images to match the vibe
  const products = [
    {
      id: 1,
      name: "Custom Pet Fleece Blanket",
      desc: "Ultra-Soft • Machine Washable",
      price: "49.99",
      badge: "Best Seller",
      img: pro1
    },
    {
      id: 2,
      name: "Custom Pet Pickleball Paddle",
      desc: "Pro Graphite Surface • Honeycomb Core",
      price: "59.99",
      badge: "Trending",
      img: pro2
    },
    {
      id: 3,
      name: "Gingham Pet Tote Bag",
      desc: "Heavy Duty Canvas • Everyday Travel",
      price: "34.99",
      badge: "New",
      img: pet10
    },
    {
      id: 4,
      name: "Round Plush Pet Pillow",
      desc: "Premium Velvet • Double Sided Print",
      price: "39.99",
      badge: null,
      img: pet5
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-[#fe7245] font-bold tracking-wider uppercase text-sm mb-2">
            Weekly Favorites
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Trending Now
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-900 to-[#fe7245] rounded-full mb-6"></div>
          <p className="text-gray-500 max-w-2xl text-lg">
            Discover the gear that pet parents and tech lovers are obsessing over this week.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <button className="inline-flex items-center gap-2 border-b-2 border-gray-900 pb-1 text-lg font-bold hover:text-[#fe7245] hover:border-[#fe7245] transition-all">
            View All Products
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
}