import crypto from "crypto";
import { encrypt, decrypt } from "../lib/spotifyAuth";

describe("spotifyAuth", () => {
  beforeEach(() => {
    process.env.NEXTAUTH_SECRET = "test_secret";
  });

  describe("encrypt/decrypt", () => {
    it("encrypts and decrypts correctly", () => {
      const key = crypto.scryptSync("test_secret", "salt", 32);
      const text = "test_text";

      const encrypted = encrypt(text, key);
      const decrypted = decrypt(encrypted, key);

      expect(decrypted).toBe(text);
    });
  });
});
