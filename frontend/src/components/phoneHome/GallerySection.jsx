import React, { useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Heart, X, ZoomIn } from 'lucide-react';

import phonecase1 from "../../assets/custom/phonecase1.png"
import phonecase2 from "../../assets/custom/phonecase2.png"
import phonecase3 from "../../assets/custom/phonecase3.png"
import phonecase4 from "../../assets/custom/phonecase4.png"
import phonecase5 from "../../assets/custom/phonecase5.png"
import phonecase6 from "../../assets/custom/phonecase6.png"
import phonecase7 from "../../assets/custom/phonecase7.png"
import phonecase8 from "../../assets/custom/phonecase8.png"


// Lightbox Modal Component
const Lightbox = ({ images, currentIndex, onClose, onPrev, onNext }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm">
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-3 bg-white/10 backdrop-blur rounded-full hover:bg-white/20 transition-all"
      >
        <X className="w-8 h-8 text-white" />
      </button>

      {/* Prev Button */}
      <button
        onClick={onPrev}
        className="absolute left-6 top-1/2 -translate-y-1/2 p-4 bg-white/10 backdrop-blur rounded-full hover:bg-white/30 transition-all"
      >
        <ChevronLeft className="w-10 h-10 text-white" />
      </button>

      <button
        onClick={onNext}
        className="absolute right-6 top-1/2 -translate-y-1/2 p-4 bg-white/10 backdrop-blur rounded-full hover:bg-white/30 transition-all"
      >
        <ChevronRight className="w-10 h-10 text-white" />
      </button>

      {/* Main Image */}
      <div className="relative max-w-4xl max-h-screen p-8">
        <img
          src={images[currentIndex].img}
          alt={images[currentIndex].pet}
          className="max-w-full max-h-screen object-contain rounded-2xl shadow-2xl"
        />
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur px-6 py-3 rounded-full text-white font-bold text-lg">
          {images[currentIndex].pet}
        </div>
      </div>

      {/* Thumbnail Dots */}
      <div className="absolute bottom-8 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => {/* set index directly if needed */ }}
            className={`
    h-2 rounded-full transition-all duration-300
    ${i === currentIndex
                ? 'w-6 md:w-12 bg-[#fe7245]'
                : 'w-2 md:w-3 bg-white/40 hover:bg-white/60'
              }
  `}
          />

        ))}
      </div>
    </div>
  );
};

// Main Gallery Section
export default function GallerySection() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const galleryImages = [
    { id: 1, pet: "Golden 'Max'", img: [phonecase1] },
    { id: 2, pet: "Cat Duo", img: [phonecase2] },
    { id: 3, pet: "Frenchie Love", img: [phonecase3] },
    { id: 4, pet: "Labrador 'Buddy'", img: [phonecase4] },
    { id: 5, pet: "Shiba Inu", img: [phonecase5] },
    { id: 6, pet: "Corgi Cuteness", img: [phonecase6] },
    { id: 7, pet: "Pomeranian", img: [phonecase7] },
    { id: 8, pet: "Husky Eyes", img: [phonecase8] },
  ];

  const openLightbox = (index) => {
    setCurrentPhotoIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const goNext = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const goPrev = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <>
      <section id="gallery" className="py-20 md:py-32 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          {/* Header */}
          <div className="text-center mb-16">
            <p className="text-[#fe7245] font-bold uppercase tracking-widest text-sm mb-3">
              Real Pets Real Cases
            </p>
            <h2 className="text-5xl md:text-7xl font-black text-gray-900">
              Customer Gallery
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Thousands of happy pets on phones every day
            </p>
          </div>

          {/* Clickable Masonry Grid */}
          <div className="columns-2 md:columns-3 lg:columns-4 gap-5 space-y-5">
            {galleryImages.map((item, index) => (
              <div
                key={item.id}
                onClick={() => openLightbox(index)}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl cursor-zoom-in transition-all duration-500 break-inside-avoid"
              >
                <img
                  src={item.img}
                  alt={item.pet}
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-6">
                  <div className="transform translate-y-6 group-hover:translate-y-0 transition-transform duration-400">
                    <p className="text-white font-bold text-xl drop-shadow-2xl">
                      {item.pet}
                    </p>
                    <p className="text-white/80 text-sm mt-1">Tap to view</p>
                  </div>
                </div>

                {/* Accent Glow */}
                <div className="absolute inset-0 ring-4 ring-[#fe7245]/0 group-hover:ring-[#fe7245]/30 rounded-2xl transition-all duration-500 pointer-events-none"></div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <button
              className="
    group inline-flex items-center
    gap-3 md:gap-4
    px-6 py-3 md:px-10 md:py-5
    bg-[#fe7245] text-white
    text-base md:text-xl font-bold
    rounded-full
    shadow-2xl hover:shadow-[#fe7245]/50
    hover:scale-105
    transition-all duration-300
  "
            >
              Create Your Case Now

              <ChevronRight
                className="w-5 h-5 md:w-7 md:h-7 group-hover:translate-x-3 transition-transform"
              />
            </button>

            <p className="mt-6 text-gray-600 text-lg">
              Tag <span className="text-[#fe7245] font-bold">@YourPetCase</span> to be featured!
            </p>
          </div>

        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <Lightbox
          images={galleryImages}
          currentIndex={currentPhotoIndex}
          onClose={closeLightbox}
          onPrev={goPrev}
          onNext={goNext}
        />
      )}
    </>
  );
}