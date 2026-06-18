import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh]">
      <div className="flex flex-col items-center gap-4 p-8 rounded-2xl bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 shadow-2xl shadow-black/5">
        <h1 className="text-6xl font-bold text-gray-300 dark:text-gray-600">404</h1>
        <p className="text-gray-500 dark:text-gray-400">Page not found</p>
        <Link
          to="/"
          className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl text-sm font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 no-underline shadow-md hover:shadow-lg active:scale-95"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
