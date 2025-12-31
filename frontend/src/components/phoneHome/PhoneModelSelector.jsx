import React, { useState } from 'react';
import { Star } from 'lucide-react';

const phoneModels = {
  Apple: [
    "iPhone 16 Pro Max", "iPhone 16 Pro", "iPhone 16 Plus", "iPhone 16",
    "iPhone 15 Pro Max", "iPhone 15 Pro", "iPhone 15 Plus", "iPhone 15",
    "iPhone 14 Pro Max", "iPhone 14 Pro", "iPhone 14 Plus", "iPhone 14",
    "iPhone 13 Pro Max", "iPhone 13 Pro", "iPhone 13", "iPhone SE (3rd gen)"
  ],
  Samsung: [
    "Galaxy S24 Ultra", "Galaxy S24+", "Galaxy S24",
    "Galaxy S23 Ultra", "Galaxy S23+", "Galaxy S23",
    "Galaxy Z Fold 6", "Galaxy Z Flip 6",
    "Galaxy A55", "Galaxy A35"
  ],
  Google: [
    "Pixel 9 Pro XL", "Pixel 9 Pro", "Pixel 9",
    "Pixel 8 Pro", "Pixel 8", "Pixel 8a",
    "Pixel 7 Pro", "Pixel 7"
  ],
  OnePlus: [
    "OnePlus 13", "OnePlus 12", "OnePlus 12R",
    "OnePlus Open", "Nord N30"
  ]
};

const brands = ["Apple", "Samsung", "Google", "OnePlus"];

export default function PhoneModelSelector() {
  const [activeBrand, setActiveBrand] = useState("Apple");

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-8">

        {/* Top Headline + Trust */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900">
            Design a unique phone case with your own photo today
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            From $14.95 • Fast & reliable shipping
          </p>
          <div className="mt-6 flex items-center justify-center gap-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-5 h-5 ${i < 4 ? 'fill-current' : 'fill-transparent'}`} />
              ))}
            </div>
            <span className="text-gray-700 font-medium">4.98</span>
            <span className="text-gray-500">(12,847 reviews)</span>
          </div>
        </div>

        {/* Main Selector */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-10">
              Choose your brand and model
            </h3>

            <div className="grid lg:grid-cols-4 gap-8">
              {/* Left: Brand Tabs */}
              <div className="lg:col-span-1">
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <button
                      key={brand}
                      onClick={() => setActiveBrand(brand)}
                      className={`
    w-full text-left
    px-4 py-3 md:px-6 md:py-4
    rounded-xl font-semibold
    text-base md:text-lg
    transition-all duration-300
    ${activeBrand === brand
                          ? 'bg-[#0a214f] text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }
  `}
                    >
                      {brand}
                    </button>

                  ))}
                  <button
                    className="
    w-full text-left
    px-4 py-3 md:px-6 md:py-4
    rounded-xl
    font-medium
    text-gray-600
    bg-gray-50
    hover:bg-gray-100
    transition
  "
                  >
                    More brands...
                  </button>

                </div>
              </div>

              {/* Right: Model Grid */}
              <div className="lg:col-span-3">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {phoneModels[activeBrand].map((model) => (
                    <button
                      key={model}
                      className="
    group
    w-full
    cursor-pointer
    bg-gray-50 hover:bg-[#0a214f] hover:text-white
    px-4 py-3 md:px-5 md:py-4
    rounded-xl
    text-center font-medium
    text-gray-800
    border border-gray-200 hover:border-transparent
    transition-all duration-300
    hover:shadow-lg hover:-translate-y-1
  "
                    >
                      {model}
                    </button>

                  ))}
                </div>

                {/* Optional: "Show more" for Apple */}
                {activeBrand === "Apple" && (
                  <div className="mt-6 text-center">
                    <button
                      className="
    text-gray-600 hover:text-gray-900
    font-medium
    text-sm md:text-base
    px-2 py-1 md:px-4 md:py-2
    transition-colors duration-300
  "
                    >
                      + More {activeBrand} devices...
                    </button>

                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}