import { Text, View, TextInput, Button, StyleSheet, Alert } from "react-native";
import React, {useState,useEffect} from "react";
import {useRouter, Link} from "expo-router";
import {signIn} from "@/src/auth/userService";
import { getDb } from "../data/db";

export default function LoginScreen(){
    const [username,setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    async function handleLogin(){
        try{
            await signIn(username, password);
            router.replace("/");
        }catch (e:any){
            Alert.alert("Login Failed", e.message);
        }
    }


    return(
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput placeholder="Username" style={styles.input} value={username} onChangeText={setUsername} autoCapitalize="none"/>
            <TextInput placeholder="Password" secureTextEntry style={styles.input} value ={password} onChangeText = {setPassword}/>
            <Button title="Login" onPress={handleLogin}/>
            <Link href="/signup" style={styles.link}>Create an Account</Link>
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
    link: {
        textAlign: "center",
        marginTop:10,
        color:"blue"
    },
});
