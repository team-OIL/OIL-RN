import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

interface ButtonProps {
  onPress?: () => void;
  disabled?: boolean;
  label?: boolean;
}

const MainButton = ({ onPress, disabled, label }: ButtonProps) => {
  return (
    <Pressable
      style={label ? styles.StartButton : styles.Button}
      disabled={disabled}
      onPress={onPress}
    >
      <Text style={styles.ButtonText}>{label ? '중지' : '시작'}</Text>
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
  ButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default MainButton;
