import { NextResponse } from "next/server";
import { getValidAccessToken } from "../../../lib/spotifyAuth";
import { classifyTracksByArtistFree } from "../../../lib/freeArtistClassifier";

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
    
    console.log('🆓 [API] Using free artist-based mood classification...');
    
    // Usar el sistema gratuito de clasificación por artista
    const result = classifyTracksByArtistFree(tracks);
    
    const response = {
      success: true,
      moodClassifications: result.classifications,
      statistics: result.statistics,
      artistMoods: result.artistMoods,
      classificationDetails: result.classificationDetails,
      processedTracks: result.statistics.totalClassified,
      totalRequestedTracks: trackIds.length,
      note: "Using free artist database for mood classification"
    };

    console.log('✅ [API] AI classification completed:', {
      totalClassified: result.statistics.totalClassified,
      uniqueArtists: Object.keys(result.artistMoods).length,
      moodCounts: result.statistics.moodCounts
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
