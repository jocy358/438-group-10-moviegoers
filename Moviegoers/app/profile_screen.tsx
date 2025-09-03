//Background color changed to show if working
import { Text, View } from "react-native";
import Button from "@/components/Button"

export default function ProfileScreen() {
    const editUsername = () => {
       alert("text");
    }
    return (
        <View style={{flex: 1,backgroundColor: "#DFC5FE",}}>
            <View style={{ alignItems: "center" }}>
                <Text id="profileText">User's Profile</Text>
                <Button label="Edit" onPress={editUsername}></Button>
            </View>
            <View>
                <Text>Favorite Movie: Film</Text>
                <Text>Favorite Genre: Genre</Text>
                <Text>Number of Reviews: 0</Text>
                <Text>A fourth thing</Text>
            </View>
        </View>
    );
}