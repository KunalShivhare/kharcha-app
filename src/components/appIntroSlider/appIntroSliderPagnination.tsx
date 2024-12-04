import { StyleSheet, Animated, View, Dimensions } from "react-native";
import React from "react";
import { deviceWidth, resize } from "../../utils/deviceDimentions";
import { COLORS } from "../../providers/theme.style";

const AppIntroSliderPagination = ({ data, scrollX, index }) => {
  return (
    <View style={styles.container}>
      {data.map((_, idx) => {
        const inputRange = [
          (idx - 1) * deviceWidth,
          idx * deviceWidth,
          (idx + 1) * deviceWidth,
        ];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [resize(8), resize(16), resize(8)],
          extrapolate: "clamp",
        });

        const backgroundColor = scrollX.interpolate({
          inputRange,
          outputRange: [COLORS.light100, COLORS.primary, COLORS.light100],
          extrapolate: "clamp",
        });

        return (
          <Animated.View
            key={idx.toString()}
            style={[
              styles.dot,
              { width: dotWidth, backgroundColor },
              idx === index && styles.dotActive,
            ]}
          />
        );
      })}
    </View>
  );
};

export default AppIntroSliderPagination;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: resize(35),
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    gap: 8,
  },
  dot: {
    width: resize(8),
    height: resize(8),
    borderRadius: resize(50),
    marginHorizontal: 3,
    backgroundColor: COLORS.light100,
  },
  dotActive: {
    width: resize(16),
    height: resize(16),
    borderRadius: resize(50),
    backgroundColor: COLORS.primary,
  },
});
