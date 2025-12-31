import { useEffect, useState } from "react";
import cover1 from "../assets/cover1.webp";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Proudly Australian",
      description: "As a local company, we're committed to delivering products that resonate with the Aussie spirit—bold, creative, and built to last.",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      title: "Preserve Your Memories",
      description: "We're here to help you transform your favourite moments into tangible keepsakes, whether it's a phone case from one of our vending machines or a custom creation from our online store.",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      title: "Unmatched Quality",
      description: "With cutting-edge technology, intuitive interfaces, and a focus on vibrant, durable prints, CaseCraft ensures a seamless experience and a premium product every time.",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
        </svg>
      ),
      title: "Perfect for Gifting",
      description: "Our personalised products make thoughtful, one-of-a-kind gifts that capture the moments that matter most.",
    },
  ];

  const whatWeDo = [
    {
      title: "Offline Innovation",
      description: "Our CaseCraft vending machines, found in prime locations like City Cross in Rundle Mall, Westfield Warringah Mall, and more, provide a fast, user-friendly experience for creating personalised phone cases on the spot.",
      details: "Simply scan a QR code, upload your image, and watch your custom case come to life in minutes!",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      ),
    },
    {
      title: "Online Customisation",
      description: "Our newly upgraded website, snapshell.com.au, brings you a broader range of personalised products.",
      details: "From phone cases to unique gift items, we make it easy to design something truly special for yourself or your loved ones.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      ),
    },
    {
      title: "Gift-Ready Solutions",
      description: "Looking for the perfect gift? CaseCraft's custom products are designed to make every occasion memorable.",
      details: "Whether it's a heartfelt photo for a birthday, anniversary, or just because, our products are the ideal way to show you care.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
        </svg>
      ),
    },
  ];

  return (
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
        <div className="relative w-full h-[350px] sm:h-[400px] md:h-[500px] mb-8 sm:mb-12 overflow-hidden">
          <div className="absolute inset-0" style={{
            backgroundImage: `url(${cover1})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(2px)',
          }}></div>
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a214f]/80 via-[#1a3a6b]/80 to-[#0a214f]/80"></div>
          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 h-full flex items-center justify-center text-center">
            <div className="w-full">
              <p className={`text-sm sm:text-base md:text-lg lg:text-xl italic font-serif text-white/90 mb-3 sm:mb-4 tracking-wide transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
              }`} style={{ transitionDelay: '0ms' }}>
                Custom Phone Case Specialists
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-bold mb-2 leading-tight px-2">
                <span className={`inline-block text-white transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`} style={{ transitionDelay: '200ms' }}>
                  ABOUT
                </span>
                <br />
                <span className={`inline-block bg-gradient-to-r from-blue-400 via-purple-500 to-orange-400 bg-clip-text text-transparent transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
                }`} style={{ transitionDelay: '400ms' }}>
                 CaseCraft
                </span>
              </h1>
              <p className={`text-xs sm:text-sm md:text-base lg:text-lg text-white/90 max-w-3xl mx-auto mt-4 sm:mt-6 leading-relaxed font-light transition-all duration-700 px-4 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`} style={{ transitionDelay: '600ms' }}>
                Australia's Proudly Homegrown Leader in Custom Phone Case Vending Machines & Personalized Product Solutions
              </p>
              <div className={`flex items-center justify-center gap-4 mt-4 sm:mt-6 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`} style={{ transitionDelay: '800ms' }}>
                <div className="px-4 py-2 sm:px-6 sm:py-3 bg-white/10 backdrop-blur-md rounded-lg border-2 border-white/20 text-white text-sm sm:text-base font-semibold hover:bg-white/20 transition-all duration-300 hover:scale-105">
                  Made in Australia
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
          {/* Welcome Section - Glass Card */}
          <div className={`mb-8 sm:mb-12 md:mb-16 transition-all duration-1000 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}>
            <div className="relative backdrop-blur-xl bg-white/70 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 border border-white/20 shadow-2xl overflow-hidden group hover:bg-white/80 transition-all duration-500">
              {/* Glass effect gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-[#fe7245]/20 to-transparent rounded-bl-full"></div>
              <div className="relative z-10">
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-800 leading-relaxed text-center font-medium px-2">
                  Welcome to CaseCraft, Australia's proudly homegrown leader in custom phone case vending machines and personalised product solutions. Born right here in Australia, we're passionate about helping you capture and preserve your most cherished moments through innovative, high-quality, and fully customised products.
                </p>
              </div>
            </div>
          </div>

          {/* Our Story Section - Glass Card with Split Layout */}
          <section className={`mb-8 sm:mb-12 md:mb-16 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
          }`}>
            <div className="grid md:grid-cols-12 gap-4 sm:gap-6 items-start">
              {/* Icon Header */}
              <div className="md:col-span-3 mb-4 md:mb-0">
                <div className="md:sticky md:top-8">
                  <div className="backdrop-blur-xl bg-white/60 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/30 shadow-xl flex items-center justify-center md:flex-col gap-3 sm:gap-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#0a214f] to-[#1a3a6b] flex items-center justify-center shadow-lg">
                      <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#0a214f] text-center md:text-left">Our Story</h2>
                  </div>
                </div>
              </div>
              
              {/* Content */}
              <div className="md:col-span-9">
                <div className="backdrop-blur-xl bg-white/60 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-white/30 shadow-xl space-y-4 sm:space-y-6 hover:bg-white/70 transition-all duration-500">
                  <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
                    At CaseCraft, we believe that every memory deserves to be celebrated. From our state-of-the-art custom phone case vending machines located in the heart of Adelaide and Sydney to our exciting new range of online personalised products, we're dedicated to making self-expression effortless and meaningful.
                  </p>
                  <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
                    Our journey began with our revolutionary vending machines, allowing customers to create vibrant, durable phone cases using any photo from their camera roll in just 4-5 minutes. Now, we've expanded our vision to offer an even wider range of customisable products online, giving you endless ways to turn your favourite moments into keepsakes or thoughtful gifts.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* What We Do Section - Glass Cards Grid */}
          <section className={`mb-8 sm:mb-12 md:mb-16 transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
          }`}>
            <div className="mb-6 sm:mb-8">
              <div className="inline-flex items-center gap-2 sm:gap-4 backdrop-blur-xl bg-white/60 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4 border border-white/30 shadow-xl">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-[#0a214f] to-[#1a3a6b] flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0a214f]">What We Do</h2>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {whatWeDo.map((item, index) => (
                <div
                  key={index}
                  className="relative backdrop-blur-xl bg-white/60 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-white/30 shadow-xl hover:bg-white/80 hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 transform group overflow-hidden"
                  style={{ animationDelay: `${(index + 1) * 100}ms` }}
                >
                  {/* Gradient accent on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#fe7245]/10 via-transparent to-[#0a214f]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#0a214f] to-[#1a3a6b] flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                      <div className="text-white">
                        {item.icon}
                      </div>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 group-hover:text-[#0a214f] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4 leading-relaxed">
                      {item.description}
                    </p>
                    <div className="pt-3 sm:pt-4 border-t border-gray-200/50">
                      <p className="text-xs sm:text-sm text-gray-600 italic font-medium">
                        {item.details}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Why Choose CaseCraft Section - Glass Cards */}
          <section className={`mb-8 sm:mb-12 md:mb-16 transition-all duration-700 delay-400 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}>
            <div className="mb-6 sm:mb-8">
              <div className="inline-flex items-center gap-2 sm:gap-4 backdrop-blur-xl bg-white/60 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4 border border-white/30 shadow-xl">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-[#0a214f] to-[#1a3a6b] flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0a214f]">Why Choose CaseCraft?</h2>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="relative backdrop-blur-xl bg-white/60 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/30 shadow-xl hover:bg-white/80 hover:shadow-2xl hover:scale-[1.01] transition-all duration-500 transform group overflow-hidden"
                  style={{ animationDelay: `${(index + 1) * 100}ms` }}
                >
                  {/* Gradient accent */}
                  <div className="absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-[#fe7245]/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10 flex items-start gap-3 sm:gap-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-sm flex items-center justify-center flex-shrink-0 group-hover:bg-gradient-to-br group-hover:from-[#0a214f] group-hover:to-[#1a3a6b] transition-all duration-500 shadow-md border border-white/50">
                      <div className="text-[#0a214f] group-hover:text-white transition-colors duration-500">
                        {feature.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1 sm:mb-2 group-hover:text-[#0a214f] transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Our Mission Section - Large Glass Card */}
          <section className={`mb-8 sm:mb-12 md:mb-16 transition-all duration-700 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}>
            <div className="relative backdrop-blur-xl bg-gradient-to-br from-white/70 via-white/60 to-white/70 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 border border-white/30 shadow-2xl overflow-hidden group hover:from-white/80 hover:via-white/70 hover:to-white/80 transition-all duration-500">
              {/* Animated gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#fe7245]/10 via-transparent to-[#0a214f]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-br from-[#0a214f]/20 to-transparent rounded-br-full"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-tl from-[#fe7245]/20 to-transparent rounded-tl-full"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#0a214f] to-[#1a3a6b] flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0a214f]">Our Mission</h2>
                </div>
                <p className="text-sm sm:text-base md:text-lg text-gray-800 leading-relaxed max-w-4xl">
                  At CaseCraft, our mission is simple: to empower you to express your individuality and preserve your memories in any moment you choose. Whether you're visiting one of our vending machines or exploring our online customisation options, we're here to make every experience fun, fast, and unforgettable.
                </p>
              </div>
            </div>
          </section>

          {/* Join the Community Section - Glass Card */}
          <section className={`transition-all duration-700 delay-600 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}>
            <div className="relative backdrop-blur-xl bg-white/60 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 border border-white/30 shadow-2xl overflow-hidden group hover:bg-white/80 transition-all duration-500">
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#0a214f]/5 via-transparent to-[#fe7245]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="text-center mb-6 sm:mb-8">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0a214f] mb-3 sm:mb-4 px-2">
                    Join the CaseCraft Community
                  </h2>
                  <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto px-2">
                    We're more than just a brand we're a community of Aussies who love to celebrate life's moments, big and small. Follow us on Instagram and TikTok to see how our customers are creating their own CaseCraft stories, and visit our website to start designing your personalised products today.
                  </p>
                </div>
                
                <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                  <button className="relative backdrop-blur-md bg-white/80 rounded-lg sm:rounded-xl px-4 sm:px-6 py-2 sm:py-3 border-2 border-white/40 hover:border-[#fe7245] hover:bg-[#fe7245] hover:text-white transition-all duration-300 transform hover:scale-105 group shadow-lg overflow-hidden text-sm sm:text-base">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    <div className="relative z-10 flex items-center gap-2">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                      </svg>
                      <span className="font-semibold">Instagram</span>
                    </div>
                  </button>
                  <button className="relative backdrop-blur-md bg-white/80 rounded-lg sm:rounded-xl px-4 sm:px-6 py-2 sm:py-3 border-2 border-white/40 hover:border-[#fe7245] hover:bg-[#fe7245] hover:text-white transition-all duration-300 transform hover:scale-105 group shadow-lg overflow-hidden text-sm sm:text-base">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    <div className="relative z-10 flex items-center gap-2">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                      </svg>
                      <span className="font-semibold">TikTok</span>
                    </div>
                  </button>
                  <button className="relative backdrop-blur-md bg-[#fe7245] text-white rounded-lg sm:rounded-xl px-4 sm:px-6 py-2 sm:py-3 border-2 border-[#fe7245] hover:bg-[#ff855f] hover:border-[#ff855f] transition-all duration-300 transform hover:scale-105 group shadow-lg overflow-hidden text-sm sm:text-base">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    <div className="relative z-10 flex items-center gap-2">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                      <span className="font-semibold">Visit Website</span>
                    </div>
                  </button>
                </div>

                <div className="text-center pt-4 sm:pt-6 border-t border-gray-200/50">
                  <p className="text-sm sm:text-base md:text-lg text-gray-800 font-medium px-2">
                    Thank you for choosing CaseCraft, where your memories become extraordinary.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
