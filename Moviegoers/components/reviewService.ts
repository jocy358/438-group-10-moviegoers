import { getDb } from "@/data/db";

async function getMovieIdByimbd(imdbId: string): Promise <number| null> {
    const db = await getDb();
    const result = await db.getFirstAsync<{id: number}>(
        `SELECT id FROM movies WHERE imdb_id = ?`,
        [imdbId]
    );
    return result ? result.id: null;
}

export async function addReview(imdbId: string, userId: number | null, rating: number, body: string) {
  const db = await getDb();

  const movieId = await getMovieIdByimbd(imdbId);
  if (!movieId) {
      throw new Error("Movie not found in database. Please save the movie first.");
  }

  const now = new Date().toISOString();
  await db.runAsync(
    `INSERT OR REPLACE INTO reviews (movie_id, user_id, rating, body, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [movieId, userId, rating, body, now, now]
  );
}

export async function getReviews(imdbId: string) {
  const db = await getDb();

  return db.getAllAsync(
    `SELECT r.id, r.body, r.rating, r.created_at, u.username
     FROM reviews r
     LEFT JOIN users u ON r.user_id = u.id
     INNER JOIN movies m ON r.movie_id = m.id
     WHERE m.imdb_id = ?
     ORDER BY r.created_at DESC`,
    [imdbId]
    );
}