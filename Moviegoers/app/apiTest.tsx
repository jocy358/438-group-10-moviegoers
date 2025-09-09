import { Movie } from '../components/types';
import React, { useState } from 'react';
import { View, TextInput, Button, Text, Image, StyleSheet } from 'react-native';


function normalizeMovieInfo(data: any): Movie {
    return {
        id: 0, // Placeholder, OMDB does not provide an internal ID
        imdbId: data.imdbID,
        title: data.Title,
        posterURL: data.Poster !== 'N/A' ? data.Poster : null,
        type: data.Type,
        plot: data.Plot !== 'N/A' ? data.Plot : null,
        releaseDate: data.Released !== 'N/A' ? data.Released : null,
    };
}
const ApiTest = () => {
    const [movieData, setMovieData] = useState<Movie | null>(null);
    // const [movieTitle, setMovieTitle] = useState('');
    // const [movieData, setMovieData] = useState(null);

    const fetchMovieData = () => {
        fetch(`http://www.omdbapi.com/?t=${movieData?.title}&apikey=e95d4610`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Couldn't fetch movie data");
                }
                return response.json();
            })
            .then(data => setMovieData(normalizeMovieInfo(data)))
            .catch(error => console.error(error));
    };
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Enter movie title"
                value={movieData?.title || ''}
                onChangeText={text =>
                    setMovieData(prev =>
                        prev
                            ? { ...prev, title: text }
                            : {
                                id: 0,
                                imdbId: '',
                                title: text,
                                posterURL: null,
                                type: '',
                                plot: null,
                                releaseDate: null,
                            }
                    )
                }
            />
            <Button title="Search" onPress={fetchMovieData} />
            {movieData && (
                <View style={styles.result}>
                    <Text style={styles.title}>{movieData.title}</Text>
                    <Image source={{ uri: movieData.posterURL ?? '' }} style={styles.poster} />
                    <Text>{movieData.plot}</Text>
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

// Tests 


export default ApiTest;