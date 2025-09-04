//Background color changed to show if working
import { Text, View, StyleSheet } from "react-native";
import Button from "@/components/Button"

export default function ProfileScreen() {
    const editUsername = () => {
       alert("text");
    }
    return (
        <View style={{flex: 1,backgroundColor: "#DFC5FE"}}>
            <View style={{ alignItems: "center", marginBottom: 7}}>
                <Text id="profileText">User's Profile</Text>
                <Button label="Edit" onPress={editUsername}></Button>
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