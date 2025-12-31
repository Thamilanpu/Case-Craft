import React, { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import cover1 from "../../assets/cover1.webp";
import { allPosts } from "./posts/index.js";

const BlogPost = () => {
  const { id } = useParams();
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const currentPostId = parseInt(id);
  const post = allPosts[currentPostId];
  
  // Get previous and next post IDs
  const postIds = Object.keys(allPosts).map(Number).sort((a, b) => a - b);
  const currentIndex = postIds.indexOf(currentPostId);
  const prevPostId = currentIndex > 0 ? postIds[currentIndex - 1] : null;
  const nextPostId = currentIndex < postIds.length - 1 ? postIds[currentIndex + 1] : null;
  const prevPost = prevPostId ? allPosts[prevPostId] : null;
  const nextPost = nextPostId ? allPosts[nextPostId] : null;

  useEffect(() => {
    // Scroll to top immediately
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Reset states when route changes
    setIsVisible(false);
    setContentVisible(false);
    setIsExiting(false);
    
    // Small delay to allow exit animation if needed
    const timer = setTimeout(() => {
      setIsVisible(true);
      setTimeout(() => setContentVisible(true), 300);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [id, location.pathname]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#0a214f] mb-4">Post Not Found</h1>
          <Link to="/blog" className="text-blue-600 hover:underline">Back to Blog</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Page Transition Overlay */}
      {isExiting && (
        <div className="fixed inset-0 bg-gradient-to-br from-[#0a214f] to-[#1a3a6b] z-50 flex items-center justify-center transition-opacity duration-300">
          <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
        </div>
      )}
      
      <div 
        className={`min-h-screen pt-0 pb-6 md:pb-8 relative overflow-hidden transition-all duration-700 ease-in-out ${
          isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
        } ${isExiting ? "opacity-0 -translate-x-8" : ""}`}
        style={{
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
        <div className={`relative w-full h-[350px] sm:h-[400px] md:h-[450px] lg:h-[550px] mb-8 sm:mb-12 md:mb-16 overflow-hidden transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}>
          <div className="absolute inset-0" style={{
            backgroundImage: `url(${cover1})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(2px)',
          }}></div>
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a214f]/85 via-[#1a3a6b]/85 to-[#0a214f]/85"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-center text-center">
            <div className="w-full">
              <div className={`mb-4 sm:mb-6 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
              }`} style={{ transitionDelay: '100ms' }}>
                <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 backdrop-blur-md bg-white/10 rounded-full border border-white/20">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-xs sm:text-sm text-white/90 font-medium">{post.date}</span>
                  <span className="text-white/50">•</span>
                  <span className="text-xs sm:text-sm text-white/90 font-medium">by {post.author}</span>
                </div>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 leading-tight px-2">
                <span className={`inline-block text-white transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`} style={{ transitionDelay: '200ms' }}>
                  {post.title}
                </span>
              </h1>
              <p className={`text-sm sm:text-base md:text-lg lg:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed font-light transition-all duration-700 px-4 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`} style={{ transitionDelay: '400ms' }}>
                {post.excerpt || "Discover the latest insights and trends"}
              </p>
            </div>
          </div>
          {/* Decorative wave */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg className="w-full h-16 text-white" fill="currentColor" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M0,0 C150,80 350,80 600,40 C850,0 1050,0 1200,40 L1200,120 L0,120 Z"></path>
            </svg>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-6 lg:px-8">
          {/* Featured Image Card */}
          <div className={`mb-8 sm:mb-12 transition-all duration-700 ease-out ${
            contentVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-95"
          }`} style={{ transitionDelay: '300ms' }}>
            <div className="relative group overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl">
              <div className="absolute inset-0 backdrop-blur-xl bg-white/40 rounded-2xl sm:rounded-3xl border border-white/30 p-1 sm:p-2 group-hover:bg-white/60 transition-all duration-500"></div>
              <img 
                src={post.image} 
                alt={post.title}
                className="relative z-10 w-full h-[250px] sm:h-[350px] md:h-[400px] lg:h-[500px] xl:h-[600px] object-cover rounded-2xl sm:rounded-3xl transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl sm:rounded-3xl"></div>
            </div>
          </div>

          {/* Article Content */}
          <article className={`relative backdrop-blur-xl bg-white/60 rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 lg:p-10 xl:p-14 border border-white/30 overflow-hidden transition-all duration-700 ease-out group hover:bg-white/80 ${
            contentVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-95"
          }`} style={{ transitionDelay: '500ms' }}>
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-48 h-48 bg-gradient-to-br from-[#0a214f]/20 to-transparent rounded-br-full"></div>
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-tl from-[#fe7245]/20 to-transparent rounded-tl-full"></div>
            
            <div className="relative z-10">
              {post.content.map((section, index) => {
                if (section.type === "paragraph") {
                  return (
                    <div 
                      key={index} 
                      className={`mb-8 transition-all duration-700 ${
                        contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                      }`}
                      style={{ transitionDelay: `${600 + (index * 100)}ms` }}
                    >
                      <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed font-light">
                        {section.text}
                      </p>
                    </div>
                  );
                } else if (section.type === "heading") {
                  return (
                    <div 
                      key={index} 
                      className={`mt-8 sm:mt-12 md:mt-16 mb-6 sm:mb-8 first:mt-0 transition-all duration-700 ${
                        contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                      }`}
                      style={{ transitionDelay: `${600 + (index * 100)}ms` }}
                    >
                      <div className="flex items-center gap-2 sm:gap-4 mb-3 sm:mb-4">
                        <div className="w-1 sm:w-1.5 h-8 sm:h-10 md:h-12 bg-gradient-to-b from-[#fe7245] via-[#ff855f] to-[#0a214f] rounded-full shadow-lg"></div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#0a214f] leading-tight">
                          {section.text}
                        </h2>
                      </div>
                      <div className="h-1 w-24 sm:w-32 bg-gradient-to-r from-[#fe7245] via-[#ff855f] to-transparent rounded-full"></div>
                    </div>
                  );
                } else if (section.type === "list") {
                  return (
                    <div 
                      key={index} 
                      className={`mb-6 sm:mb-8 md:mb-10 transition-all duration-700 ${
                        contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                      }`}
                      style={{ transitionDelay: `${600 + (index * 100)}ms` }}
                    >
                      <ul className="space-y-3 sm:space-y-4">
                        {section.items.map((item, itemIndex) => (
                          <li 
                            key={itemIndex} 
                            className="flex items-start gap-3 sm:gap-4 group/item"
                            style={{
                              animationDelay: `${700 + (index * 100) + (itemIndex * 50)}ms`,
                              opacity: contentVisible ? 1 : 0,
                              transform: contentVisible ? 'translateX(0)' : 'translateX(-20px)',
                              transition: `all 0.5s ease-out ${700 + (index * 100) + (itemIndex * 50)}ms`
                            }}
                          >
                            <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-gradient-to-br from-[#fe7245] to-[#ff855f] flex items-center justify-center mt-0.5 sm:mt-1 shadow-md group-hover/item:scale-110 group-hover/item:rotate-12 transition-all duration-300">
                              <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <span className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed font-light flex-1 pt-0.5">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </article>

          {/* Author & Share Section */}
          <div className={`mt-8 sm:mt-12 mb-6 sm:mb-8 transition-all duration-700 ${
            contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`} style={{ transitionDelay: '800ms' }}>
            <div className="relative backdrop-blur-xl bg-white/60 rounded-2xl p-4 sm:p-6 border border-white/30 shadow-xl overflow-hidden group hover:bg-white/80 transition-all duration-500">
              <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-[#fe7245]/20 to-transparent rounded-bl-full"></div>
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
                <div className="flex items-center gap-3 sm:gap-4 w-full md:w-auto justify-center md:justify-start">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#0a214f] to-[#1a3a6b] flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500 mb-0.5 sm:mb-1">Written by</p>
                    <p className="text-base sm:text-lg font-bold text-[#0a214f]">{post.author}</p>
                    <p className="text-xs sm:text-sm text-gray-600">{post.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 w-full md:w-auto justify-center md:justify-end">
                  <span className="text-xs sm:text-sm text-gray-600 font-medium">Share:</span>
                  <button className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg sm:rounded-xl bg-white/80 border border-white/40 flex items-center justify-center hover:bg-[#0a214f] hover:text-white hover:scale-110 transition-all duration-300">
                    <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </button>
                  <button className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg sm:rounded-xl bg-white/80 border border-white/40 flex items-center justify-center hover:bg-[#0a214f] hover:text-white hover:scale-110 transition-all duration-300">
                    <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </button>
                  <button className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg sm:rounded-xl bg-white/80 border border-white/40 flex items-center justify-center hover:bg-[#0a214f] hover:text-white hover:scale-110 transition-all duration-300">
                    <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Section */}
          <div className={`space-y-4 sm:space-y-6 transition-all duration-700 ${
            contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`} style={{ transitionDelay: '1000ms' }}>
            {/* Previous/Next Post Navigation */}
            {(prevPost || nextPost) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                {/* Previous Post */}
                {prevPost ? (
                  <Link
                    to={`/blog/${prevPostId}`}
                    onClick={(e) => {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      setIsExiting(true);
                    }}
                    className="group relative backdrop-blur-xl bg-white/60 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/30 hover:bg-white/80 hover:border-[#fe7245] hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-[#fe7245]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10 flex items-center gap-3 sm:gap-4">
                      <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl bg-gradient-to-br from-[#0a214f] to-[#1a3a6b] flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-500 mb-1 sm:mb-2 font-semibold uppercase tracking-wide">Previous Article</p>
                        <p className="text-sm sm:text-base md:text-lg font-bold text-gray-900 group-hover:text-[#fe7245] transition-colors duration-300 line-clamp-2">
                          {prevPost.title}
                        </p>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div></div>
                )}

                {/* Next Post */}
                {nextPost ? (
                  <Link
                    to={`/blog/${nextPostId}`}
                    onClick={(e) => {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      setIsExiting(true);
                    }}
                    className="group relative backdrop-blur-xl bg-white/60 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/30 hover:bg-white/80 hover:border-[#fe7245] hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-[#fe7245]/10 to-transparent rounded-br-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10 flex items-center gap-3 sm:gap-4">
                      <div className="flex-1 min-w-0 text-right">
                        <p className="text-xs text-gray-500 mb-1 sm:mb-2 font-semibold uppercase tracking-wide">Next Article</p>
                        <p className="text-sm sm:text-base md:text-lg font-bold text-gray-900 group-hover:text-[#fe7245] transition-colors duration-300 line-clamp-2">
                          {nextPost.title}
                        </p>
                      </div>
                      <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl bg-gradient-to-br from-[#0a214f] to-[#1a3a6b] flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div></div>
                )}
              </div>
            )}

            {/* Back to Blog Button */}
            <div className="text-center pt-4 sm:pt-6">
              <Link 
                to="/blog"
                onClick={(e) => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setIsExiting(true);
                }}
                className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#fe7245] to-[#ff855f] text-white font-semibold rounded-xl sm:rounded-2xl shadow-2xl hover:shadow-[0_20px_50px_rgba(254,114,69,0.4)] transition-all duration-300 hover:scale-105 transform text-sm sm:text-base md:text-lg"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to All Articles
              </Link>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default BlogPost;
