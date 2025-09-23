"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Tracks() {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const id = new URLSearchParams(window.location.search).get("userId");
      setUserId(id);
    }
  }, []);

  const fetchTracks = async (currentOffset = 0) => {
    try {
      const response = await fetch(
        `/api/tracks?userId=${userId}&offset=${currentOffset}`
      );
      const data = await response.json();
      if (currentOffset === 0) {
        setTracks(data.tracks);
      } else {
        setTracks((prev) => [...prev, ...data.tracks]);
      }
      setHasMore(data.hasMore);
      setOffset(data.offset);
    } catch (error) {
      console.error("Error fetching tracks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchTracks();
    }
  }, [userId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Cargando...
      </div>
    );
  }

  if (tracks?.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            No tienes canciones guardadas
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Agrega algunas en Spotify para continuar.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Tus Canciones Guardadas
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tracks?.map((track) => (
            <div
              key={track.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4"
            >
              <Image
                src={track.imageUrl || "/placeholder.png"}
                alt={track.album}
                width={200}
                height={200}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {track.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">{track.artist}</p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                {track.album}
              </p>
            </div>
          ))}
        </div>
        {hasMore && (
          <div className="text-center mt-8">
            <button
              onClick={() => fetchTracks(offset)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
            >
              Cargar más
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
