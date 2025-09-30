import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getValidAccessToken } from "../../../../lib/spotifyAuth";

export async function POST(request) {
  const body = await request.json();
  const { userId, trackId, fromPlaylistId, toPlaylistId } = body;

  if (!userId || !trackId || !toPlaylistId) {
    return NextResponse.json({ 
      error: "User ID, track ID, and target playlist ID are required" 
    }, { status: 400 });
  }

  try {
    console.log(`🔄 Moving track ${trackId} from ${fromPlaylistId || 'none'} to ${toPlaylistId}`);
    const { user } = await getValidAccessToken(userId);
    
    // Verificar que la playlist de destino pertenece al usuario
    const targetPlaylist = await prisma.playlist.findFirst({
      where: {
        id: toPlaylistId,
        userId: user.id
      }
    });
    
    if (!targetPlaylist) {
      return NextResponse.json({ 
        error: "Target playlist not found or doesn't belong to user" 
      }, { status: 404 });
    }
    
    // Verificar que el track pertenece al usuario
    const track = await prisma.track.findFirst({
      where: {
        id: trackId,
        userId: user.id
      }
    });
    
    if (!track) {
      return NextResponse.json({ 
        error: "Track not found or doesn't belong to user" 
      }, { status: 404 });
    }
    
    // Si hay playlist de origen, remover el track de ahí
    if (fromPlaylistId) {
      await prisma.playlistTrack.deleteMany({
        where: {
          playlistId: fromPlaylistId,
          trackId: trackId
        }
      });
      console.log(`➖ Removed track from playlist ${fromPlaylistId}`);
    }
    
    // Verificar si el track ya está en la playlist de destino
    const existingEntry = await prisma.playlistTrack.findFirst({
      where: {
        playlistId: toPlaylistId,
        trackId: trackId
      }
    });
    
    if (!existingEntry) {
      // Agregar track a la playlist de destino
      await prisma.playlistTrack.create({
        data: {
          playlistId: toPlaylistId,
          trackId: trackId
        }
      });
      console.log(`➕ Added track to playlist ${toPlaylistId}`);
    } else {
      console.log(`ℹ️ Track already exists in target playlist`);
    }
    
    // Actualizar timestamp de la playlist
    await prisma.playlist.update({
      where: { id: toPlaylistId },
      data: { updatedAt: new Date() }
    });
    
    return NextResponse.json({
      success: true,
      message: "Track moved successfully",
      trackId,
      fromPlaylistId,
      toPlaylistId
    });

  } catch (error) {
    console.error("❌ Error moving track:", error);
    return NextResponse.json(
      { error: "Failed to move track" },
      { status: 500 }
    );
  }
}
