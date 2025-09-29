"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import useAuthStore from "../lib/authStore";

export default function Home() {
  const { user, isLoading, setUser, setLoading, logout } = useAuthStore();
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const userIdParam = urlParams.get("userId");
      const errorParam = urlParams.get("error");

      if (errorParam) {
        setError(errorParam);
        setLoading(false);
        return;
      }

      let userId = userIdParam || localStorage.getItem("userId");

      if (userId) {
        try {
          const response = await fetch(`/api/auth/status?userId=${userId}`);
          const data = await response.json();
          console.log("userId from URL:", userIdParam);
          console.log("userId from storage:", localStorage.getItem("userId"));
          console.log("API response:", data);

          if (data.user) {
            setUser(data.user);
            localStorage.setItem("userId", userId);
          } else {
            localStorage.removeItem("userId");
          }
        } catch (error) {
          console.error("Error checking auth:", error);
          localStorage.removeItem("userId");
        }
      }

      setLoading(false);
    };

    checkAuth();
  }, [setUser, setLoading]);

  const handleLogin = () => {
    window.location.href = "/api/auth/spotify";
  };

  const handleLogout = () => {
    logout();
    localStorage.removeItem("userId");
  };

  const goToTracks = () => {
    window.location.href = `/tracks?userId=${user.spotifyId}`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Cargando...</p>
        </div>
      </div>
    );
  }

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

        {user ? (
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-4">
              {user.profileImageUrl && (
                <Image
                  src={user.profileImageUrl}
                  alt="Profile"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
              )}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  ¡Hola, {user.displayName}!
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Sesión activa
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <button
                onClick={goToTracks}
                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Ver mis tracks
              </button>
              <button
                onClick={handleLogout}
                className="w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        ) : (
          <div>
            <button
              onClick={handleLogin}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Conectar con Spotify
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
