//Background color changed to show if working
import { Text, View, StyleSheet } from "react-native";
import type { User } from "@/components/types";
import { useState, useEffect } from 'react';
import Button from "@/components/Button";
import { getDb } from "../data/db";

export default function ProfileScreen() {
    const [username, setUsername] = useState("admin2");
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    async function getUserByUsername(username: string) {
        try {
          const db = await getDb();
    
          // Query for a specific user by username
          const rows = await db.getAllAsync<User>(
            "SELECT * FROM users WHERE username = ?",
            [username]
          );
          //console.log("worked");
          if (rows.length > 0) {
            setSelectedUser(rows[0]); // return the first matching user
          } else {
            console.log("No user found"); // no user found
          }
        } catch (err) {
          console.error("Error getting user by username:", err);
        }
    }
    function onChangeUsername(){
        setUsername("admin2");
        getUserByUsername(username);
    }

    useEffect(() => {onChangeUsername()}, []);
    
    return (
        <View style={{flex: 1,backgroundColor: "#DFC5FE"}}>
            <View style={{ alignItems: "center", marginBottom: 7}}>
                <Text id="profileText">{selectedUser ? `${selectedUser.username}'s Profile` : "Loading profile..."}</Text>
                <Button label="Edit" onPress={onChangeUsername}></Button>
            </View>
            <View style={{backgroundColor: "#FFFFFF", borderRadius: 20, alignItems: "center", alignSelf: "center", height: '20%', width: '80%', marginBottom: 7}}>
                <Text>Favorite Movie</Text>
            </View>
            <View style={{backgroundColor: "#FFFFFF", height: '20%', width: '80%', borderRadius: 20, alignItems: "center", alignSelf: "center", marginBottom: 7}}>
                <Text>Favorite Genre</Text>
            </View>
            <View style={{backgroundColor: "#FFFFFF", height: '20%', width: '80%', borderRadius: 20, alignItems: "center", alignSelf: "center", marginBottom: 7}}>
                <Text>Number of Reviews</Text>
            </View>
            <View style={{backgroundColor: "#FFFFFF", height: '20%', width: '80%', borderRadius: 20, alignItems: "center", alignSelf: "center", marginBottom: 7}}>
                <Text>Most Recent Review</Text>
            </View>
        </View>
    );
}