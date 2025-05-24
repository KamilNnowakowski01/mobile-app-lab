import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import ContainerView from "@/components/ContainerView";
import MonthlyScreen from "@/components/screen/MonthlyScreen";
import TotallyScreen from "@/components/screen/TotallyScreen";
import WeeklyScreen from "@/components/screen/WeeklyScreen";
import { ThemedButton } from "@/components/ThemedButton";

type ScreenKey = "weekly" | "monthly" | "totally";
export default function HomeScreen() {
  const SCREENS: {
    key: ScreenKey;
    label: string;
    component: React.ReactNode;
  }[] = [
    { key: "weekly", label: "Weekly", component: <WeeklyScreen /> },
    { key: "monthly", label: "Monthly", component: <MonthlyScreen /> },
    { key: "totally", label: "Totally", component: <TotallyScreen /> },
  ];

  const [screen, setScreen] = useState<ScreenKey>("weekly");
  const currentScreen = SCREENS.find((s) => s.key === screen)?.component;

  return (
    <ContainerView backgroundColorLight="#6bbad6">
      <View style={styles.buttonsContainer}>
        {SCREENS.map(({ key, label }) => (
          <ThemedButton
            key={key}
            title={label}
            type={screen === key ? "primary" : "outline"}
            onPress={() => setScreen(key)}
          />
        ))}
      </View>
      <View style={styles.container}>{currentScreen}</View>
    </ContainerView>
  );
}

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 8,
  },
  container: {
    marginTop: 24,
  },
});
