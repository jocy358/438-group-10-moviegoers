import { Text, View, TextInput, Button, StyleSheet, Alert, TouchableOpacity} from "react-native";
import React, {useState} from "react";
import {useRouter, Link} from "expo-router";
import {signUp} from "@/src/auth/userService";

export default function SignupScreen(){
    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const router = useRouter();

    async function handleSignup(){
        try{
            if(!username || !password) 
                throw new Error("Need to fill out all fields");
            if(password !== confirm) 
                throw new Error("Passwords do not match");
            await signUp(username, password);
            router.replace("/login")
        } catch (e:any){
            Alert.alert("Signup Failed", e.message);
        }
    }

    return(
        <View style={styles.container}>
        <Text style={styles.title}>Sign Up</Text>
        <TextInput placeholder="Username" style={styles.input} value={username} onChangeText={setUsername} autoCapitalize="none" placeholderTextColor="#888"/>
        <TextInput placeholder="Password" secureTextEntry style={styles.input} value ={password} onChangeText = {setPassword} placeholderTextColor="#888"/>
        <TextInput placeholder="Confirm Password" secureTextEntry style={styles.input} value ={confirm} onChangeText = {setConfirm} placeholderTextColor="#888"/>
        <TouchableOpacity style={styles.buttonContainer} onPress={handleSignup}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Create Account</Text>
        </View>
      </TouchableOpacity>
        <Link href="/login" style={styles.link}>Already have an Account? Login</Link>
        </View>
    );
     
        
    }
    
    const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1C0400",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    
    title: {
        fontSize: 32,
        marginBottom: 30,
        textAlign: "center",
        color: "#F9F4FA",
        fontWeight: "bold",
    },
    
    input: {
        width: "100%",
        borderWidth: 1,
        borderColor: "#F9F4FA",
        backgroundColor: "#2A0A05",
        color: "#F9F4FA",
        padding: 12,
        marginBottom: 15,
        borderRadius: 8,
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
        marginTop:20,
        color:"#BE3139",
        textDecorationLine: "underline",
        fontSize: 16,
    },
    });