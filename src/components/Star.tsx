import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  Easing,
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from 'react-native-reanimated';

interface StarProps {
  paddingBottom?: number;
  isTaskStarted?: boolean;
}

const CIRCLE_SIZE = 250;

const Star = ({ paddingBottom, isTaskStarted }: StarProps) => {
  const topColors = ['#130071', '#E380FF'];
  const bottomColors = ['#FF9747', '#650027'];
  const gradientColors = [...topColors, '#FFFFFF', ...bottomColors];

  const translateY = useSharedValue(-1);

  const handleLayout = () => {
    translateY.value = withTiming(-CIRCLE_SIZE, {
      duration: 50000,
      easing: Easing.out(Easing.ease),
    });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <View style={{ ...styles.container, paddingBottom }}>
      <View style={styles.shadowContainer} onLayout={handleLayout}>
        <View style={styles.innerContainer}>
          <LinearGradient
            colors={gradientColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            locations={[0, 0.34, 0.5, 0.79, 1]}
            style={styles.gradient}
          />

          {!isTaskStarted && (
            <Animated.View style={[styles.cover, animatedStyle]} />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  shadowContainer: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
  },

  innerContainer: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    overflow: 'hidden', // ★ 핵심
    position: 'relative',
  },

  gradient: {
    width: '100%',
    height: '100%',
    borderRadius: CIRCLE_SIZE / 2,
  },

  cover: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: CIRCLE_SIZE,
    backgroundColor: 'rgba(255, 0, 0, 0.5)',
  },
});

export default Star;
