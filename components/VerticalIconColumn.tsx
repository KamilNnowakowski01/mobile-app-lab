import React from "react";
import { Image, ImageSourcePropType, StyleSheet, View } from "react-native";

type VerticalIconColumnProps = {
  icons: ImageSourcePropType[];
  spacing?: number;
  iconSize?: number;
  marginBottom?: number;
  marginTop?: number;
};

export const VerticalIconColumn: React.FC<VerticalIconColumnProps> = ({
  icons,
  spacing = 16,
  iconSize = 32,
  marginBottom = 0,
  marginTop = 0,
}) => {
  return (
    <View
      style={[
        styles.container,
        { marginBottom: marginBottom, marginTop: marginTop },
      ]}
    >
      {icons.map((icon, index) => (
        <Image
          key={index}
          source={icon}
          style={{
            width: iconSize,
            height: iconSize,
            marginBottom: index < icons.length - 1 ? spacing : 0,
          }}
          resizeMode="contain"
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
  },
});
