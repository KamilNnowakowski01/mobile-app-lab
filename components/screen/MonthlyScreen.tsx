import { EntryModal } from "@/components/EntryModal";
import { InfoCard } from "@/components/InfoCard";
import { MonthMoodCalendar } from "@/components/MonthMoodCalendar";
import { MoodStatsGrid } from "@/components/MoodStatsGrid";
import { ThemedCard } from "@/components/ThemedCard";
import { ThemedText } from "@/components/ThemedText";
import { MOOD_MAPPING, MOOD_MESSAGES, MoodValue } from "@/constants/Mood";
import { MoodEntry, moodServices } from "@/services/MoodServices";
import { router } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

export default function MonthlyScreen() {
  const [moodData, setMoodData] = useState<Record<string, MoodEntry>>({});
  const [selectedEntry, setSelectedEntry] = useState<MoodEntry | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [currentPct, setCurrentPct] = useState<Record<MoodValue, number>>({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
  });
  const [previousPct, setPreviousPct] = useState<Record<MoodValue, number>>({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
  });

  const loadMoodData = useCallback((month: number, year: number) => {
    const entries = moodServices.getMoodsByMonthYear(month, year);
    const formatted: Record<string, MoodEntry> = {};
    entries.forEach((e) => {
      formatted[e.date] = e;
    });
    setMoodData(formatted);

    const startCurrent = new Date(year, month, 1);
    const endCurrent = new Date(year, month + 1, 0);
    setCurrentPct(
      moodServices.getMoodStatsForPeriod(startCurrent, endCurrent) as Record<
        MoodValue,
        number
      >
    );

    const endPrev = new Date(startCurrent.getTime() - 1);
    const startPrev = new Date(endPrev.getFullYear(), endPrev.getMonth(), 1);
    setPreviousPct(
      moodServices.getMoodStatsForPeriod(startPrev, endPrev) as Record<
        MoodValue,
        number
      >
    );
  }, []);

  useEffect(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    loadMoodData(month, year);
  }, [currentMonth, loadMoodData]);

  const handleMonthChange = (newDate: Date) => {
    setCurrentMonth(newDate);
  };

  const handleDayPress = (entry: MoodEntry) => {
    setSelectedEntry(entry);
    setModalVisible(true);
  };

  const handleEdit = () => {
    if (!selectedEntry) return;
    setModalVisible(false);
    router.push(`/form?id=${selectedEntry.id}`);
  };

  const handleDelete = () => {
    if (!selectedEntry) return;
    setModalVisible(false);

    Alert.alert("Delete Entry", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          moodServices.removeMood(selectedEntry.id);
          const year = currentMonth.getFullYear();
          const month = currentMonth.getMonth();
          loadMoodData(month, year);
        },
      },
    ]);
  };

  const latest = moodServices.getLatestMoodEntry();
  const latestMood = (latest?.mood ?? 2) as MoodValue;

  return (
    <View style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Monthly Mood
      </ThemedText>

      <InfoCard
        title="Latest Mood Entry"
        date={latest?.date}
        description={latest?.note}
        image={MOOD_MAPPING[latestMood].image}
        imageDescription={MOOD_MESSAGES[latestMood]}
      />

      <ThemedCard style={{ backgroundColor: "#fff" }}>
        <MonthMoodCalendar
          currentMonth={currentMonth}
          onMonthChange={handleMonthChange}
          moodData={moodData}
          selectedEntry={selectedEntry}
          onDayPress={handleDayPress}
        />
      </ThemedCard>

      <MoodStatsGrid
        mapping={MOOD_MAPPING}
        subtitle="Selected month"
        currentPct={currentPct}
        previousPct={previousPct}
      />

      <EntryModal
        visible={modalVisible}
        entry={selectedEntry}
        onClose={() => setModalVisible(false)}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    marginBottom: 20,
  },
});
