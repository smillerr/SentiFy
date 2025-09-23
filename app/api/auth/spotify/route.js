import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient();

export async function GET() {
  const scopes =
    "user-read-private user-read-email user-library-read playlist-modify-public playlist-modify-private";
  const state = crypto.randomBytes(16).toString("hex");
  const authorizeURL = `https://accounts.spotify.com/authorize?response_type=code&client_id=${
    process.env.SPOTIFY_CLIENT_ID
  }&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(
    `${process.env.NEXTAUTH_URL}/api/auth/spotify/callback`
  )}&state=${state}`;
  return NextResponse.redirect(authorizeURL);
}

export async function POST(request) {
  const { code } = await request.json();

  try {
    // Exchange code for tokens
    const tokenResponse = await fetch(
      "https://accounts.spotify.com/api/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " +
            Buffer.from(
              `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
            ).toString("base64"),
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          code,
          redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/spotify/callback`,
        }),
      }
    );

    const tokenData = await tokenResponse.json();
    const { access_token, refresh_token, expires_in } = tokenData;

    // Get user profile
    const profileResponse = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const userData = await profileResponse.json();

    // Encrypt tokens
    const algorithm = "aes-256-cbc";
    const key = crypto.scryptSync(process.env.NEXTAUTH_SECRET, "salt", 32);
    const iv = crypto.randomBytes(16);

    const encrypt = (text) => {
      const cipher = crypto.createCipher(algorithm, key);
      let encrypted = cipher.update(text, "utf8", "hex");
      encrypted += cipher.final("hex");
      return encrypted;
    };

    const encryptedAccess = encrypt(access_token);
    const encryptedRefresh = encrypt(refresh_token);

    // Store in DB
    await prisma.user.upsert({
      where: { spotifyId: userData.id },
      update: {
        accessToken: encryptedAccess,
        refreshToken: encryptedRefresh,
        tokenExpiresAt: new Date(Date.now() + expires_in * 1000),
        displayName: userData.display_name,
        email: userData.email,
        profileImageUrl: userData.images?.[0]?.url,
      },
      create: {
        spotifyId: userData.id,
        displayName: userData.display_name,
        email: userData.email,
        profileImageUrl: userData.images?.[0]?.url,
        accessToken: encryptedAccess,
        refreshToken: encryptedRefresh,
        tokenExpiresAt: new Date(Date.now() + expires_in * 1000),
      },
    });

    return NextResponse.json({ success: true, userId: userData.id });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}
