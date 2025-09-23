-- Drop the old unique index on spotifyTrackId
DROP INDEX "tracks_spotifyTrackId_key";

-- Add new unique index on (userId, spotifyTrackId)
CREATE UNIQUE INDEX "tracks_userId_spotifyTrackId_key" ON "public"."tracks"("userId", "spotifyTrackId");