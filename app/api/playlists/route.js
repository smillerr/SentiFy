import { NextResponse } from "next/server";
import { getValidAccessToken } from "../../../lib/spotifyAuth";

//Handles the POST request to create a playlist from userId, name, description, and trackIds.
export async function POST(request) {
  try {
    const { userId, name, description, trackIds } = await request.json();

    if (!userId || !name || !trackIds || !Array.isArray(trackIds)) {
      return NextResponse.json(
        { error: "userId, name, description, and trackIds array required" },
        { status: 400 }
      );
    }

    const { token: accessToken, user } = await getValidAccessToken(userId);

    // Get Spotify user ID
    const profileResponse = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!profileResponse.ok) {
      throw new Error("Failed to get user profile");
    }

    const profile = await profileResponse.json();
    const spotifyUserId = profile.id;

    // Create playlist
    const createPlaylistResponse = await fetch(
      `https://api.spotify.com/v1/users/${spotifyUserId}/playlists`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          public: false,
        }),
      }
    );

    if (!createPlaylistResponse.ok) {
      const error = await createPlaylistResponse.json();
      throw new Error(`Failed to create playlist: ${error.error.message}`);
    }

    const playlist = await createPlaylistResponse.json();
    const playlistId = playlist.id;

    // Add tracks to playlist
    const uris = trackIds.map((id) => `spotify:track:${id}`);

    const addTracksResponse = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uris,
        }),
      }
    );

    if (!addTracksResponse.ok) {
      const error = await addTracksResponse.json();
      throw new Error(`Failed to add tracks: ${error.error.message}`);
    }

    return NextResponse.json({
      success: true,
      playlistId,
      playlistUrl: playlist.external_urls.spotify,
      message: `Playlist "${name}" creada exitosamente en Spotify con ${trackIds.length} canciones.`,
    });
  } catch (error) {
    console.error("Error creating playlist:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create playlist" },
      { status: 500 }
    );
  }
}
