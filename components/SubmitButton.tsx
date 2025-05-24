import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

type SubmitButtonProps = {
  onPress: () => void;
  title?: string;
};

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  onPress,
  title = "Save",
}) => (
  <Pressable
    style={styles.button}
    onPress={onPress}
    android_ripple={{ color: "#0e9ed8" }}
  >
    <Text style={styles.text}>{title}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#3b82f6",
    borderRadius: 6,
    alignSelf: "center",
    marginTop: 12,
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});
