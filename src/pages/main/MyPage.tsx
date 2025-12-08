import React from 'react';
import { View, Text, StyleSheet, Alert, Pressable } from 'react-native';
import { IMAGES } from '../../assets';
import { Image } from 'react-native';
import Button from '../../components/button/button';
import { useNavigation } from '@react-navigation/native';
import type { RootStackParamList } from '../../../types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type Nav = NativeStackNavigationProp<RootStackParamList, 'AlarmPage'>;

export default function TaskPage() {
  const navigation = useNavigation<Nav>();
  const logout = () => {
    Alert.alert('알람', 'logout');
  };

  return (
    <View style={style.safeArea}>
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
          <Text style={style.mainContentText}>이건희님</Text>
        </View>

        <View style={style.quoteBoxZone}>
          <View style={style.quoteBox}>
            <Text style={style.quoteText}>
              아름다운 사람이 머문 자리는 자리도 아름답다. - 남자 화장실 -
            </Text>
          </View>
        </View>

        <View style={style.buttonZone}>
          <Button label="로그아웃" onPress={logout} />
        </View>
      </View>
    </View>
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
  },
  quoteBox: {
    backgroundColor: '#F5F5F5', // 밝은 배경색 (배경의 그림자 느낌)
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
    maxWidth: '90%',
  },
  quoteText: {
    fontSize: 12,
    color: '#555',
  },
  buttonZone: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
});
