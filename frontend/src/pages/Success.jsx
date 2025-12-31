import { Link } from "react-router-dom";

const Success = () => {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 bg-slate-50 px-4 text-center">
      <div className="rounded-full bg-green-100 p-6">
        <span className="text-4xl">✅</span>
      </div>
      <h2 className="text-3xl font-semibold text-slate-800">Design saved!</h2>
      <p className="max-w-md text-slate-500">
        Your custom phone cover has been saved. Our team will review it before production.
      </p>
      <Link
        to="/"
        className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent-dark"
      >
        Create another design
      </Link>
    </div>
  );
};

export default Success;

