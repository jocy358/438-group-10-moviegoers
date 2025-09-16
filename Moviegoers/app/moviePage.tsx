//Background color changed to show if working
import { Text, View, StyleSheet, ScrollView, Image } from "react-native";
import type { Movie } from "@/components/types";
import { useState, useEffect, useLayoutEffect } from 'react';
import Button from "@/components/Button";
import { getDb } from "../data/db";
import { insertMovie } from "../components/insertMovie";


export default function ProfileScreen() {
    const [movieTitle, setTitle] = useState("Cinderella");
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    const [movieData, setMovieData] = useState(null);


    //This function should insert a movie into the database if it not already there.
    //It should never be called unless we are sure movieData has something in it.
    async function handleInsert() {
        try {
          await insertMovie({ imdbId: movieData.imdbID, title: movieData.Title, posterURL: movieData.Poster, year: movieData.Year, type: movieData.Type, plot: movieData.Plot, releaseDate: movieData.Released});
    
          const db = await getDb();
          
        } catch (err) {
          console.error("Error inserting movie:", err);
        }
    }

    //This function should get a movie from the API based on its title.
    //TODO: Should probably replace this so that its based on imdbID
    const fetchMovieData = (title: string) => {
        fetch(`http://www.omdbapi.com/?t=${title}&apikey=e95d4610`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Couldn't fetch movie data");
                }
                return response.json();
            })
            .then(data => setMovieData(data))
            .catch(error => console.error(error));
    };

    //This function should get a movie From the database based on its title, or put it in the database if it isn't already.
    //TODO: Should probably replace this so that its based on imdbID
    async function getMovieByName(title: string) {
        try {
            //Try to get movie from database
            const db = await getDb();
            const rows = await db.getAllAsync<Movie>(
                "SELECT * FROM movies WHERE title = ?",
                [title]
            );
            //Check if movie was in database.
            //If so, set selectedMovie to the movie
            //If not, try to add movie to database then set selectedMovie to either that movie or 'Cinderella' if it isnt a movie
            if (rows.length > 0) {
                //DEBUG CODE
                // console.log("Movies in DB:", rows);
                setSelectedMovie(rows[0]);
            } else {
                console.log("Movie not currently in database"); // no user found
                try{
                    setTitle(title);
                    fetchMovieData(title);
                    handleInsert();
                    setTitle(movieData.Title);
                } catch(error){
                    console.log(error);
                }
                const rows2 = await db.getAllAsync<Movie>(
                    "SELECT * FROM movies WHERE title = ?",
                    [title]
                );
                setSelectedMovie(rows2[0]);
            }
        } catch (err) {
          console.error("Error getting user by username:", err);
        }
    }

    //TODO: Make this page transition from search page and replce this function with code for getting movie from previous page
    useEffect(() => {getMovieByName("Cars")}, []);
    // console.log(selectedMovie?.title);
    // console.log(selectedMovie?.year); 

    return (
        <ScrollView style={{flex: 1,backgroundColor: "#7dffa0ff"}}>
            <View style={styles.textarea}>
                <Text>{selectedMovie?.title}</Text>
                {/* <Image source={{uri:`${selectedMovie?.posterURL}`,}} style={{width:"20%", height:"50%"}}></Image> */}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    textarea: {
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        alignItems: "center",
        alignSelf: "center",
        height: 1000,
        width: '80%',
        marginBottom: 7
    }
});