import { Image } from "expo-image";
import type { PropsWithChildren } from "react";
import { StyleSheet } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";

type Props = PropsWithChildren<{
  title?: string;
  backgroundColorLight?: string;
  backgroundColorDark?: string;
}>;

export default function ContainerView({
  children,
  title = "Mood Tracker",
  backgroundColorLight = "#A1CEDC",
  backgroundColorDark = "#1D3D47",
}: Props) {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{
        light: backgroundColorLight,
        dark: backgroundColorDark,
      }}
      headerImage={
        <>
          <Image
            source={require("@/assets/images/img-bg-clear.png")}
            style={styles.image}
          />
          <ThemedText type="title" style={styles.titleText}>
            {title}
          </ThemedText>
        </>
      }
    >
      {children}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  image: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  titleText: {
    position: "absolute",
    top: 85,
    alignSelf: "center",
    lineHeight: 48,
    fontSize: 48,
    textShadowColor: "rgba(69, 69, 69, 0.85)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 5,
  },
});
