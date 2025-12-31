import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import cover1 from "../assets/cover1.webp";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default marker icons in React/Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Component to handle map center changes
const MapController = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [map, center, zoom]);
  return null;
};

const StoreLocator = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState([-33.8688, 151.2093]); // Sydney default
  const [mapZoom, setMapZoom] = useState(11);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statsVisible, setStatsVisible] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [locationsVisible, setLocationsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    setTimeout(() => setMapLoaded(true), 500);
    setTimeout(() => setStatsVisible(true), 200);
    setTimeout(() => setSearchVisible(true), 400);
    setTimeout(() => setLocationsVisible(true), 600);
  }, []);

  // Location data with coordinates
  const shoppingLocations = {
    sa: [
      {
        name: "City Cross, Rundle Mall (Near the food court)",
        lat: -34.9232,
        lng: 138.6006,
        address: "City Cross, Rundle Mall, Adelaide SA 5000"
      },
      {
        name: "Brickworks Marketplace (In front of Woolworths)",
        lat: -34.9444,
        lng: 138.6006,
        address: "Brickworks Marketplace, Torrensville SA 5031"
      },
    ],
    nsw: [
      {
        name: "UTS (BUILDING 5 COURTARD)",
        lat: -33.8832,
        lng: 151.2016,
        address: "UTS Building 5, Ultimo NSW 2007"
      },
      {
        name: "Westfield Eastgardens (Level 3, lift outside Hoyts)",
        lat: -33.9394,
        lng: 151.2306,
        address: "Westfield Eastgardens, Eastgardens NSW 2036"
      },
      {
        name: "Westfield Hornsby (Level 3, opposite NRMA / Chemist Warehouse)",
        lat: -33.7025,
        lng: 151.0994,
        address: "Westfield Hornsby, Hornsby NSW 2077"
      },
      {
        name: "Westfield Parramatta (Level 1 lift lobby, near Medibank)",
        lat: -33.8167,
        lng: 151.0000,
        address: "Westfield Parramatta, Parramatta NSW 2150"
      },
      {
        name: "Westfield Sydney (QVBNext to the reception)",
        lat: -33.8688,
        lng: 151.2093,
        address: "Westfield Sydney, Sydney NSW 2000"
      },
      {
        name: "Westfield Warringah (Level 2 & Behind McDonald's)",
        lat: -33.7833,
        lng: 151.2667,
        address: "Westfield Warringah, Brookvale NSW 2100"
      },
      {
        name: "Wwestfield Miranda (Foot Locker & Cotton On)",
        lat: -34.0333,
        lng: 151.1000,
        address: "Westfield Miranda, Miranda NSW 2228"
      },
      {
        name: "Castle Towers (Station tunnel, near McDonald's)",
        lat: -33.7333,
        lng: 151.0000,
        address: "Castle Towers, Castle Hill NSW 2154"
      },
      {
        name: "Westpoint Blacktown (at G floor food core)",
        lat: -33.7667,
        lng: 150.9167,
        address: "Westpoint Blacktown, Blacktown NSW 2148"
      },
      {
        name: "Tramsheds (On the top floor)",
        lat: -33.8833,
        lng: 151.1833,
        address: "Tramsheds, Forest Lodge NSW 2037"
      },
      {
        name: "Balgowlah Village Centre (B1 to Ground Floor)",
        lat: -33.8000,
        lng: 151.2667,
        address: "Balgowlah Village Centre, Balgowlah NSW 2093"
      },
      {
        name: "Pemulwuy Marketplace (At Woolworths entrance)",
        lat: -33.8167,
        lng: 150.9167,
        address: "Pemulwuy Marketplace, Pemulwuy NSW 2145"
      },
      {
        name: "Forestway Shopping Centre",
        lat: -33.7333,
        lng: 151.1833,
        address: "Forestway Shopping Centre, Frenchs Forest NSW 2086"
      },
      {
        name: "Stanhope Village (Near the food court)",
        lat: -33.7333,
        lng: 150.9167,
        address: "Stanhope Village, Stanhope Gardens NSW 2768"
      },
      {
        name: "Emerton Village (At Woolworths entrance)",
        lat: -33.7500,
        lng: 150.8500,
        address: "Emerton Village, Emerton NSW 2770"
      },
      {
        name: "Ed.Square Shopping Centre (B1 parking to G Floor)",
        lat: -33.8833,
        lng: 150.8833,
        address: "Ed.Square Shopping Centre, Edmondson Park NSW 2174"
      },
    ],
  };

  // Handle location click
  const handleLocationClick = (location) => {
    setSelectedLocation(location);
    setMapCenter([location.lat, location.lng]);
    setMapZoom(16);
    setShowMap(true);
  };

  // Get filtered locations
  const getFilteredLocations = () => {
    let locations = [];
    if (selectedState === "sa") {
      locations = shoppingLocations.sa;
    } else if (selectedState === "nsw") {
      locations = shoppingLocations.nsw;
    } else {
      locations = [...shoppingLocations.sa, ...shoppingLocations.nsw];
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      locations = locations.filter(loc => 
        loc.name.toLowerCase().includes(query) || 
        loc.address.toLowerCase().includes(query)
      );
    }

    return locations;
  };

  const filteredLocations = getFilteredLocations();
  const totalLocations = shoppingLocations.sa.length + shoppingLocations.nsw.length;

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
                Store Locator
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-bold mb-2 leading-tight px-2">
                <span className={`inline-block text-white transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`} style={{ transitionDelay: '200ms' }}>
                  FIND US
                </span>
                <br />
                <span className={`inline-block bg-gradient-to-r from-blue-400 via-purple-500 to-orange-400 bg-clip-text text-transparent transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
                }`} style={{ transitionDelay: '400ms' }}>
                  NEAR YOU
                </span>
              </h1>
              <p className={`text-xs sm:text-sm md:text-base lg:text-lg text-white/90 max-w-3xl mx-auto mt-4 sm:mt-6 leading-relaxed font-light transition-all duration-700 px-4 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`} style={{ transitionDelay: '600ms' }}>
                Discover CaseCraft vending machine locations across NSW & SA. Create your custom phone case in just 4-5 minutes!
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-6 lg:px-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div className={`relative backdrop-blur-xl bg-white/60 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/30 shadow-xl hover:bg-white/80 transition-all duration-500 overflow-hidden group transform ${
              statsVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-95"
            }`} style={{ transitionDelay: '100ms' }}>
              <div className="absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-[#0a214f]/20 to-transparent rounded-bl-full animate-pulse"></div>
              <div className="relative z-10">
                <div className="text-2xl sm:text-3xl font-bold text-[#0a214f] mb-1 transition-all duration-700 transform group-hover:scale-110">{totalLocations}</div>
                <div className="text-xs sm:text-sm text-gray-600 transition-colors duration-300 group-hover:text-[#0a214f]">Total Locations</div>
              </div>
            </div>
            <div className={`relative backdrop-blur-xl bg-white/60 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/30 shadow-xl hover:bg-white/80 transition-all duration-500 overflow-hidden group transform ${
              statsVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-95"
            }`} style={{ transitionDelay: '200ms' }}>
              <div className="absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-[#fe7245]/20 to-transparent rounded-bl-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <div className="relative z-10">
                <div className="text-2xl sm:text-3xl font-bold text-[#fe7245] mb-1 transition-all duration-700 transform group-hover:scale-110">{shoppingLocations.nsw.length}</div>
                <div className="text-xs sm:text-sm text-gray-600 transition-colors duration-300 group-hover:text-[#fe7245]">NSW Locations</div>
              </div>
            </div>
            <div className={`relative backdrop-blur-xl bg-white/60 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/30 shadow-xl hover:bg-white/80 transition-all duration-500 overflow-hidden group transform ${
              statsVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-95"
            }`} style={{ transitionDelay: '300ms' }}>
              <div className="absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-[#0a214f]/20 to-transparent rounded-bl-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              <div className="relative z-10">
                <div className="text-2xl sm:text-3xl font-bold text-[#0a214f] mb-1 transition-all duration-700 transform group-hover:scale-110">{shoppingLocations.sa.length}</div>
                <div className="text-xs sm:text-sm text-gray-600 transition-colors duration-300 group-hover:text-[#0a214f]">SA Locations</div>
              </div>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className={`mb-6 sm:mb-8 transition-all duration-700 ${
            searchVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-95"
          }`} style={{ transitionDelay: '400ms' }}>
            <div className="relative backdrop-blur-xl bg-white/60 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/30 shadow-xl overflow-hidden group hover:bg-white/80 transition-all duration-500">
              <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-[#fe7245]/20 to-transparent rounded-bl-full animate-pulse"></div>
              
              {/* Search Input */}
              <div className="relative mb-4 sm:mb-6">
                <div className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 transition-all duration-300 group-hover:text-[#fe7245] group-hover:scale-110">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 backdrop-blur-sm bg-white/80 border border-white/40 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fe7245] focus:border-[#fe7245] transition-all duration-300 text-sm sm:text-base text-gray-700 placeholder-gray-400 hover:border-[#fe7245]/50 focus:scale-[1.02] transform"
                />
              </div>

              {/* Filter Pills */}
              <div className="flex flex-wrap gap-2 sm:gap-3">
                <button
                  onClick={() => setSelectedState(null)}
                  className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-medium sm:font-semibold text-xs sm:text-sm transition-all duration-300 transform hover:scale-110 active:scale-95 ${
                    selectedState === null
                      ? "bg-[#fe7245] text-white shadow-lg scale-105"
                      : "bg-white/80 text-gray-700 hover:bg-white border border-white/40 hover:border-[#fe7245]"
                  }`}
                >
                  All Locations
                </button>
                <button
                  onClick={() => setSelectedState("nsw")}
                  className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-medium sm:font-semibold text-xs sm:text-sm transition-all duration-300 transform hover:scale-110 active:scale-95 ${
                    selectedState === "nsw"
                      ? "bg-[#fe7245] text-white shadow-lg scale-105"
                      : "bg-white/80 text-gray-700 hover:bg-white border border-white/40 hover:border-[#fe7245]"
                  }`}
                >
                  NSW ({shoppingLocations.nsw.length})
                </button>
                <button
                  onClick={() => setSelectedState("sa")}
                  className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-medium sm:font-semibold text-xs sm:text-sm transition-all duration-300 transform hover:scale-110 active:scale-95 ${
                    selectedState === "sa"
                      ? "bg-[#fe7245] text-white shadow-lg scale-105"
                      : "bg-white/80 text-gray-700 hover:bg-white border border-white/40 hover:border-[#fe7245]"
                  }`}
                >
                  SA ({shoppingLocations.sa.length})
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8 transition-all duration-700 ease-in-out">
            {/* Locations Grid */}
            <div className={`transition-all duration-700 ${
              locationsVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`} style={{ transitionDelay: "600ms" }}>
              <div className="mb-3 sm:mb-4 flex items-center justify-between">
                <h2 className={`text-xl sm:text-2xl font-bold text-[#0a214f] transition-all duration-500 ${
                  locationsVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
                }`} style={{ transitionDelay: "700ms" }}>
                  {filteredLocations.length} {filteredLocations.length === 1 ? 'Location' : 'Locations'} Found
                </h2>
              </div>
              
              <div className="space-y-3 sm:space-y-4 max-h-[600px] sm:max-h-[700px] md:max-h-[800px] overflow-y-auto pr-2">
                {filteredLocations.length === 0 ? (
                  <div className={`relative backdrop-blur-xl bg-white/60 rounded-2xl p-12 border border-white/30 shadow-xl text-center transition-all duration-700 ${
                    locationsVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
                  }`} style={{ transitionDelay: "800ms" }}>
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center animate-bounce">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">No locations found</h3>
                    <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                  </div>
                ) : (
                  filteredLocations.map((location, idx) => {
                    const isSelected = selectedLocation?.name === location.name;
                    const isSA = shoppingLocations.sa.some(loc => loc.name === location.name);
                    
                    return (
                      <div
                        key={idx}
                        onClick={() => handleLocationClick(location)}
                        className={`group relative backdrop-blur-xl bg-white/60 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/30 cursor-pointer transition-all duration-500 hover:bg-white/80 hover:shadow-2xl hover:-translate-y-1 overflow-hidden ${
                          isSelected
                            ? "border-[#fe7245] shadow-2xl bg-white/90 scale-[1.02] ring-2 ring-[#fe7245]/20"
                            : "hover:border-[#fe7245]"
                        }`}
                        style={{ 
                          animationDelay: `${800 + (idx * 50)}ms`,
                          opacity: locationsVisible ? 1 : 0,
                          transform: locationsVisible ? 'translateY(0) translateX(0)' : 'translateY(20px) translateX(-20px)',
                          transition: `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${800 + (idx * 50)}ms`
                        }}
                      >
                        {/* Gradient accent */}
                        <div className={`absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br ${
                          isSelected ? 'from-[#fe7245]/30' : 'from-[#fe7245]/10'
                        } to-transparent rounded-bl-full transition-opacity duration-500 ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></div>
                        
                        <div className="relative z-10 flex items-start gap-3 sm:gap-4">
                          {/* Icon */}
                          <div className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg transition-all duration-500 ${
                            isSelected
                              ? "bg-gradient-to-br from-[#fe7245] to-[#ff855f] scale-110 rotate-12"
                              : "bg-gradient-to-br from-[#0a214f] to-[#1a3a6b] group-hover:from-[#fe7245] group-hover:to-[#ff855f] group-hover:scale-110 group-hover:rotate-12"
                          }`}>
                            <svg className={`w-5 h-5 sm:w-6 sm:h-6 text-white transition-transform duration-300 ${isSelected ? "scale-110" : "group-hover:scale-110"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </div>
                          
                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 sm:gap-4 mb-1 sm:mb-2">
                              <h3 className={`text-base sm:text-lg font-bold transition-all duration-300 ${
                                isSelected
                                  ? "text-[#fe7245]"
                                  : "text-gray-900 group-hover:text-[#fe7245]"
                              }`}>
                                {location.name}
                              </h3>
                              {isSelected && (
                                <div className="flex-shrink-0">
                                  <div className="w-2 h-2 bg-[#fe7245] rounded-full animate-ping"></div>
                                  <div className="w-2 h-2 bg-[#fe7245] rounded-full -mt-2"></div>
                                </div>
                              )}
                            </div>
                            <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">{location.address}</p>
                            
                            {/* Badge */}
                            <div className="flex flex-wrap items-center gap-2">
                              <span className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-semibold ${
                                isSA
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-purple-100 text-purple-700"
                              }`}>
                                {isSA ? "SA" : "NSW"}
                              </span>
                              <span className="text-xs text-gray-500">Click to view on map</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Map Section */}
            <div className="transition-all duration-700 ease-in-out opacity-100 translate-x-0 scale-100 rotate-0" 
              style={{ 
                transitionDelay: "100ms",
                animation: "fadeInMap 0.8s ease-out 0.1s both"
              }}>
              <div className="lg:sticky lg:top-8">
                <div className="relative backdrop-blur-xl bg-white/60 rounded-xl sm:rounded-2xl shadow-2xl border border-white/30 overflow-hidden h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] xl:h-[800px] group hover:bg-white/80 transition-all duration-500 animate-fade-in">
                  {/* Gradient accent */}
                  <div className="absolute top-0 left-0 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-[#0a214f]/20 to-transparent rounded-br-full z-10 transition-all duration-500 animate-pulse"></div>
                  
                  {/* Animated border glow */}
                  <div className="absolute inset-0 rounded-xl sm:rounded-2xl transition-all duration-700 ring-2 ring-[#fe7245]/30 animate-pulse"></div>
                  
                  {/* Map Header */}
                  <div className="relative z-10 p-3 sm:p-4 border-b border-white/20 bg-white/30 backdrop-blur-sm transition-all duration-500 group-hover:bg-white/40 opacity-100 translate-y-0" 
                    style={{ 
                      transitionDelay: "200ms",
                      animation: "fadeInMap 0.6s ease-out 0.2s both"
                    }}>
                    <div className="flex items-center justify-between">
                      <h3 className="text-base sm:text-lg font-bold text-[#0a214f] flex items-center gap-2 transition-all duration-300 group-hover:text-[#fe7245]">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 transition-all duration-500 group-hover:rotate-12 animate-bounce" style={{ animationDuration: "2s", animationIterationCount: "1" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                        </svg>
                        <span className="hidden sm:inline">Interactive Map</span>
                        <span className="sm:hidden">Map</span>
                      </h3>
                      {selectedLocation && (
                        <button
                          onClick={() => {
                            setMapCenter([-33.8688, 151.2093]);
                            setMapZoom(11);
                            setSelectedLocation(null);
                          }}
                          className="text-xs text-[#fe7245] hover:underline transition-all duration-300 transform hover:scale-110 animate-pulse"
                        >
                          Reset
                        </button>
                      )}
                    </div>
                  </div>
                  
                  {/* Map Container */}
                  <div className="w-full h-[calc(100%-60px)] sm:h-[calc(100%-65px)] md:h-[calc(100%-73px)] relative z-0 transition-all duration-700 ease-in-out opacity-100 scale-100" 
                    style={{ 
                      animation: "fadeInMap 0.8s ease-out",
                      transformOrigin: "center center"
                    }}>
                    {/* Map loading shimmer effect */}
                    {!mapLoaded && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer z-10"></div>
                    )}
                    
                    <MapContainer
                      center={mapCenter}
                      zoom={mapZoom}
                      style={{ 
                        height: "100%", 
                        width: "100%", 
                        zIndex: 0,
                        transition: "all 0.5s ease-in-out",
                        animation: "zoomInMap 0.6s ease-out"
                      }}
                      scrollWheelZoom={true}
                    >
                        <MapController center={mapCenter} zoom={mapZoom} />
                        <TileLayer
                          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {filteredLocations.map((location, idx) => {
                          const isSelected = selectedLocation?.name === location.name;
                          return (
                            <Marker
                              key={idx}
                              position={[location.lat, location.lng]}
                              eventHandlers={{
                                click: () => handleLocationClick(location),
                                mouseover: (e) => {
                                  e.target.openPopup();
                                },
                              }}
                            >
                              <Popup 
                                className="transition-all duration-300 animate-popup-in"
                                style={{
                                  animation: `popupFadeIn 0.4s ease-out ${idx * 0.1}s both`
                                }}
                              >
                                <div style={{ padding: "8px", minWidth: "200px" }}>
                                  <h3 style={{ margin: "0 0 8px 0", fontWeight: "bold", color: "#0a214f", fontSize: "16px" }}>
                                    {location.name}
                                  </h3>
                                  <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>
                                    {location.address}
                                  </p>
                                  {isSelected && (
                                    <div style={{ 
                                      marginTop: "8px", 
                                      padding: "4px 8px", 
                                      background: "#fe7245", 
                                      color: "white", 
                                      borderRadius: "4px", 
                                      fontSize: "12px", 
                                      display: "inline-block",
                                      animation: "pulse 2s infinite"
                                    }}>
                                      Selected
                                    </div>
                                  )}
                                </div>
                              </Popup>
                            </Marker>
                          );
                        })}
                      </MapContainer>
                    </div>
                  </div>
                </div>
              </div>
          </div>

          {/* Info CTA */}
          <div className={`text-center transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-95"
          }`} style={{ transitionDelay: "1000ms" }}>
            <div className="relative backdrop-blur-xl bg-white/60 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 border border-white/30 overflow-hidden group hover:bg-white/80 transition-all duration-500 hover:scale-[1.02] transform">
              <div className="absolute top-0 left-0 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-[#0a214f]/20 to-transparent rounded-br-full animate-pulse"></div>
              <div className="absolute bottom-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-tl from-[#fe7245]/20 to-transparent rounded-tl-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <div className="relative z-10">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-3 sm:mb-4 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#fe7245] to-[#ff855f] flex items-center justify-center shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-12">
                  <svg className="w-6 h-6  sm:w-8 md:w-8 text-white transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#0a214f] mb-2 sm:mb-3 transition-colors duration-300 group-hover:text-[#fe7245] px-2">Ready to Create Your Custom Case?</h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed max-w-2xl mx-auto mb-4 sm:mb-6 transition-all duration-300 px-2">
                  Visit any of our vending machine locations to create your custom phone case in just 4-5 minutes! Simply scan the QR code, upload your image, and watch your personalized case come to life.
                </p>
                <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                  <div className="px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-50 rounded-lg text-xs sm:text-sm text-[#0a214f] font-semibold transition-all duration-300 transform hover:scale-110 hover:bg-blue-100 cursor-default">
                    ⚡ Fast & Easy
                  </div>
                  <div className="px-3 sm:px-4 py-1.5 sm:py-2 bg-purple-50 rounded-lg text-xs sm:text-sm text-[#0a214f] font-semibold transition-all duration-300 transform hover:scale-110 hover:bg-purple-100 cursor-default" style={{ transitionDelay: '100ms' }}>
                    🎨 Fully Customizable
                  </div>
                  <div className="px-3 sm:px-4 py-1.5 sm:py-2 bg-orange-50 rounded-lg text-xs sm:text-sm text-[#0a214f] font-semibold transition-all duration-300 transform hover:scale-110 hover:bg-orange-100 cursor-default" style={{ transitionDelay: '200ms' }}>
                    📱 Ready in 4-5 Minutes
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

export default StoreLocator;
