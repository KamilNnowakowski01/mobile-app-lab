import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import uuid from 'react-native-uuid';


import ContainerView from "@/components/ContainerView";
import { DatePickerInput } from "@/components/DatePickerInput";
import { MoodSelector } from "@/components/MoodSelector";
import { NoteInput } from "@/components/NoteInput";
import { SubmitButton } from "@/components/SubmitButton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useMoodForm } from "@/hooks/useMoodForm";
import { MoodEntry, moodServices } from "@/services/MoodServices";

export default function FormScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id?: string }>();
  const id = params.id;

  const {
    date,
    setDate,
    mood,
    setMood,
    note,
    setNote,
    resetForm,
    validateForm,
    getPayload,
  } = useMoodForm(id);

  const handleAdd = () => {
    const newEntry: MoodEntry = {
      id: uuid.v4() as string,
      ...getPayload(),
    };
    moodServices.addMood(newEntry);
    Alert.alert("Success", "Mood entry added!", [
      {
        text: "OK",
        onPress: () => {
          resetForm();
          router.replace("/");
        },
      },
    ]);
  };

  const handleUpdate = () => {
    const updated = moodServices.updateMood(id!, getPayload());
    if (updated) {
      Alert.alert("Success", "Mood entry updated!", [
        {
          text: "OK",
          onPress: () => {
            resetForm();
            router.replace("/form");
          },
        },
      ]);
    } else {
      Alert.alert("Error", "Failed to update entry.");
    }
  };

  const handleSubmit = () => {
    const error = validateForm();
    if (error) return Alert.alert("Invalid form", error);
    id ? handleUpdate() : handleAdd();
  };

  const handleCancel = () => {
    resetForm();
    router.replace("/form");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ContainerView title="Mood Tracker" backgroundColorLight="#ffe987">
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">
            {id ? "Edit existing mood" : "Create new mood"}
          </ThemedText>
        </ThemedView>

        <View style={styles.inputWrapper}>
          <ThemedText style={styles.label}>Select Date</ThemedText>
          <DatePickerInput value={date} onChange={setDate} />
        </View>

        <ThemedText style={styles.label}>Select Mood</ThemedText>
        <MoodSelector selected={mood} onSelect={setMood} />

        <ThemedText style={styles.label}>Note</ThemedText>
        <NoteInput value={note} onChange={setNote} />

        <View style={styles.containerButtons}>
          {id && (
            <Pressable style={styles.cancelButton} onPress={handleCancel}>
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>
          )}
          <SubmitButton
            onPress={handleSubmit}
            title={id ? "Update Mood" : "Save Mood"}
          />
        </View>
      </ContainerView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 20,
  },
  inputWrapper: {
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "500",
  },
  cancelButton: {
    marginTop: 12,
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#ff4646",
    borderRadius: 6,
  },
  cancelText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  containerButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
