import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, ViewStyle } from 'react-native';

interface LoadingDotsProps {
  dotColor?: string;
  dotSize?: number;
  duration?: number;
  style?: ViewStyle;
}

const LoadingDots: React.FC<LoadingDotsProps> = ({
  dotColor = '#000',
  dotSize = 10,
  duration = 500,
  style,
}) => {
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animateDot = (dot: Animated.Value, delay: number) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(dot, {
            toValue: 1,
            duration,
            delay,
            useNativeDriver: true,
          }),
          Animated.timing(dot, {
            toValue: 0,
            duration,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    animateDot(dot1, 0);
    animateDot(dot2, duration / 2);
    animateDot(dot3, duration);

    return () => {
      dot1.stopAnimation();
      dot2.stopAnimation();
      dot3.stopAnimation();
    };
  }, [dot1, dot2, dot3, duration]);

  const dotStyle = (opacity: Animated.Value): ViewStyle => ({
    opacity,
    backgroundColor: dotColor,
    width: dotSize,
    height: dotSize,
    borderRadius: dotSize / 2,
    marginHorizontal: dotSize / 4,
  });

  return (
    <View style={[styles.container, style]}>
      <Animated.View style={dotStyle(dot1)} />
      <Animated.View style={dotStyle(dot2)} />
      <Animated.View style={dotStyle(dot3)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LoadingDots;
