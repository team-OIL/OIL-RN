import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

interface ButtonProps {
  onPress?: () => void;
  disabled?: boolean;
  second?: string;
  taskStage?: string;
}

const MainButton = ({ onPress, disabled, second, taskStage }: ButtonProps) => {
  const getLabel = () => {
    if (taskStage === 'done') return '종료';
    if (taskStage === 'idle') return '시작';
    return second;
  };

  return (
    <Pressable style={styles.Button} disabled={disabled} onPress={onPress}>
      <Text style={second ? styles.ButtonSecondText : styles.ButtonText}>
        {getLabel()}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  Button: {
    backgroundColor: '#272429',
    width: '60%',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 50,
    marginBottom: 15,
  },
  ButtonSecondText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  ButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default MainButton;
