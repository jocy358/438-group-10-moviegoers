//Background color changed to show if working
import { Text, View, StyleSheet, ScrollView, Image } from "react-native";
import type { Movie } from "@/components/types";
import { useState, useEffect, useLayoutEffect } from 'react';
import Button from "@/components/Button";
import { getDb } from "../data/db";
import { insertMovie } from "../components/insertMovie";
import { useLocalSearchParams } from "expo-router";


export default function MovieScreen() {
    const { imdbId } = useLocalSearchParams<{ imdbId: string }>();
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    const [movieData, setMovieData] = useState<Movie | null>(null);


    //This function should insert a movie into the database if it not already there.
    //It should never be called unless we are sure movieData has something in it.
    async function handleInsert() {
        try {
          await insertMovie({ imdbId: movieData?.imdbId!, title: movieData?.title!, posterURL: movieData?.posterURL, year: movieData?.year, type: movieData?.type, plot: movieData?.plot, releaseDate: movieData?.releaseDate});
    
          const db = await getDb();
        } catch (err) {
          console.error("Error inserting movie:", err);
        }
    }

    //This function should get a movie from the API based on its title.
    //TODO: Should probably replace this so that its based on imdbID
    const fetchMovieData = async (id: string) => {
        try {
            const response = await fetch(`http://www.omdbapi.com/?i=${id}&apikey=e95d4610`);
            if (!response.ok) {
                throw new Error("Couldn't fetch movie data");
            } 
            const data = await response.json();

            const movie: Movie = {
                id: 0, // placeholder, DB will auto-assign
                imdbId: data.imdbID,
                title: data.Title,
                posterURL: data.Poster,
                year: data.Year,
                type: data.Type,
                plot: data.Plot,
                releaseDate: data.Released,
            };

            setMovieData(movie);
            return movie;
        } catch (err) {
            console.error(err);
            return null;
        }
    };

    function mapDbRowToMovie(row: any): Movie {
        return {
            id: row.id,
            imdbId: row.imdb_id,
            title: row.title,
            posterURL: row.poster_url,
            year: row.year,
            type: row.type,
            plot: row.plot,
            releaseDate: row.release_date,
        };
    }

    //This function should get a movie From the database based on its title, or put it in the database if it isn't already.
    //TODO: Should probably replace this so that its based on imdbID
    async function getMovieById(id: string) {
        try {
            //Try to get movie from database
            const db = await getDb();
            const rows = await db.getAllAsync<Movie>(
                "SELECT * FROM movies WHERE imdb_id = ?",
                [id]
            );
            //Check if movie was in database.
            //If so, set selectedMovie to the movie
            //If not, try to add movie to database then set selectedMovie to either that movie or 'Cinderella' if it isnt a movie
            if (rows.length > 0) {
                //DEBUG CODE
                // console.log("Movies in DB:", rows);
                const movie: Movie = mapDbRowToMovie(rows[0]);
                setSelectedMovie(movie);
                return;
            }
            console.log("Movie not currently in database"); // no movie found
            const data = await fetchMovieData(id);
            
            if (data) {
                await insertMovie({
                    imdbId: data.imdbId,
                    title: data.title,
                    posterURL: data.posterURL,
                    year: data.year,
                    type: data.type,
                    plot: data.plot,
                    releaseDate: data.releaseDate,
            });
                
            const rowsAfterInsert = await db.getAllAsync<Movie>(
                "SELECT * FROM movies WHERE imdb_id = ?",
                [id]
            );
            setSelectedMovie(rowsAfterInsert[0]);
            //DEBUG CODE
            // const rowsDebug = await db.getAllAsync("SELECT * FROM movies");
            // console.log("Movies in DB:", rowsDebug);
            }
        }
        catch (err) {
          console.error("Error getting movie by imdbId:", err);
        }
    }

    //TODO: Make this page transition from search page and replce this function with code for getting movie from previous page
    useEffect(() => {
        if (imdbId) {
            getMovieById(imdbId);
        }
    }, [imdbId]);
    // console.log(selectedMovie?.title);
    // console.log(selectedMovie?.year); 

    return (
        <ScrollView style={{flex: 1,backgroundColor: "#7dffa0ff"}}>
            <View style={styles.textarea}>
                <Text>{selectedMovie?.title} ({selectedMovie?.year})</Text>
                <Image source={{uri:`${selectedMovie?.posterURL}`,}} style={{width: 150, height: 220}}></Image>
                <Text> Plot </Text>
                <Text>{selectedMovie?.plot} </Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    textarea: {
        backgroundColor: "#FFFFFF",
        borderRadius: 25,
        alignItems: "center",
        alignSelf: "center",
        height: "100%",
        width: '80%',
        marginBottom: 7,
        marginTop: 5,
    }
});