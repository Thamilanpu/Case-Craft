import React from 'react';
import { Link } from "react-router-dom";
import pethero from "../../assets/pet-hero.png"
import { ShoppingBag, ArrowRight } from 'lucide-react';
import pet_popup from "../../assets/pet_popup.png"
import pet2 from "../../assets/gallery/pet2.jpg"
import pet1 from "../../assets/gallery/pet1.jpg"
import custom4 from "../../assets/custom/custom3.png"

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-gray-900 text-white pb-20 pt-24 md:pt-32 md:pb-32">
      
      {/* 1. Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={pethero}
          alt="Background" 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-gray-900/50"></div>
      </div>

      {/* Floating Polaroid Images */}
      <div className="hidden md:block absolute top-10 left-[-2rem] lg:left-10 z-1 rotate-12 transform hover:scale-105 transition duration-500 hover:z-20">
        <div className="bg-white p-2 pb-8 shadow-2xl rounded-lg rotate-[-6deg] w-48 lg:w-64">
          <img src={pet_popup} className="w-full h-48 object-cover rounded shadow-inner" alt="Phone Case" />
        </div>
      </div>

      <div className="hidden md:block absolute bottom-0 left-10 lg:left-32 z-1 -rotate-12 transform hover:scale-105 transition duration-500 hover:z-20">
        <div className="bg-white p-2 pb-8 shadow-2xl rounded-lg rotate-[8deg] w-40 lg:w-56">
          <img src={pet2} className="w-full h-40 object-cover rounded shadow-inner" alt="Pattern Case" />
        </div>
      </div>

      <div className="hidden md:block absolute top-20 right-[-1rem] lg:right-20 z-1 -rotate-6 transform hover:scale-105 transition duration-500 hover:z-20">
        <div className="bg-white p-2 pb-8 shadow-2xl rounded-lg rotate-[4deg] w-52 lg:w-72">
          <img src={pet1} className="w-full h-56 object-cover rounded shadow-inner" alt="Cat with accessories" />
          <div className="text-gray-800 text-center font-handwriting mt-2 font-bold transform -rotate-1">Best Friends</div>
        </div>
      </div>

      <div className="hidden md:block absolute bottom-10 right-10 lg:right-48 z-1 rotate-6 transform hover:scale-105 transition duration-500 hover:z-20">
        <div className="bg-white p-2 pb-8 shadow-2xl rounded-lg rotate-[-3deg] w-44 lg:w-60">
          <img src={custom4} className="w-full h-48 object-cover rounded shadow-inner" alt="Dog with collar" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-1 max-w-4xl mx-auto px-4 text-center flex flex-col items-center justify-center h-full mt-10 md:mt-0">
        
        <p className="font-serif italic text-2xl md:text-4xl text-[#fe7245] mb-2 rotate-[-2deg]">
          The Ultimate Custom Collection
        </p>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.1] uppercase drop-shadow-lg">
          YOUR PET <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 via-purple-400 to-[#fe7245]">
            EVERYWHERE
          </span>
        </h1>

        <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-lg mx-auto font-medium drop-shadow-md">
          From custom pickleball paddles to cozy fleece blankets. <br className="hidden md:block"/>
          Turn your pet's face into your favorite accessory.
        </p>

        {/* Buttons with Links */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full justify-center">

          {/* Phone Cases Button */}
          <Link to="/pet-design" className="w-full sm:w-auto">
            <button className="group relative bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] flex items-center justify-center gap-2 w-full">
              Design Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>

          {/* Pet Gear Button */}
          <Link to="/pet-gear" className="w-full sm:w-auto">
            <button className="group relative bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2 w-full">
              Shop Pet Gear
              <ShoppingBag className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
            </button>
          </Link>

        </div>

        {/* Mobile Grid */}
        <div className="md:hidden mt-12 grid grid-cols-2 gap-4 w-full">
          <div className="bg-white p-1 pb-4 rounded rotate-[-3deg] shadow-lg">
            <img src="https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300" className="rounded" alt="Mobile Case" />
          </div>
          <div className="bg-white p-1 pb-4 rounded rotate-[3deg] shadow-lg mt-8">
            <img src="https://images.unsplash.com/photo-1574158622682-e40e69881006?w=300" className="rounded" alt="Pet" />
          </div>
        </div>

      </div>
    </section>
  );
}
