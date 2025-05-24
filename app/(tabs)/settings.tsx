import React, { useState } from "react";
import { StyleSheet, Switch, View } from "react-native";

import { Collapsible } from "@/components/Collapsible";
import ContainerView from "@/components/ContainerView";
import { ThemedText } from "@/components/ThemedText";

export default function Settings() {
  const [isDarkMode] = useState(false);
  const [notificationsEnabled] = useState(true);
  const [disableTracking] = useState(false);
  const [disableSounds] = useState(false);
  const [disableTips] = useState(false);

  return (
    <ContainerView backgroundColorLight="#f5f5f5">
      <View style={styles.titleContainer}>
        <ThemedText type="title">Settings</ThemedText>
      </View>

      <View style={styles.section}>
        <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
          Preferences
        </ThemedText>

        <View style={styles.switchRow}>
          <ThemedText style={styles.label}>Disable Notifications</ThemedText>
          <Switch value={!notificationsEnabled} disabled />
        </View>

        <View style={styles.switchRow}>
          <ThemedText style={styles.label}>Disable Tracking</ThemedText>
          <Switch value={disableTracking} disabled />
        </View>

        <View style={styles.switchRow}>
          <ThemedText style={styles.label}>Disable Sounds</ThemedText>
          <Switch value={disableSounds} disabled />
        </View>

        <View style={styles.switchRow}>
          <ThemedText style={styles.label}>Disable Tips</ThemedText>
          <Switch value={disableTips} disabled />
        </View>
      </View>

      <View style={styles.sectionInfo}>
        <ThemedText type="title" style={styles.information}>
          Application Information
        </ThemedText>

        <Collapsible title="Home Screen">
          <ThemedText>
            This screen shows your mood overview and allows you to navigate to
            different features.
          </ThemedText>
        </Collapsible>

        <Collapsible title="Weekly Mood">
          <ThemedText>
            View a full week of mood entries using a calendar and mood stats
            with comparisons to the previous week.
          </ThemedText>
        </Collapsible>

        <Collapsible title="Monthly Mood">
          <ThemedText>
            Visualize mood data using a monthly calendar with color-coded moods
            and a monthly stats breakdown.
          </ThemedText>
        </Collapsible>

        <Collapsible title="Totally Mood">
          <ThemedText>
            Displays cumulative mood statistics across all time, including mood
            frequency and bar chart insights.
          </ThemedText>
        </Collapsible>

        <Collapsible title="Mood History">
          <ThemedText>
            Paginated list of all mood entries. Allows editing or deleting any
            past mood entry.
          </ThemedText>
        </Collapsible>

        <Collapsible title="Add/Edit Mood Entry">
          <ThemedText>
            A form for creating or updating a mood entry. Supports mood
            selection, note input, and date picking.
          </ThemedText>
        </Collapsible>

        <Collapsible title="Posts (Example API)">
          <ThemedText>
            Demo screen showing posts from a mock API. Supports pagination and
            comment expansion per post.
          </ThemedText>
        </Collapsible>

        <Collapsible title="Settings">
          <ThemedText>
            Mock settings screen that simulates user preferences and presents
            informational content about the app’s structure and features.
          </ThemedText>
        </Collapsible>
      </View>
    </ContainerView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  information: {
    fontSize: 24,
    marginBottom: 12,
  },
  section: {
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ccc",
  },
  sectionInfo: {
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ccc",
    gap: 12,
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 12,
  },
  collapsible: {
    marginBottom: 12,
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  label: {
    fontSize: 15,
  },
});
