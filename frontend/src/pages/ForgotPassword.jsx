import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowRight, ArrowLeft } from "lucide-react";
import { forgotPassword } from "../api/authApi";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await forgotPassword(email);
      setSuccess(data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl md:p-10">
        <h2 className="mb-2 text-center text-3xl font-bold text-slate-800">
          Forgot Password
        </h2>
        <p className="mb-6 text-center text-slate-600">Enter your email to reset password</p>

        {!success ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <Mail className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-xl border-2 border-slate-200 bg-white py-3 pl-11 pr-4 text-slate-800 focus:border-[#fe7245] focus:outline-none focus:ring-2 focus:ring-orange-500/20"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#fe7245] to-pink-600 px-6 py-4 font-semibold text-white shadow-lg transition-all hover:opacity-90 disabled:opacity-60"
            >
              {loading ? "Sending..." : <>
                Send Reset Link
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </>}
            </button>
          </form>
        ) : (
          <p className="mt-4 text-center text-sm font-medium text-green-600">{success}</p>
        )}

        <div className="mt-6 text-center">
          <Link
            to="/login"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition-colors hover:text-purple-600 hover:underline"
          >
            <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
