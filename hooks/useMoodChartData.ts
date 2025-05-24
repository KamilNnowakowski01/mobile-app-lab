import { MoodEntry, moodServices } from "@/services/MoodServices";
import { useMemo } from "react";

export function useMoodChartData() {
  const entries: MoodEntry[] = moodServices.getAll();

  const counts = useMemo(() => {
    const c: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0 };
    entries.forEach((e) => {
      c[e.mood] = (c[e.mood] || 0) + 1;
    });
    return c;
  }, [entries]);

  const data = useMemo(
    () =>
      [1, 2, 3, 4].map((mood) => ({
        value: counts[mood],
      })),
    [counts]
  );

  const rawMax = Math.max(...Object.values(counts), 1);
  const maxValue = Math.ceil(rawMax / 5) * 5;

  return { data, maxValue };
}
