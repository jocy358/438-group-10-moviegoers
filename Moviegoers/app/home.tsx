import { Text, View, StyleSheet, ScrollView, Image, TextInput } from "react-native";
import Button from "@/components/Button";
import { Link, Redirect, useRouter } from "expo-router";
import{signOut} from "@/src/auth/userService";

export default function Home() {
    const router = useRouter();
    const handleLogout = async()=> {
        await signOut(); //clear out the session
        router.replace("/login"); // send the user back to the login page
    };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      {/* Tempory link remove later */}
      <Link href={"/profile_screen"}>
        Go to Profile Screen
      </Link>
      <Link href={"/moviePage"}>
        Movie Page
      </Link>

      <Button title="Search" onPress={() => router.push("/movieSearch")}/>

      {/*Logout button */}
      <Button title="Logout" onPress={handleLogout}/>

      {/* Some example links to popular movies */}
      <Text>Top Movies:</Text>
      <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>

        <Link href={"/moviePage/tt0111161"} style={{ margin: 5 }}>
          <Text>The Shawshank Redemption</Text>
          <Image source={{ uri: "https://via.placeholder.com/150" }} style={{ width: 100, height: 150 }} />
        </Link>

        <Link href={"/moviePage/tt0068646"} style={{ margin: 5 }}>
          <Text>The Godfather</Text>
        </Link>

        <Link href={"/moviePage/tt0071562"} style={{ margin: 5 }}>
          <Text>The Godfather: Part II</Text>
        </Link>

        <Link href={"/moviePage/tt0468569"} style={{ margin: 5 }}>
          <Text>The Dark Knight</Text>
        </Link>

        <Link href={"/moviePage/tt0050083"} style={{ margin: 5 }}>
          <Text>12 Angry Men</Text>
        </Link>

      </View>
    </View>
      )
}
const styles = StyleSheet.create ({
    textarea: {
        backgroundColor: "#FFFFFF",
        borderRadius: 25,
        alignItems: "center",
        alignSelf: "center",
        height: "100%",
        width: '80%',
        marginBottom: 7,
        marginTop: 5,
    },

    sectionTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        marginTop: 10,
        textAlign: "center",
  },

  reviewContainer: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    margin: 10,
  },

  reviewInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 6,
    marginBottom: 8,
  },

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
}
);