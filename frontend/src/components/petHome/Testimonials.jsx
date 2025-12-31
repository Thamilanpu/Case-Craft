import React, { useState, useEffect } from 'react';
import { Star, ArrowLeft, ArrowRight, Quote } from 'lucide-react';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Mock data - replace with real reviews later
  const testimonials = [
    {
      id: 1,
      name: "Sarah Jenkins",
      role: "Dog Mom to 'Cooper'",
      image: "https://images.unsplash.com/photo-1548142813-c348350df52b?q=80&w=1000&auto=format&fit=crop",
      text: "I was skeptical about the photo quality on a phone case, but this blew me away. It captures Cooper's grin perfectly. I've dropped my phone twice and not a scratch!",
      rating: 5,
      product: "Custom Portrait Case"
    },
    {
      id: 2,
      name: "Marcus Chen",
      role: "Adventure Rider",
      image: "https://images.unsplash.com/photo-1517423568366-697553f1e316?q=80&w=1000&auto=format&fit=crop", 
      text: "The heavy-duty materials they use for the pet tags are legit. My dog runs through brush and mud, and the engraving is still crystal clear after 6 months.",
      rating: 5,
      product: "Stainless Steel Tag"
    },
    {
      id: 3,
      name: "Emily & 'Luna'",
      role: "Verified Buyer",
      image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?q=80&w=1000&auto=format&fit=crop",
      text: "Finally found a tote bag that fits all my puppy training gear and still looks cute enough for brunch. The matching gingham pattern is adorable!",
      rating: 5,
      product: "Gingham Pet Tote"
    }
  ];

  // Auto-slide functionality (changes every 5 seconds)
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
      
      {/* Decorative Background Blobs */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-sm font-bold tracking-widest text-[#fe7245] uppercase mb-2">Community Love</h2>
          <h3 className="text-3xl md:text-4xl font-black text-gray-900">Trusted by Pet Parents</h3>
        </div>

        {/* Main Slider Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden min-h-[500px] md:min-h-[400px] flex flex-col md:flex-row transition-all duration-500">
          
          {/* Left Side: Image */}
          <div className="w-full md:w-2/5 relative h-64 md:h-auto">
             <div className="absolute inset-0 w-full h-full">
                {/* Image fade effect using key */}
                <img 
                  key={currentIndex} 
                  src={testimonials[currentIndex].image} 
                  alt={testimonials[currentIndex].name} 
                  className="w-full h-full object-cover animate-fade-in"
                />
                {/* Dark overlay for text contrast if needed, mostly style */}
                <div className="absolute inset-0 bg-black/5"></div>
             </div>
             
             {/* Floating Quote Icon */}
             <div className="absolute top-6 left-6 bg-white/90 backdrop-blur p-3 rounded-full shadow-lg text-[#fe7245]">
               <Quote className="w-6 h-6 fill-current" />
             </div>
          </div>

          {/* Right Side: Content */}
          <div className="w-full md:w-3/5 p-8 md:p-12 flex flex-col justify-center relative">
            
            {/* Star Rating */}
            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>

            {/* The Review Quote */}
            <div className="mb-8">
              <p className="text-xl md:text-2xl font-serif italic text-gray-800 leading-relaxed">
                "{testimonials[currentIndex].text}"
              </p>
            </div>

            {/* Author & Controls Row */}
            <div className="flex items-center justify-between border-t border-gray-100 pt-6 mt-auto">
              <div>
                <h4 className="font-bold text-gray-900 text-lg">{testimonials[currentIndex].name}</h4>
                <p className="text-sm text-gray-500">{testimonials[currentIndex].role}</p>
                <span className="text-xs font-semibold text-[#fe7245] mt-1 block">
                  Bought: {testimonials[currentIndex].product}
                </span>
              </div>

              {/* Navigation Arrows */}
              <div className="flex gap-3">
                <button 
                  onClick={handlePrev}
                  className="p-3 rounded-full border border-gray-200 hover:bg-gray-100 hover:border-gray-300 transition-colors group"
                  aria-label="Previous testimonial"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-600 group-hover:text-black" />
                </button>
                <button 
                  onClick={handleNext}
                  className="p-3 rounded-full bg-gray-900 text-white hover:bg-gray-800 transition-colors shadow-lg"
                  aria-label="Next testimonial"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'w-8 bg-[#fe7245]' : 'w-2 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}