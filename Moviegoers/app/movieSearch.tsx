import React, { useState } from "react";
import {View, TextInput, Button, Image, TouchableOpacity, StyleSheet, FlatList, Text} from "react-native";
import { useRouter } from "expo-router";

export default function MovieSearch() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function searchMovies() {
    if (!query) return;
    setLoading(true);
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${encodeURIComponent(query)}&page=1&apikey=e95d4610`
      );
      const data = await response.json();

      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setMovies([]);
      }
    } catch (err) {
      console.error("Error fetching movies:", err);
    }
    setLoading(false);
  }


  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search movies..."
        value={query}
        onChangeText={setQuery}
      />
      <Button title="Search" onPress={searchMovies} />

      {loading && <Text style={styles.loading}>Loading...</Text>}

      <FlatList
        data={movies}
        numColumns={2}
        keyExtractor={(item) => item.imdbID}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.posterContainer}
            onPress={() => router.push({pathname: "/moviePage", params: { imdbId: item.imdbID }})}
          >
            <Image
              source={{
                uri:
                  item.Poster !== "N/A"
                    ? item.Poster
                    : "https://via.placeholder.com/150",
              }}
              style={styles.poster}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 8,
    borderRadius: 4,
  },
  loading: { textAlign: "center", marginVertical: 10 },
  posterContainer: {
    flex: 1,
    margin: 5,
    alignItems: "center",
  },
  poster: {
    width: 150,
    height: 225,
    borderRadius: 6,
    resizeMode: "cover",
  },
});
