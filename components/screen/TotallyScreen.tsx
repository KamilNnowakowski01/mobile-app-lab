import { HalfWidthCard } from "@/components/HalfWidthCard";
import { HorizontalBarChart } from "@/components/HorizontalBarChart";
import { InfoCard } from "@/components/InfoCard";
import { ThemedText } from "@/components/ThemedText";
import { MOOD_MAPPING, MOOD_MESSAGES, MoodValue } from "@/constants/Mood";
import { moodServices } from "@/services/MoodServices";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

export default function TotallyScreen() {
  const [allPct, setAllPct] = useState<Record<MoodValue, number>>({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
  });

  const [moodCounts, setMoodCounts] = useState<Record<MoodValue, number>>({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
  });

  useEffect(() => {
    const entries = moodServices.getAll();
    if (entries.length === 0) return;

    const earliest = new Date(
      Math.min(...entries.map((e) => new Date(e.date).getTime()))
    );
    const today = new Date();

    // Statystyki %
    const stats = moodServices.getMoodStatsForPeriod(earliest, today) as Record<
      MoodValue,
      number
    >;
    setAllPct(stats);

    // Zliczenie wystąpień
    const counts: Record<MoodValue, number> = { 1: 0, 2: 0, 3: 0, 4: 0 };
    entries.forEach((e) => {
      const mood = e.mood as MoodValue;
      counts[mood] += 1;
    });
    setMoodCounts(counts);
  }, []);

  const latest = moodServices.getLatestMoodEntry();
  const latestMood = (latest?.mood ?? 2) as MoodValue;

  const moodKeys: MoodValue[] = [3, 2, 4, 1]; // Kolejność: Good, Neutral, Happy, Sad

  return (
    <View style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Totally Mood
      </ThemedText>

      <InfoCard
        title="Latest Mood Entry"
        date={latest?.date}
        description={latest?.note}
        image={MOOD_MAPPING[latestMood].image}
        imageDescription={MOOD_MESSAGES[latestMood]}
      />

      <HorizontalBarChart />

      <View style={styles.cardGrid}>
        {moodKeys.map((mood) => (
          <HalfWidthCard
            key={mood}
            title={MOOD_MAPPING[mood].title}
            subtitle="Total data"
            image={MOOD_MAPPING[mood].image}
            currentPercentage={allPct[mood]}
            bottomText={`Counted: ${moodCounts[mood]}`}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: {
    marginBottom: 20,
  },
  cardGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginVertical: 16,
  },
});
