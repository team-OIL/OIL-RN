import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  Easing,
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  runOnJS,
} from 'react-native-reanimated';
import { TaskStage } from '../../types/TaskStage';

interface TaskData {
  durationTime: number;
}
interface StarProps {
  paddingBottom?: number;
  taskStage?: TaskStage;
  second?: number;
  setTaskStage?: React.Dispatch<React.SetStateAction<TaskStage>>;
  taskData?: TaskData;
}

const CIRCLE_SIZE = 250;

const Star = ({
  paddingBottom,
  taskStage,
  second = 300,
  setTaskStage,
  taskData,
}: StarProps) => {
  const topColors = ['#130071', '#E380FF'];
  const bottomColors = ['#FF9747', '#650027'];
  const gradientColors = [...topColors, '#FFFFFF', ...bottomColors];

  const translateY = useSharedValue(-1);

  useEffect(() => {
    translateY.value = withTiming(0, {
      duration: 1000,
      easing: Easing.out(Easing.ease),
    });
  }, [taskStage]);

  useEffect(() => {
    if (taskStage === 'progress') {
      translateY.value = withTiming(
        -CIRCLE_SIZE,
        {
          duration: second * taskData?.durationTime,
          easing: Easing.out(Easing.ease),
        },
        finished => {
          if (finished && setTaskStage) {
            runOnJS(setTaskStage)('done');
          }
        },
      );
    }
  }, [taskStage]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));
  return (
    <View style={{ ...styles.container, paddingBottom }}>
      <View style={styles.shadowContainer}>
        <View style={styles.innerContainer}>
          <LinearGradient
            colors={gradientColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            locations={[0, 0.34, 0.5, 0.79, 1]}
            style={styles.gradient}
          />

          {taskStage === 'progress' && (
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
    overflow: 'hidden',
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
export default Star;
