import React from 'react';
import { View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const CIRCLE_SIZE = 250;

const Star = () => {
  const topColors = ['#130071', '#E380FF'];
  const bottomColors = ['#FF9747', '#650027'];
  const gradientColors = [...topColors, '#FFFFFF', ...bottomColors];

  return (
    <View style={styles.container}>
      <View style={styles.shadowContainer}>
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          locations={[0, 0.34, 0.5, 0.79, 1]}
          style={styles.gradient}
        />
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
    overflow: 'visible',
    backgroundColor: 'transparent',

    elevation: 40,
    shadowColor: '#FF9747',
    shadowOffset: { width: 30, height: 30 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },

  gradient: {
    width: '100%',
    height: '100%',
    borderRadius: CIRCLE_SIZE / 2,
  },
});

export default Star;
