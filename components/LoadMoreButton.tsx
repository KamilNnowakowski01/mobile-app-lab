import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

type LoadMoreButtonProps = {
  onPress: () => void;
  label?: string;
};

export const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({
  onPress,
  label = "Load More",
}) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#1e90ff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    alignItems: "center",
    marginVertical: 16,
    marginBottom: 60,
  },
  text: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
