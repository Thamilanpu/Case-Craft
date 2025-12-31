import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const PasswordResetSuccess = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-900 px-4">
      <div className="text-center">
        <div className="mx-auto mb-6 flex h-24 w-24 animate-ping-slow items-center justify-center rounded-full bg-gradient-to-r from-[#fe7245] to-pink-600">
          <CheckCircle className="h-12 w-12 text-white" />
        </div>

        <h2 className="text-3xl font-bold dark:text-white">
          Password Reset Successful
        </h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Your password has been successfully reset.<br /> You can now log in with your new password.
        </p>

        <Link
          to="/login"
          className="mt-6 inline-block rounded-xl bg-gradient-to-r from-[#fe7245] to-pink-600 px-8 py-3 font-semibold text-white"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
};

export default PasswordResetSuccess;
