import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import case1 from "../../assets/cases/case1.webp";
import case2 from "../../assets/cases/case2.webp";
import case3 from "../../assets/cases/case3.webp";
import case4 from "../../assets/cases/case4.webp";

const phoneProducts = [
  {
    id: 1,
    name: "Matte Case",
    price: "$34.99",
    image: case1,
    features: ["Dual-layer protection", "Raised camera bezel", "MagSafe ready",]
  },
  {
    id: 2,
    name: "Clear Crystal Case",
    price: "$29.99",
    image: case2,
    features: ["Crystal clear TPU", "Anti-yellowing tech", "Slim & lightweight",]
  },
  {
    id: 3,
    name: "Eco Bio Case",
    price: "$32.99",
    image: case3,
    features: ["100% biodegradable", "Plant-based materials", "Compostable packaging",]
  },
  {
    id: 4,
    name: "Wallet Folio Case",
    price: "$44.99",
    image: case4,
    features: ["Premium vegan leather", "Stand function", "RFID blocking"]
  }
];

export default function PhoneCaseCollection() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-blue-50 to-purple-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center sm:gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 sm:px-6 py-2 sm:py-3  rounded-full text-sm font-bold uppercase tracking-wider mb-6 shadow-xl">
            <Sparkles className="w-5 h-5" />
            Premium Protection Meets Personality
          </div>
          <h2 className="text-5xl md:text-7xl lg:text-5xl font-black text-gray-900 leading-tight">
            Choose Your Perfect Case
          </h2>


          <p className="mt-4 text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            Built to protect. Designed to show off your pet.
          </p>
        </div>

        {/* Modern Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {phoneProducts.map((product, index) => (
            <div
              key={product.id}
              className="group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-4"
              style={{ transitionDelay: `${index * 100}ms` }}
            >

              {/* Floating Badge */}
              {index === 0 && (
                <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                  BEST SELLER
                </div>
              )}

              {/* Image Container */}
              <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Content */}
              <div className="p-8">
                <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-3">
                  {product.name}
                </h3>
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
                  {product.price}
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700 font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button className="group/btn w-full relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 sm:py-5 px-4 sm:px-0 rounded-2xl font-bold text-base sm:text-lg shadow-2xl hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300 overflow-hidden">
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
            See All Case Types
            <ArrowRight className="w-5 h-5 sm:w-7 sm:h-7 transition-transform group-hover:translate-x-1 sm:group-hover:translate-x-3" />
          </button>
        </div>


      </div>
    </section>
  );
}