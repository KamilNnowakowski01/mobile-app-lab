import { HalfWidthCard } from "@/components/HalfWidthCard";
import { MoodMapping } from "@/constants/Mood";
import React from "react";
import { StyleSheet, View } from "react-native";

export type MoodValue = 1 | 2 | 3 | 4;

const DEFAULT_GROUPS: MoodValue[][] = [
  [4, 3],
  [2, 1],
];

type Props = {
  subtitle?: string;
  mapping: MoodMapping;
  currentPct: Record<MoodValue, number>;
  previousPct: Record<MoodValue, number>;
  groups?: MoodValue[][];
};

export const MoodStatsGrid: React.FC<Props> = ({
  mapping,
  subtitle,
  currentPct,
  previousPct,
  groups = DEFAULT_GROUPS,
}) => (
  <View style={styles.grid}>
    {groups.flat().map((mood) => (
      <HalfWidthCard
        key={mood}
        title={mapping[mood].title}
        subtitle={subtitle}
        image={mapping[mood].image}
        currentPercentage={currentPct[mood]}
        previousPercentage={previousPct[mood]}
      />
    ))}
  </View>
);

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});
