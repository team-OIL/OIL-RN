import React from 'react';
import { View, Text, StyleSheet, Dimensions, Pressable } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';

const { width } = Dimensions.get('window');

interface MaskedTextProps {
  labelText: string;
  maskedText: string;
  onPress?: () => void;
}

function MaskedText({ labelText, maskedText, onPress }: MaskedTextProps) {
  return (
    <View style={styles.maskedTextContainer}>
      <View style={styles.textWrapper}>
        <Text style={{ color: '#989898', fontWeight: 900 }}>{labelText}</Text>
        <Pressable onPress={onPress}>
          <MaskedView
            style={styles.maskedView}
            maskElement={
              <View style={styles.maskElement}>
                <Text style={styles.maskText}>{maskedText}</Text>
              </View>
            }
          >
            <LinearGradient
              colors={['#FFB153', '#6200FF']}
              locations={[0.45, 0.95]}
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 0 }}
              style={styles.gradient}
            />
          </MaskedView>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  maskedTextContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  textWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  maskedView: {
    width: width * 0.2,
    height: 25,
    alignSelf: 'flex-end',
  },
  maskElement: {
    backgroundColor: 'transparent',
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  maskText: {
    fontSize: 15,
    color: 'black',
    fontWeight: '900',
  },
  gradient: { flex: 1 },
  subtext: { fontSize: 35, fontWeight: 'bold', color: '#333', marginTop: -5 },
  subtextSmall: {
    marginTop: 5,
    fontWeight: 'bold',

    fontSize: 16,
    color: '#989898',
  },
});

export default MaskedText;
