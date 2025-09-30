import { NextResponse } from "next/server";
import { getValidAccessToken } from "../../../lib/spotifyAuth";
import { classifyTracksByArtistFree } from "../../../lib/freeArtistClassifier";
import { getBatchAudioFeaturesReccoBeats, normalizeReccoBeatsFeatures } from "../../../lib/reccoBeatsAudioFeatures";
import { classifyMood } from "../../../lib/moodClassifier";
import { MOOD_CATEGORIES } from "../../../lib/moodClassifier";

export async function POST(request) {
  const body = await request.json();
  const { userId, trackIds, tracks } = body;

  console.log('🎭 [API] Mood analysis request:', { userId, trackIdsCount: trackIds?.length });

  if (!userId || !trackIds || !Array.isArray(trackIds)) {
    console.error('❌ [API] Missing required parameters');
    return NextResponse.json({ 
      error: "User ID and track IDs array are required" 
    }, { status: 400 });
  }

  try {
    console.log('🔑 [API] Verifying user access...');
    const { user } = await getValidAccessToken(userId);
    console.log('✅ [API] User verified:', user.displayName);
    
    // Verificar que tenemos los tracks completos
    if (!tracks || !Array.isArray(tracks)) {
      return NextResponse.json({ 
        error: "Se requieren los objetos completos de tracks para clasificación por artista" 
      }, { status: 400 });
    }
    
    console.log('🎤 [API] Step 1: Artist-based classification...');
    
    // Paso 1: Clasificar usando base de datos de artistas
    const artistResult = classifyTracksByArtistFree(tracks);
    
    console.log(`📊 Artist classification: ${artistResult.statistics.totalClassified}/${tracks.length} tracks classified`);
    
    // Paso 2: Para canciones SIN CLASIFICAR, usar ReccoBeats audio features
    const unclassifiedTracks = tracks.filter(track => 
      !artistResult.classifications[track.id] || 
      artistResult.classifications[track.id] === MOOD_CATEGORIES.SIN_CLASIFICAR
    );
    
    console.log(`🎵 Step 2: ReccoBeats for ${unclassifiedTracks.length} unclassified tracks...`);
    
    let reccoBeatsResult = { 
      classifications: {}, 
      successCount: 0, 
      failCount: 0,
      audioFeatures: {}
    };
    
    if (unclassifiedTracks.length > 0) {
      try {
        // Procesar en lotes de 40 (límite de ReccoBeats)
        const batchSize = 40;
        
        for (let i = 0; i < unclassifiedTracks.length; i += batchSize) {
          const batch = unclassifiedTracks.slice(i, i + batchSize);
          const batchIds = batch.map(track => track.id);
          
          console.log(`🔄 ReccoBeats batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(unclassifiedTracks.length/batchSize)}: ${batch.length} tracks`);
          
          const batchData = await getBatchAudioFeaturesReccoBeats(batchIds);
          
          if (batchData && batchData.content && Array.isArray(batchData.content)) {
            // Procesar cada resultado
            batch.forEach((track, index) => {
              const audioFeatures = batchData.content[index];
              
              if (audioFeatures && Object.keys(audioFeatures).length > 1) {
                // Normalizar las features
                const normalizedFeatures = normalizeReccoBeatsFeatures(audioFeatures);
                
                if (normalizedFeatures) {
                  // Clasificar usando nuestro algoritmo
                  const mood = classifyMood(normalizedFeatures);
                  
                  if (mood && mood !== MOOD_CATEGORIES.SIN_CLASIFICAR) {
                    reccoBeatsResult.classifications[track.id] = mood;
                    reccoBeatsResult.audioFeatures[track.id] = normalizedFeatures;
                    reccoBeatsResult.successCount++;
                    
                    console.log(`✅ ${track.artist} - ${track.name} -> ${mood} (ReccoBeats)`);
                  } else {
                    reccoBeatsResult.failCount++;
                  }
                } else {
                  reccoBeatsResult.failCount++;
                }
              } else {
                reccoBeatsResult.failCount++;
              }
            });
          } else {
            console.warn(`⚠️ No valid data from ReccoBeats for batch ${Math.floor(i/batchSize) + 1}`);
            reccoBeatsResult.failCount += batch.length;
          }
          
          // Delay entre lotes
          if (i + batchSize < unclassifiedTracks.length) {
            console.log('⏳ Waiting before next ReccoBeats batch...');
            await new Promise(resolve => setTimeout(resolve, 1000));
          }
        }
        
        console.log(`🎯 ReccoBeats final results: ${reccoBeatsResult.successCount} success, ${reccoBeatsResult.failCount} failed`);
        
      } catch (error) {
        console.error('❌ ReccoBeats processing failed:', error);
      }
    }
    
    // Paso 3: Combinar resultados (artistas + ReccoBeats)
    const combinedClassifications = {
      ...artistResult.classifications,
      ...reccoBeatsResult.classifications
    };
    
    // Filtrar "sin clasificar" del resultado final si tenemos clasificación de ReccoBeats
    const finalClassifications = {};
    Object.entries(combinedClassifications).forEach(([trackId, mood]) => {
      if (mood !== MOOD_CATEGORIES.SIN_CLASIFICAR) {
        finalClassifications[trackId] = mood;
      } else if (!reccoBeatsResult.classifications[trackId]) {
        // Solo mantener "sin clasificar" si ReccoBeats tampoco pudo clasificar
        finalClassifications[trackId] = mood;
      }
    });
    
    // Recalcular estadísticas finales
    const moodCounts = {};
    Object.values(MOOD_CATEGORIES).forEach(mood => {
      moodCounts[mood] = 0;
    });
    
    Object.values(finalClassifications).forEach(mood => {
      if (moodCounts.hasOwnProperty(mood)) {
        moodCounts[mood]++;
      }
    });
    
    const totalClassified = Object.keys(finalClassifications).length;
    const moodPercentages = {};
    Object.entries(moodCounts).forEach(([mood, count]) => {
      moodPercentages[mood] = totalClassified > 0 ? (count / totalClassified) * 100 : 0;
    });
    
    const finalStatistics = {
      moodCounts,
      moodPercentages,
      totalClassified,
      totalTracks: trackIds.length
    };
    
    const response = {
      success: true,
      moodClassifications: finalClassifications,
      statistics: finalStatistics,
      artistMoods: artistResult.artistMoods,
      classificationDetails: artistResult.classificationDetails,
      reccoBeatsResults: {
        processedTracks: reccoBeatsResult.successCount,
        failedTracks: reccoBeatsResult.failCount,
        audioFeatures: reccoBeatsResult.audioFeatures
      },
      processedTracks: totalClassified,
      totalRequestedTracks: trackIds.length,
      note: `Hybrid: ${artistResult.statistics.totalClassified} by artist database + ${reccoBeatsResult.successCount} by ReccoBeats audio features`
    };

    console.log('✅ [API] Hybrid classification completed:', {
      artistBased: artistResult.statistics.totalClassified,
      reccoBeats: reccoBeatsResult.successCount,
      totalClassified: finalStatistics.totalClassified,
      improvement: `${((reccoBeatsResult.successCount / tracks.length) * 100).toFixed(1)}% additional coverage`,
      moodCounts: finalStatistics.moodCounts
    });

    return NextResponse.json(response);

  } catch (error) {
    console.error("❌ [API] Error in mood analysis:", error);
    return NextResponse.json(
      { error: "Failed to analyze mood" },
      { status: 500 }
    );
  }
}
