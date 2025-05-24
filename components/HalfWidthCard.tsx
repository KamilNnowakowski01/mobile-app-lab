import { Image } from "expo-image";
import React from "react";
import { StyleSheet, View } from "react-native";

import { ThemedCard } from "@/components/ThemedCard";
import { ThemedText } from "@/components/ThemedText";

type HalfWidthCardProps = {
  title: string;
  subtitle?: string;
  image: any;
  currentPercentage: number;
  previousPercentage?: number;
  bottomText?: string;
};

export const HalfWidthCard: React.FC<HalfWidthCardProps> = ({
  title,
  subtitle = "Last 30 days",
  image,
  currentPercentage = 0,
  previousPercentage,
  bottomText,
}) => {
  return (
    <ThemedCard style={styles.box}>
      <ThemedText type="defaultSemiBold">{title}</ThemedText>
      <ThemedText type="default" style={styles.subtitle}>
        {subtitle}
      </ThemedText>

      <View style={styles.row}>
        <Image
          source={image}
          alt={`Current ${currentPercentage}%`}
          style={styles.icon}
          contentFit="cover"
        />
      </View>

      <ThemedText style={styles.percentage}>
        {`${currentPercentage}%`}
      </ThemedText>

      {previousPercentage !== undefined && (
        <ThemedText style={styles.beforeText}>
          {`Before: ${previousPercentage}%`}
        </ThemedText>
      )}

      {bottomText && (
        <ThemedText style={styles.beforeText}>{bottomText}</ThemedText>
      )}
    </ThemedCard>
  );
};

const styles = StyleSheet.create({
  box: {
    width: "44%",
  },
  subtitle: {
    fontSize: 12,
    marginBottom: 4,
  },
  row: {
    marginBottom: 8,
  },
  icon: {
    width: 40,
    height: 40,
  },
  percentage: {
    fontSize: 24,
    flexShrink: 1,
  },
  beforeText: {
    fontSize: 14,
    color: "#64748b",
  },
});
