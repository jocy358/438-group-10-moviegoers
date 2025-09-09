import { getDb } from "../data/db";
import type { Movie } from "./types";

export async function insertMovie(m: Omit<Movie, "id">): Promise<void> {
  const db = await getDb();

  await db.runAsync(
    `INSERT INTO movies (imdb_id, title, poster_url, year, type, plot, release_date)
     VALUES (?, ?, ?, ?, ?, ?, ?)
     ON CONFLICT(imdb_id) DO UPDATE SET
       title = excluded.title,
       poster_url = excluded.poster_url,
       year = excluded.year,
       type = excluded.type,
       plot = excluded.plot,
       release_date = excluded.release_date;`,
    [m.imdbId, m.title, m.posterURL ?? null, m.year ?? null, m.type ?? null, m.plot ?? null, m.releaseDate ?? null]
  );
}