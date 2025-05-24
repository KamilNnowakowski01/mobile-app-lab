import { MOOD_MAPPING, MOOD_MESSAGES, MoodValue } from "@/constants/Mood";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  selected: MoodValue | null;
  onSelect: (m: MoodValue) => void;
};

export const MoodSelector = ({ selected, onSelect }: Props) => (
  <View style={styles.container}>
    {(Object.keys(MOOD_MAPPING) as unknown as MoodValue[]).map((mood) => {
      const isSelected = selected === mood;

      return (
        <Pressable
          key={mood}
          onPress={() => onSelect(mood)}
          style={[styles.item, isSelected && styles.itemSelected]}
        >
          <Image source={MOOD_MAPPING[mood].image} style={styles.icon} />
          <Text style={[styles.label, isSelected && styles.labelSelected]}>
            {MOOD_MESSAGES[mood]}
          </Text>
        </Pressable>
      );
    })}
  </View>
);

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  item: {
    alignItems: "center",
    padding: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    width: 70,
  },
  itemSelected: {
    borderColor: "#0a7ea4",
    backgroundColor: "#0a7ea422",
  },
  icon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    marginBottom: 4,
  },
  label: {
    fontSize: 11,
    textAlign: "center",
    color: "#444",
  },
  labelSelected: {
    fontWeight: "bold",
    color: "#0a7ea4",
  },
});
