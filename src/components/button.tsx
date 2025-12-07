import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

interface ButtonProps {
  onPress?: () => void;
  disabled?: boolean;
  label?: string;
}

const Button = ({ onPress, disabled, label }: ButtonProps) => {
  return (
    <Pressable
      style={
        label === '시작'
          ? styles.StartButton
          : label === '로그아웃'
          ? styles.LogoutButton
          : disabled
          ? styles.Button
          : StyleSheet.compose(styles.Button, styles.ButtonActive)
      }
      disabled={disabled}
      onPress={onPress}
    >
      <Text
        style={
          label === '로그아웃' ? styles.logoutButtonText : styles.ButtonText
        }
      >
        {label}
      </Text>
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
  LogoutButton: {
    backgroundColor: '#ffffffff',
    width: '90%',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderColor: '#E4E4E4',
    borderWidth: 1,
  },
  ButtonActive: {
    backgroundColor: '#007AFF',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  StartButton: {
    backgroundColor: '#272429',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  ButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logoutButtonText: {
    color: '#FF0000',
    fontSize: 18,
  },
});

export default Button;
