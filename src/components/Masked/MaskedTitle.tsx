import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

function MaskedTitle() {
  return (
    <View style={maskedTitleStyles.maskedTitleContainer}>
      <MaskedView
        style={maskedTitleStyles.maskedView}
        maskElement={
          <View style={maskedTitleStyles.maskElement}>
            <Text style={maskedTitleStyles.maskText}>환영합니다</Text>
          </View>
        }
      >
        {/* 마스크 뒤에 보일 콘텐츠: 오렌지에서 보라색으로 이어지는 가로 그라데이션 */}
        <LinearGradient
          colors={['#FFB153', '#6200FF']}
          locations={[0.45, 0.95]}
          start={{ x: -0.5, y: 0 }}
          end={{ x: 0.8, y: 0 }}
          style={maskedTitleStyles.gradient}
        />
      </MaskedView>
      <Text style={maskedTitleStyles.subtitle}>OIL과 떠나기</Text>
      <Text style={maskedTitleStyles.subtitleSmall}>
        OIL에서 어릴 적 추억을 다시 느껴보세요.
      </Text>
    </View>
  );
}

const maskedTitleStyles = StyleSheet.create({
  maskedTitleContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: 30,
    padding: 20,
  },
  maskedView: {
    width: width * 0.9,
    height: 50,
    alignSelf: 'flex-start',
  },
  maskElement: {
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
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
  subtitleSmall: {
    marginTop: 5,
    fontWeight: 'bold',

    fontSize: 16,
    color: '#989898',
  },
});

export default MaskedTitle;
