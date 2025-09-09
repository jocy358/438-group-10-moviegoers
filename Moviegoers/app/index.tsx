import { Text, View } from "react-native";
import { Link, Redirect } from "expo-router";

export default function Index() {
  return <Redirect href="/dbTest" />;

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
    </View>
  );
}
