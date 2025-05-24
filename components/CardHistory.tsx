import { ThemedCard } from "@/components/ThemedCard";
import { ThemedText } from "@/components/ThemedText";
import { MOOD_MESSAGES, MoodValue } from "@/constants/Mood";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

export type CardHistoryProps = {
  title: string;
  image: any;
  mood: MoodValue;
  subtitle: string;
  onEdit?: () => void;
  onDelete?: () => void;
};

export const CardHistory: React.FC<CardHistoryProps> = ({
  title,
  image,
  mood,
  subtitle,
  onEdit,
  onDelete,
}) => {
  const message = MOOD_MESSAGES[mood];

  return (
    <ThemedCard style={styles.card}>
      <ThemedText type="default" style={styles.label}>
        Date
      </ThemedText>
      <ThemedText>{title}</ThemedText>

      <View style={styles.row}>
        <Image source={image} style={styles.image} />
        <ThemedText type="defaultSemiBold">{message}</ThemedText>
      </View>

      <ThemedText type="default" style={styles.label}>
        Note
      </ThemedText>
      <ThemedText>{subtitle || "-"}</ThemedText>

      <View style={styles.separator} />

      <View style={styles.buttonRow}>
        {onEdit && (
          <TouchableOpacity
            onPress={onEdit}
            style={[styles.button, styles.edit]}
          >
            <ThemedText type="default" style={styles.buttonText}>
              Edit
            </ThemedText>
          </TouchableOpacity>
        )}
        {onDelete && (
          <TouchableOpacity
            onPress={onDelete}
            style={[styles.button, styles.delete]}
          >
            <ThemedText type="default" style={styles.buttonText}>
              Delete
            </ThemedText>
          </TouchableOpacity>
        )}
      </View>
    </ThemedCard>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 4,
    maxWidth: 280,
    minWidth: 240,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    marginTop: 24,
  },
  image: {
    width: 36,
    height: 36,
    marginRight: 12,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    marginTop: 8,
    color: "#555",
  },
  value: {
    fontSize: 15,
    marginBottom: 4,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#ccc",
    marginVertical: 12,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  edit: {
    backgroundColor: "#3b82f6",
  },
  delete: {
    backgroundColor: "#ef4444",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
