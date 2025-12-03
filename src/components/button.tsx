import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

interface ButtonProps {
  onPress: () => void;
  disabled?: boolean;
  label: string;
}

const Button = ({ onPress, disabled, label }: ButtonProps) => {
  return (
    <Pressable
      style={
        disabled
          ? styles.Button
          : StyleSheet.compose(styles.Button, styles.ButtonActive)
      }
      disabled={disabled}
      onPress={onPress}
    >
      <Text style={styles.ButtonText}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  Button: {
    backgroundColor: '#989898',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  ButtonActive: {
    backgroundColor: '#007AFF',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  ButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Button;
