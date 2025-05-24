import { EntryModal } from "@/components/EntryModal";
import { MoodStatsGrid } from "@/components/MoodStatsGrid";
import { SelectedWeekCard } from "@/components/SelectedWeekCard";
import { ThemedCard } from "@/components/ThemedCard";
import { ThemedText } from "@/components/ThemedText";
import { WeekCalendar } from "@/components/WeekCalendar";
import { MOOD_MAPPING } from "@/constants/Mood";
import { useWeeklyMood } from "@/hooks/useWeeklyMood";
import { MoodEntry, moodServices } from "@/services/MoodServices";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

export default function WeeklyScreen() {
  const router = useRouter();
  const {
    weekStart,
    weekEnd,
    setWeekStart,
    setWeekEnd,
    entriesMap,
    currentPct,
    previousPct,
    loadWeek,
  } = useWeeklyMood();

  const [selectedEntry, setSelectedEntry] = useState<MoodEntry | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const onDayPress = (day: { dateString: string }) => {
    const clicked = new Date(day.dateString);
    const weekday = clicked.getDay();
    const diffToMonday = (weekday + 6) % 7;
    const newWeekStart = new Date(clicked);
    newWeekStart.setDate(clicked.getDate() - diffToMonday);
    const newWeekEnd = new Date(newWeekStart);
    newWeekEnd.setDate(newWeekStart.getDate() + 6);
    setWeekStart(newWeekStart);
    setWeekEnd(newWeekEnd);
  };

  const onEntryPress = (entry: MoodEntry) => {
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
          loadWeek(weekStart, weekEnd);
        },
      },
    ]);
  };

  const weekDays = useMemo(() => {
    const days = [];
    const current = new Date(weekStart);
    for (let i = 0; i < 7; i++) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return days;
  }, [weekStart]);

  return (
    <View style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Weekly Mood
      </ThemedText>

      <SelectedWeekCard
        weekDays={weekDays}
        entriesMap={entriesMap}
        onEntryPress={onEntryPress}
      />

      <ThemedCard style={{ backgroundColor: "#fff" }}>
        <WeekCalendar
          weekStart={weekStart}
          weekEnd={weekEnd}
          onDayPress={onDayPress}
        />
      </ThemedCard>

      <MoodStatsGrid
        mapping={MOOD_MAPPING}
        subtitle="Selected 7 days"
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
