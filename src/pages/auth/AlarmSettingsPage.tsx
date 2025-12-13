import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, Switch, Alert } from 'react-native';
import DismissKeyboardView from '../../components/DismissKeyboardView';
import TimePickerScreen from '../../components/Time/TimePickerScreen';
import Button from '../../components/button/button';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../../types/navigation';

type Nav = NativeStackNavigationProp<RootStackParamList, 'SignIn'>;

function AlarmSettingsPage() {
  const navigation = useNavigation<Nav>();
  const [isAgreedToReceive, setIsAgreedToReceive] = useState(false);

  // 알림 수신 동의 토글
  const toggleSwitch = () => {
    setIsAgreedToReceive(prevState => !prevState);
  };

  // '다음' 버튼 클릭 핸들러
  const onPressNext = useCallback(() => {
    Alert.alert('알람', '푸시 알림 수신 동의 여부를 확인해주세요.');
    navigation.navigate('NicknamePage');
  }, [isAgreedToReceive]);

  return (
    <DismissKeyboardView style={styles.fullScreen}>
      <View style={styles.container}>
        {/* 헤딩 섹션 */}
        <Text style={styles.mainTitle}>알림 동의 및 설정</Text>

        {/* --- 알림 수신 동의 섹션 --- */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>알림 수신 동의</Text>
          <View style={styles.row}>
            <Text style={styles.descriptionText}>
              푸시 알림 수신에 동의하십니까?
            </Text>
            {/* AOS 표준 색상: 활성화 시 기본 색상, 비활성화 시 회색 계열 */}
            <Switch
              trackColor={{ false: '#e0e0e0', true: '#a0a0a0' }}
              thumbColor={isAgreedToReceive ? '#363636' : '#f4f3f4'}
              onValueChange={toggleSwitch}
              value={isAgreedToReceive}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              !isAgreedToReceive && styles.disabledText,
            ]}
          >
            알림 시간 설정
          </Text>
          <Text
            style={[
              styles.descriptionText,
              !isAgreedToReceive && styles.disabledText,
            ]}
          >
            푸시 알림 수신에 동의하십니까?
          </Text>
          <View style={styles.timePickerContainer}>
            <TimePickerScreen />
          </View>
        </View>

        <View style={styles.buttonZone}>
          <Button label="다음" onPress={onPressNext} />
        </View>
      </View>
    </DismissKeyboardView>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#000000',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingBottom: 10,
  },
  descriptionText: {
    fontSize: 14,
    color: '#666666',
  },
  disabledText: {
    color: '#cccccc',
  },
  disabledContainer: {
    opacity: 0.6,
  },
  // --- AOS Time Picker 스타일 ---
  timeDisplayButton: {
    marginTop: 20,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    alignSelf: 'flex-start',
    backgroundColor: '#f9f9f9',
  },
  timeValueAOS: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
  timePickerContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonZone: {
    alignItems: 'center',
    marginTop: 'auto', // 하단 고정
    marginBottom: 40,
    paddingHorizontal: 10,
  },
  nextButton: {
    width: '100%',
    paddingVertical: 15,
    backgroundColor: '#000000',
    borderRadius: 12,
  },
  nextButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AlarmSettingsPage;
