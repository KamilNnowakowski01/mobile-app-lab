import { StyleSheet, View, type ViewProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedCardProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedCard({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedCardProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "backgroundCard"
  );

  return (
    <View
      style={[styles.default, { backgroundColor }, style]}
      {...otherProps}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    padding: 16,
    margin: 8,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    alignItems: "center",
  },
});
