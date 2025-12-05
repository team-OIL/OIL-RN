import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

interface MaskedTitleProps {
  title: string;
  subSignInTitle?: string;
  subSignInText?: string;
  sudText?: string;
}

function MaskedTitle({
  title,
  subSignInTitle,
  subSignInText,
  sudText,
}: MaskedTitleProps) {
  return (
    <View
      style={[
        maskedTitleStyles.MaskedTitleContainer,
        sudText
          ? maskedTitleStyles.SignCompleteMaskedTitleContainer
          : maskedTitleStyles.AuthMaskedTitleContainer,
      ]}
    >
      <MaskedView
        style={maskedTitleStyles.maskedView}
        maskElement={
          <View
            style={[
              maskedTitleStyles.maskElement,
              sudText
                ? maskedTitleStyles.SignCompleteMaskElement
                : maskedTitleStyles.AuthMaskElement,
            ]}
          >
            <Text style={maskedTitleStyles.maskText}>{title}</Text>
          </View>
        }
      >
        <LinearGradient
          colors={['#FFB153', '#6200FF']}
          locations={[0.45, 0.95]}
          start={{ x: -0.5, y: 0 }}
          end={{ x: 0.8, y: 0 }}
          style={maskedTitleStyles.gradient}
        />
      </MaskedView>
      {subSignInTitle && subSignInText && (
        <>
          <Text style={maskedTitleStyles.subtitle}>{subSignInTitle}</Text>
          <Text style={maskedTitleStyles.subTextSmall}>{subSignInText}</Text>
        </>
      )}
      {sudText && (
        <Text style={maskedTitleStyles.subtitleSmall}>{sudText}</Text>
      )}
    </View>
  );
}

const maskedTitleStyles = StyleSheet.create({
  MaskedTitleContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: 20,
  },
  AuthMaskedTitleContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  SignCompleteMaskedTitleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  maskedView: {
    width: width * 0.9,
    height: 50,
    alignSelf: 'flex-start',
  },
  maskElement: {
    backgroundColor: 'transparent',
    flex: 1,
    display: 'flex',
  },
  AuthMaskElement: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  SignCompleteMaskElement: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  maskText: {
    fontSize: 35,
    color: 'black',
    fontWeight: '900',
    fontFamily: 'AvenirNext-Bold',
  },
  gradient: {
    flex: 1,
  },
  subtitle: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#333',
    marginTop: -5,
  },
  subTextSmall: {
    marginTop: 5,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#989898',
  },
  subtitleSmall: {
    marginTop: 5,
    fontWeight: 'bold',
    fontSize: 35,
    color: '#000',
  },
});

export default MaskedTitle;
