import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/authApi.js";
import { useAuth } from "../context/AuthContext.jsx";
import { Mail, Lock, ArrowRight, AlertCircle, Eye, EyeOff, Check, X } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [touched, setTouched] = useState({ email: false, password: false });
  const [validationErrors, setValidationErrors] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  // Email validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "Email is required";
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    return "";
  };

  

  // Password validation
  const validatePassword = (password) => {
    if (!password) return "Password is required";
    if (password.length < 6) return "Password must be at least 6 characters";
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    // Real-time validation
    if (touched[name]) {
      if (name === "email") {
        setValidationErrors({ ...validationErrors, email: validateEmail(value) });
      } else if (name === "password") {
        setValidationErrors({ ...validationErrors, password: validatePassword(value) });
      }
    }
  };

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
    
    if (field === "email") {
      setValidationErrors({ ...validationErrors, email: validateEmail(form.email) });
    } else if (field === "password") {
      setValidationErrors({ ...validationErrors, password: validatePassword(form.password) });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const emailError = validateEmail(form.email);
    const passwordError = validatePassword(form.password);
    
    setValidationErrors({ email: emailError, password: passwordError });
    setTouched({ email: true, password: true });
    
    if (emailError || passwordError) {
      return;
    }

    setError("");
    setLoading(true);
    try {
      const data = await loginUser(form);
      login(data);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };
              
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4 py-16">
      <div className="w-full max-w-md">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl md:p-10">
          {/* Header */}
          <div className="mb-8 text-center">
            <h2 className="bg-gradient-to-r from-blue-900 via-purple-400 to-[#fe7245] bg-clip-text text-4xl font-bold text-transparent">
              Welcome Back
            </h2>
            <p className="mt-3 text-lg text-slate-600">Sign in to continue designing</p>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-700">
                Email Address
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  onBlur={() => handleBlur("email")}
                  className={`w-full rounded-xl border-2 bg-white py-3 pl-11 pr-4 text-slate-800 transition-all focus:outline-none focus:ring-2 ${
                    validationErrors.email && touched.email
                      ? "border-rose-300 focus:border-rose-500 focus:ring-rose-500/20"
                      : "border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                  }`}
                  required
                />
                {touched.email && !validationErrors.email && form.email && (
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                    <Check className="h-5 w-5 text-emerald-500" />
                  </div>
                )}
              </div>
              {validationErrors.email && touched.email && (
                <p className="mt-2 flex items-center gap-1 text-sm text-rose-600">
                  <X className="h-4 w-4" />
                  {validationErrors.email}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div className="relative">
  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
    <Lock className="h-5 w-5 text-slate-400" />
  </div>

  {/* Input type changes based on showPassword */}
  <input
    type={showPassword ? "text" : "password"}  // <- IMPORTANT
    id="password"
    name="password"
    placeholder="Enter your password"
    value={form.password}
    onChange={handleChange}
    onBlur={() => handleBlur("password")}
    className={`w-full rounded-xl border-2 bg-white py-3 pl-11 pr-4 text-slate-800 transition-all focus:outline-none focus:ring-2 ${
      validationErrors.password && touched.password
        ? "border-rose-300 focus:border-rose-500 focus:ring-rose-500/20"
        : "border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
    }`}
    required
  />

  {/* Eye toggle button */}
  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 hover:text-slate-600"
  >
    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
  </button>
</div>


            {/* Error Message */}
            {error && (
              <div className="flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4">
                <AlertCircle className="h-5 w-5 flex-shrink-0 text-rose-600" />
                <p className="text-sm font-medium text-rose-600">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#fe7245] to-pink-600 px-6 py-4 font-semibold text-white shadow-lg shadow-orange-500/30 transition-all hover:shadow-xl hover:shadow-orange-500/40 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:shadow-lg"
            >
              {loading ? (
                <>
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  Signing in...
                </>
              ) : (
                <>
                  Login
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          {/* Register & Forgot Password Links */}
          <div className="mt-6 space-y-3 text-center">
            <p className="text-sm text-slate-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-blue-600 transition-colors hover:text-purple-600 hover:underline"
              >
                Create Account
              </Link>
            </p>
            <p className="text-sm text-slate-600">
              <Link
                to="/forgot-password"
                className="font-semibold text-blue-600 transition-colors hover:text-purple-600 hover:underline"
              >
                Forgot password?
              </Link>
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-slate-500">
            By signing in, you agree to our{" "}
            <a href="#" className="text-slate-700 hover:underline">
              Terms of Service
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;