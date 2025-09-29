import { Text, View, TextInput, Button, StyleSheet, Alert,TouchableOpacity } from "react-native";
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
            router.replace("/home");
        }catch (e:any){
            Alert.alert("Login Failed", e.message);
        }
    }


    return(
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput placeholder="Username" style={styles.input} value={username} onChangeText={setUsername} autoCapitalize="none" placeholderTextColor="#888"/>
            <TextInput placeholder="Password" secureTextEntry style={styles.input} value ={password} onChangeText = {setPassword} placeholderTextColor="#888"/>
            <TouchableOpacity style={styles.buttonContainer} onPress={handleLogin}>
            <View style={styles.button}>
                <Text style={styles.buttonText}>Login</Text>
            </View>
            </TouchableOpacity>

            <Link href="/signup" style={styles.link}>Create an Account</Link>
        </View>
    );

    
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:"#1C0400",
        justifyContent: "center",
        alignItems:"center",
        padding: 20,
    },

    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: "center",
        color: "#F9F4FA",
        fontWeight: "bold",
    },

    input:{
        width: "100%",
        borderWidth: 1,
        borderColor: "#fff",
        padding: 12,
        marginBottom: 15,
        borderRadius: 8,
        color: "#F9F4FA",
        backgroundColor: "#2A0A05",
        fontSize: 16,
    },

    buttonContainer: {
    width: "100%",
    marginTop: 10,
    backgroundColor: "#BE3139",
    borderRadius: 8,
    overflow: "hidden",
  },

  button: {
    paddingVertical: 12,
    alignItems: "center",
  },

  buttonText: {
    color: "#F9F4FA",
    fontSize: 18,
    fontWeight: "600",
  },

  link: {
    textAlign: "center",
    marginTop: 20,
    color: "#BE3139",
    textDecorationLine: "underline",
    fontSize: 16,
  },
});
