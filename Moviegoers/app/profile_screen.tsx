//Background color changed to show if working
import { Text, View } from "react-native";
import Button from "@/components/Button"

export default function ProfileScreen() {
    const editUsername = () => {
       alert("text");
    }
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "#DFC5FE",
            }}
        >

            <View style={{ alignItems: "center" }}>
                <Text id="profileText">User's Profile</Text>
                <Button label="Edit" onPress={editUsername}></Button>
            </View>
        </View>
    );
}