import { ThemedCard } from "@/components/ThemedCard";
import { ThemedText } from "@/components/ThemedText";
import { MOOD_MAPPING, MoodValue } from "@/constants/Mood";
import { MoodEntry } from "@/types/MoodEntry";
import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";

type Props = {
  weekDays: Date[];
  entriesMap: Record<string, MoodEntry>;
  onEntryPress: (entry: MoodEntry) => void;
};

export const SelectedWeekCard: React.FC<Props> = ({
  weekDays,
  entriesMap,
  onEntryPress,
}) => {
  return (
    <ThemedCard>
      <ThemedText type="subtitle">Selected Week</ThemedText>
      <View style={styles.weekRow}>
        {weekDays.map((d) => {
          const key = d.toISOString().slice(0, 10);
          const entry = entriesMap[key];
          return (
            <Pressable
              key={key}
              style={styles.weekCell}
              onPress={() => entry && onEntryPress(entry)}
            >
              <ThemedText style={styles.weekDayNumber}>
                {d.getDate()}
              </ThemedText>
              {entry ? (
                <Image
                  source={MOOD_MAPPING[entry.mood as MoodValue].image}
                  style={styles.weekIcon}
                  resizeMode="contain"
                />
              ) : (
                <View style={styles.weekPlaceholder} />
              )}
            </Pressable>
          );
        })}
      </View>
    </ThemedCard>
  );
};

const styles = StyleSheet.create({
  weekRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 12,
  },
  weekCell: {
    alignItems: "center",
    width: "13%",
  },
  weekDayNumber: {
    fontSize: 14,
    marginBottom: 4,
  },
  weekIcon: {
    width: 24,
    height: 24,
  },
  weekPlaceholder: {
    width: 24,
    height: 24,
  },
});
