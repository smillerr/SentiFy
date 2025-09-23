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

    // Store tracks in DB if not exists
    for (const item of tracks) {
      const track = item.track;
      await prisma.track.upsert({
        where: {
          userId_spotifyTrackId: {
            userId: user.id,
            spotifyTrackId: track.id,
          },
        },
        update: {},
        create: {
          spotifyTrackId: track.id,
          userId: user.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          imageUrl: track.album.images[0]?.url,
        },
      });
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
