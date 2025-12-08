import React, { useCallback, useRef, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import DismissKeyboardView from '../../components/DismissKeyboardView';
import Input from '../../components/inputs';
import Button from '../../components/button/button';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../../types/navigation';

type Nav = NativeStackNavigationProp<RootStackParamList, 'SignIn'>;

function NicknamePage() {
  const [nickname, setNickname] = useState('');
  const nicknameRef = useRef<TextInput | null>(null);
  const navigation = useNavigation<Nav>();

  const onChangeNickname = useCallback(
    (text: string) => setNickname(text.trim()),
    [],
  );

  const onSubmit = useCallback(() => {
    if (!nickname) return Alert.alert('알림', '닉네임을 입력해주세요.');
    Alert.alert('알림', '회원가입 완료!');
    navigation.navigate('SignIn', { name: nickname });
  }, [nickname]);

  const canGoNext = nickname;

  return (
    <DismissKeyboardView>
      <View style={styles.container}>
        <View style={styles.titleZone}>
          <Text style={styles.title}>닉네임 지정</Text>
          <Text style={styles.subTitle}>사용자님을 어떻게 부를까요?</Text>
        </View>
        <Input
          label="닉네임"
          value={nickname}
          onChangeText={onChangeNickname}
          ref={nicknameRef}
          returnKeyType="next"
          onSubmitEditing={() => nicknameRef.current?.focus()}
        />
        <View style={styles.buttonZone}>
          <Button onPress={onSubmit} disabled={!canGoNext} label="완료" />
        </View>
      </View>
    </DismissKeyboardView>
  );
}

const styles = StyleSheet.create({
  container: { paddingTop: 30, flex: 1 },
  titleZone: {
    padding: 25,
    marginBottom: 20,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subTitle: {
    fontSize: 16,
    color: '#666666',
  },
  buttonZone: {
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 40,
    paddingHorizontal: 30,
  },
});

export default NicknamePage;
