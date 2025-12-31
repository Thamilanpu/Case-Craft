import { useState, useEffect } from "react";
import cover1 from "../assets/cover1.webp";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    comment: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", phone: "", comment: "" });
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 1000);
  };

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
                Get In Touch
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-bold mb-2 leading-tight px-2">
                <span className={`inline-block text-white transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`} style={{ transitionDelay: '200ms' }}>
                  CONTACT
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
                Get in touch with us for custom phone cases, vending machines, and personalized product solutions
              </p>
              <div className={`flex flex-wrap items-center justify-center gap-4 mt-4 sm:mt-6 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`} style={{ transitionDelay: '800ms' }}>
                <div className="px-4 py-2 sm:px-6 sm:py-3 bg-white/10 backdrop-blur-sm rounded-lg border-2 border-white/20 text-white text-sm sm:text-base font-semibold hover:bg-white/20 transition-all duration-300 hover:scale-105">
                  We're Here to Help
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

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-12">

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-8 sm:mb-12">
        <a
          href="https://snapshell.com.au/"
          target="_blank"
          rel="noopener noreferrer"
          className={`relative backdrop-blur-xl bg-white/60 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/30 hover:bg-white/80 hover:border-[#fe7245] transition-all duration-500 hover:shadow-xl group transform hover:scale-[1.02] overflow-hidden ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
          }`}
          style={{ transitionDelay: "100ms" }}
        >
          {/* Gradient accent */}
          <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#fe7245]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          <div className="flex items-center gap-2 sm:gap-3 relative z-10">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#0a214f] flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-md">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 group-hover:text-[#fe7245] transition-colors">Get a Machine For Your Site</h3>
              <p className="text-xs sm:text-sm text-gray-600">Visit our website</p>
            </div>
          </div>
        </a>

        <a
          href="https://wa.me/61431545553"
          target="_blank"
          rel="noopener noreferrer"
          className={`relative backdrop-blur-xl bg-white/60 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/30 hover:bg-white/80 hover:border-[#fe7245] transition-all duration-500 hover:shadow-xl group transform hover:scale-[1.02] overflow-hidden ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          {/* Gradient accent */}
          <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#fe7245]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="flex items-center gap-2 sm:gap-3 relative z-10">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#0a214f] flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-md">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 group-hover:text-[#fe7245] transition-colors">Customer Support</h3>
              <p className="text-xs sm:text-sm text-gray-600">WhatsApp +61 431 545 553</p>
            </div>
          </div>
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Contact Form */}
        <div className={`relative backdrop-blur-xl bg-white/60 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 border border-white/30 transform transition-all duration-700 hover:bg-white/80 hover:shadow-2xl overflow-hidden group ${
          isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
        }`}
        style={{ transitionDelay: "300ms" }}
        >
          {/* Decorative corner accent */}
          <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-[#fe7245]/20 to-transparent rounded-bl-full"></div>
          <div className="relative z-10">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6">Get in Touch</h2>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">We're here to help. Fill out the form below to reach us</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 relative z-10">
            <div>
              <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 backdrop-blur-sm bg-white/80 border border-white/40 rounded-lg focus:ring-2 focus:ring-[#fe7245] focus:border-[#fe7245] transition-all outline-none hover:border-[#fe7245]/50 focus:scale-[1.01] transform text-sm sm:text-base"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 backdrop-blur-sm bg-white/80 border border-white/40 rounded-lg focus:ring-2 focus:ring-[#fe7245] focus:border-[#fe7245] transition-all outline-none hover:border-[#fe7245]/50 focus:scale-[1.01] transform text-sm sm:text-base"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                Phone number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 backdrop-blur-sm bg-white/80 border border-white/40 rounded-lg focus:ring-2 focus:ring-[#fe7245] focus:border-[#fe7245] transition-all outline-none hover:border-[#fe7245]/50 focus:scale-[1.01] transform text-sm sm:text-base"
                placeholder="+61 XXX XXX XXX"
              />
            </div>

            <div>
              <label htmlFor="comment" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                Comment
              </label>
              <textarea
                id="comment"
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 backdrop-blur-sm bg-white/80 border border-white/40 rounded-lg focus:ring-2 focus:ring-[#fe7245] focus:border-[#fe7245] transition-all outline-none resize-none hover:border-[#fe7245]/50 focus:scale-[1.01] transform text-sm sm:text-base"
                placeholder="Your message..."
              />
            </div>

            {submitStatus === "success" && (
              <div className="p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 animate-fade-in shadow-md">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-xs sm:text-sm">Thank you! Your message has been sent successfully.</span>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#fe7245] text-white font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg hover:bg-[#ff855f] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] transform disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group text-sm sm:text-base"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></span>
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send now</span>
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
              </span>
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div className="space-y-4 sm:space-y-6">
          {/* Address */}
          <div className={`relative backdrop-blur-xl bg-white/60 rounded-lg sm:rounded-xl shadow-xl p-4 sm:p-6 border border-white/30 transform transition-all duration-700 hover:bg-white/80 hover:shadow-2xl hover:scale-[1.02] group overflow-hidden ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
          }`}
          style={{ transitionDelay: "400ms" }}
          >
            {/* Gradient accent */}
            <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#fe7245]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10 flex items-start gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-[#0a214f] to-[#1a3a6b] flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1 sm:mb-2 group-hover:text-[#fe7245] transition-colors">Address</h3>
                <p className="text-sm sm:text-base text-gray-700">
                  We are right in the heart of Sydney & Adelaide
                </p>
              </div>
            </div>
          </div>

          {/* Phone */}
          <div className={`relative backdrop-blur-xl bg-white/60 rounded-lg sm:rounded-xl shadow-xl p-4 sm:p-6 border border-white/30 transform transition-all duration-700 hover:bg-white/80 hover:shadow-2xl hover:scale-[1.02] group overflow-hidden ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
          }`}
          style={{ transitionDelay: "500ms" }}
          >
            <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#fe7245]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10 flex items-start gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-[#0a214f] to-[#1a3a6b] flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1 sm:mb-2 group-hover:text-[#fe7245] transition-colors">Phone</h3>
                <a
                  href="https://wa.me/61431545553"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm sm:text-base text-[#0a214f] hover:underline font-medium transition-all hover:scale-105 inline-block break-all"
                >
                  WhatsApp +61 431 545 553
                </a>
              </div>
            </div>
          </div>

          {/* Email */}
          <div className={`relative backdrop-blur-xl bg-white/60 rounded-lg sm:rounded-xl shadow-xl p-4 sm:p-6 border border-white/30 transform transition-all duration-700 hover:bg-white/80 hover:shadow-2xl hover:scale-[1.02] group overflow-hidden ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
          }`}
          style={{ transitionDelay: "600ms" }}
          >
            <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#fe7245]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10 flex items-start gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-[#0a214f] to-[#1a3a6b] flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1 sm:mb-2 group-hover:text-[#fe7245] transition-colors">Email</h3>
                <a
                  href="mailto:Snapshellau@gmail.com"
                  className="text-sm sm:text-base text-[#0a214f] hover:underline font-medium transition-all hover:scale-105 inline-block break-all"
                >
                  Snapshellau@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div className={`relative backdrop-blur-xl bg-white/60 rounded-lg sm:rounded-xl shadow-xl p-4 sm:p-6 border border-white/30 transform transition-all duration-700 hover:bg-white/80 hover:shadow-2xl hover:scale-[1.02] group overflow-hidden ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
          }`}
          style={{ transitionDelay: "700ms" }}
          >
            <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#fe7245]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10 flex items-start gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-[#0a214f] to-[#1a3a6b] flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1 sm:mb-2 group-hover:text-[#fe7245] transition-colors">Business hours</h3>
                <p className="text-sm sm:text-base text-gray-700">
                  Monday to Friday<br />
                  From 9 AM to 6 PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

