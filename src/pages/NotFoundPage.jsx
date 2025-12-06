// src/pages/NotFoundPage.jsx
import { Link } from "react-router-dom";

export const NotFoundPage = () => (
  <div className="text-center py-20">
    <h1 className="text-6xl font-bold text-blue-500">404</h1>
    <p className="text-xl text-gray-400 mt-4">Page not found</p>
    <Link to="/" className="mt-6 inline-block bg-blue-600 px-6 py-3 rounded-lg text-white">
      Go Home
    </Link>
  </div>
);