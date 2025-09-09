import React from "react";
import { Button, View, StyleSheet } from "react-native";
import { insertUser } from "../components/insertUser";
import { getDb } from "../data/db";

export default function dbTest() {
  async function handleInsert() {
    try {
      await insertUser({ username: "admin2", password: "password123" });
      console.log("User inserted successfully!");

      const db = await getDb();
      const rows = await db.getAllAsync("SELECT * FROM users");
      console.log("Users in DB:", rows);
    } catch (err) {
      console.error("Error inserting user:", err);
    }
  }

  async function getUser() {
    try {
        const db = await getDb();
        const rows = await db.getAllAsync("SELECT * FROM users");
        console.log("Users in DB:", rows);
    }   catch (err) {
      console.error("Error inserting user:", err);
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Insert User" onPress={handleInsert} />
      <Button title="Get User" onPress={getUser} />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginBottom: 16,
    },
    result: {
        marginTop: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    poster: {
        width: 200,
        height: 300,
        marginVertical: 16,
    },
});