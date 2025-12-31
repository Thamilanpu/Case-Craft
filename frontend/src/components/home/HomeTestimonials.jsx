import React, { useState, useEffect } from 'react';
import { Star, ArrowLeft, ArrowRight, Quote } from 'lucide-react';

export default function HomeTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Emma Rodriguez",
      pet: "Golden Retriever 'Milo'",
      text: "I cried when I opened the package. The photo quality is insane — Milo's eyes look so real I feel like he's always with me. Already ordered one for my mom!",
      model: "iPhone 15 Pro Max Tough Case",
      img: "https://images.unsplash.com/photo-1548142813-c348350df52b?w=1200&q=80"
    },
    {
      id: 2,
      name: "Tyler & Sarah Kim",
      pet: "Cats 'Mochi & Matcha'",
      text: "We got matching cases with both our cats and everyone at work asks where we got them. The MagSafe is super strong and the print hasn’t faded at all after 4 months.",
      model: "MagSafe Clear Case Duo",
      img: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=1200&q=80"
    },
    {
      id: 3,
      name: "Jessica Miller",
      pet: "French Bulldog 'Bruno'",
      text: "I drop my phone daily (thanks Bruno zoomies). This case has saved my phone 3 times already. The raised edges actually work and the photo is still perfect.",
      model: "Heavy Duty Armor Case",
      img: "https://images.unsplash.com/photo-1517423568366-697553f1e316?w=1200&q=80"
    },
    {
      id: 4,
      name: "David Park",
      pet: "Rescue Pup 'Luna'",
      text: "Best gift I ever gave my girlfriend. She uses the memorial case of her childhood dog every day and says it helps her feel connected.",
      model: "Rainbow Bridge Soft Case",
      img: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=1200&q=80"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrentIndex(prev => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex(prev => (prev - 1 + testimonials.length) % testimonials.length);

  const t = testimonials[currentIndex];

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900">

      {/* Background Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-96 h-96 bg-[#fe7245]/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#fe7245] font-bold uppercase tracking-widest text-sm mb-3">
            100,000+ Happy Pet Parents
          </p>
          <h2 className="text-5xl md:text-7xl font-black text-white leading-tight">
            Real Love.<br />Real Reviews.
          </h2>
        </div>

        {/* Glassmorphic Testimonial Card */}
        <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden max-w-5xl mx-auto">

          <div className="grid md:grid-cols-2">

            {/* Left: Pet Photo */}
            <div className="relative h-96 md:h-full overflow-hidden">
              <img
                key={currentIndex}
                src={t.img}
                alt={t.pet}
                className="w-full h-full object-cover transition-opacity duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

              {/* Quote Icon */}
              <div className="absolute top-8 left-8 bg-white/20 backdrop-blur p-4 rounded-2xl shadow-xl">
                <Quote className="w-10 h-10 text-[#fe7245] fill-current" />
              </div>

              {/* Verified Badge */}
              <div className="absolute bottom-8 left-8 bg-emerald-500 text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg">
                Verified Buyer
              </div>
            </div>

            {/* Right: Content */}
            <div className="p-10 md:p-16 flex flex-col justify-center text-white">

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-7 h-7 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Review */}
              <blockquote className="text-2xl md:text-3xl font-medium leading-relaxed mb-10 text-gray-100">
                "{t.text}"
              </blockquote>

              {/* Author */}
              <div className="border-t border-white/20 pt-8">
                <h4 className="text-2xl font-bold">{t.name}</h4>
                <p className="text-lg text-gray-300 mt-1">Proud parent of {t.pet}</p>
                <p className="text-sm font-bold text-[#fe7245] uppercase tracking-wider mt-4">
                  {t.model}
                </p>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-12">
                <div className="flex gap-4">
                  <button
                    onClick={prev}
                    className="
    p-3 sm:p-4 w-10 h-10 sm:w-12 sm:h-12 rounded-full
    bg-white/20 backdrop-blur-sm sm:backdrop-blur
    hover:bg-white/30 transition-all group flex items-center justify-center"
                  >
                    <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 group-hover:-translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={next}
                    className="
    p-3 sm:p-4 w-10 h-10 sm:w-12 sm:h-12 rounded-full
    bg-[#fe7245] hover:bg-[#e05535] transition-all
    group shadow-xl flex items-center justify-center"
                  >
                    <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
                  </button>

                </div>

                {/* Dots */}
                <div className="flex gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentIndex(i)}
                      className={`
    h-2 rounded-full transition-all duration-300
    ${i === currentIndex
                          ? 'w-8 sm:w-12 bg-[#fe7245]'
                          : 'w-3 sm:w-2 bg-white/40'
                        }
  `}
                    />

                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}