import moodJson from "@/data/mood_entries.json";

export type MoodEntry = {
  id: string;
  date: string;
  mood: number;
  note?: string;
};

class MoodServices {
  private moods: MoodEntry[] = moodJson;

  getAll(): MoodEntry[] {
    return [...this.moods];
  }

  addMood(entry: MoodEntry): void {
    this.moods.push(entry);
  }

  removeMood(id: string): boolean {
    const index = this.moods.findIndex((m) => m.id === id);
    if (index === -1) return false;
    this.moods.splice(index, 1);
    return true;
  }

  updateMood(id: string, updatedData: Partial<Omit<MoodEntry, "id">>): boolean {
    const mood = this.moods.find((m) => m.id === id);
    if (!mood) return false;

    Object.assign(mood, updatedData);
    return true;
  }

  getMoodById(id: string): MoodEntry | undefined {
    return this.moods.find((m) => m.id === id);
  }

  getMoodsByMonthYear(month: number, year: number): MoodEntry[] {
    return this.moods.filter((entry) => {
      const dateObj = new Date(entry.date);
      return dateObj.getMonth() === month && dateObj.getFullYear() === year;
    });
  }

  getMoodsByDateRange(startDate: Date, endDate: Date): MoodEntry[] {
    return this.moods.filter((entry) => {
      const dateObj = new Date(entry.date);
      return dateObj >= startDate && dateObj <= endDate;
    });
  }

  getMoodStatsForPeriod(
    startDate: Date,
    endDate: Date
  ): { [mood: number]: number } {
    const filtered = this.getMoodsByDateRange(startDate, endDate);
    const total = filtered.length;
    const counts: { [mood: number]: number } = { 1: 0, 2: 0, 3: 0, 4: 0 };

    filtered.forEach((entry) => {
      counts[entry.mood] = (counts[entry.mood] || 0) + 1;
    });

    const percentages: { [mood: number]: number } = {};
    if (total === 0) {
      [1, 2, 3, 4].forEach((mood) => (percentages[mood] = 0));
    } else {
      [1, 2, 3, 4].forEach((mood) => {
        percentages[mood] = Math.round((counts[mood] / total) * 100);
      });
    }

    return percentages;
  }

  getLatestMoodEntry(): MoodEntry | null {
    if (this.moods.length === 0) return null;
    const sorted = [...this.moods].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    return sorted[0];
  }
}

export const moodServices = new MoodServices();
