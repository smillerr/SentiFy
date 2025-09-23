"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [error, setError] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const errorParam = urlParams.get("error");

    if (errorParam) {
      setError(errorParam);
    }
  }, []);

  const handleLogin = () => {
    window.location.href = "/api/auth/spotify";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Sentify
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Organiza tus canciones de Spotify por estados de ánimo
          </p>
        </div>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            Error de autenticación: {error}
          </div>
        )}
        <div>
          <button
            onClick={handleLogin}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Conectar con Spotify
          </button>
        </div>
      </div>
    </div>
  );
}
