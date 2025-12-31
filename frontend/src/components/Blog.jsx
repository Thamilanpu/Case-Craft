import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import cover1 from "../assets/cover1.webp";
import blogImg1 from "../assets/blog/1.webp";
import blogImg2 from "../assets/blog/2.webp";
import blogImg3 from "../assets/blog/3.webp";
import blogImg4 from "../assets/blog/4.webp";
import blogImg5 from "../assets/blog/5.webp";
import blogImg6 from "../assets/blog/6.webp";
import blogImg7 from "../assets/blog/7.webp";
import blogImg8 from "../assets/blog/8.webp";

const Blog = () => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Scroll to top immediately
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsVisible(true);
  }, [location.pathname]);

  const blogPosts = [
    {
      id: 1,
      title: "How Handmade Gifts Create Deeper Emotional Value",
      date: "November 26, 2025",
      author: "Easify",
      excerpt: "Discover why handmade gifts hold more emotional significance and create lasting memories compared to mass-produced items.",
      image: blogImg1
    },
    {
      id: 2,
      title: "Printed vs Handmade Pet Blankets — What's the Difference?",
      date: "November 25, 2025",
      author: "Easify",
      excerpt: "Explore the key differences between printed and handmade pet blankets, and find out which option is best for your furry friend.",
      image: blogImg2
    },
    {
      id: 3,
      title: "Why Pet Portrait Gifts Are the Perfect Birthday Gift in 2025",
      date: "November 24, 2025",
      author: "Easify",
      excerpt: "Learn why personalized pet portrait gifts are becoming the go-to birthday present for pet lovers everywhere.",
      image: blogImg3
    },
    {
      id: 4,
      title: "How to Create a Custom Pet Pillow (Step-by-Step Guide)",
      date: "November 21, 2025",
      author: "Easify",
      excerpt: "A comprehensive guide to creating your own custom pet pillow, from design to completion.",
      image: blogImg4
    },
    {
      id: 5,
      title: "🐶 Best Personalised Pet Gifts for Dog Lovers in 2025",
      date: "November 20, 2025",
      author: "GaoDave",
      excerpt: "Discover the top personalized pet gift ideas that will make any dog lover's day special.",
      image: blogImg5
    },
    {
      id: 6,
      title: "Why Handmade Custom Phone Cases Are Trending in Australia",
      date: "November 19, 2025",
      author: "GaoDave",
      excerpt: "Find out why Australians are embracing handmade custom phone cases and what makes them so popular.",
      image: blogImg6
    },
    {
      id: 7,
      title: "Why Custom Pet Supplies Are the Best Way to Spoil Your Furry Family Member",
      date: "November 18, 2025",
      author: "GaoDave",
      excerpt: "Learn how custom pet supplies can show your pets how much you care while providing them with unique, personalized items.",
      image: blogImg7
    },
    {
      id: 8,
      title: "📱🐾 Why Handmade Custom Phone Cases & Pet Gifts Are Booming in Australia | CaseCraft",
      date: "November 18, 2025",
      author: "GaoDave",
      excerpt: "An in-depth look at the growing trend of handmade custom phone cases and pet gifts in the Australian market.",
      image: blogImg8
    },
  ];

  return (
    <div className="relative">
      <div className="min-h-screen pt-0 pb-6 md:pb-8 relative overflow-hidden" style={{
      backgroundImage: `
        radial-gradient(circle at 20% 50%, rgba(10, 33, 79, 0.08) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(254, 114, 69, 0.06) 0%, transparent 50%),
        radial-gradient(circle at 40% 20%, rgba(26, 58, 107, 0.05) 0%, transparent 50%),
        repeating-linear-gradient(
          45deg,
          transparent,
          transparent 2px,
          rgba(10, 33, 79, 0.02) 2px,
          rgba(10, 33, 79, 0.02) 4px
        ),
        linear-gradient(to bottom, #f8fafc, #f1f5f9, #e2e8f0)
      `,
      backgroundSize: '100% 100%, 100% 100%, 100% 100%, 20px 20px, 100% 100%',
      backgroundPosition: '0 0, 0 0, 0 0, 0 0, 0 0',
    }}>
      {/* Texture overlay */}
      <div className="absolute inset-0 opacity-40" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230a214f' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '60px 60px',
      }}></div>
      
      {/* Animated gradient orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#0a214f]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-[#fe7245]/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-300/6 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="relative w-full h-[350px] sm:h-[400px] md:h-[500px] mb-8 md:mb-12 overflow-hidden">
          <div className="absolute inset-0" style={{
            backgroundImage: `url(${cover1})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(2px)',
          }}></div>
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a214f]/80 via-[#1a3a6b]/80 to-[#0a214f]/80"></div>
          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 h-full flex items-center justify-center text-center">
            <div className="w-full">
              <p className={`text-sm sm:text-base md:text-lg lg:text-xl italic font-serif text-white/90 mb-3 md:mb-4 tracking-wide transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
              }`} style={{ transitionDelay: '0ms' }}>
                Latest News & Updates
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-bold mb-2 leading-tight px-2">
                <span className={`inline-block text-white transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`} style={{ transitionDelay: '200ms' }}>
                  STAY
                </span>
                <br />
                <span className={`inline-block bg-gradient-to-r from-blue-400 via-purple-500 to-orange-400 bg-clip-text text-transparent transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
                }`} style={{ transitionDelay: '400ms' }}>
                  INFORMED
                </span>
              </h1>
              <p className={`text-xs sm:text-sm md:text-base lg:text-lg text-white/90 max-w-2xl mx-auto mt-4 md:mt-6 px-4 leading-relaxed font-light transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`} style={{ transitionDelay: '600ms' }}>
                Stay informed with the latest trends, tips, and stories about custom phone cases and personalized gifts
              </p>
              <div className={`flex items-center justify-center gap-4 mt-4 md:mt-6 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`} style={{ transitionDelay: '800ms' }}>
                <div className="px-4 py-2 md:px-6 md:py-3 bg-white/10 backdrop-blur-sm rounded-lg border-2 border-white/20 text-white text-sm md:text-base font-semibold hover:bg-white/20 transition-all duration-300 hover:scale-105">
                  {blogPosts.length} Articles
                </div>
              </div>
            </div>
          </div>
          {/* Decorative wave */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg className="w-full h-12 text-white" fill="currentColor" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M0,0 C150,80 350,80 600,40 C850,0 1050,0 1200,40 L1200,120 L0,120 Z"></path>
            </svg>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 md:py-8 lg:py-12">

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 md:mb-12">
        {blogPosts.map((post, idx) => (
          <Link
            key={post.id}
            to={`/blog/${post.id}`}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`group relative backdrop-blur-xl bg-white/60 rounded-xl shadow-xl border border-white/30 overflow-hidden transition-all duration-500 hover:bg-white/80 hover:shadow-2xl hover:border-[#fe7245] hover:-translate-y-2 cursor-pointer block ${
              isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95"
            }`}
            style={{
              transitionDelay: `${idx * 100}ms`
            }}
          >
            {/* Gradient accent */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#fe7245]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
            
            {/* Blog Image */}
            <div className="w-full h-48 relative overflow-hidden bg-gray-100">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6 relative z-10">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3">
                <span className="text-xs font-semibold text-[#0a214f] bg-blue-50 px-2 sm:px-3 py-1 rounded-full border border-blue-200">
                  {post.date}
                </span>
                <span className="text-xs text-gray-500">by {post.author}</span>
              </div>
              
              <h2 className="text-base sm:text-lg md:text-xl font-bold text-[#0a214f] mb-2 sm:mb-3 transition-colors duration-300 group-hover:text-[#fe7245] line-clamp-2">
                {post.title}
              </h2>
              
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-3 sm:mb-4 line-clamp-3">
                {post.excerpt}
              </p>

              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#fe7245] transition-all duration-300 group-hover:gap-3">
                <span>Read More</span>
                <svg className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Info Section */}
      <div className={`text-center transition-all duration-700 delay-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}>
        <div className="relative backdrop-blur-xl bg-white/60 rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 border border-white/30 overflow-hidden group hover:bg-white/80 transition-all duration-500">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-[#0a214f]/20 to-transparent rounded-br-full"></div>
          <div className="absolute bottom-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-tl from-[#fe7245]/20 to-transparent rounded-tl-full"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-[#0a214f] to-[#1a3a6b] flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-12 shadow-lg">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 transition-all duration-300 hover:text-[#fe7245]">Stay Updated</h3>
            </div>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed max-w-2xl mx-auto px-2">
              Keep up with the latest news, tips, and trends about custom phone cases and personalized pet gifts. Check back regularly for new articles and updates!
            </p>
          </div>
        </div>
      </div>
      </div>
      </div>
      </div>
    </div>
  );
};

export default Blog;

