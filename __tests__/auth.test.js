import { GET, POST } from "../app/api/auth/spotify/route";

// Mock Prisma
jest.mock("@prisma/client", () => ({
  PrismaClient: jest.fn(() => ({
    user: {
      upsert: jest.fn().mockResolvedValue({}),
    },
  })),
}));

// Mock fetch
global.fetch = jest.fn();

// Mock NextRequest
jest.mock("next/server", () => ({
  NextResponse: {
    redirect: jest.fn((url) => ({ status: 302, headers: { get: () => url } })),
    json: jest.fn((data) => ({ json: () => Promise.resolve(data) })),
  },
}));

describe("/api/auth/spotify", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.SPOTIFY_CLIENT_ID = "test_client_id";
    process.env.SPOTIFY_CLIENT_SECRET = "test_client_secret";
    process.env.NEXTAUTH_URL = "http://localhost:3000";
    process.env.NEXTAUTH_SECRET = "test_secret";
  });

  describe("GET", () => {
    it("returns redirect URL", async () => {
      const response = await GET();

      expect(response.status).toBe(302);
    });
  });

  describe("POST", () => {
    it("exchanges code and stores user", async () => {
      const mockRequest = {
        json: () => Promise.resolve({ code: "test_code" }),
      };

      fetch
        .mockResolvedValueOnce({
          ok: true,
          json: () =>
            Promise.resolve({
              access_token: "access",
              refresh_token: "refresh",
              expires_in: 3600,
            }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: () =>
            Promise.resolve({
              id: "spotify_user_id",
              display_name: "Test User",
            }),
        });

      const response = await POST(mockRequest);
      const result = await response.json();

      expect(fetch).toHaveBeenCalledTimes(2);
      expect(result).toEqual({ success: true, userId: "spotify_user_id" });
    });
  });
});
