import React from 'react';
import { ArrowRight, Sparkles, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FinalCTA() {
  return (
    <section className="relative py-32 md:py-40 overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white">

      {/* Floating Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-96 h-96 bg-[#fe7245]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
          <Heart className="w-32 h-32 text-[#fe7245]/5 absolute top-20 left-20 animate-ping" />
          <Heart className="w-24 h-24 text-purple-400/5 absolute bottom-32 right-32 animate-ping delay-1000" />
        </div>
      </div>

      <div className="relative max-w-5xl mx-auto px-6 text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#fe7245] to-pink-600 text-white px-8 py-4 rounded-full text-lg font-bold uppercase tracking-wider shadow-2xl mb-8 animate-bounce">
          <Sparkles className="w-6 h-6" />
          Your Pet Deserves This
        </div>

        {/* Main Headline */}
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 leading-tight">
          Ready to Make<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fe7245] via-pink-500 to-purple-600">
            Magic Happen?
          </span>
        </h2>

        {/* Subtext */}
        <p className="mt-8 text-2xl md:text-3xl text-gray-600 font-medium max-w-3xl mx-auto">
          Join 100,000+ pet parents who turned their favorite photo into something they use every single day.
        </p>

        {/* Mega CTA Button */}
        <div className="mt-16 relative group">
          <div className="absolute -inset-4 bg-gradient-to-r from-[#fe7245] via-pink-500 to-purple-600 rounded-full blur-3xl opacity-70 group-hover:opacity-100 transition-opacity duration-700 animate-pulse" />

          <Link
            to="/case-design"
            className="
    relative inline-flex items-center gap-3 sm:gap-6 
    bg-gradient-to-r from-[#fe7245] to-pink-600 text-white 
    px-6 sm:px-16 py-4 sm:py-8 
    rounded-full 
    text-xl sm:text-3xl md:text-4xl 
    font-black 
    shadow-2xl 
    hover:shadow-[#fe7245]/50 
    hover:scale-105 
    transition-all duration-500 
    overflow-hidden 
    group
  "
          >
            <span className="relative z-10 flex items-center gap-2 sm:gap-6">
              Start Designing Now
              <ArrowRight className="w-5 h-5 sm:w-12 sm:h-12 transition-transform duration-300 group-hover:translate-x-2 sm:group-hover:translate-x-4" />
            </span>

            {/* Shine Effect */}
            <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 skew-x-12" />
          </Link>

        </div>

        {/* Trust Line */}
        <p className="mt-12 text-lg text-gray-500">
          <span className="text-[#fe7245] font-bold">100% Happiness Guarantee</span> • Free proof • Ships in 3–7 days
        </p>

      </div>
    </section>
  );
}