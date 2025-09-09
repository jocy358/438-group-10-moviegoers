import { getDb } from "../data/db";
import type { User } from "./types";

export async function insertUser(u: Omit<User, "id">): Promise<void> {
  const db = await getDb();

  await db.runAsync(
    `INSERT INTO users (username, password)
     VALUES (?, ?)
     ON CONFLICT(username) DO UPDATE SET 
       password = excluded.password;`,
    [u.username, u.password]
  );
}