import React, { useState } from 'react';
import { View, TextInput, Button, Text, Image, StyleSheet } from 'react-native';

const ApiTest = () => {
    const [movieTitle, setMovieTitle] = useState('');
    const [movieData, setMovieData] = useState(null);

    const fetchMovieData = () => {
        fetch(`http://www.omdbapi.com/?t=${movieTitle}&apikey=e95d4610`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Couldn't fetch movie data");
                }
                return response.json();
            })
            .then(data => setMovieData(data))
            .catch(error => console.error(error));
    };
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Enter movie title"
                value={movieTitle}
                onChangeText={setMovieTitle}
            />
            <Button title="Search" onPress={fetchMovieData} />
            {movieData && (
                <View style={styles.result}>
                    <Text style={styles.title}>{movieData.Title}</Text>
                    <Image source={{ uri: movieData.Poster }} style={styles.poster} />
                    <Text>{movieData.Plot}</Text>
                </View>
            )}
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginBottom: 16,
    },
    result: {
        marginTop: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    poster: {
        width: 200,
        height: 300,
        marginVertical: 16,
    },
});

export default ApiTest;
