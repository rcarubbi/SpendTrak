import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px]">
      <h1 className="text-4xl font-bold text-gray-300 dark:text-gray-600 mb-4">404</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-6">Page not found</p>
      <Link to="/" className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-semibold hover:bg-blue-700 transition-colors no-underline">
        Back to Dashboard
      </Link>
    </div>
  );
}
