import { Text, View, TextInput, Button, StyleSheet } from "react-native";

export default function LoginScreen(){
    return(
        <View style={styles.container}>
            <Text style={styles.title}></Text>
            <TextInput placeholder="Username" style={styles.input}/>
            <TextInput placeholder="Password" secureTextEntry style={styles.input}/>
            <Button title="Login" onPress={()=>{}}/>
        </View>
    );

    
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "center",
        padding: 20,
    
    },

    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: "center",
    },

    input:{
        borderEndWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        marginBottom: 15,
        borderRadius: 5,
    },
});
