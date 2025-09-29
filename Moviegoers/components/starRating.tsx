import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface StarRatingProps {
  rating?: number;
  onChange?: (value: number) => void;
}

export default function StarRating({ rating = 0, onChange }: StarRatingProps) {
  const [currentRating, setCurrentRating] = useState(rating);

  const handleStarPress = (starValue: number) => {
    setCurrentRating(starValue);
    if (onChange){
        onChange(starValue);
    }
  };

  return(
    <View style={styles.starContainer}>
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity key={star} onPress={() => handleStarPress(star)}>
          <Ionicons name={star <= currentRating ? "star" : "star-outline"} size={32} color="#FFD700" style={styles.star}/>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  starContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  star: {
    marginHorizontal: 5,
  },
});