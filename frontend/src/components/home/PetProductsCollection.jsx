import React from 'react';
import { ArrowRight, Heart, Sparkles } from 'lucide-react';
import pro1 from "../../assets/pro1.webp"
import pro2 from "../../assets/pro2.webp"
import pro3 from "../../assets/pro3.webp"
import pro4 from "../../assets/pro4.webp"

const petProducts = [
  {
    id: 1,
    name: "Fleece Pet Blanket",
    price: "$49.99",
    image: pro1,
    features: ["Double-sided print", "Machine washable", "60×80 inch"]
  },
  {
    id: 2,
    name: "Round Pet Pillow",
    price: "$39.99",
    image: pro2,
    features: ["Premium velvet", "Double-sided photo", "Removable cover",]
  },
  {
    id: 3,
    name: "Customized Bowl",
    price: "$34.99",
    image: pro3,
    features: ["Stainless steel", "Custom engraving", "Non-slip base",]
  },
  {
    id: 4,
    name: "Custom Pet Collar",
    price: "$29.99",
    image: pro4,
    features: ["Durable nylon", "Photo print", "Adjustable fit",]
  }
];

export default function PetProductsCollection() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-rose-50 via-white to-amber-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-[#fe7245] text-white px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider mb-6 shadow-xl">
            <Heart className="w-5 h-5 fill-white" />
            Spoil Your Best Friend
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-gray-900 leading-tight">
            Pet Gifts They’ll Love
          </h2>
          <p className="mt-4 text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            Because every nap, meal, and walk deserves their face on it
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {petProducts.map((product, index) => (
            <div
              key={product.id}
              className="group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-4"
              style={{ transitionDelay: `${index * 100}ms` }}
            >

              {/* Special Badge */}
              {index === 0 && (
                <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-rose-500 to-pink-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                  <Sparkles className="w-4 h-4" />
                  MOST LOVED
                </div>
              )}

              {/* Image */}
              <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-rose-50 to-orange-50">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Content */}
              <div className="p-8">
                <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-3">
                  {product.name}
                </h3>
                <div className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-[#fe7245] bg-clip-text text-transparent mb-6">
                  {product.price}
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-gradient-to-r from-pink-500 to-[#fe7245] rounded-full flex items-center justify-center flex-shrink-0">
                        <Heart className="w-4 h-4 text-white fill-white" />
                      </div>
                      <span className="text-gray-700 font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button className="group/btn w-full relative bg-gradient-to-r from-pink-600 to-[#fe7245] text-white py-3 sm:py-5 px-4 sm:px-0 rounded-2xl font-bold text-base sm:text-lg shadow-2xl hover:shadow-pink-500/50 hover:scale-105 transition-all duration-300 overflow-hidden">
                  <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
                    Customize Now
                    <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover/btn:translate-x-1 sm:group-hover/btn:translate-x-2" />
                  </span>

                  {/* Shine Effect */}
                  <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 skew-x-12" />
                </button>

              </div>

            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-8 sm:mt-16">
          <button className="group inline-flex items-center gap-2 sm:gap-4 text-base sm:text-xl font-bold text-gray-700 hover:text-[#fe7245] transition-colors">
            Explore All Pet Gifts
            <ArrowRight className="w-5 h-5 sm:w-7 sm:h-7 transition-transform group-hover:translate-x-1 sm:group-hover:translate-x-3" />
          </button>
        </div>


      </div>
    </section>
  );
}