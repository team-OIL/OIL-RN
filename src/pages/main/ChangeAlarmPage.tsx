import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Switch, Alert } from 'react-native';
import DismissKeyboardView from '../../components/DismissKeyboardView';
import TimePickerScreen from '../../components/Time/TimePickerScreen';
import Button from '../../components/button/button';
import { updateMissionReceiveTime } from '../../api/alarm/updateMissionReceiveTime';
import { updateAlarmSetting } from '../../api/alarm/updateAlarmSetting';
import EncryptedStorage from 'react-native-encrypted-storage';
import { useNavigation } from '@react-navigation/native';
import { deleteTokenApi } from '../../api/pushtoken/deleteToken';
import { setTokenApi } from '../../api/pushtoken/setToken';
import {
  disablePushToken,
  getFcmToken,
} from '../../services/pushToken.service';

const DEFAULT_ALARM_TIME = '19:35';

function ChangeAlarmPage() {
  const navigation = useNavigation();
  const [isChangeAgreedToReceive, setIsChangeAgreedToReceive] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [baseTastTime, setBaseTastTime] = useState('');
  const [ampm, setAmpm] = useState('오후');
  const [hour, setHour] = useState('07');
  const [minute, setMinute] = useState('35');
  const hourNum = Number(hour);
  const hour24 = ampm === '오전' ? hourNum % 12 : (hourNum % 12) + 12;
  const hourString = String(hour24).padStart(2, '0');
  const ChangeTastTime = `${hourString}:${minute}`;

  useEffect(() => {
    if (!baseTastTime) return;

    const [h, m] = baseTastTime.split(':');
    const parsedHour = Number(h);

    const isPM = parsedHour >= 12;
    const convertedHour =
      parsedHour === 0 ? 12 : parsedHour > 12 ? parsedHour - 12 : parsedHour;

    setAmpm(isPM ? '오후' : '오전');
    setHour(String(convertedHour).padStart(2, '0'));
    setMinute(m);
  }, [baseTastTime]);

  useEffect(() => {
    const loadAccessToken = async () => {
      const auth = await EncryptedStorage.getItem('auth');
      if (!auth) return;
      const { accessToken: storedAccessToken } = JSON.parse(auth);
      setAccessToken(storedAccessToken);
    };
    loadAccessToken();
  }, []);

  useEffect(() => {
    const loadAgreement = async () => {
      const value = await EncryptedStorage.getItem('alarm');
      const savedAlarm = value ? JSON.parse(value) : {};
      const isAgreedToReceive =
        savedAlarm.isAgreedToReceive ??
        savedAlarm.isChangeAgreedToReceive ??
        false;
      const TastTime = savedAlarm.TastTime ?? DEFAULT_ALARM_TIME;
      setIsChangeAgreedToReceive(isAgreedToReceive);
      setBaseTastTime(TastTime);
    };
    loadAgreement();
  }, []);

  // 알림 수신 동의 토글
  const toggleSwitch = () => {
    setIsChangeAgreedToReceive(current => !current);
  };

  const onClickChangeAlarm = async () => {
    if (!accessToken) {
      Alert.alert(
        '오류',
        '인증 정보를 불러오는 중입니다. 잠시 후 다시 시도해주세요.',
      );
      return;
    }

    try {
      let deviceToken: string | null = null;

      if (isChangeAgreedToReceive) {
        deviceToken = await getFcmToken(true);
        if (!deviceToken) {
          Alert.alert(
            '알림 권한 필요',
            '푸시 알림을 사용하려면 기기 설정에서 OIL의 알림 권한을 허용해주세요.',
          );
          return;
        }
      }

      await updateMissionReceiveTime({
        accessToken,
        MissionTime: ChangeTastTime,
      });
      await updateAlarmSetting({
        accessToken,
        alarmEnabled: isChangeAgreedToReceive,
      });

      const alarmData = {
        isAgreedToReceive: isChangeAgreedToReceive,
        TastTime: ChangeTastTime,
      };
      await EncryptedStorage.setItem('alarm', JSON.stringify(alarmData));

      if (deviceToken) {
        await setTokenApi({ accessToken, deviceToken });
      } else {
        try {
          await deleteTokenApi({ accessToken });
        } finally {
          await disablePushToken();
        }
      }

      Alert.alert('알림', '알림 설정이 변경되었습니다.');
      navigation.goBack();
    } catch (e) {
      console.error('Failed to update alarm settings:', e);
      Alert.alert('오류', '알림 설정 변경에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <DismissKeyboardView style={styles.fullScreen}>
      <View style={styles.container}>
        {/* 헤딩 섹션 */}
        <Text style={styles.mainTitle}>알림 시간 변경</Text>

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
              thumbColor={isChangeAgreedToReceive ? '#363636' : '#f4f3f4'}
              ios_backgroundColor="#e0e0e0"
              onValueChange={toggleSwitch}
              value={isChangeAgreedToReceive}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              !isChangeAgreedToReceive && styles.disabledText,
            ]}
          >
            알림 시간 설정
          </Text>
          <Text
            style={[
              styles.descriptionText,
              !isChangeAgreedToReceive && styles.disabledText,
            ]}
          >
            푸시 알림 수신에 동의하십니까?
          </Text>
          <View
            pointerEvents={isChangeAgreedToReceive ? 'auto' : 'none'}
            style={[
              styles.timePickerContainer,
              !isChangeAgreedToReceive && styles.disabledContainer,
            ]}
          >
            <TimePickerScreen
              ampm={ampm}
              hour={hour}
              minute={minute}
              setAmpm={setAmpm}
              setHour={setHour}
              setMinute={setMinute}
            />
          </View>
        </View>

        <View style={styles.buttonZone}>
          <Button label="변경" onPress={onClickChangeAlarm} />
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

export default ChangeAlarmPage;
