import React from 'react';
import { ArrowRight, Sparkles, HeartHandshake } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AboutSection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900">

      {/* Background Glows */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-10 w-96 h-96 bg-[#fe7245]/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-0 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -left-20 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left: Content (same powerful copy) */}
          <div className="space-y-10">
            <div>
              <div className="inline-flex items-center gap-3 bg-[#fe7245]/10 text-[#fe7245] px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider mb-6 shadow-xl">
                <HeartHandshake className="w-5 h-5" />
                Made for Pet Parents, by Pet Parents
              </div>
              <h2 className="text-5xl md:text-7xl font-black text-white leading-tight">
                We Turn Love Into<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fe7245] to-pink-500">
                  Everyday Magic
                </span>
              </h2>
            </div>

            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-2xl">
              Since 2020, we’ve helped over <span className="text-[#fe7245] font-bold">100,000+</span> pet parents keep their best friends close — on their phone, in their home, and in their heart.
            </p>

            <p className="text-lg text-gray-400 leading-relaxed">
              Every case, blanket, and bowl is printed with love using eco-friendly inks and premium materials. Your happiness (and your pet’s face looking perfect) is our obsession.
            </p>

            {/* Glass Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12">
              {[
                { number: "100K+", label: "Products Created", gradient: "from-[#fe7245] to-pink-500" },
                { number: "4.9★", label: "Average Rating", gradient: "from-yellow-400 to-orange-500" },
                { number: "24hr", label: "Proof Turnaround", gradient: "from-emerald-400 to-cyan-500" }
              ].map((stat, i) => (
                <div key={i} className="relative group">
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-20 rounded-3xl blur-xl group-hover:opacity-40 transition-opacity duration-500`} />
                  <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 text-center hover:bg-white/20 transition-all">
                    <div className={`text-4xl md:text-5xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                      {stat.number}
                    </div>
                    <div className="text-gray-300 text-sm mt-2 font-medium">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

            <Link
              to="/about"
              className="group inline-flex items-center gap-2 sm:gap-4 bg-[#fe7245] text-white px-4 sm:px-10 py-3 sm:py-6 rounded-full text-base sm:text-xl font-bold shadow-2xl hover:shadow-[#fe7245]/50 hover:scale-105 transition-all duration-300"
            >
              Our Story & Promise
              <ArrowRight className="w-5 h-5 sm:w-7 sm:h-7 transition-transform group-hover:translate-x-1 sm:group-hover:translate-x-3" />
            </Link>

          </div>

          {/* Right: 3 Floating Images — Pure Magic */}
          <div className="relative h-[600px] lg:h-[750px]">

            {/* Image 1 — Back Left (Biggest) */}
            <div className="absolute top-10 left-0 w-80 lg:w-96 group">
              <div className="absolute -inset-6 bg-gradient-to-br from-[#fe7245]/40 to-purple-600/30 rounded-3xl blur-3xl opacity-60 group-hover:opacity-90 transition-opacity duration-700" />
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80&fit=crop"
                alt="Happy customer with custom pet phone case"
                className="relative rounded-3xl shadow-2xl w-full object-cover border-8 border-white/10 group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Image 2 — Center (Floating Forward) */}
            <div className="absolute top-32 right-10 lg:right-20 w-72 lg:w-80 group">
              <div className="absolute -inset-6 bg-gradient-to-tl from-pink-500/40 to-orange-500/30 rounded-3xl blur-3xl opacity-70 group-hover:opacity-90 transition-opacity" />
              <img
                src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=1200&q=80&fit=crop"
                alt="Dog sleeping on custom pet blanket"
                className="relative rounded-3xl shadow-2xl w-full object-cover border-8 border-white/10 group-hover:scale-110 transition-transform duration-700 rotate-6 hover:rotate-3"
              />
            </div>

            {/* Image 3 — Front Right (Smallest, Tilted) */}
            <div className="absolute bottom-10 left-20 lg:left-32 w-64 lg:w-72 group">
              <div className="absolute -inset-6 bg-gradient-to-br from-cyan-500/40 to-blue-600/30 rounded-3xl blur-3xl opacity-70 group-hover:opacity-90 transition-opacity" />
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80&fit=crop"
                alt="Custom pet bowl with name"
                className="relative rounded-3xl shadow-2xl w-full object-cover border-8 border-white/10 group-hover:scale-110 transition-transform duration-700 -rotate-12 hover:-rotate-6"
              />
              {/* Floating Badge */}
              <div className="absolute -top-6 -right-6 bg-[#fe7245] text-white px-6 py-3 rounded-full font-bold shadow-2xl flex items-center gap-2 animate-bounce">
                <Sparkles className="w-6 h-6" />
                Real Love
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}