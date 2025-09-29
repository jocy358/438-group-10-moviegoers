import { Text, View, StyleSheet, ScrollView, Image, TextInput } from "react-native";
import Button from "@/components/Button";
import { Link, useRouter } from "expo-router";
import { signOut } from "@/src/auth/userService";
import { useEffect, useState } from "react";
import { colors, fonts, fontSizes } from "@/src/auth/themes";  

const topMovies = [ // IMDb IDs for top-rated movies
  { title: "The Shawshank Redemption", imdbId: "tt0111161" },
  { title: "The Godfather", imdbId: "tt0068646" },
  { title: "The Godfather: Part II", imdbId: "tt0071562" },
  { title: "The Dark Knight", imdbId: "tt0468569" },
  { title: "12 Angry Men", imdbId: "tt0050083" },
  { title: "Schindler's List", imdbId: "tt0108052" },
  { title: "The Lord of the Rings: The Return of the King", imdbId: "tt0167260" },
  { title: "Pulp Fiction", imdbId: "tt0110912" },
  { title: "The Good, the Bad and the Ugly", imdbId: "tt0060196" },
  { title: "Fight Club", imdbId: "tt0137523" },
];

export default function Home() { 
  const router = useRouter();
  const [moviePosters, setMoviePosters] = useState<{ [key: string]: string }>({});

  const handleLogout = async () => {
    await signOut();
    router.replace("/login");
  };

  useEffect(() => { 
    const fetchPosters = async () => {
      const updatedPosters: { [key: string]: string } = {};
      for (const movie of topMovies) {
        try {
          const res = await fetch(`http://www.omdbapi.com/?i=${movie.imdbId}&apikey=e95d4610`);
          const data = await res.json();
          if (data.Poster) {
            updatedPosters[movie.imdbId] = data.Poster;
          }
        } catch (err) {
          console.error("Failed to fetch poster for", movie.title);
        }
      }
      setMoviePosters(updatedPosters);
    };

    fetchPosters();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.sectionTitle}>Welcome to Movie Hub</Text>

      <Button title="Search" label="Search for a Movie:" onPress={() => router.push("/movieSearch")} />

      <Text style={styles.sectionTitle}>Top Rated Movies:</Text>

      <View style={styles.moviesContainer}>
        {topMovies.map((movie) => (
          <Link key={movie.imdbId} href={`/moviePage/${movie.imdbId}`} style={styles.movieItem}>
            <Image
              source={{
                uri: moviePosters[movie.imdbId] || "https://via.placeholder.com/150",
              }}
              style={styles.poster}
              resizeMode="cover"
            />
            <Text style={styles.movieTitle}>{movie.title}</Text>
          </Link>
        ))}
      </View>
      <Button title="Logout" label="Logout" onPress={handleLogout} />

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  
  container: {
    paddingTop: 40,
    alignItems: "center",
    paddingBottom: 60,
    backgroundColor: "#1C0400"
    
  },
  sectionTitle: {
    fontSize: 22,
    color: "#F9F4FA",
    fontWeight: "bold",
    marginVertical: 16,
    textAlign: "center",
  },
  moviesContainer: {
    backgroundColor: "#BE3139",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    borderRadius: 15,            
    marginHorizontal: 16,     
    padding: 12,   
  },
  movieItem: {
    color:"#F9F4FA",
    textAlign: "center",
    margin: 10,
    alignItems: "center",
    width: 120,
  },
  poster: {
    width: 100,
    height: 150,
    borderRadius: 8,
  },
  movieTitle: {
    marginTop: 6,
    textAlign: "center",
    fontSize: 12
  },

});