import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useCart } from "../context/CartContext.jsx";
import logo from "../assets/logo/logo.png";
import { ShoppingBag, Menu, X, ChevronDown, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
    const { isAuthenticated, user, logout, loading } = useAuth();
    const { items, total } = useCart();
    const [cartOpen, setCartOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const [open, setOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [infoOpen, setInfoOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const profileRef = useRef(null);
    const infoRef = useRef(null);

    const isInfoPageActive =
        location.pathname === "/about" ||
        location.pathname === "/blog" ||
        location.pathname === "/store-locator" ||
        location.pathname === "/contact" ||
        location.pathname === "/faq";

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const initial =
        user?.name?.charAt(0)?.toUpperCase() ||
        user?.email?.charAt(0)?.toUpperCase();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setProfileOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setOpen(false);
        setInfoOpen(false);
    }, [location.pathname]);

    return (
        <nav
            className={`sticky top-0 z-50 bg-white transition-all duration-300 ${scrolled ? "shadow-lg py-2" : "shadow-md py-3"
                }`}
        >
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 lg:px-6">
                {/* LOGO */}
                <Link
                    to="/"
                    className="flex items-center gap-2 transition-transform hover:scale-105"
                >
                    <img
                        src={logo}
                        alt="CaseCraft"
                        className="h-10 w-auto sm:h-11 md:h-12 object-contain"
                    />
                </Link>

                {/* DESKTOP NAV MENUS */}
                <div className="hidden lg:flex items-center gap-1 xl:gap-2">
                    <NavLink
                        to="/"
                        onClick={() => setInfoOpen(false)}
                        className={({ isActive }) =>
                            `relative px-5 py-3 text-md font-semibold transition-all duration-300
                  ${isActive ? "text-[#fe7245]" : "text-gray-800 hover:text-[#fe7245]"}
                  after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-0.5 after:bg-[#fe7245] after:transition-all hover:after:w-8`
                        }
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to="/custom-mobilecase"
                        onClick={() => setInfoOpen(false)}
                        className={({ isActive }) =>
                            `relative px-5 py-3 text-md font-semibold transition-all duration-300
                  ${isActive ? "text-[#fe7245]" : "text-gray-800 hover:text-[#fe7245]"}
                  after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-0.5 after:bg-[#fe7245] after:transition-all hover:after:w-8`
                        }
                    >
                        Phone Cases
                    </NavLink>

                    <NavLink
                        to="/pet-center"
                        onClick={() => setInfoOpen(false)}
                        className={({ isActive }) =>
                            `relative px-5 py-3 text-md font-semibold transition-all duration-300
                  ${isActive ? "text-[#fe7245]" : "text-gray-800 hover:text-[#fe7245]"}
                  after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-0.5 after:bg-[#fe7245] after:transition-all hover:after:w-8`
                        }
                    >
                        Pet Gifts
                    </NavLink>

                    {/* INFO DROPDOWN */}
                    <div className="relative" ref={infoRef}
                        onMouseEnter={() => setInfoOpen(true)}
                        onMouseLeave={() => setInfoOpen(false)}
                    >
                        <button
                            onClick={() => setInfoOpen(!infoOpen)}
                            className={`px-3 xl:px-4 py-2 text-md font-semibold rounded-lg transition-all flex items-center gap-1 ${infoOpen || isInfoPageActive
                                ? "text-[#fe7245] bg-white/10"
                                : "text-gray-800 hover:text-[#fe7245] hover:bg-white/5"
                                }`}
                        >
                            Info
                            <ChevronDown
                                className={`w-4 h-4 transition-transform ${infoOpen ? "rotate-180" : ""}`}
                            />
                        </button>

                        {/* DROPDOWN MENU */}
                        {infoOpen && (
                            <div className="absolute right-0 w-48 rounded-xl bg-white shadow-xl py-2 border border-gray-100 z-50">
                                <NavLink to="/about" className="block px-4 py-2.5 text-md font-semibold text-gray-700 hover:text-[#fe7245] hover:bg-blue-50">About Us</NavLink>
                                <NavLink to="/blog" className="block px-4 py-2.5 text-md font-semibold text-gray-700 hover:text-[#fe7245] hover:bg-blue-50">Blog</NavLink>
                                <NavLink to="/store-locator" className="block px-4 py-2.5 text-md font-semibold text-gray-700 hover:text-[#fe7245] hover:bg-blue-50">Store Locator</NavLink>
                                <NavLink to="/contact" className="block px-4 py-2.5 text-md font-semibold text-gray-700 hover:text-[#fe7245] hover:bg-blue-50">Contact</NavLink>
                                <NavLink to="/faq" className="block px-4 py-2.5 text-md font-semibold text-gray-700 hover:text-[#fe7245] hover:bg-blue-50">FAQ</NavLink>
                            </div>
                        )}
                    </div>

                    {user?.role !== "admin" && (
                        <div
                            className="relative ml-6"
                            onMouseEnter={() => setCartOpen(true)}
                            onMouseLeave={() => setCartOpen(false)}
                        >
                            <NavLink
                                to="/user/cart"
                                className="relative px-4 py-3 bg-gradient-to-r from-[#fe7245] to-pink-600 text-white rounded-full font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
                            >
                                <ShoppingBag className="w-5 h-5" />
                                {items.length > 0 && (
                                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-bold text-[#fe7245]">
                                        {items.length}
                                    </span>
                                )}
                            </NavLink>

                            {/* Cart Dropdown Preview with Framer Motion */}
                            <AnimatePresence>
                                {cartOpen && items.length > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        transition={{ duration: 0.2, ease: "easeOut" }}
                                        className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 origin-top-right"
                                    >
                                        <div className="p-4 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                                            <span className="font-bold text-gray-900">My Cart ({items.length})</span>
                                            <Link to="/user/cart" className="text-xs font-semibold text-[#fe7245] hover:underline">View All</Link>
                                        </div>
                                        <div className="max-h-64 overflow-y-auto">
                                            {items.slice(0, 3).map((cartItem, idx) => (
                                                <div key={idx} className="p-3 flex gap-3 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0">
                                                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200">
                                                        <img src={cartItem.designImage || cartItem.templateImage} alt="" className="w-full h-full object-cover" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-bold text-gray-900 truncate">{cartItem.productName}</p>
                                                        <p className="text-xs text-gray-500">Qty: {cartItem.quantity || 1}</p>
                                                        <p className="text-sm font-bold text-[#fe7245]">$ {cartItem.price}</p>
                                                    </div>
                                                </div>
                                            ))}
                                            {items.length > 3 && (
                                                <div className="p-2 text-center text-xs text-gray-500 bg-gray-50 text-md font-semibold">
                                                    + {items.length - 3} more items
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-4 bg-gray-50/50 space-y-3">
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-gray-600">Total</span>
                                                <span className="font-bold text-gray-900">$ {total}</span>
                                            </div>
                                            <Link
                                                to="/checkout"
                                                className="block w-full text-center py-2.5 bg-gradient-to-r from-[#fe7245] to-pink-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all text-sm"
                                            >
                                                Checkout Now
                                            </Link>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )}

                    {/* Desktop Authenticated User */}
                    {loading ? (
                        <div className="ml-6 w-32 h-10 rounded-full bg-slate-100 animate-pulse"></div>
                    ) : isAuthenticated ? (
                        <div className="relative ml-6" ref={profileRef}>
                            <button
                                onClick={() => setProfileOpen(!profileOpen)}
                                className="flex items-center gap-3 px-5 py-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-300"
                            >
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#fe7245] to-pink-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                    {initial}
                                </div>
                                <span className="hidden xl:block font-medium text-gray-800">
                                    Hi, {user?.name?.split(" ")[0] || "User"}
                                </span>
                                <ChevronDown
                                    className={`w-4 h-4 text-gray-600 transition-transform ${profileOpen ? "rotate-180" : ""}`}
                                />
                            </button>

                            {/* Desktop DROPDOWN BOX */}
                            {profileOpen && (
                                <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                                    <div className="p-5 border-b border-gray-100">
                                        <p className="font-bold text-gray-900">{user?.name || "User"}</p>
                                        <p className="text-sm text-gray-500 truncate">{user?.email}</p>
                                    </div>

                                    {user?.role === "admin" ? (
                                        <Link to="/admin/dashboard" onClick={() => setProfileOpen(false)} className="block px-5 py-4 text-gray-700 hover:bg-gray-50 transition">Admin Panel</Link>
                                    ) : (
                                        <Link to="/user/dashboard" onClick={() => setProfileOpen(false)} className="block px-5 py-4 text-gray-700 hover:bg-gray-50 transition">My Panel</Link>
                                    )}

                                    <button
                                        onClick={() => { handleLogout(); setProfileOpen(false); }}
                                        className="w-full text-left px-5 py-3 text-red-600 hover:bg-red-50 font-medium transition flex items-center gap-2"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <NavLink
                            to="/login"
                            onClick={() => setOpen(false)}
                            className="px-8 py-3 bg-gradient-to-r from-[#fe7245] to-pink-600 text-white rounded-full font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2 ml-4"
                        >
                            <Sparkles className="w-5 h-5" />
                            Login
                        </NavLink>
                    )}

                </div>

                {/* MOBILE TOGGLE BUTTON */}
                <button
                    onClick={() => setOpen(!open)}
                    className="lg:hidden text-[#0a214f] p-2 rounded-lg hover:bg-white/10 transition-colors"
                    aria-label="Toggle menu"
                >
                    {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* MOBILE MENU */}
            <div
                className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <div className="px-4 pt-4 pb-6 space-y-2 bg-[#0a214f] border-t border-white/10">
                    <NavLink to="/" onClick={() => setOpen(false)} className="block px-4 py-3 text-md font-semibold text-white hover:text-[#fe7245]">Home</NavLink>
                    <NavLink to="/custom-mobilecase" onClick={() => setOpen(false)} className="block px-4 py-3 text-md font-semibold text-white hover:text-[#fe7245]">Phone Cases</NavLink>
                    <NavLink to="/pet-center" onClick={() => setOpen(false)} className="block px-4 py-3 text-md font-semibold text-white hover:text-[#fe7245]">Pet Gifts</NavLink>

                    {/* INFO DROPDOWN MOBILE */}
                    <div className="space-y-1">
                        <button
                            onClick={() => setInfoOpen(!infoOpen)}
                            className="w-full flex items-center justify-between px-4 py-3 text-md font-semibold text-white hover:text-[#fe7245]"
                        >
                            <span>Info</span>
                            <ChevronDown className={`w-4 h-4 transition-transform ${infoOpen ? "rotate-180" : ""}`} />
                        </button>

                        {infoOpen && (
                            <div className="pl-4 space-y-1">
                                <NavLink to="/about" onClick={() => setOpen(false)} className="block px-4 py-2 text-md font-semibold text-white/80 hover:text-[#fe7245]">About Us</NavLink>
                                <NavLink to="/blog" onClick={() => setOpen(false)} className="block px-4 py-2 text-md font-semibold text-white/80 hover:text-[#fe7245]">Blog</NavLink>
                                <NavLink to="/store-locator" onClick={() => setOpen(false)} className="block px-4 py-2 text-md font-semibold text-white/80 hover:text-[#fe7245]">Store Locator</NavLink>
                                <NavLink to="/contact" onClick={() => setOpen(false)} className="block px-4 py-2 text-md font-semibold text-white/80 hover:text-[#fe7245]">Contact</NavLink>
                                <NavLink to="/faq" onClick={() => setOpen(false)} className="block px-4 py-2 text-md font-semibold text-white/80 hover:text-[#fe7245]">FAQ</NavLink>
                            </div>
                        )}
                    </div>

                    {/* Mobile Cart */}
                    {user?.role !== "admin" && (
                        <NavLink
                            to="/user/cart"
                            onClick={() => setOpen(false)}
                            className="flex items-center justify-between px-4 py-3 mt-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-[#fe7245] to-pink-600 text-white transition-all shadow-lg"
                        >
                            <div className="flex items-center gap-2">
                                <ShoppingBag className="w-5 h-5" />
                                <span>My Cart</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-medium opacity-80">$ {total}</span>
                                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-bold text-[#fe7245]">
                                    {items.length}
                                </span>
                            </div>
                        </NavLink>
                    )}

                    {loading ? (
                        <div className="px-4 py-3 rounded-lg bg-white/5 mt-4 h-24 animate-pulse"></div>
                    ) : isAuthenticated ? (
                        <div className="px-4 py-3 rounded-lg bg-white/5 mt-4">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#fe7245] to-pink-600 text-white font-bold text-md shadow-md">
                                    {initial}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-white truncate">{user?.name || user?.email}</p>
                                    <p className="text-xs text-gray-300 truncate">{user?.email}</p>
                                </div>
                            </div>
                            {user?.role === "admin" ? (
                                <Link to="/admin/dashboard" onClick={() => setOpen(false)} className="block w-full text-center py-2 text-sm font-medium text-white bg-white/10 rounded-lg mb-2">Admin Panel</Link>
                            ) : (
                                <Link to="/user/dashboard" onClick={() => setOpen(false)} className="block w-full text-center py-2 text-sm font-medium text-white bg-white/10 rounded-lg mb-2">My Panel</Link>
                            )}
                            <button
                                onClick={() => { handleLogout(); setOpen(false); }}
                                className="w-full px-4 py-2.5 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <NavLink
                            to="/login"
                            onClick={() => setOpen(false)}
                            className="w-full max-w-xs mx-auto text-center py-3 bg-gradient-to-r from-[#fe7245] to-pink-600 text-white rounded-full font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex justify-center items-center gap-2 mt-4"
                        >
                            <Sparkles className="w-5 h-5" />
                            Login
                        </NavLink>
                    )}

                </div>
            </div>
        </nav>
    );
};

export default Navbar;
