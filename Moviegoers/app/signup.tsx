import { Text, View, TextInput, Button, StyleSheet, Alert } from "react-native";
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
                <TextInput placeholder="Username" style={styles.input} value={username} onChangeText={setUsername} autoCapitalize="none"/>
                <TextInput placeholder="Password" secureTextEntry style={styles.input} value ={password} onChangeText = {setPassword}/>
                <TextInput placeholder="Confirm Password" secureTextEntry style={styles.input} value ={confirm} onChangeText = {setConfirm}/>
                <Button title="Create Account" onPress={handleSignup}/>
                <Link href="/login" style={styles.link}>Already have an Account? Login</Link>
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