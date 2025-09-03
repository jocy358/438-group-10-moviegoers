import { Text, View, Pressable } from "react-native";

type Props = {
    label: string;
    onPress?: () => void;
};

export default function Button({ label, onPress }: Props) {
    return (
        <View style={{
            width: 40,
            height: 30,
            marginHorizontal: 20,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 25
        }}>
            <Pressable style={{ backgroundColor: "white", width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', }} onPress={onPress}>
                <Text>{label}</Text>
            </Pressable>
        </View>
    );
}