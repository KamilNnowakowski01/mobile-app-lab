import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";

import { VerticalIconColumn } from "@/components/VerticalIconColumn";
import { icons } from "@/constants/Mood";
import { useMoodChartData } from "@/hooks/useMoodChartData";

export const HorizontalBarChart = () => {
  const { data, maxValue } = useMoodChartData();

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Mood Distribution</Text>
      <View style={styles.row}>
        <VerticalIconColumn
          icons={icons}
          spacing={12}
          iconSize={28}
          marginTop={55}
        />
        <View style={styles.chartBox}>
          <BarChart
            data={data}
            width={180}
            height={170}
            horizontal
            barWidth={20}
            spacing={20}
            noOfSections={5}
            maxValue={maxValue}
            barBorderRadius={4}
            frontColor="#af51f2"
            xAxisLabelTextStyle={{ color: "transparent" }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    margin: 16,
    paddingBottom: 50,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingBottom: 16,
  },
  chartBox: {
    marginLeft: -50,
  },
});
