//Background color changed to show if working
import { Text, View, StyleSheet, ScrollView } from "react-native";
import type { User } from "@/components/types";
// import type { Review } from "@/components/types";
import { useState, useEffect } from 'react';
import { getDb } from "../data/db";
import{getCurrentUserId} from "@/src/auth/userService";

export default function ProfileScreen() {
    const [username, setUsername] = useState("admin2");
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [reviews, setReviews] = useState<any[]>([]);


    async function getUserById(id: number) {
        try {
          const db = await getDb();
    
          // Query for a specific user by id
          const rows = await db.getAllAsync<User>(
            "SELECT * FROM users WHERE id = ?",
            [id]
          );
          //console.log("worked");
          if (rows.length > 0) {
            setSelectedUser(rows[0]); // return the first matching user
            setUsername(rows[0].username);
          //   const reviewRows = await db.getAllAsync<Review>(
          //   "SELECT * FROM users WHERE user_id = ?",
          //   [id]
          // );
          const reviewRows = await db.getAllAsync(
            `SELECT r.id, r.body, r.rating, r.created_at, u.username
            FROM reviews r
            LEFT JOIN users u ON r.user_id = u.id
            INNER JOIN movies m ON r.movie_id = m.id
            WHERE r.user_id = ?
            ORDER BY r.created_at DESC`,
            [id]
          );
          setReviews(reviewRows);

          } else {
            console.log("No user found"); // no user found
          }
        } catch (err) {
          console.error("Error getting user by id:", err);
        }
    }

    async function onChangeUsername(){
      let userId = await getCurrentUserId();
      if(userId){
        getUserById(userId);
      }
    }

    useEffect(() => {onChangeUsername()}, []);

    
    return (
        <View style={{flex: 1,backgroundColor: "#DFC5FE"}}>
            <View style={{ alignItems: "center", marginBottom: 7}}>
                <Text id="profileText">{selectedUser ? `${selectedUser.username}'s Profile` : "Loading profile..."}</Text>
                {/* <Button label="Edit" onPress={onChangeUsername}></Button> */}
            </View>
            {/* <View style={{backgroundColor: "#FFFFFF", borderRadius: 20, alignItems: "center", alignSelf: "center", height: '20%', width: '80%', marginBottom: 7}}>
                <Text>Favorite Movie</Text>
            </View>
            <View style={{backgroundColor: "#FFFFFF", height: '20%', width: '80%', borderRadius: 20, alignItems: "center", alignSelf: "center", marginBottom: 7}}>
                <Text>Favorite Genre</Text>
            </View>
            <View style={{backgroundColor: "#FFFFFF", height: '20%', width: '80%', borderRadius: 20, alignItems: "center", alignSelf: "center", marginBottom: 7}}>
                <Text>Number of Reviews</Text>
            </View> */}
            <ScrollView style={{backgroundColor: "#FFFFFF", height: '100%', width: '80%', borderRadius: 20,  alignSelf: "center", marginBottom: 7}}>
                <Text style={{alignSelf: "center"}}>Recent Reviews</Text>
                {reviews.length > 0 ? (
                            reviews.map((item) => (
                            <View key={item.id} style={styles.reviewItem}>
                            <Text style={styles.reviewUser}>{item.username || "Anonymous"}</Text>
                            <Text>{item.rating}</Text>
                            <Text>{item.body}</Text>
                            <Text style={styles.reviewDate}>
                                {new Date(item.created_at).toLocaleDateString()}
                            </Text>
                            </View>
                            ))
                            ) : (
                            <Text style={{ textAlign: "center", marginTop: 10 }}>No reviews yet.</Text>
                            )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({

  reviewItem: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 6,
    marginBottom: 8,
  },

  reviewUser: {
    fontWeight: "600",
    fontSize: 14,
  },

  reviewDate: {
    fontSize: 10,
    color: "#555",
    marginTop: 4,
  },

  
});