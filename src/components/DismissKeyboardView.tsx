import React from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

const DismissKeyboardView = ({ children, ...props }: any) => (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <KeyboardAwareScrollView
      {...props}
      style={styles.container}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      {children}
    </KeyboardAwareScrollView>
  </TouchableWithoutFeedback>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});

export default DismissKeyboardView;
