import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ShoppingBag, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroDesktop from "../../assets/phonehero.png";
import heroDesktop2 from "../../assets/phonehero2.png";
import heroDesktop3 from "../../assets/phonehero3.png";

const slides = [
  {
    id: 1,
    bgDesktop: heroDesktop,
    bgMobile: heroDesktop,
    accent: "Phone Case Print Specialists",
    title: "YOUR PIC",
    titleGradient: "ON YOUR PHONE",
    subtitle: "Premium custom phone cases featuring your dog, cat, or any pet. Crystal-clear print • Tough protection • Fast shipping • 100% happiness guaranteed.",
    cta1: "Design Your Case Now",
    to1: "/case-design",
    cta2: "View Gallery",
    to2: "/custom-mobilecase#gallery"
  },
  {
    id: 2,
    bgDesktop: heroDesktop2,
    bgMobile: heroDesktop2,
    accent: "Limited Drop • Aura Collection",
    title: "AURA",
    titleGradient: "COLLECTION",
    subtitle: "Iridescent shimmer that changes with light. Only 3,000 made — get yours before they vanish.",
    cta1: "Shop Aura Now",
    to1: "/custom-mobilecase",
    cta2: "See Colors",
    to2: "/custom-mobilecase"
  },
  {
    id: 3,
    bgDesktop: heroDesktop3,
    bgMobile: heroDesktop3,
    accent: "Forever in your pocket",
    title: "RAINBOW",
    titleGradient: "BRIDGE",
    subtitle: "Honor your angel with a beautiful memorial case. Made with love, printed with care.",
    cta1: "Create Memorial Case",
    to1: "/case-design",
    cta2: "Learn More",
    to2: "/about"
  }
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent(prev => (prev + 1) % slides.length);
  const prev = () => setCurrent(prev => (prev - 1 + slides.length) % slides.length);

  const slide = slides[current];

  return (
    <section className="relative min-h-screen overflow-hidden">

      {/* Animated Background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <picture>
            <source media="(max-width: 767px)" srcSet={slide.bgMobile} />
            <source media="(min-width: 768px)" srcSet={slide.bgDesktop} />
            <img src={slide.bgDesktop} alt="" className="w-full h-full object-cover" />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-20 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-xl lg:max-w-6xl"
            >

              {/* Accent */}
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="font-serif italic text-2xl md:text-4xl text-[#fe7245] mb-4 -rotate-1 md:-rotate-2 inline-block font-bold"
              >
                {slide.accent}
              </motion.p>

              {/* Headline */}
              <motion.h1
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.9 }}
                className="text-5xl md:text-7xl lg:text-8xl text-white font-black tracking-tighter leading-none uppercase"
              >
                {slide.title}<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-[#fe7245]">
                  {slide.titleGradient}
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="mt-8 text-lg md:text-2xl text-gray-100 font-medium leading-relaxed max-w-3xl"
              >
                {slide.subtitle}
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="mt-10 flex flex-col sm:flex-row gap-4"
              >
                <Link
                  to={slide.to1}
                  className=" group bg-white text-black px-6 py-3 md:px-8 md:py-5 rounded-full font-bold text-base md:text-lg
    shadow-xl md:shadow-2xl hover:shadow-white/40 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 md:gap-3 "
                >
                  {slide.cta1}
                  <ArrowRight
                    className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-2 transition-transform duration-300 "
                  />
                </Link>

                <Link
                  to={slide.to2}
                  className=" group bg-transparent backdrop-blur text-white border-2 border-white/80 px-6 py-3 md:px-8 md:py-5 rounded-full
    font-bold text-base md:text-lg hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center gap-2 md:gap-3"
                >
                  {slide.cta2}
                  <ShoppingBag
                    className=" w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform duration-300"
                  />
                </Link>

              </motion.div>

              {/* Trust Pills */}
              {/* <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="mt-12 flex flex-wrap gap-4"
              >
                <div className="flex items-center gap-2 px-5 py-3 backdrop-blur bg-white/10 border border-white/20 rounded-full shadow-xl hover:bg-white/20 transition">
                  <span className="text-[#fe7245] font-bold text-lg">80,000+</span>
                  <span className="text-gray-200">cases printed</span>
                </div>
                <div className="flex items-center gap-2 px-5 py-3 backdrop-blur bg-white/10 border border-white/20 rounded-full shadow-xl hover:bg-white/20 transition">
                  <span className="text-emerald-300 font-bold text-lg">Free</span>
                  <span className="text-gray-200">shipping $40+</span>
                </div>
                <div className="flex items-center gap-2 px-5 py-3 backdrop-blur bg-white/10 border border-white/20 rounded-full shadow-xl hover:bg-white/20 transition">
                  <span className="text-yellow-400 font-bold text-lg">4.9/5</span>
                  <span className="text-gray-200">from 12k+ reviews</span>
                </div>
              </motion.div> */}

            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-7xl px-8 hidden md:flex justify-between items-center z-30 pointer-events-none">
        <div className="pointer-events-auto text-white">
          <span className="text-4xl font-light">0{current + 1}</span>
          <span className="text-white/40 text-2xl mx-2">/</span>
          <span className="text-white/60">0{slides.length}</span>
        </div>

        {/* <div className="flex gap-3 pointer-events-auto">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full  transition-all duration-500 ${i === current ? 'w-12 bg-white' : 'w-2 bg-white/40'}`}
            />
          ))}
        </div> */}

        <div className="flex gap-4 pointer-events-auto">
          <button onClick={prev} className="p-4 bg-white/20 backdrop-blur rounded-full hover:bg-white/40 transition-all">
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button onClick={next} className="p-4 bg-white/20 backdrop-blur rounded-full hover:bg-white/40 transition-all">
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </section>
  );
}