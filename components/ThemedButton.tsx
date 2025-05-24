import { useThemeColor } from "@/hooks/useThemeColor";
import {
  Pressable,
  StyleSheet,
  Text,
  ViewStyle,
  type PressableProps,
} from "react-native";

export type ThemedButtonProps = PressableProps & {
  lightColor?: string;
  darkColor?: string;
  title: string;
  type?: "primary" | "secondary" | "outline" | "link";
};

export function ThemedButton({
  lightColor,
  darkColor,
  title,
  type = "primary",
  style,
  ...rest
}: ThemedButtonProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "buttonBackground"
  );
  const textColor = useThemeColor({}, "buttonText");

  return (
    <Pressable
      style={({ pressed }) => [
        styles.base,
        type === "primary" && { backgroundColor },
        type === "secondary" && styles.secondary,
        type === "outline" && styles.outline,
        type === "link" && styles.link,
        pressed && styles.pressed,
        style as ViewStyle,
      ]}
      {...rest}
    >
      <Text
        style={[
          styles.text,
          (type === "outline" || type === "link") && { color: backgroundColor },
          type === "secondary" && { color: "#333" },
          type === "primary" && { color: textColor },
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
  secondary: {
    backgroundColor: "#f0f0f0",
  },
  outline: {
    borderWidth: 1,
    borderColor: "#999",
    backgroundColor: "transparent",
  },
  link: {
    backgroundColor: "transparent",
    paddingHorizontal: 0,
    paddingVertical: 4,
  },
  pressed: {
    opacity: 0.7,
  },
});
