import { useState, useEffect } from "react";
import cover1 from "../assets/cover1.webp";
import faq1 from "../assets/faq1.webp";

const FAQ = () => {
  const [openQuestion, setOpenQuestion] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const shoppingLocations = {
    sa: [
      "📍City Cross, Rundle Mall (Near the food court)",
      "📍Brickworks Marketplace (In front of Woolworths)",
    ],
    nsw: [
      "📍UTS (BUILDING 5 COURTARD)",
      "📍Westfield Eastgardens (Level 3, lift outside Hoyts)",
      "📍Westfield Hornsby (Level 3, opposite NRMA / Chemist Warehouse)",
      "📍Westfield Parramatta (Level 1 lift lobby, near Medibank)",
      "📍Westfield Sydney (QVBNext to the reception)",
      "📍Westfield Warringah (Level 2 & Behind McDonald's)",
      "📍Wwestfield Miranda (Foot Locker & Cotton On)",
      "📍Castle Towers (Station tunnel, near McDonald's)",
      "📍Westpoint Blacktown (at G floor food core)",
      "📍Tramsheds (On the top floor)",
      "📍Balgowlah Village Centre (B1 to Ground Floor)",
      "📍Pemulwuy Marketplace (At Woolworths entrance)",
      "📍Forestway Shopping Centre",
      "📍Stanhope Village (Near the food court)",
      "📍Emerton Village (At Woolworths entrance)",
      "📍Ed.Square Shopping Centre (B1 parking to G Floor)",
    ],
  };

  const phoneModels = {
    iphone: [
      "iPhone 17, 17Pro, 17Air, 17ProMax",
      "iPhone 16, 16Plus, 16Pro, 16ProMax",
      "iPhone 15, 15Pro, 15Plus, 15ProMax",
      "iPhone 14, 14Pro, 14Plus, 14ProMax",
      "iPhone 13, 13Pro, 13ProMax, 13 Mini",
      "iPhone 12, 12Pro, 12ProMax, 12 Mini",
      "iPhone 11, 11 Pro, 11 Pro Max",
      "iPhone X/XS",
      "iPhone XSMAX",
      "iPhone XR",
    ],
    samsung: [
      "S25, S25+, S25 ULTRA",
      "S24, S24+, S24 ULTRA, S24 Fe",
      "S23, S23+, S23 ULTRA, S23 Fe",
      "S22, S22+, S22 ULTRA",
      "S21, S21+, S21 ULTRA",
      "Samsung Z Flip6",
      "Samsung Z Flip7",
    ],
    google: [
      "Google Pixel 8, 8 Pro",
      "Google Pixel 9/9 Pro, 9 Pro XL",
    ],
    magsafe: {
      iphone: [
        "iPhone 16, 16Plus, 16Pro, 16ProMax",
        "iPhone 15, 15Pro, 15Plus, 15ProMax",
        "iPhone 14, 14Pro, 14Plus, 14ProMax",
        "iPhone 13, 13Pro, 13ProMax",
        "iPhone 12, 12Pro, 12ProMax",
      ],
      samsung: [
        "S25, S25+, S25 ULTRA",
        "S24, S24+, S24 ULTRA",
        "S23, S23+, S23 ULTRA",
      ],
    },
  };

  const faqQuestions = [
    {
      id: 1,
      question: "Not sure how to collage images?",
      answer: (
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#0a214f] flex items-center justify-center shadow-sm">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900 mb-1">Step 1: Download InCollage</p>
              <p className="text-xs text-gray-600">Completely free app available on app stores</p>
            </div>
            <span className="px-2 py-1 text-xs font-bold text-[#0a214f] bg-white border border-blue-300 rounded-md shadow-sm">FREE</span>
          </div>
          
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            <span className="font-semibold">THEN</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#0a214f] flex items-center justify-center shadow-sm">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900 mb-1">Step 2: Adjust Layout Ratio</p>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span className="text-xs text-gray-600">After completing the collage, click on</span>
                <span className="px-2 py-1 text-xs font-bold text-white bg-[#0a214f] rounded shadow-sm">"Layout"</span>
                <span className="text-xs text-gray-400">→</span>
                <span className="px-2 py-1 text-xs font-bold text-white bg-[#0a214f] rounded shadow-sm">"Ratio"</span>
                <span className="text-xs text-gray-600">to change it to</span>
                <span className="px-2 py-1 text-xs font-bold text-[#0a214f] bg-white border-2 border-[#0a214f] rounded shadow-sm">9:16</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      question: "Print Quality?",
      answer: (
        <div className="space-y-3">
          <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-[#0a214f] flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h4 className="font-bold text-base text-gray-900">Never Fading HQ Prints</h4>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2 p-2 bg-white rounded-md border border-blue-200">
                <svg className="w-4 h-4 text-[#0a214f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xs font-semibold text-gray-700">Premium Print</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-white rounded-md border border-blue-200">
                <svg className="w-4 h-4 text-[#0a214f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
                <span className="text-xs font-semibold text-gray-700">Waterproof</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-white rounded-md border border-blue-200">
                <svg className="w-4 h-4 text-[#0a214f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
                <span className="text-xs font-semibold text-gray-700">Smooth Matte</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-white rounded-md border border-blue-200">
                <svg className="w-4 h-4 text-[#0a214f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="text-xs font-semibold text-gray-700">High Quality</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      question: "Blurry Print?",
      answer: (
        <div className="space-y-3">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#0a214f] flex items-center justify-center shadow-sm">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900 mb-2">
                  For the best results, we recommend using high-definition images.
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-300">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#0a214f] flex items-center justify-center shadow-sm">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-gray-900 mb-1.5">💡 Pro Tip</p>
                <p className="text-xs text-gray-700 leading-relaxed">
                  Always use your image at its <span className="font-semibold text-[#0a214f]">original dimensions</span>. Stretching or zooming too much can reduce print quality.
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 4,
      question: "Printing Time?",
      answer: (
        <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 w-16 h-16 rounded-full bg-[#0a214f] flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-600 mb-1">Printing Time</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-gray-900">4</span>
                <span className="text-lg font-semibold text-gray-700">minutes</span>
              </div>
              <p className="text-xs text-gray-600 mt-1">to print a custom phone case</p>
            </div>
            <div className="flex-shrink-0">
              <span className="px-3 py-1.5 text-xs font-bold text-white bg-[#0a214f] rounded-full border border-blue-300">
                FAST
              </span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 5,
      question: "Waterproof?",
      answer: (
        <div className="space-y-3">
          <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-300">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#0a214f] flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg font-bold text-gray-900">Yes, it is!</span>
                  <span className="px-2 py-0.5 text-xs font-bold text-white bg-[#0a214f] rounded border border-blue-300">
                    WATERPROOF
                  </span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  We use professional <span className="font-semibold text-[#0a214f]">UV printing technology</span>, which makes the phone case waterproof and prevents fading.
                </p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2.5 bg-white rounded-md border border-blue-200 text-center">
              <svg className="w-5 h-5 text-[#0a214f] mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
              </svg>
              <p className="text-xs font-semibold text-gray-700">Water Resistant</p>
            </div>
            <div className="p-2.5 bg-white rounded-md border border-blue-200 text-center">
              <svg className="w-5 h-5 text-[#0a214f] mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
              <p className="text-xs font-semibold text-gray-700">Fade Resistant</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 6,
      question: "MagSafe Compatible?",
      answer: (
        <div className="space-y-3">
          <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#0a214f] flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-bold text-gray-900">MagSafe Compatible</span>
                  <span className="px-2 py-0.5 text-xs font-bold text-white bg-[#0a214f] rounded border border-blue-300">
                    AVAILABLE
                  </span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed mb-3">
                  Selected in-mall machines provide MagSafe options.
                </p>
                <div className="p-2.5 bg-white rounded-md border border-blue-200">
                  <p className="text-xs text-gray-600 mb-1">For the complete MagSafe model collection:</p>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#0a214f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                    <span className="text-xs font-semibold text-[#0a214f]">Visit our online store</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 7,
      question: "What Models Do We Offer?",
      answer: (
        <div className="space-y-4">
          {/* iPhone Section */}
          <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center shadow-md">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.88-3.08.33-1.09-.58-2.21-.96-3.52-.96-1.3 0-2.43.38-3.52.96-1.03.55-2.1.62-3.08.33-1.54-.5-2.84-2.15-2.84-4.25 0-4.29 3.29-9 7.44-9s7.44 4.71 7.44 9c0 2.1-1.3 3.75-2.84 4.25z"/>
                </svg>
              </div>
              <h4 className="font-bold text-lg text-gray-900">iPhone</h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {phoneModels.iphone.map((model, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2 bg-white rounded-md border border-blue-200 hover:border-[#0a214f] transition-colors">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0a214f]"></div>
                  <span className="text-xs text-gray-700">{model}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Samsung Section */}
          <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#1428A0] flex items-center justify-center shadow-md">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <ellipse cx="12" cy="12" rx="9" ry="9" fill="currentColor"/>
                  <path d="M8 12c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2s-.9 2-2 2h-4c-1.1 0-2-.9-2-2zm2-1h4v2h-4v-2z" fill="white"/>
                  <path d="M12 8v8M8 12h8" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <h4 className="font-bold text-lg text-gray-900">Samsung</h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {phoneModels.samsung.map((model, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2 bg-white rounded-md border border-blue-200 hover:border-[#0a214f] transition-colors">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0a214f]"></div>
                  <span className="text-xs text-gray-700">{model}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Google Pixel Section */}
          <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-[#0a214f] flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              </div>
              <h4 className="font-bold text-base text-gray-900">Google Pixel</h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {phoneModels.google.map((model, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2 bg-white rounded-md border border-blue-200 hover:border-[#0a214f] transition-colors">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0a214f]"></div>
                  <span className="text-xs text-gray-700">{model}</span>
                </div>
              ))}
            </div>
          </div>

          {/* MagSafe Section */}
          <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-[#0a214f] flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                </svg>
              </div>
              <h4 className="font-bold text-base text-gray-900">MagSafe Compatible</h4>
              <span className="px-2 py-0.5 text-xs font-bold text-white bg-[#0a214f] rounded border border-blue-300">
                MAGSAFE
              </span>
            </div>
            <div className="space-y-3">
              <div>
                <h5 className="font-semibold text-sm mb-2 text-gray-700 flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#0a214f]"></span>
                  iPhone Models
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 ml-3">
                  {phoneModels.magsafe.iphone.map((model, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2 bg-white rounded-md border border-blue-200 hover:border-[#0a214f] transition-colors">
                      <div className="w-1 h-1 rounded-full bg-[#0a214f]"></div>
                      <span className="text-xs text-gray-700">{model}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h5 className="font-semibold text-sm mb-2 text-gray-700 flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#0a214f]"></span>
                  Samsung Models
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 ml-3">
                  {phoneModels.magsafe.samsung.map((model, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2 bg-white rounded-md border border-blue-200 hover:border-[#0a214f] transition-colors">
                      <div className="w-1 h-1 rounded-full bg-[#0a214f]"></div>
                      <span className="text-xs text-gray-700">{model}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const toggleQuestion = (questionId) => {
    setOpenQuestion((prev) => {
      // If clicking the same question, close it. Otherwise, open the new one.
      return prev === questionId ? null : questionId;
    });
  };

  const filteredQuestions = faqQuestions.filter(item => 
    searchQuery === "" || 
    item.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(10, 33, 79, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(10, 33, 79, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(10, 33, 79, 0.5);
        }
      `}</style>
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
        <div className="relative w-full h-[350px] sm:h-[400px] md:h-[500px] mb-8 sm:mb-12 md:mb-16 overflow-hidden">
          <div className="absolute inset-0" style={{
            backgroundImage: `url(${cover1})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(2px)',
          }}></div>
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a214f]/80 via-[#1a3a6b]/80 to-[#0a214f]/80"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-center text-center">
            <div className="w-full">
              <p className={`text-sm sm:text-base md:text-lg lg:text-xl italic font-serif text-white/90 mb-3 sm:mb-4 tracking-wide transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
              }`} style={{ transitionDelay: '0ms' }}>
                Frequently Asked Questions
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-bold mb-2 leading-tight px-2">
                <span className={`inline-block text-white transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`} style={{ transitionDelay: '200ms' }}>
                  FIND
                </span>
                <br />
                <span className={`inline-block bg-gradient-to-r from-blue-400 via-purple-500 to-orange-400 bg-clip-text text-transparent transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
                }`} style={{ transitionDelay: '400ms' }}>
                  ANSWERS
                </span>
              </h1>
              <p className={`text-xs sm:text-sm md:text-base lg:text-lg text-white/90 max-w-2xl mx-auto mt-4 sm:mt-6 leading-relaxed font-light transition-all duration-700 px-4 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`} style={{ transitionDelay: '600ms' }}>
                Get instant answers to your questions about our services and products
              </p>
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
          {/* FAQ Image Section */}
          <div className={`mb-8 sm:mb-12 transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-95"
          }`} style={{ transitionDelay: '200ms' }}>
            <div className="relative group">
              <div className="backdrop-blur-xl bg-white/60 rounded-2xl sm:rounded-3xl p-3 sm:p-4 md:p-6 border border-white/30 shadow-2xl overflow-hidden">
                <img 
                  src={faq1} 
                  alt="FAQ Illustration" 
                  className="w-full h-auto rounded-xl sm:rounded-2xl transition-transform duration-700 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a214f]/5 via-transparent to-transparent rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className={`mb-6 sm:mb-8 transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`} style={{ transitionDelay: '300ms' }}>
            <div className="relative backdrop-blur-xl bg-white/60 rounded-xl sm:rounded-2xl border border-white/30 shadow-xl overflow-hidden group hover:bg-white/80 transition-all duration-500">
              <input
                type="text"
                placeholder="Search questions here..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 sm:px-6 py-3 sm:py-4 pr-10 sm:pr-14 bg-transparent border-0 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-0 transition-all duration-300 text-sm sm:text-base md:text-lg text-gray-700 placeholder-gray-400"
              />
              <button className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#fe7245] hover:scale-110 transition-all duration-300">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Shopping Locations Section */}
          <div className={`mb-8 sm:mb-12 transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`} style={{ transitionDelay: '400ms' }}>
            {/* Header */}
            <div className="mb-6 sm:mb-8">
              <div className="flex items-center gap-2 sm:gap-4 mb-2">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-[#0a214f] to-[#1a3a6b] flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0a214f]">Shopping Center Locations</h2>
              </div>
              <div className="flex items-center gap-3 sm:gap-4 mt-3 sm:mt-4">
                <div className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/60 rounded-lg border border-white/30 backdrop-blur-sm">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#0a214f]"></div>
                  <span className="text-xs sm:text-sm font-semibold text-gray-700">
                    {shoppingLocations.sa.length + shoppingLocations.nsw.length} Total Locations
                  </span>
                </div>
              </div>
            </div>

            {/* State Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {/* Adelaide Card */}
              <div className="relative backdrop-blur-xl bg-white/60 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/30 shadow-xl overflow-hidden group hover:bg-white/80 hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02]">
                <div className="absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-[#0a214f]/10 to-transparent rounded-bl-full"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-[#0a214f] to-[#1a3a6b] flex items-center justify-center shadow-md">
                        <span className="text-white font-bold text-base sm:text-lg">SA</span>
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900">Adelaide</h3>
                        <p className="text-xs sm:text-sm text-gray-600">{shoppingLocations.sa.length} locations</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {shoppingLocations.sa.map((location, idx) => (
                      <div key={idx} className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-white/40 rounded-lg border border-white/30 hover:bg-white/60 hover:border-[#0a214f]/20 transition-all duration-300 group/item">
                        <div className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#0a214f]/20 flex items-center justify-center mt-0.5 group-hover/item:bg-[#0a214f] transition-colors duration-300">
                          <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#0a214f] group-hover/item:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-700 leading-relaxed flex-1">{location.replace("📍", "").trim()}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sydney Card */}
              <div className="relative backdrop-blur-xl bg-white/60 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/30 shadow-xl overflow-hidden group hover:bg-white/80 hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02]">
                <div className="absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-[#fe7245]/10 to-transparent rounded-bl-full"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-[#fe7245] to-[#ff855f] flex items-center justify-center shadow-md">
                        <span className="text-white font-bold text-base sm:text-lg">NSW</span>
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900">Sydney</h3>
                        <p className="text-xs sm:text-sm text-gray-600">{shoppingLocations.nsw.length} locations</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2 max-h-[400px] sm:max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                    {shoppingLocations.nsw.map((location, idx) => (
                      <div key={idx} className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-white/40 rounded-lg border border-white/30 hover:bg-white/60 hover:border-[#fe7245]/20 transition-all duration-300 group/item">
                        <div className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#fe7245]/20 flex items-center justify-center mt-0.5 group-hover/item:bg-[#fe7245] transition-colors duration-300">
                          <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#fe7245] group-hover/item:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-700 leading-relaxed flex-1">{location.replace("📍", "").trim()}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Questions */}
          <div className={`space-y-3 sm:space-y-4 transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`} style={{ transitionDelay: '500ms' }}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0a214f] mb-4 sm:mb-6">Common Questions</h2>
            {filteredQuestions.map((item, index) => (
              <div 
                key={item.id} 
                className="relative backdrop-blur-xl bg-white/60 rounded-xl sm:rounded-2xl border border-white/30 overflow-hidden transition-all duration-500 hover:bg-white/80 hover:shadow-xl hover:border-[#fe7245] transform hover:scale-[1.01] group"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transitionDelay: `${600 + (index * 100)}ms`
                }}
              >
                {/* Gradient accent */}
                <div className="absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-[#fe7245]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <button
                  onClick={() => toggleQuestion(item.id)}
                  className="relative z-10 w-full text-left p-4 sm:p-6 flex items-center justify-between group/btn hover:bg-white/30 transition-all duration-300"
                >
                  <span className="text-base sm:text-lg md:text-xl font-semibold text-gray-700 group-hover/btn:text-[#fe7245] transition-colors duration-300 pr-3 sm:pr-4">{item.question}</span>
                  <svg
                    className={`flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 text-gray-500 transition-all duration-300 group-hover/btn:text-[#fe7245] ${openQuestion === item.id ? "rotate-180 scale-110" : "group-hover/btn:scale-110"}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={openQuestion === item.id ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                  </svg>
                </button>
                <div className={`overflow-hidden transition-all duration-700 ease-in-out ${
                  openQuestion === item.id ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
                }`}>
                  <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-2 text-gray-600 border-t border-white/20 transition-all duration-500">
                    <div className={`transition-all duration-500 ${
                      openQuestion === item.id ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
                    }`}>
                      {item.answer}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Online CTA */}
          <div className={`mt-8 sm:mt-12 md:mt-16 text-center transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}>
            <div className="relative backdrop-blur-xl bg-gradient-to-br from-white/70 via-white/60 to-white/70 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 shadow-2xl overflow-hidden group border border-white/30 hover:from-white/80 hover:via-white/70 hover:to-white/80 transition-all duration-500">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-br from-[#0a214f]/20 to-transparent rounded-br-full"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-tl from-[#fe7245]/20 to-transparent rounded-tl-full"></div>
              
              <div className="relative z-10">
                <div className="inline-block mb-3 sm:mb-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#0a214f] to-[#1a3a6b] flex items-center justify-center shadow-lg mx-auto">
                    <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#0a214f] mb-2 sm:mb-3 px-2">Still have questions?</h3>
                <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-4 sm:mb-6 px-2">Chat with us online for instant support</p>
                <button className="group/btn relative bg-[#fe7245] text-white font-semibold px-6 sm:px-8 py-2.5 sm:py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl overflow-hidden border-2 border-[#fe7245] hover:bg-[#ff855f] text-sm sm:text-base">
                  <span className="relative z-10 flex items-center gap-2">
                    <span>Chat Online</span>
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
