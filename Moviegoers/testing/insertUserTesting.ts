import { insertUser } from "../components/insertUser.js";
import { getDb } from "../data/db.js";

async function main() {
  try {
    await insertUser({ username: "admin", password: "password123" });
    console.log("User inserted successfully!");

    const db = await getDb();
    const rows = await db.getAllAsync("SELECT * FROM users");
    console.log("Users in DB:", rows);
  } catch (err) {
    console.error("Error inserting user:", err);
  }
}

main();