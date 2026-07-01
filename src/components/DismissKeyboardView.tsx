import React, { PropsWithChildren } from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  StyleProp,
  StyleSheet,
  ViewProps,
  ViewStyle,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { SafeAreaView } from 'react-native-safe-area-context';

type DismissKeyboardViewProps = PropsWithChildren<
  ViewProps & {
    contentContainerStyle?: StyleProp<ViewStyle>;
  }
>;

const DismissKeyboardView = ({
  children,
  style,
  contentContainerStyle,
  ...props
}: DismissKeyboardViewProps) => (
  <SafeAreaView style={[styles.safeArea, style]}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAwareScrollView
        {...props}
        style={styles.container}
        contentContainerStyle={[styles.content, contentContainerStyle]}
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flexGrow: 1,
  },
});

export default DismissKeyboardView;
