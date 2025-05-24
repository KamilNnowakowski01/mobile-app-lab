import { ThemedCard } from "@/components/ThemedCard";
import { ThemedText } from "@/components/ThemedText";
import React from "react";
import { Image, StyleSheet } from "react-native";

type InfoCardProps = {
  title: string;
  date?: string | undefined;
  description?: string | undefined;
  image: any;
  imageDescription: string;
};

export const InfoCard: React.FC<InfoCardProps> = ({
  title,
  date,
  description,
  image,
  imageDescription,
}) => {
  return (
    <ThemedCard>
      <ThemedText type="subtitle">{title}</ThemedText>
      {!!date ? (
        <ThemedText type="default" style={styles.boxText}>
          Date: {date}
        </ThemedText>
      ) : undefined}
      {!!description ? (
        <ThemedText type="default" style={styles.boxText}>
          Note: {description}
        </ThemedText>
      ) : undefined}

      <Image source={image} style={styles.image} resizeMode="cover" />
      <ThemedText type="defaultSemiBold" style={styles.boxText}>
        {imageDescription}
      </ThemedText>
    </ThemedCard>
  );
};

const styles = StyleSheet.create({
  image: {
    marginTop: 15,
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  boxText: {
    marginTop: 8,
    textAlign: "center",
  },
});
