import { MoodValue } from "@/constants/Mood";
import { MoodEntry, moodServices } from "@/services/MoodServices";
import { useCallback, useEffect, useState } from "react";

function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function useWeeklyMood() {
  const [weekStart, setWeekStart] = useState(() => {
    const t = new Date();
    const dow = (t.getDay() + 6) % 7;
    t.setDate(t.getDate() - dow);
    return t;
  });
  const [weekEnd, setWeekEnd] = useState(() => {
    const t = new Date();
    const dow = (t.getDay() + 6) % 7;
    t.setDate(t.getDate() + (6 - dow));
    return t;
  });

  const [entriesMap, setEntriesMap] = useState<Record<string, MoodEntry>>({});
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

  const loadWeek = useCallback((start: Date, end: Date) => {
    const arr = moodServices.getMoodsByDateRange(start, end);
    const map: Record<string, MoodEntry> = {};
    arr.forEach((e) => (map[e.date] = e));
    setEntriesMap(map);

    const curr = moodServices.getMoodStatsForPeriod(start, end) as Record<
      MoodValue,
      number
    >;
    setCurrentPct(curr);

    const prevEnd = new Date(start.getTime() - 1);
    const prevStart = new Date(prevEnd);
    prevStart.setDate(prevEnd.getDate() - 6);
    const prev = moodServices.getMoodStatsForPeriod(
      prevStart,
      prevEnd
    ) as Record<MoodValue, number>;
    setPreviousPct(prev);
  }, []);

  useEffect(() => {
    loadWeek(weekStart, weekEnd);
  }, [weekStart, weekEnd, loadWeek]);

  return {
    weekStart,
    weekEnd,
    setWeekStart,
    setWeekEnd,
    entriesMap,
    currentPct,
    previousPct,
    loadWeek,
    formatDate,
  };
}
