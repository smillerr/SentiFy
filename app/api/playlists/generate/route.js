import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getValidAccessToken } from "../../../../lib/spotifyAuth";
import { MOOD_CATEGORIES, getMoodEmoji } from "../../../../lib/moodClassifier";

export async function POST(request) {
  const body = await request.json();
  const { userId, moodClassifications } = body;

  if (!userId || !moodClassifications) {
    return NextResponse.json({ 
      error: "User ID and mood classifications are required" 
    }, { status: 400 });
  }

  try {
    console.log('🎭 [API] Generating mood playlists...');
    const { user } = await getValidAccessToken(userId);
    
    // Agrupar canciones por mood
    const tracksByMood = {};
    Object.values(MOOD_CATEGORIES).forEach(mood => {
      tracksByMood[mood] = [];
    });
    
    // Obtener tracks de la base de datos con sus mood classifications
    const userTracks = await prisma.track.findMany({
      where: { userId: user.id }
    });
    
    // Agrupar tracks por mood
    userTracks.forEach(track => {
      const mood = moodClassifications[track.spotifyTrackId];
      if (mood && tracksByMood[mood]) {
        tracksByMood[mood].push(track);
      }
    });
    
    // Crear/actualizar playlists en la base de datos
    const createdPlaylists = {};
    
    for (const [mood, tracks] of Object.entries(tracksByMood)) {
      if (tracks.length > 0) {
        console.log(`🎵 Creating playlist for ${mood}: ${tracks.length} tracks`);
        
        // Buscar playlist existente o crear nueva
        let playlist = await prisma.playlist.findFirst({
          where: {
            userId: user.id,
            moodCategory: mood
          }
        });
        
        if (!playlist) {
          // Crear nueva playlist
          playlist = await prisma.playlist.create({
            data: {
              userId: user.id,
              name: `${getMoodEmoji(mood)} ${mood.charAt(0).toUpperCase() + mood.slice(1)}`,
              description: `Playlist automática de canciones con estado de ánimo: ${mood}`,
              moodCategory: mood,
              isSynced: false
            }
          });
        }
        
        // Limpiar tracks existentes de la playlist
        await prisma.playlistTrack.deleteMany({
          where: { playlistId: playlist.id }
        });
        
        // Agregar tracks actuales
        if (tracks.length > 0) {
          await prisma.playlistTrack.createMany({
            data: tracks.map(track => ({
              playlistId: playlist.id,
              trackId: track.id
            })),
            skipDuplicates: true
          });
        }
        
        // Actualizar información de la playlist
        playlist = await prisma.playlist.update({
          where: { id: playlist.id },
          data: {
            updatedAt: new Date()
          },
          include: {
            playlistTracks: {
              include: {
                track: true
              }
            }
          }
        });
        
        createdPlaylists[mood] = {
          id: playlist.id,
          name: playlist.name,
          description: playlist.description,
          trackCount: tracks.length,
          tracks: playlist.playlistTracks.map(pt => pt.track)
        };
      }
    }
    
    console.log('✅ [API] Mood playlists generated:', Object.keys(createdPlaylists));
    
    return NextResponse.json({
      success: true,
      playlists: createdPlaylists,
      totalPlaylists: Object.keys(createdPlaylists).length,
      message: "Mood playlists generated and saved successfully"
    });

  } catch (error) {
    console.error("❌ [API] Error generating playlists:", error);
    return NextResponse.json(
      { error: "Failed to generate playlists" },
      { status: 500 }
    );
  }
}
