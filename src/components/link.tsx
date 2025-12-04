import React from 'react';
import { Pressable } from 'react-native';
import MaskedText from './Masked/MaskedText';

interface SignUpLinkProps {
  onPress: () => void;
  labelText: string;
  maskedText: string;
}

const Link = ({ onPress, labelText, maskedText }: SignUpLinkProps) => {
  return (
    <Pressable style={{ padding: 10 }} onPress={onPress}>
      <MaskedText
        labelText={labelText}
        maskedText={maskedText}
        onPress={onPress}
      />
    </Pressable>
  );
};

export default Link;
