import React, {useState} from "react";
import { Text, Button, TextInput, View, ScrollView, StyleSheet } from "react-native";
import type { User } from "@/components/types";
import { insertUser } from "../components/insertUser";
import { getDb } from "../data/db";

export default function dbTest() {
  const [username, setUsername] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

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

  async function getUserByUsername(username: string) {
    try {
      const db = await getDb();

      // Query for a specific user by username
      const rows = await db.getAllAsync<User>(
        "SELECT * FROM users WHERE username = ?",
        [username]
      );

      if (rows.length > 0) {
        setSelectedUser(rows[0]); // return the first matching user
      } else {
        console.log("No user found"); // no user found
      }
    } catch (err) {
      console.error("Error getting user by username:", err);
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Insert User" onPress={handleInsert}/>
      <Button title="Get User" onPress={getUser} />
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: "gray",
          padding: 8,
          width: 200,
          marginBottom: 10,
        }}
        placeholder="Enter username"
        value={username}
        onChangeText={setUsername}
      />
      <Button
        title="Get User by Username"
        onPress={() => getUserByUsername(username)}
      />

      <ScrollView style={styles.result}>
        {selectedUser && (
          <>
            <Text style={styles.title}>User Found:</Text>
            <Text>
              {selectedUser.id}: {selectedUser.username} - {selectedUser.password}
            </Text>
          </>
        )}
      </ScrollView>

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