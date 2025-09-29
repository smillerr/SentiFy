"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getMoodColor, getMoodEmoji, MOOD_CATEGORIES } from "../../lib/moodClassifier";

export default function Tracks() {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const [userId, setUserId] = useState(null);
  const [loadingProgress, setLoadingProgress] = useState({ current: 0, total: 0 });
  const [moodAnalysis, setMoodAnalysis] = useState(null);
  const [analyzingMood, setAnalyzingMood] = useState(false);
  const [showMoodAnalysis, setShowMoodAnalysis] = useState(false);
  const [selectedMoodFilter, setSelectedMoodFilter] = useState(null);
  const [processedTrackIds, setProcessedTrackIds] = useState(new Set());

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
        // Verificar que data.tracks existe y es un array
        if (!data.tracks || !Array.isArray(data.tracks)) {
          console.error('❌ Error: data.tracks no es válido en el primer lote:', data);
          return false;
        }
        
        setTracks(data.tracks);
        // Estimate total based on first batch
        if (data.hasMore) {
          setLoadingProgress({ current: data.tracks.length, total: 'Calculando...' });
        }
        // Analizar automáticamente el primer lote
        console.log('🎵 Primer lote cargado, iniciando análisis automático...');
        setTimeout(() => analyzeNewTracks(data.tracks), 1000);
      } else {
        setTracks((prev) => {
          // Verificar que data.tracks existe y es un array
          if (!data.tracks || !Array.isArray(data.tracks)) {
            console.warn('⚠️ data.tracks no es válido:', data.tracks);
            return prev;
          }
          
          const newTotal = prev.length + data.tracks.length;
          setLoadingProgress(prev => ({ 
            current: newTotal, 
            total: prev.total === 'Calculando...' ? 'Calculando...' : prev.total 
          }));
          
          // Analizar automáticamente las nuevas canciones
          setTimeout(() => {
            console.log('🔄 Lote adicional cargado, analizando:', data.tracks.length, 'canciones');
            analyzeNewTracks(data.tracks);
          }, 1000); // Delay para asegurar que el estado se actualice
          
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

  // Función para análisis automático de nuevas canciones
  const analyzeNewTracks = async (newTracks) => {
    if (!newTracks.length || !userId) {
      console.log('❌ No se puede analizar:', { newTracksLength: newTracks.length, userId });
      return;
    }
    
    console.log('🎭 Iniciando análisis de', newTracks.length, 'canciones nuevas');
    
    try {
      const trackIds = newTracks.map(track => track.id);
      console.log('📝 Track IDs a analizar:', trackIds);
      
      const response = await fetch('/api/mood-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          trackIds,
          tracks: newTracks // Enviar los objetos completos de track para mejor análisis
        })
      });

      if (!response.ok) {
        console.error('❌ Error en respuesta del servidor:', response.status, response.statusText);
        return;
      }

      const data = await response.json();
      console.log('📊 Respuesta del análisis:', data);
      
      if (data.success) {
        console.log('✅ Análisis exitoso, actualizando estado con:', data.statistics.totalClassified, 'canciones');
        
        // Actualizar análisis - combinar con existente o crear nuevo
        setMoodAnalysis(prev => {
          const combinedClassifications = {
            ...(prev?.moodClassifications || {}),
            ...data.moodClassifications
          };
          
          // Recalcular estadísticas desde cero
          const moodCounts = {};
          Object.values(MOOD_CATEGORIES).forEach(mood => {
            moodCounts[mood] = 0;
          });
          
          Object.values(combinedClassifications).forEach(mood => {
            if (moodCounts.hasOwnProperty(mood)) {
              moodCounts[mood]++;
            }
          });
          
          const totalClassified = Object.keys(combinedClassifications).length;
          const moodPercentages = {};
          Object.entries(moodCounts).forEach(([mood, count]) => {
            moodPercentages[mood] = totalClassified > 0 ? (count / totalClassified) * 100 : 0;
          });
          
          const newAnalysis = {
            moodClassifications: combinedClassifications,
            statistics: {
              moodCounts,
              moodPercentages,
              totalClassified,
              totalTracks: totalClassified
            }
          };
          
          console.log('🎭 Estado actualizado:', newAnalysis.statistics);
          return newAnalysis;
        });
        
        setShowMoodAnalysis(true);
        console.log('✅ Análisis completado y estado actualizado');
      } else {
        console.error('❌ El análisis falló:', data.error);
      }
    } catch (error) {
      console.error('❌ Error analyzing mood:', error);
    }
  };

  useEffect(() => {
    if (userId) {
      loadAllTracks();
    }
  }, [userId]); // eslint-disable-line react-hooks/exhaustive-deps

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Tus Canciones Guardadas
          </h1>
          <div className="flex items-center gap-4">
            {selectedMoodFilter && (
              <button
                onClick={() => setSelectedMoodFilter(null)}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center gap-2"
              >
                ❌ Mostrar Todas
              </button>
            )}
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    console.log('🧪 Prueba manual - analizando 1 canción');
                    const firstTrack = tracks.slice(0, 1);
                    analyzeNewTracks(firstTrack);
                  }}
                  disabled={tracks.length === 0}
                  className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-bold py-1 px-3 rounded text-sm"
                >
                  🧪 Probar (1)
                </button>
                <button
                  onClick={() => {
                    console.log('🧪 Prueba manual - analizando primeras 10 canciones');
                    const firstBatch = tracks.slice(0, 10);
                    analyzeNewTracks(firstBatch);
                  }}
                  disabled={tracks.length === 0}
                  className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-bold py-1 px-3 rounded text-sm"
                >
                  🧪 Probar (10)
                </button>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {selectedMoodFilter ? (
                  `Mostrando: ${getMoodEmoji(selectedMoodFilter)} ${selectedMoodFilter}`
                ) : (
                  `${tracks.length} canciones total`
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mostrar estadísticas de análisis de estado de ánimo */}
        {showMoodAnalysis && moodAnalysis && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              🎭 Análisis de Estado de Ánimo
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-4">
              {Object.entries(MOOD_CATEGORIES).map(([key, mood]) => {
                const count = moodAnalysis.statistics.moodCounts[mood] || 0;
                const percentage = moodAnalysis.statistics.moodPercentages[mood] || 0;
                const isSelected = selectedMoodFilter === mood;
                const isClickable = count > 0;
                
                return (
                  <div 
                    key={mood} 
                    onClick={() => isClickable && setSelectedMoodFilter(isSelected ? null : mood)}
                    className={`text-center p-3 rounded-lg transition-all duration-200 ${
                      isClickable 
                        ? 'cursor-pointer hover:scale-105 hover:shadow-md' 
                        : 'cursor-not-allowed opacity-50'
                    } ${
                      isSelected 
                        ? 'bg-blue-100 dark:bg-blue-900 ring-2 ring-blue-500' 
                        : 'bg-gray-50 dark:bg-gray-700'
                    }`}
                    style={{
                      borderLeft: isClickable ? `4px solid ${getMoodColor(mood)}` : 'none'
                    }}
                  >
                    <div className="text-2xl mb-1">{getMoodEmoji(mood)}</div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white capitalize">{mood}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">{count} canciones</div>
                    <div className="text-xs text-gray-500 dark:text-gray-500">{percentage.toFixed(1)}%</div>
                    {isClickable && (
                      <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                        Click para filtrar
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Analizadas {moodAnalysis.statistics.totalClassified} de {moodAnalysis.statistics.totalTracks} canciones
              <div className="text-xs text-green-600 dark:text-green-400 mt-1">
                🆓 Clasificación gratuita por base de datos de artistas
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {tracks?.filter(track => {
            if (!selectedMoodFilter) return true;
            const trackMood = moodAnalysis?.moodClassifications?.[track.id];
            return trackMood === selectedMoodFilter;
          }).map((track) => {
            const trackMood = moodAnalysis?.moodClassifications?.[track.id];
            return (
              <div
                key={track.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-3 hover:shadow-lg transition-shadow duration-200 relative"
                style={{
                  borderLeft: trackMood ? `4px solid ${getMoodColor(trackMood)}` : 'none'
                }}
              >
                {trackMood && (
                  <div 
                    className="absolute top-2 right-2 text-lg"
                    title={`Estado de ánimo: ${trackMood}`}
                  >
                    {getMoodEmoji(trackMood)}
                  </div>
                )}
                <Image
                  src={track.imageUrl || "/placeholder.png"}
                  alt={track.album}
                  width={160}
                  height={160}
                  className="w-full h-32 object-cover rounded-md mb-3"
                />
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate mb-1">
                  {track.name}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 truncate mb-1">{track.artist}</p>
                <p className="text-xs text-gray-500 dark:text-gray-500 truncate">
                  {track.album}
                </p>
                {trackMood && (
                  <p className="text-xs text-gray-500 dark:text-gray-500 capitalize mt-1">
                    {trackMood}
                  </p>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Progress indicator at the bottom */}
        <div className="text-center mt-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <div className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Total de canciones: {tracks.length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {loadingMore ? (
              <div className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                🎵 Cargando más canciones de Spotify...
              </div>
            ) : (
              "✅ Todas tus canciones han sido cargadas y sincronizadas"
            )}
          </div>
          {showMoodAnalysis && moodAnalysis && (
            <div className="text-xs text-green-600 dark:text-green-400 mt-2">
              🎭 Análisis en progreso - {moodAnalysis.statistics.totalClassified} de {tracks.length} canciones analizadas
              {moodAnalysis.statistics.totalClassified < tracks.length && (
                <div>
                  <div className="w-full bg-gray-200 rounded-full h-3 mt-1">
                    <div 
                      className="bg-green-600 h-3 rounded-full transition-all duration-300 flex items-center justify-center text-xs text-white font-bold" 
                      style={{ width: `${Math.max(15, (moodAnalysis.statistics.totalClassified / tracks.length) * 100)}%` }}
                    >
                      {((moodAnalysis.statistics.totalClassified / tracks.length) * 100).toFixed(0)}%
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    🆓 Clasificación instantánea y gratuita
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
