//Background color changed to show if working
import { Text, View } from "react-native";

export default function ProfileScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#DFC5FE",
        alignItems: "center",
      }}
    >
      <Text>User's Profile</Text>
    </View>
  );
}