import { useFocusEffect } from "@react-navigation/native";
import { format } from "date-fns";
import { useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { Alert, FlatList, SafeAreaView, StyleSheet, View } from "react-native";

import { CardHistory } from "@/components/CardHistory";
import { LoadMoreButton } from "@/components/LoadMoreButton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { MOOD_MAPPING, MoodValue } from "@/constants/Mood";
import { MoodEntry, moodServices } from "@/services/MoodServices";

export default function History() {
  const router = useRouter();
  const [allEntries, setAllEntries] = useState<MoodEntry[]>([]);
  const [displayedEntries, setDisplayedEntries] = useState<MoodEntry[]>([]);
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 4;

  const loadEntries = useCallback(() => {
    const entries = moodServices.getAll().slice().reverse();
    setAllEntries(entries);
    setPage(1);
    setDisplayedEntries(entries.slice(0, ITEMS_PER_PAGE));
  }, []);

  useFocusEffect(
  useCallback(() => {
    loadEntries();
  }, [loadEntries])
);

  const loadMore = () => {
    const nextPage = page + 1;
    const end = nextPage * ITEMS_PER_PAGE;
    if (displayedEntries.length < allEntries.length) {
      setDisplayedEntries(allEntries.slice(0, end));
      setPage(nextPage);
    }
  };

  const handleDelete = useCallback(
    (id: string) => {
      Alert.alert(
        "Delete Entry",
        "Are you sure you want to delete this mood entry?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Delete",
            style: "destructive",
            onPress: () => {
              moodServices.removeMood(id);
              loadEntries();
            },
          },
        ]
      );
    },
    [loadEntries]
  );

  const handleEdit = useCallback(
    (id: string) => {
      router.push(`/form?id=${id}`);
    },
    [router]
  );

  const renderItem = useCallback(
    ({ item }: { item: MoodEntry }) => {
      const mood = item.mood as MoodValue;
      return (
        <View style={styles.cardWrapper}>
          <CardHistory
            title={format(new Date(item.date), "yyyy-MM-dd")}
            image={MOOD_MAPPING[mood].image}
            mood={mood}
            subtitle={item.note ?? ""}
            onEdit={() => handleEdit(item.id)}
            onDelete={() => handleDelete(item.id)}
          />
        </View>
      );
    },
    [handleEdit, handleDelete]
  );

  const renderFooter = () =>
    displayedEntries.length >= allEntries.length ? null : (
      <LoadMoreButton onPress={loadMore} />
    );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.titleContainer}>
        <ThemedText type="title">Mood History</ThemedText>
      </View>
      <ThemedView>
        <FlatList
          data={displayedEntries}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ListFooterComponent={renderFooter}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  titleContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ccc",
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 85,
    alignItems: "center",
  },
  cardWrapper: {
    width: "100%",
    maxWidth: 600,
    marginBottom: 16,
  },
});
