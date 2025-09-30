"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getMoodColor, getMoodEmoji } from "../../lib/moodClassifier";

export default function PlaylistManager() {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [selectedPlaylists, setSelectedPlaylists] = useState([null, null]); // [left, right]
  const [draggedTrack, setDraggedTrack] = useState(null);
  const [movingTrack, setMovingTrack] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const id = new URLSearchParams(window.location.search).get("userId");
      setUserId(id);
    }
  }, []);

  const fetchPlaylists = async () => {
    if (!userId) return;
    
    try {
      const response = await fetch(`/api/playlists?userId=${userId}`);
      const data = await response.json();
      
      if (data.success) {
        setPlaylists(data.playlists);
        console.log('📊 Playlists loaded:', data.playlists.length);
      }
    } catch (error) {
      console.error("Error fetching playlists:", error);
    } finally {
      setLoading(false);
    }
  };

  const generateMoodPlaylists = async () => {
    if (!userId) return;
    
    setLoading(true);
    try {
      // Primero obtener las clasificaciones de mood actuales
      const tracksResponse = await fetch(`/api/tracks?userId=${userId}&offset=0`);
      const tracksData = await tracksResponse.json();
      
      if (tracksData.tracks) {
        // Analizar para obtener clasificaciones
        const analysisResponse = await fetch('/api/mood-analysis', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId,
            trackIds: tracksData.tracks.map(t => t.id),
            tracks: tracksData.tracks
          })
        });
        
        const analysisData = await analysisResponse.json();
        
        if (analysisData.success) {
          // Generar playlists
          const playlistResponse = await fetch('/api/playlists/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              userId,
              moodClassifications: analysisData.moodClassifications
            })
          });
          
          const playlistData = await playlistResponse.json();
          
          if (playlistData.success) {
            console.log('✅ Mood playlists generated!');
            fetchPlaylists(); // Recargar playlists
          }
        }
      }
    } catch (error) {
      console.error("Error generating playlists:", error);
    } finally {
      setLoading(false);
    }
  };

  const moveTrack = async (trackId, fromPlaylistId, toPlaylistId) => {
    if (!trackId || !toPlaylistId || movingTrack) return;
    
    setMovingTrack(true);
    try {
      const response = await fetch('/api/playlists/move-track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          trackId,
          fromPlaylistId,
          toPlaylistId
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        console.log('✅ Track moved successfully');
        fetchPlaylists(); // Recargar playlists
      } else {
        console.error('❌ Failed to move track:', data.error);
      }
    } catch (error) {
      console.error("Error moving track:", error);
    } finally {
      setMovingTrack(false);
    }
  };

  const handleDragStart = (e, track, playlistId) => {
    setDraggedTrack({ track, fromPlaylistId: playlistId });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, toPlaylistId) => {
    e.preventDefault();
    
    if (draggedTrack && toPlaylistId && draggedTrack.fromPlaylistId !== toPlaylistId) {
      moveTrack(draggedTrack.track.id, draggedTrack.fromPlaylistId, toPlaylistId);
    }
    
    setDraggedTrack(null);
  };

  useEffect(() => {
    if (userId) {
      fetchPlaylists();
    }
  }, [userId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center p-8">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Cargando playlists...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Gestión de Playlists por Estado de Ánimo
          </h1>
          <button
            onClick={generateMoodPlaylists}
            disabled={loading}
            className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            🎭 Generar Playlists por Mood
          </button>
        </div>

        {playlists.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              No tienes playlists por mood
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Genera playlists automáticas basadas en el estado de ánimo de tus canciones
            </p>
            <button
              onClick={generateMoodPlaylists}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg"
            >
              🎵 Crear Playlists por Mood
            </button>
          </div>
        ) : (
          <>
            {/* Selector de playlists para comparar */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Selecciona 2 playlists para gestionar:
              </h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Playlist Izquierda:
                  </label>
                  <select
                    value={selectedPlaylists[0] || ''}
                    onChange={(e) => setSelectedPlaylists([e.target.value || null, selectedPlaylists[1]])}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="">Seleccionar playlist...</option>
                    {playlists.map(playlist => (
                      <option key={playlist.id} value={playlist.id}>
                        {playlist.name} ({playlist.trackCount} canciones)
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Playlist Derecha:
                  </label>
                  <select
                    value={selectedPlaylists[1] || ''}
                    onChange={(e) => setSelectedPlaylists([selectedPlaylists[0], e.target.value || null])}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="">Seleccionar playlist...</option>
                    {playlists.map(playlist => (
                      <option key={playlist.id} value={playlist.id}>
                        {playlist.name} ({playlist.trackCount} canciones)
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Vista de drag and drop */}
            {selectedPlaylists[0] && selectedPlaylists[1] && (
              <div className="grid grid-cols-2 gap-6">
                {selectedPlaylists.map((playlistId, index) => {
                  const playlist = playlists.find(p => p.id === playlistId);
                  if (!playlist) return null;
                  
                  return (
                    <div
                      key={playlist.id}
                      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, playlist.id)}
                      style={{
                        borderLeft: `6px solid ${getMoodColor(playlist.moodCategory)}`
                      }}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-2xl">{getMoodEmoji(playlist.moodCategory)}</span>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                            {playlist.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {playlist.trackCount} canciones
                          </p>
                        </div>
                      </div>
                      
                      <div className="space-y-2 max-h-96 overflow-y-auto">
                        {playlist.tracks.map(track => (
                          <div
                            key={track.id}
                            draggable
                            onDragStart={(e) => handleDragStart(e, track, playlist.id)}
                            className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-move hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                          >
                            <Image
                              src={track.imageUrl || "/placeholder.png"}
                              alt={track.album}
                              width={40}
                              height={40}
                              className="w-10 h-10 object-cover rounded"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                {track.name}
                              </p>
                              <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                                {track.artist}
                              </p>
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-500">
                              🎵
                            </div>
                          </div>
                        ))}
                        
                        {playlist.tracks.length === 0 && (
                          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                            <p>No hay canciones en esta playlist</p>
                            <p className="text-xs mt-1">Arrastra canciones aquí</p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Lista de todas las playlists */}
            {(!selectedPlaylists[0] || !selectedPlaylists[1]) && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Todas las Playlists por Mood:
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {playlists.map(playlist => (
                    <div
                      key={playlist.id}
                      className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                      style={{
                        borderLeft: `4px solid ${getMoodColor(playlist.moodCategory)}`
                      }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xl">{getMoodEmoji(playlist.moodCategory)}</span>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {playlist.name}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {playlist.trackCount} canciones
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        {playlist.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {movingTrack && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-900 dark:text-white">Moviendo canción...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
