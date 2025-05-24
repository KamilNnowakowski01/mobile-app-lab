import React from "react";
import { StyleSheet, Text, View } from "react-native";

type AvatarProps = { name: string };
export const Avatar: React.FC<AvatarProps> = ({ name }) => {
  const initial = name.charAt(0).toUpperCase();
  return (
    <View style={styles.avatar}>
      <Text style={styles.avatarText}>{initial}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#1e90ff",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
