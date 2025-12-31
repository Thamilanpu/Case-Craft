import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../api/authApi.js";
import { useAuth } from "../context/AuthContext.jsx";
import { User, Mail, Lock, ArrowRight, AlertCircle, Eye, EyeOff, Check, X } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [touched, setTouched] = useState({ name: false, email: false, password: false });
  const [validationErrors, setValidationErrors] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  // Name validation
  const validateName = (name) => {
    if (!name) return "Name is required";
    if (name.length < 2) return "Name must be at least 2 characters";
    if (name.length > 50) return "Name must be less than 50 characters";
    return "";
  };

  // Email validation with disposable email check
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // List of common disposable/temporary email domains
    const disposableDomains = [
      'tempmail.com', 'throwaway.email', 'guerrillamail.com', 'mailinator.com',
      '10minutemail.com', 'temp-mail.org', 'fakeinbox.com', 'trashmail.com',
      'getnada.com', 'maildrop.cc', 'yopmail.com', 'emailondeck.com',
      'sharklasers.com', 'guerrillamailblock.com', 'spam4.me', 'tempr.email'
    ];

    if (!email) return "Email is required";
    if (!emailRegex.test(email)) return "Please enter a valid email address";

    // Check for disposable email
    const domain = email.split('@')[1]?.toLowerCase();
    if (domain && disposableDomains.includes(domain)) {
      return "Temporary email addresses are not accepted. Please use an original email.";
    }

    return "";
  };

  // Password validation with requirements
  const validatePassword = (password) => {
    if (!password) return "Password is required";
    if (password.length < 6) return "Password must be at least 6 characters";
    return "";
  };

  // Password strength checker 
  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: "", color: "" };

    let strength = 0;
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^a-zA-Z0-9]/.test(password)
    };

    if (password.length >= 6) strength++;
    if (checks.length) strength++;
    if (checks.lowercase && checks.uppercase) strength++;
    if (checks.number) strength++;
    if (checks.special) strength++;

    if (strength <= 2) return { strength: 1, label: "Weak", color: "bg-rose-500", checks };
    if (strength <= 3) return { strength: 2, label: "Fair", color: "bg-amber-500", checks };
    if (strength <= 4) return { strength: 3, label: "Good", color: "bg-blue-500", checks };
    return { strength: 4, label: "Strong", color: "bg-emerald-500", checks };
  };

  const passwordStrength = getPasswordStrength(form.password);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Real-time validation
    if (touched[name]) {
      if (name === "name") {
        setValidationErrors({ ...validationErrors, name: validateName(value) });
      } else if (name === "email") {
        setValidationErrors({ ...validationErrors, email: validateEmail(value) });
      } else if (name === "password") {
        setValidationErrors({ ...validationErrors, password: validatePassword(value) });
      }
    }
  };

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });

    if (field === "name") {
      setValidationErrors({ ...validationErrors, name: validateName(form.name) });
    } else if (field === "email") {
      setValidationErrors({ ...validationErrors, email: validateEmail(form.email) });
    } else if (field === "password") {
      setValidationErrors({ ...validationErrors, password: validatePassword(form.password) });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    const nameError = validateName(form.name);
    const emailError = validateEmail(form.email);
    const passwordError = validatePassword(form.password);

    setValidationErrors({ name: nameError, email: emailError, password: passwordError });
    setTouched({ name: true, email: true, password: true });

    if (nameError || emailError || passwordError) {
      return;
    }

    setLoading(true);
    setError("");
    try {
      const data = await registerUser(form);
      login(data);
      navigate("/");
    } catch (err) {
      console.error("Registration error:", err);
      if (err.response) {
        const errorMessage = err.response.data?.message || `Error: ${err.response.status} ${err.response.statusText}`;
        setError(errorMessage);
      } else if (err.request) {
        setError("Unable to connect to server. Please check if the backend is running on port 5000.");
      } else if (err.message) {
        setError(err.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Fast password generator
  const generatePassword = () => {
    const length = 12;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let password = "";
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setForm({ ...form, password });
    setTouched({ ...touched, password: true });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4 py-16">
      <div className="w-full max-w-md">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl md:p-10">
          {/* Header */}
          <div className="mb-8 text-center">
            <h2 className="bg-gradient-to-r from-blue-900 via-purple-400 to-[#fe7245] bg-clip-text text-4xl font-bold text-transparent">
              Create Account
            </h2>
            <p className="mt-3 text-lg text-slate-600">Start crafting your custom cover</p>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Name Input */}
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-semibold text-slate-700">
                Full Name
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <User className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={handleChange}
                  onBlur={() => handleBlur("name")}
                  className={`w-full rounded-xl border-2 bg-white py-3 pl-11 pr-4 text-slate-800 transition-all focus:outline-none focus:ring-2 ${validationErrors.name && touched.name
                    ? "border-rose-300 focus:border-rose-500 focus:ring-rose-500/20"
                    : "border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                    }`}
                  required
                />
                {touched.name && !validationErrors.name && form.name && (
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                    <Check className="h-5 w-5 text-emerald-500" />
                  </div>
                )}
              </div>
              {validationErrors.name && touched.name && (
                <p className="mt-2 flex items-center gap-1 text-sm text-rose-600">
                  <X className="h-4 w-4" />
                  {validationErrors.name}
                </p>
              )}
            </div>

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
                  className={`w-full rounded-xl border-2 bg-white py-3 pl-11 pr-4 text-slate-800 transition-all focus:outline-none focus:ring-2 ${validationErrors.email && touched.email
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
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-semibold text-slate-700">
                  Password
                </label>
                <button
                  type="button"
                  onClick={generatePassword}
                  className="text-xs font-semibold text-blue-600 transition-colors hover:text-purple-600"
                >
                  Generate Strong Password
                </button>
              </div>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="At least 6 characters"
                  value={form.password}
                  onChange={handleChange}
                  onBlur={() => handleBlur("password")}
                  className={`w-full rounded-xl bg-white py-3 pl-11 pr-4 text-slate-800 transition-all focus:outline-none focus:ring-2 ${validationErrors.password && touched.password
                    ? "border-2 border-rose-500 focus:ring-rose-500/20"
                    : form.password && passwordStrength.strength === 1
                      ? "border-2 border-rose-500 focus:ring-rose-500/20"
                      : form.password && passwordStrength.strength === 2
                        ? "border-2 border-amber-500 focus:ring-amber-500/20"
                        : form.password && passwordStrength.strength === 3
                          ? "border-2 border-blue-500 focus:ring-blue-500/20"
                          : form.password && passwordStrength.strength === 4
                            ? "border-2 border-emerald-500 focus:ring-emerald-500/20"
                            : "border-2 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
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

              {/* Password Requirements Checklist */}
              {form.password && touched.password && (
                <div className="mt-3 rounded-lg bg-slate-50 p-3">
                  <p className="mb-2 text-xs font-semibold text-slate-600">Password Requirements:</p>
                  <div className="space-y-1 text-xs">
                    <div className={`flex items-center gap-2 ${passwordStrength.checks?.length ? "text-emerald-600" : "text-slate-400"}`}>
                      {passwordStrength.checks?.length ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                      <span>At least 8 characters</span>
                    </div>
                    <div className={`flex items-center gap-2 ${passwordStrength.checks?.lowercase && passwordStrength.checks?.uppercase ? "text-emerald-600" : "text-slate-400"}`}>
                      {passwordStrength.checks?.lowercase && passwordStrength.checks?.uppercase ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                      <span>Mixed case (A-z)</span>
                    </div>
                    <div className={`flex items-center gap-2 ${passwordStrength.checks?.number ? "text-emerald-600" : "text-slate-400"}`}>
                      {passwordStrength.checks?.number ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                      <span>Contains number (0-9)</span>
                    </div>
                    <div className={`flex items-center gap-2 ${passwordStrength.checks?.special ? "text-emerald-600" : "text-slate-400"}`}>
                      {passwordStrength.checks?.special ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                      <span>Special character (!@#$%)</span>
                    </div>
                  </div>
                </div>
              )}

              {validationErrors.password && touched.password && (
                <p className="mt-2 flex items-center gap-1 text-sm text-rose-600">
                  <X className="h-4 w-4" />
                  {validationErrors.password}
                </p>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4">
                <AlertCircle className="h-5 w-5 flex-shrink-0 text-rose-600" />
                <p className="text-sm font-medium text-rose-600">{error}</p>
              </div>
            )}

            {/* Submit Button with Orange Gradient */}
            <button
              type="submit"
              disabled={loading}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#fe7245] to-pink-600 px-6 py-4 font-semibold text-white shadow-lg shadow-orange-500/30 transition-all hover:shadow-xl hover:shadow-orange-500/40 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:shadow-lg"
            >
              {loading ? (
                <>
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-blue-600 transition-colors hover:text-purple-600 hover:underline"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-slate-500">
            By creating an account, you agree to our{" "}
            <a href="#" className="text-slate-700 hover:underline">
              Terms of Service
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;