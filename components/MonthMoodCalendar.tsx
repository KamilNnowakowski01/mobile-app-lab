import { icons, MoodValue } from "@/constants/Mood";
import { MoodEntry } from "@/services/MoodServices";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Calendar } from "react-native-calendars";

type CalendarMonthChange = {
  year: number;
  month: number;
  day?: number;
  timestamp: number;
  dateString: string;
};

type MoodCalendarProps = {
  currentMonth: Date;
  onMonthChange: (date: Date) => void;
  moodData: Record<string, MoodEntry>;
  selectedEntry: MoodEntry | null;
  onDayPress: (entry: MoodEntry) => void;
};

export const MonthMoodCalendar: React.FC<MoodCalendarProps> = ({
  currentMonth,
  onMonthChange,
  moodData,
  selectedEntry,
  onDayPress,
}) => {
  const todayString = new Date().toISOString().slice(0, 10);

  return (
    <Calendar
      current={currentMonth.toISOString().slice(0, 10)}
      onMonthChange={(d: CalendarMonthChange) =>
        onMonthChange(new Date(d.year, d.month - 1, 1))
      }
      markedDates={{}}
      dayComponent={({ date }) => {
        if (!date) return null;

        const entry = moodData[date.dateString];
        const isCurrentMonth = date.month === currentMonth.getMonth() + 1;
        const isToday = date.dateString === todayString;

        return (
          <Pressable
            onPress={() => entry && onDayPress(entry)}
            style={({ pressed }) => [
              styles.dayCell,
              !isCurrentMonth && styles.dayCellInactive,
              pressed && styles.dayCellPressed,
            ]}
            android_ripple={null}
          >
            <Text
              style={[
                styles.dayNumber,
                isToday && styles.dayNumberToday,
                !isCurrentMonth && styles.dayNumberInactive,
              ]}
            >
              {date.day}
            </Text>

            {entry ? (
              <Image
                source={icons[(entry.mood as MoodValue) - 1]}
                style={[
                  styles.dayIcon,
                  !isCurrentMonth && styles.dayIconInactive,
                ]}
                resizeMode="contain"
              />
            ) : (
              <View style={styles.placeholderIcon} />
            )}
          </Pressable>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  dayCell: {
    alignItems: "center",
    paddingVertical: 4,
  },
  dayCellInactive: {
    opacity: 0.4,
  },
  dayCellPressed: {
    opacity: 0.6,
  },
  dayNumber: {
    fontSize: 14,
    color: "#000",
  },
  dayNumberToday: {
    fontWeight: "bold",
  },
  dayNumberInactive: {
    color: "#AAA",
  },
  dayIcon: {
    width: 24,
    height: 24,
    marginTop: 4,
  },
  dayIconInactive: {
    tintColor: "#AAA",
  },
  placeholderIcon: {
    width: 24,
    height: 24,
    marginTop: 4,
  },
});
