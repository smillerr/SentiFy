"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Tracks() {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const [userId, setUserId] = useState(null);
  const [loadingProgress, setLoadingProgress] = useState({ current: 0, total: 0 });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const id = new URLSearchParams(window.location.search).get("userId");
      setUserId(id);
    }
  }, []);

  const fetchTracks = async (currentOffset = 0, isAutoLoading = false) => {
    if (isAutoLoading) {
      setLoadingMore(true);
    }
    
    try {
      const response = await fetch(
        `/api/tracks?userId=${userId}&offset=${currentOffset}`
      );
      const data = await response.json();
      
      if (currentOffset === 0) {
        setTracks(data.tracks);
        // Estimate total based on first batch
        if (data.hasMore) {
          setLoadingProgress({ current: data.tracks.length, total: 'Calculando...' });
        }
      } else {
        setTracks((prev) => {
          const newTotal = prev.length + data.tracks.length;
          setLoadingProgress(prev => ({ 
            current: newTotal, 
            total: prev.total === 'Calculando...' ? 'Calculando...' : prev.total 
          }));
          return [...prev, ...data.tracks];
        });
      }
      
      setHasMore(data.hasMore);
      setOffset(data.offset);
      
      return data.hasMore;
    } catch (error) {
      console.error("Error fetching tracks:", error);
      return false;
    } finally {
      if (!isAutoLoading) {
        setLoading(false);
      }
      setLoadingMore(false);
    }
  };

  // Auto-load all tracks function
  const loadAllTracks = async () => {
    if (!userId) return;
    
    setLoading(true);
    setLoadingProgress({ current: 0, total: 'Calculando...' });
    
    let currentOffset = 0;
    let hasMoreTracks = true;
    let allTracks = [];
    
    // First batch to get started
    const firstBatch = await fetchTracks(0);
    if (!firstBatch) return;
    
    currentOffset = 50;
    hasMoreTracks = hasMore;
    
    // Continue loading all batches automatically
    while (hasMoreTracks) {
      await new Promise(resolve => setTimeout(resolve, 500)); // Small delay to avoid rate limiting
      hasMoreTracks = await fetchTracks(currentOffset, true);
      currentOffset += 50;
    }
    
    setLoading(false);
    setLoadingProgress(prev => ({ ...prev, total: prev.current }));
  };

  useEffect(() => {
    if (userId) {
      loadAllTracks();
    }
  }, [userId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center p-8">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Cargando canciones...
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {loadingProgress.current > 0 
              ? `${loadingProgress.current} canciones cargadas${loadingProgress.total !== 'Calculando...' ? ` de ${loadingProgress.total}` : ''}`
              : 'Iniciando carga...'
            }
          </p>
          {loadingMore && (
            <div className="text-sm text-blue-600 dark:text-blue-400">
              Cargando más canciones de Spotify...
            </div>
          )}
        </div>
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
        
        {/* Progress indicator at the bottom */}
        <div className="text-center mt-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <div className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Total de canciones: {tracks.length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            ✅ Todas tus canciones han sido cargadas y sincronizadas
          </div>
        </div>
      </div>
    </div>
  );
}
