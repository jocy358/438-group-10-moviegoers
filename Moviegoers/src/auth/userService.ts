import * as SecureStore from "expo-secure-store";
import bcrypt from "bcryptjs";
import {getDb} from "@/data/db";

/*
https://www.npmjs.com/package/bcryptjs
https://www.npmjs.com/package/expo-secure-store
*/

const USER_ID_KEY = "auth_user_id";
// this is to sign in a new user
export async function signUp(username: string, password: string){
    const db = await getDb();

//this will check if the username already exists or not
const existing = await db.getFirstAsync(`SELECT id FROM users WHERE username = ?`, [username.trim()]);
if (existing) throw new Error("Username already taken");

//this will hash and save the password
const hash = await bcrypt.hash(password, 10);
await db.runAsync(`INSERT INTO users (username, password) VALUES (?, ?)`, [username.trim(), hash]);
// this will auto login the user after the sign up process.

return await signIn(username, password);
}
//Log in an already existing user

export async function signIn(username: string, password: string){
    const db = await getDb();
    const user = await db.getFirstAsync<{ id: number, password: string }>(`SELECT id, password FROM users WHERE username = ?`, [username.trim()]);

    if(!user || !(await bcrypt.compare(password, user.password))){
        throw new Error("Invalid username and password");
    }

    await SecureStore.setItemAsync(USER_ID_KEY, String(user.id));
    return user.id;
}

//logout the user

export async function signOut(){
    await SecureStore.deleteItemAsync(USER_ID_KEY);
}

// get the currently loged in user id
export async function getCurrentUserId(){
    const id = await SecureStore.getItemAsync(USER_ID_KEY);
    return id ? Number(id): null;
}


