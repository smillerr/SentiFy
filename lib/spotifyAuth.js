import crypto from "crypto";

const algorithm = "aes-256-cbc";

export function decrypt(text, key) {
  const decipher = crypto.createDecipheriv(algorithm, key, Buffer.alloc(16, 0));
  let decrypted = decipher.update(text, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

export function encrypt(text, key) {
  const cipher = crypto.createCipheriv(algorithm, key, Buffer.alloc(16, 0));
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}

export async function refreshAccessToken(user) {
  const key = crypto.scryptSync(process.env.NEXTAUTH_SECRET, "salt", 32);

  const refreshToken = decrypt(user.refreshToken, key);

  const response = await fetch("https://accounts.spotify.com/api/token", {
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
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to refresh token");
  }

  const data = await response.json();
  const { access_token, expires_in } = data;

  // Update user in DB
  const { PrismaClient } = await import("@prisma/client");
  const prisma = new PrismaClient();

  const encryptedAccess = encrypt(access_token, key);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      accessToken: encryptedAccess,
      tokenExpiresAt: new Date(Date.now() + expires_in * 1000),
    },
  });

  return access_token;
}

export async function getValidAccessToken(userId) {
  const { PrismaClient } = await import("@prisma/client");
  const prisma = new PrismaClient();

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new Error("User not found");

  const now = new Date();
  if (user.tokenExpiresAt > now) {
    // Token still valid
    const key = crypto.scryptSync(process.env.NEXTAUTH_SECRET, "salt", 32);
    return decrypt(user.accessToken, key);
  } else {
    // Refresh token
    return await refreshAccessToken(user);
  }
}
