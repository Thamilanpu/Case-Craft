import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CategoryShowcase() {
  const categories = [
    {
      id: 1,
      name: "Daily Necessities",
      image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1000&auto=format&fit=crop",
      count: "New Arrivals",
      style: "md:col-span-3" // Spans half width on medium screens
    },
    {
      id: 2,
      name: "3C Products",
      image: "https://images.unsplash.com/photo-1512314889357-e157c22f938d?q=80&w=1000&auto=format&fit=crop",
      count: "Best Sellers",
      style: "md:col-span-3" // Spans half width
    },
    {
      id: 3,
      name: "Home Goods",
      image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1000&auto=format&fit=crop",
      count: "Trending",
      style: "md:col-span-2" // Spans 1/3 width
    },
    {
      id: 4,
      name: "Pet Supplies",
      image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=1000&auto=format&fit=crop",
      count: "Essentials",
      style: "md:col-span-2"
    },
    {
      id: 5,
      name: "Pet Apparel",
      image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?q=80&w=1000&auto=format&fit=crop",
      count: "Limited Edition",
      style: "md:col-span-2"
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight uppercase">
              Shop Categories
            </h2>
            <p className="mt-2 text-gray-500 text-lg">Curated collections for your lifestyle.</p>
          </div>
          <a href="#" className="hidden md:flex items-center gap-2 font-semibold text-gray-900 hover:text-gray-600 transition group">
            View All Collections
            <ArrowUpRight className="w-5 h-5 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 auto-rows-[300px] md:auto-rows-[350px]">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className={`relative group overflow-hidden rounded-3xl ${cat.style} cursor-pointer`}
            >
              {/* Background Image with Zoom Effect */}
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Dark Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 md:opacity-60 group-hover:opacity-80 transition-opacity" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <div className="overflow-hidden mb-2">
                  <span className="inline-block px-3 py-1 text-xs font-bold tracking-wider text-black bg-white rounded-full uppercase mb-2">
                    {cat.count}
                  </span>
                </div>

                <div className="flex justify-between items-end">
                  <div> {/* Added a div to wrap h3 and Link for better layout control */}
                    <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                      {cat.name}
                    </h3>
                    <Link
                      to={`/pet-design?category=${encodeURIComponent(cat.name)}`}
                      className="mt-4 text-sm font-bold text-pink-600 hover:text-pink-700"
                    >
                      Explore {cat.name} →
                    </Link>
                  </div>

                  {/* Floating Action Button */}
                  <div className="bg-white/20 backdrop-blur-md p-3 rounded-full text-white opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <ArrowUpRight className="w-6 h-6" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-8 md:hidden">
          <button className="w-full py-4 border-2 border-gray-900 rounded-full font-bold uppercase tracking-wide hover:bg-gray-900 hover:text-white transition">
            View All Categories
          </button>
        </div>

      </div>
    </section>
  );
}