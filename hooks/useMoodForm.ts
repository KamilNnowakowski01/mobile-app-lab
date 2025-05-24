import { MoodValue } from "@/constants/Mood";
import { MoodEntry, moodServices } from "@/services/MoodServices";
import { useEffect, useState } from "react";

export function useMoodForm(id?: string) {
  const [date, setDate] = useState<Date | null>(new Date());
  const [mood, setMood] = useState<MoodValue | null>(null);
  const [note, setNote] = useState("");

  useEffect(() => {
    if (id) {
      const entry = moodServices.getMoodById(id);
      if (entry) {
        setDate(new Date(entry.date));
        setMood(entry.mood as MoodValue);
        setNote(entry.note ?? "");
      }
    }
  }, [id]);

  const resetForm = () => {
    setDate(null);
    setMood(null);
    setNote("");
  };

  const validateForm = (): string | null => {
    if (!date) return "Please select a date.";
    if (mood === null) return "Please select a mood.";
    if (note.length > 400) return "Note is too long (max 400 characters).";
    return null;
  };

  const getPayload = (): Omit<MoodEntry, "id"> => ({
    date: date!.toISOString().split("T")[0],
    mood: mood!,
    note: note.trim() || undefined,
  });

  return {
    date,
    setDate,
    mood,
    setMood,
    note,
    setNote,
    resetForm,
    validateForm,
    getPayload,
  };
}
