import React, { forwardRef } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TextInputProps,
} from 'react-native';

interface InputProps extends TextInputProps {
  label: string;
}

const Input = forwardRef<TextInput, InputProps>(
  ({ label, ...props }, ref) => {
    return (
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          style={styles.textInput}
          placeholder={label}
          placeholderTextColor="#666"
          ref={ref}
          {...props}
        />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  inputWrapper: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  textInput: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderWidth: 0,
    borderRadius: 12,
    backgroundColor: '#F2F2F2',
    fontSize: 16,
    color: '#333',
  },
});

export default Input;
