/**
 * ReccoBeats Audio Features integration
 * Endpoint: GET /v1/track/:id/audio-features
 * Documentación: https://reccobeats.com/docs/apis/get-track-audio-features
 */

import { classifyMood } from './moodClassifier.js';

const RECCOBEATS_BASE_URL = 'https://api.reccobeats.com';

/**
 * Obtiene audio features de múltiples canciones usando ReccoBeats (endpoint correcto)
 */
export async function getBatchAudioFeaturesReccoBeats(trackIds) {
  try {
    console.log(`🎵 Getting audio features from ReccoBeats for ${trackIds.length} tracks`);
    
    // El endpoint correcto usa múltiples IDs separados por coma
    const idsParam = trackIds.join(',');
    const url = `${RECCOBEATS_BASE_URL}/v1/audio-features?ids=${encodeURIComponent(idsParam)}`;
    
    console.log(`🔗 ReccoBeats URL: ${url}`);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    console.log(`📊 ReccoBeats Response: ${response.status} ${response.statusText}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ ReccoBeats failed: ${response.status} - ${errorText}`);
      return null;
    }

    const data = await response.json();
    console.log(`✅ ReccoBeats success! Data structure:`, Object.keys(data));
    console.log(`🎯 Sample data:`, data);
    
    return data;
    
  } catch (error) {
    console.error(`❌ Error calling ReccoBeats:`, error.message);
    return null;
  }
}

/**
 * Normaliza las audio features de ReccoBeats al formato estándar
 */
export function normalizeReccoBeatsFeatures(reccoBeatsData) {
  if (!reccoBeatsData) return null;
  
  // Mapear la respuesta de ReccoBeats a nuestro formato esperado
  return {
    id: reccoBeatsData.id || reccoBeatsData.track_id,
    valence: reccoBeatsData.valence || 0.5,
    energy: reccoBeatsData.energy || 0.5,
    danceability: reccoBeatsData.danceability || 0.5,
    acousticness: reccoBeatsData.acousticness || 0.5,
    tempo: reccoBeatsData.tempo || 120,
    loudness: reccoBeatsData.loudness || -10,
    speechiness: reccoBeatsData.speechiness || 0.1,
    instrumentalness: reccoBeatsData.instrumentalness || 0.1,
    liveness: reccoBeatsData.liveness || 0.1,
    mode: reccoBeatsData.mode !== undefined ? reccoBeatsData.mode : (Math.random() > 0.5 ? 1 : 0),
    key: reccoBeatsData.key !== undefined ? reccoBeatsData.key : Math.floor(Math.random() * 12),
    time_signature: reccoBeatsData.time_signature || 4
  };
}

/**
 * Procesa canciones sin clasificar usando ReccoBeats audio features
 */
export async function classifyUnclassifiedTracksWithReccoBeats(unclassifiedTracks) {
  console.log(`🔄 Processing ${unclassifiedTracks.length} unclassified tracks with ReccoBeats...`);
  
  const newClassifications = {};
  const processedFeatures = {};
  let successCount = 0;
  let failCount = 0;
  
  // Procesar en lotes pequeños para evitar rate limiting
  const batchSize = 5;
  
  for (let i = 0; i < unclassifiedTracks.length; i += batchSize) {
    const batch = unclassifiedTracks.slice(i, i + batchSize);
    console.log(`🎵 Processing ReccoBeats batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(unclassifiedTracks.length/batchSize)}: ${batch.length} tracks`);
    
    // Procesar el lote completo con ReccoBeats
    try {
      const batchResult = await getBatchAudioFeaturesReccoBeats(batch.map(track => track.id));
      
      if (batchResult && batchResult.content && Array.isArray(batchResult.content)) {
        // Mapear resultados a cada track
        batch.forEach((track, index) => {
          const audioFeatures = batchResult.content[index];
          
          if (audioFeatures && Object.keys(audioFeatures).length > 1) {
            const normalizedFeatures = normalizeReccoBeatsFeatures(audioFeatures);
            
            if (normalizedFeatures) {
              // Clasificar usando nuestro algoritmo de mood
              const mood = classifyMood(normalizedFeatures);
              
              if (mood) {
                newClassifications[track.id] = mood;
                processedFeatures[track.id] = normalizedFeatures;
                successCount++;
                
                console.log(`✅ ${track.artist} - ${track.name} -> ${mood} (ReccoBeats)`);
              }
            }
          } else {
            failCount++;
          }
        });
      }
    } catch (error) {
      console.error(`❌ Error processing batch:`, error);
      failCount += batch.length;
    }
    
    // Delay entre lotes para ser respetuosos con la API
    if (i + batchSize < unclassifiedTracks.length) {
      console.log('⏳ Waiting before next ReccoBeats batch...');
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  console.log(`🎯 ReccoBeats processing completed: ${successCount} success, ${failCount} failed`);
  
  return {
    classifications: newClassifications,
    audioFeatures: processedFeatures,
    successCount,
    failCount,
    totalProcessed: unclassifiedTracks.length
  };
}
