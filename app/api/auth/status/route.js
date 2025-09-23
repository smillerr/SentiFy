import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ user: null });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { spotifyId: userId },
      select: {
        id: true,
        spotifyId: true,
        displayName: true,
        email: true,
        profileImageUrl: true,
      },
    });
    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error in status API:", error);
    return NextResponse.json({ user: null });
  }
}
