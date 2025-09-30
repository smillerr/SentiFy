import { NextResponse } from "next/server";
import { getValidAccessToken } from "../../../lib/spotifyAuth";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const trackIds = searchParams.get("trackIds"); // Comma-separated track IDs

  if (!userId || !trackIds) {
    return NextResponse.json({ 
      error: "User ID and track IDs are required" 
    }, { status: 400 });
  }

  try {
    const { token: accessToken } = await getValidAccessToken(userId);
    
    // Split track IDs and process in batches of 100 (Spotify limit)
    const trackIdArray = trackIds.split(',');
    const batchSize = 100;
    const audioFeaturesMap = new Map();

    for (let i = 0; i < trackIdArray.length; i += batchSize) {
      const batch = trackIdArray.slice(i, i + batchSize);
      const batchIds = batch.join(',');
      
      const response = await fetch(
        `https://api.spotify.com/v1/audio-features?ids=${batchIds}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        console.error(`Failed to fetch audio features for batch ${i/batchSize + 1}`);
        continue;
      }

      const data = await response.json();
      
      // Map audio features by track ID
      data.audio_features.forEach((features, index) => {
        if (features) { // Some tracks might not have audio features
          audioFeaturesMap.set(batch[index], {
            id: features.id,
            valence: features.valence, // Musical positiveness (0.0 to 1.0)
            energy: features.energy, // Intensity and power (0.0 to 1.0)
            danceability: features.danceability, // How suitable for dancing (0.0 to 1.0)
            acousticness: features.acousticness, // Acoustic confidence (0.0 to 1.0)
            tempo: features.tempo, // BPM
            loudness: features.loudness, // Overall loudness in dB
            speechiness: features.speechiness, // Presence of spoken words (0.0 to 1.0)
            instrumentalness: features.instrumentalness, // Predicts whether track has no vocals (0.0 to 1.0)
            liveness: features.liveness, // Detects presence of audience (0.0 to 1.0)
            mode: features.mode, // Major (1) or minor (0)
            key: features.key, // Pitch class (0-11)
            time_signature: features.time_signature
          });
        }
      });

      // Small delay to avoid rate limiting
      if (i + batchSize < trackIdArray.length) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }

    // Convert map to object
    const audioFeatures = Object.fromEntries(audioFeaturesMap);

    return NextResponse.json({
      audioFeatures,
      totalTracks: trackIdArray.length,
      processedTracks: audioFeaturesMap.size
    });

  } catch (error) {
    console.error("Error fetching audio features:", error);
    return NextResponse.json(
      { error: "Failed to fetch audio features" },
      { status: 500 }
    );
  }
}
