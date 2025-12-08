import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

interface ButtonProps {
  onPress?: () => void;
  disabled?: boolean;
  label?: boolean;
  second?: string;
}

const MainButton = ({ onPress, disabled, label, second }: ButtonProps) => {
  return (
    <Pressable
      style={label ? styles.StartButton : styles.Button}
      disabled={disabled}
      onPress={onPress}
    >
      <Text style={second ? styles.ButtonSecondText : styles.ButtonText}>
        {label ? second : '시작'}
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
  StartButton: {
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
