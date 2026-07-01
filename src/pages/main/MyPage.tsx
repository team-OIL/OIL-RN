import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, Pressable } from 'react-native';
import { IMAGES } from '../../assets';
import { Image } from 'react-native';
import Button from '../../components/button/button';
import { useNavigation } from '@react-navigation/native';
import type { RootStackParamList } from '../../../types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { logoutApi } from '../../api/auth/LogoutApi';
import EncryptedStorage from 'react-native-encrypted-storage';
import { adviceApi } from '../../api/advice/adviceApi';
import { SafeAreaView } from 'react-native-safe-area-context';
import { disablePushToken } from '../../services/pushToken.service';

type Nav = NativeStackNavigationProp<RootStackParamList, 'AlarmPage'>;
type Advice = {
  author: string;
  authorProfile: string;
  message: string;
};

export default function MyPage() {
  const navigation = useNavigation<Nav>();
  const [advice, setAdvice] = useState<Advice | null>(null);
  const [name, setName] = useState('');

  const logout = async () => {
    const auth = await EncryptedStorage.getItem('auth');
    if (!auth) return;

    const { accessToken } = JSON.parse(auth);

    try {
      await logoutApi(accessToken);
    } catch (error) {
      console.warn('Server logout failed; clearing local session.', error);
    } finally {
      try {
        await disablePushToken();
      } catch (error) {
        console.warn('Failed to remove local push token.', error);
      }
      await EncryptedStorage.removeItem('auth');
      Alert.alert('알림', '로그아웃 되었습니다.');
      navigation.reset({ index: 0, routes: [{ name: 'SignIn' }] });
    }
  };

  useEffect(() => {
    fetchNickname();
    fetchAdvice();
  }, []);

  const fetchNickname = async () => {
    try {
      const auth = await EncryptedStorage.getItem('auth');
      if (!auth) return;
      const { nickname } = JSON.parse(auth);
      setName(nickname);
      console.log('nickname', nickname);
    } catch (error) {
      console.log('닉네임 가져오기 실패:', error);
    }
  };

  const fetchAdvice = async () => {
    try {
      const response = await adviceApi();
      const adviceData: Advice = response.data;
      console.log('advice', adviceData);
      setAdvice(adviceData);
    } catch (error) {
      console.log('API 호출 에러:', error);
    }
  };

  const onChangeAlarm = () => {
    navigation.navigate('ChangeAlarmPage');
  };

  return (
    <SafeAreaView style={style.safeArea} edges={['top', 'left', 'right']}>
      <View style={style.container}>
        <View style={style.header}>
          <View style={style.statusBarPlaceholder}>
            <Image source={IMAGES.logo} />
            <Pressable onPress={() => navigation.navigate('AlarmPage', {})}>
              <Image source={IMAGES.alarm} />
            </Pressable>
          </View>
        </View>
        <View style={style.mainContent}>
          <Image source={IMAGES.icon} />
          <Text style={style.mainContentText}>안녕하세요,</Text>
          <Text style={style.mainContentText}>{name}님</Text>
        </View>

        <View style={style.quoteBoxZone}>
          <View style={style.quoteBox}>
            <Text style={style.quoteText}>
              {advice?.message} - {advice?.author}
            </Text>
          </View>
          <Pressable style={style.alarmBox} onPress={onChangeAlarm}>
            <Text style={style.alarmText}>알람 시간 변경</Text>
          </Pressable>
        </View>

        <View style={style.buttonZone}>
          <Button label="로그아웃" onPress={logout} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  container: {
    flex: 1,
    paddingTop: 0,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 15,
  },
  statusBarPlaceholder: {
    width: '90%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
  },
  mainContentText: {
    fontSize: 26,
    fontWeight: '600',
  },
  quoteBoxZone: {
    flex: 1,
    alignItems: 'center',
    gap: 30,
  },
  quoteBox: {
    backgroundColor: '#F5F5F5', // 밝은 배경색 (배경의 그림자 느낌)
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
    maxWidth: '90%',
  },
  quoteText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
  },
  alarmBox: {
    backgroundColor: 'transparent',
    borderRadius: 10,
    width: '90%',
    padding: 15,
    borderColor: '#E4E4E4',
    borderWidth: 1,
  },
  alarmText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#585858',
  },
  buttonZone: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
});
