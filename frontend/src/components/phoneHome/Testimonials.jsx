import React, { useState, useEffect } from 'react';
import { Star, ArrowLeft, ArrowRight, Quote } from 'lucide-react';

import phonecase9 from "../../assets/custom/phonecase9.png"
import phonecase10 from "../../assets/custom/phonecase10.png"
import phonecase11 from "../../assets/custom/phonecase11.png"
import phonecase12 from "../../assets/custom/phonecase12.png"

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);


  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Emma Rodriguez",
      pet: "Golden Retriever 'Milo'",
      text: "I cried when I opened the package. The photo quality is insane — Milo's eyes look so real I feel like he always with me. Already ordered one for my mom!",
      rating: 5,
      model: "iPhone 15 Pro Max Tough Case",
      verified: true,
      img: [phonecase11]
    },
    {
      id: 2,
      name: "Tyler & Sarah Kim",
      pet: "Cats 'Mochi & Matcha'",
      text: "We got matching cases with both our cats and everyone at work asks where we got them. The MagSafe is super strong and the print hasn’t faded at all after 4 months.",
      rating: 5,
      model: "MagSafe Clear Case Duo",
      verified: true,
      img: [phonecase10]
    },
    {
      id: 3,
      name: "Jessica Miller",
      pet: "French Bulldog 'Bruno'",
      text: "I drop my phone daily (thanks Bruno zoomies). This case has saved my phone 3 times already. The raised edges actually work and the photo is still perfect.",
      rating: 5,
      model: "Heavy Duty Armor Case",
      verified: true,
      img: [phonecase12]
    },
    {
      id: 4,
      name: "David Park",
      pet: "Rescue Pup 'Luna'",
      text: "Best gift I ever gave my girlfriend. She uses the memorial case of her childhood dog every day and says it helps her feel connected.",
      rating: 5,
      model: "Rainbow Bridge Soft Case",
      verified: true,
      img: [phonecase9]
    }
  ];

  // Auto-slide interval
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="relative py-24 bg-gray-50 overflow-hidden">

      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-sm font-bold tracking-widest text-[#fe7245] uppercase mb-2">Community Love</h2>
          <h3 className="text-3xl md:text-4xl font-black text-gray-900">Trusted by Case Lovers</h3>
        </div>

        {/* Main Slider */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden min-h-[500px] md:min-h-[400px] flex flex-col md:flex-row transition-all duration-500">

          {/* Left Image Side */}
          <div className="w-full md:w-2/5 relative h-64 md:h-auto">
            <div className="absolute inset-0 w-full h-full">
              <img
                key={currentIndex}
                src={testimonials[currentIndex].img}
                alt={testimonials[currentIndex].name}
                className="w-full h-full object-cover animate-fade-in"
              />
              <div className="absolute inset-0 bg-black/5"></div>
            </div>

            {/* Floating Icon */}
            <div className="absolute top-6 left-6 bg-white/90 backdrop-blur p-3 rounded-full shadow-lg text-[#fe7245]">
              <Quote className="w-6 h-6 fill-current" />
            </div>
          </div>

          {/* Right Content Side */}
          <div className="w-full md:w-3/5 p-8 md:p-12 flex flex-col justify-center relative">

            {/* Star Rating */}
            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>

            {/* Review Text */}
            <div className="mb-8">
              <p className="text-xl md:text-2xl font-serif italic text-gray-800 leading-relaxed">
                "{testimonials[currentIndex].text}"
              </p>
            </div>

            {/* Bottom Content */}
            <div className="flex items-center justify-between border-t border-gray-100 pt-6 mt-auto">
              <div>
                <h4 className="font-bold text-gray-900 text-lg">
                  {testimonials[currentIndex].name}
                </h4>
                <p className="text-sm text-gray-500">
                  {testimonials[currentIndex].pet}
                </p>
                <span className="text-xs font-semibold text-[#fe7245] mt-1 block">
                  Bought: {testimonials[currentIndex].model}
                </span>
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-3">
                <div className="flex gap-3">
                  {/* Previous Button */}
                  <button
                    onClick={handlePrev}
                    className="
      p-2 md:p-3
      rounded-full
      border border-gray-200
      hover:bg-gray-100 hover:border-gray-300
      transition-colors duration-300
      group
    "
                  >
                    <ArrowLeft
                      className="
        w-4 h-4 md:w-5 md:h-5
        text-gray-600
        group-hover:text-black
        transition-colors duration-300
      "
                    />
                  </button>

                  {/* Next Button */}
                  <button
                    onClick={handleNext}
                    className="
      p-2 md:p-3
      rounded-full
      bg-gray-900 text-white
      hover:bg-gray-800
      shadow-lg
      transition-colors duration-300
      flex items-center justify-center
    "
                  >
                    <ArrowRight
                      className="
        w-4 h-4 md:w-5 md:h-5
        transition-transform
      "
                    />
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`
    h-2 rounded-full
    transition-all duration-300
    ${index === currentIndex
                  ? 'w-6 md:w-8 bg-[#fe7245]'
                  : 'w-2 md:w-3 bg-gray-300 hover:bg-gray-400'
                }
  `}
            />

          ))}
        </div>

      </div>
    </section>
  );
}
