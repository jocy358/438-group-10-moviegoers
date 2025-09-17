import { Text, View,Button } from "react-native";
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

      {/*Logout button */}
      <Button title="Logout" onPress={handleLogout}/>
    </View>
  );
}