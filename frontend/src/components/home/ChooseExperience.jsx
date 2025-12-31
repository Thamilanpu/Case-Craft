import React from 'react';
import { ArrowRight, Sparkles, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ChooseExperience() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <p className="text-[#fe7245] font-bold uppercase tracking-widest text-sm mb-4 flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5" />
            Choose Your Vibe
          </p>
          <h2 className="text-5xl md:text-7xl font-black text-gray-900 leading-tight">
            What Will You Create Today?
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16">

          {/* Custom Phone Cases */}
          <div className="group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500">
            {/* Gradient Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Floating Accent */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity" />

            <div className="relative p-10 md:p-14">
              {/* Icon */}
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mb-8 shadow-2xl group-hover:scale-110 transition-transform duration-500">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>

              <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">
                Custom Phone Cases
              </h3>
              <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                Your favorite photo. Your phone. Forever. Crystal-clear prints that last a lifetime.
              </p>

              {/* Features */}
              <div className="space-y-5 mb-12">
                {["Vibrant, fade-proof printing", "Tough & slim case options", "MagSafe + wallet styles", "Fits every phone model"].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <Link
                to="/case-design"
                className="group/btn inline-flex items-center gap-2 sm:gap-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 sm:px-10 py-3 sm:py-6 rounded-full text-base sm:text-xl font-bold shadow-2xl hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300"
              >
                Start Designing Your Case
                <ArrowRight className="w-5 h-5 sm:w-7 sm:h-7 transition-transform group-hover/btn:translate-x-1 sm:group-hover/btn:translate-x-2" />
              </Link>

            </div>
          </div>

          {/* Pet Products */}
          <div className="group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500">
            {/* Gradient Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Floating Heart Accent */}
            <div className="absolute -top-12 -left-12">
              <Heart className="w-32 h-32 text-pink-400/20 fill-pink-400/10 group-hover:fill-pink-400/30 transition-all duration-700" />
            </div>

            <div className="relative p-10 md:p-14">
              {/* Icon */}
              <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-orange-500 rounded-3xl flex items-center justify-center mb-8 shadow-2xl group-hover:scale-110 transition-transform duration-500">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>

              <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">
                Custom Pet Gifts
              </h3>
              <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                Because your fur baby deserves the world. Blankets, bowls, collars, pillows — all with their face.
              </p>

              {/* Features */}
              <div className="space-y-5 mb-12">
                {["Ultra-soft fleece blankets", "Engraved stainless bowls", "Personalized collars & leashes", "Double-sided pet pillows"].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <Link
                to="/pet-design"
                className="group/btn inline-flex items-center gap-2 sm:gap-4 bg-gradient-to-r from-pink-600 to-orange-600 text-white px-4 sm:px-10 py-3 sm:py-6 rounded-full text-base sm:text-xl font-bold shadow-2xl hover:shadow-orange-500/50 hover:scale-105 transition-all duration-300"
              >
                Spoil Your Pet Today
                <Heart className="w-5 h-5 sm:w-7 sm:h-7 transition-transform group-hover/btn:scale-110 sm:group-hover/btn:scale-125 fill-white" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}