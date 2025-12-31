import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight } from 'lucide-react';

// Import your two optimized images
import heroDesktop from "../../assets/phonehero.png";  // High-quality wide image (e.g. multiple custom phone cases on a clean background)
import heroMobile from "../../assets/phonehero.png";    // Vertical/taller crop optimized for phones

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen md:min-h-[90vh] flex items-center overflow-hidden bg-gray-900 text-white">

      {/* Responsive Background Image */}
      <picture className="absolute inset-0 z-0">
        {/* Mobile First */}
        <source media="(max-width: 767px)" srcSet={heroMobile} />
        {/* Desktop */}
        <source media="(min-width: 768px)" srcSet={heroDesktop} />
        {/* Fallback */}
        <img
          src={heroDesktop}
          alt="Custom phone cases with pet photos"
          className="w-full h-full object-cover"
        />
      </picture>

      {/* Dark Gradient Overlay – Stronger on left for text readability */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black via-black/70 to-transparent"></div>

      {/* Content – Left Aligned */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-20 md:py-24">
        <div className="max-w-xl lg:max-w-6xl">

          {/* Accent Tagline */}
          <p className="font-serif italic text-2xl md:text-4xl text-[#fe7245] mb-2 md:mb-4  md:-rotate-2 inline-block">
            Phone Case Print Specialists
          </p>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] uppercase">
            YOUR PIC<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-[#fe7245]">
              ON YOUR PHONE
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mt-6 md:mt-8 text-lg md:text-xl lg:text-xl text-gray-100 font-medium leading-relaxed">
            Premium custom phone cases featuring your dog, cat, or any pet.
            Crystal-clear print • Tough protection • Fast shipping • 100% happiness guaranteed.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 md:mt-12 flex flex-col sm:flex-row gap-4">
            <Link to="/case-design" className="w-full sm:w-auto">
              <button
                className="group bg-white text-black px-5 py-3 md:px-8 md:py-5 rounded-full font-bold text-base md:text-lg shadow-xl hover:shadow-2xl hover:shadow-white/30 transition-all duration-300 flex items-center justify-center gap-2 md:gap-3"
              >
                Design Your Case Now

                <ArrowRight
                  className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-2 transition-transform"
                />
              </button>
            </Link>

            <a href="#gallery" className="w-full sm:w-auto">
              <button
                className="group bg-transparent backdrop-blur-sm border-2 border-white/80 px-5 py-3 md:px-8 md:py-5 rounded-full font-bold text-base md:text-lg hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center gap-2 md:gap-3"
              >
                View Gallery

                <ShoppingBag
                  className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform"
                />
              </button>
            </a>

          </div>

          {/* Trust Signals */}
          <div className="mt-10 md:mt-14 flex flex-wrap items-center gap-4 md:gap-6">
            {/* Card 1 */}
            <div className="flex items-center gap-2 px-5 py-3 
                  backdrop-blur-md bg-white/10 border border-white/20 
                  rounded-full shadow-xl shadow-black/40
                  hover:bg-white/20 hover:border-white/40 
                  transition-all duration-300">
              <span className="text-[#fe7245] font-bold text-lg">80,000+</span>
              <span className="text-gray-200 text-sm md:text-base">cases printed</span>
            </div>

            {/* Card 2 */}
            <div className="flex items-center gap-2 px-5 py-3 
                  backdrop-blur-md bg-white/10 border border-white/20 
                  rounded-full shadow-xl shadow-black/40
                  hover:bg-white/20 hover:border-white/40 
                  transition-all duration-300">
              <span className="text-emerald-300 font-bold text-lg">Free</span>
              <span className="text-gray-200 text-sm md:text-base">shipping $40+</span>
            </div>

            {/* Card 3 */}
            <div className="flex items-center gap-2 px-5 py-3 
                  backdrop-blur-md bg-white/10 border border-white/20 
                  rounded-full shadow-xl shadow-black/40
                  hover:bg-white/20 hover:border-white/40 
                  transition-all duration-300">
              <span className="text-yellow-400 font-bold text-lg">4.9/5</span>
              <span className="text-gray-200 text-sm md:text-base">from 12k+ reviews</span>
            </div>

          </div>

        </div>
      </div>

      {/* Optional subtle floating accent (visible only on large screens) */}
      <div className="hidden lg:block absolute right-10 bottom-10 text-white/5 pointer-events-none">
        <span className="text-9xl font-black">CASES</span>
      </div>
    </section>
  );
}