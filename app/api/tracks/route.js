import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getValidAccessToken } from "../../../lib/spotifyAuth";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const offset = parseInt(searchParams.get("offset") || "0");
  const limit = 50; // Spotify default

  if (!userId) {
    return NextResponse.json({ error: "User ID required" }, { status: 400 });
  }

  try {
    const { token: accessToken, user } = await getValidAccessToken(userId);

    const response = await fetch(
      `https://api.spotify.com/v1/me/tracks?limit=${limit}&offset=${offset}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch tracks from Spotify");
    }

    const data = await response.json();
    const tracks = data.items;

    // Optimized bulk insert using createMany
    // 1. Get existing track IDs for this user
    const existingTrackIds = await prisma.track.findMany({
      where: { userId: user.id },
      select: { spotifyTrackId: true }
    });
    const existingSet = new Set(existingTrackIds.map(t => t.spotifyTrackId));

    // 2. Filter only new tracks (not already in DB)
    const newTracks = tracks
      .filter(item => !existingSet.has(item.track.id))
      .map(item => ({
        spotifyTrackId: item.track.id,
        userId: user.id,
        name: item.track.name,
        artist: item.track.artists[0].name,
        album: item.track.album.name,
        imageUrl: item.track.album.images[0]?.url,
      }));

    // 3. Bulk insert only new tracks
    if (newTracks.length > 0) {
      try {
        await prisma.track.createMany({ 
          data: newTracks,
          skipDuplicates: true // Extra safety in case of race conditions
        });
        console.log(`Inserted ${newTracks.length} new tracks for user ${user.id}`);
      } catch (error) {
        console.error('Error bulk inserting tracks:', error);
        // Don't throw - we can still return the tracks from Spotify
      }
    } else {
      console.log(`No new tracks to insert for user ${user.id}`);
    }

    const hasMore = data.next !== null;

    return NextResponse.json({
      tracks: tracks.map((item) => ({
        id: item.track.id,
        name: item.track.name,
        artist: item.track.artists[0].name,
        album: item.track.album.name,
        imageUrl: item.track.album.images[0]?.url,
      })),
      hasMore,
      offset: offset + tracks.length,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch tracks" },
      { status: 500 }
    );
  }
}
