import * as SQLite from "expo-sqlite";

let db: SQLite.SQLiteDatabase | null = null;

export async function getDb(): Promise<SQLite.SQLiteDatabase> {
  if (!db) {
    db = await SQLite.openDatabaseAsync("moviegoers.db");
    await initDatabase(db);
  }
  return db;
}

async function initDatabase(db: SQLite.SQLiteDatabase) {
  await db.execAsync(`
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS movies (
      id INTEGER PRIMARY KEY NOT NULL,
      imdb_id TEXT UNIQUE,
      title TEXT NOT NULL,
      poster_url TEXT,
      year TEXT,
      type TEXT,
      plot TEXT,
      release_date TEXT
    );

    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY NOT NULL,
      username TEXT UNIQUE, 
      password TEXT
    );

    CREATE TABLE IF NOT EXISTS reviews (
      id INTEGER PRIMARY KEY NOT NULL,
      movie_id INTEGER NOT NULL,
      user_id INTEGER,
      rating INTEGER NOT NULL,
      body TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      UNIQUE(movie_id, user_id),
      FOREIGN KEY(movie_id) REFERENCES movies(id) ON DELETE CASCADE,
      FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE SET NULL
    );

    CREATE TABLE IF NOT EXISTS genres (
      id INTEGER PRIMARY KEY NOT NULL,
      name TEXT UNIQUE NOT NULL
    );

    CREATE TABLE IF NOT EXISTS movie_genres (
      movie_id INTEGER NOT NULL,
      genre_id INTEGER NOT NULL,
      PRIMARY KEY (movie_id, genre_id),
      FOREIGN KEY(movie_id) REFERENCES movies(id) ON DELETE CASCADE,
      FOREIGN KEY(genre_id) REFERENCES genres(id) ON DELETE CASCADE
    );
  `);
}