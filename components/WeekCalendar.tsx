import React, { useMemo } from "react";
import { Calendar } from "react-native-calendars";

export const WeekCalendar = ({
  weekStart,
  weekEnd,
  onDayPress,
}: {
  weekStart: Date;
  weekEnd: Date;
  onDayPress: (day: any) => void;
}) => {
  const formatDate = (date: Date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}`;

  const markedDates = useMemo(() => {
    const m: Record<string, any> = {};
    const d = new Date(weekStart);
    while (d <= weekEnd) {
      const k = formatDate(d);
      m[k] = {
        color: "#cde1f9",
        startingDay: k === formatDate(weekStart),
        endingDay: k === formatDate(weekEnd),
      };
      d.setDate(d.getDate() + 1);
    }

    const today = formatDate(new Date());
    if (m[today]) {
      m[today].customStyles = {
        container: { borderColor: "#11bcec", borderWidth: 2 },
      };
    }

    return m;
  }, [weekStart, weekEnd]);

  return (
    <Calendar
      markingType="period"
      markedDates={markedDates}
      onDayPress={onDayPress}
      firstDay={1}
    />
  );
};
