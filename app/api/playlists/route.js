import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getValidAccessToken } from "../../../lib/spotifyAuth";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "User ID required" }, { status: 400 });
  }

  try {
    const { user } = await getValidAccessToken(userId);
    
    // Obtener todas las playlists del usuario con sus tracks
    const playlists = await prisma.playlist.findMany({
      where: { userId: user.id },
      include: {
        playlistTracks: {
          include: {
            track: true
          },
          orderBy: {
            addedAt: 'desc'
          }
        }
      },
      orderBy: {
        updatedAt: 'desc'
      }
    });
    
    // Formatear respuesta
    const formattedPlaylists = playlists.map(playlist => ({
      id: playlist.id,
      name: playlist.name,
      description: playlist.description,
      moodCategory: playlist.moodCategory,
      trackCount: playlist.playlistTracks.length,
      coverImageUrl: playlist.coverImageUrl,
      isSynced: playlist.isSynced,
      spotifyPlaylistId: playlist.spotifyPlaylistId,
      createdAt: playlist.createdAt,
      updatedAt: playlist.updatedAt,
      tracks: playlist.playlistTracks.map(pt => ({
        id: pt.track.id,
        spotifyTrackId: pt.track.spotifyTrackId,
        name: pt.track.name,
        artist: pt.track.artist,
        album: pt.track.album,
        imageUrl: pt.track.imageUrl,
        addedAt: pt.addedAt
      }))
    }));
    
    console.log(`📊 Retrieved ${formattedPlaylists.length} playlists for user ${user.displayName}`);
    
    return NextResponse.json({
      success: true,
      playlists: formattedPlaylists,
      totalPlaylists: formattedPlaylists.length
    });

  } catch (error) {
    console.error("Error fetching playlists:", error);
    return NextResponse.json(
      { error: "Failed to fetch playlists" },
      { status: 500 }
    );
  }
}
