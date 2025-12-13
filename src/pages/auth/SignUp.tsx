import React, { useCallback, useRef, useState } from 'react';
import { View, StyleSheet, TextInput, Alert } from 'react-native';
import DismissKeyboardView from '../../components/DismissKeyboardView';
import Input from '../../components/inputs';
import Button from '../../components/button/button';
import Link from '../../components/link';
import MaskedTitle from '../../components/Masked/MaskedTitle';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../../types/navigation';

type Nav = NativeStackNavigationProp<RootStackParamList, 'SignIn'>;

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const emailRef = useRef<TextInput | null>(null);
  const passwordRef = useRef<TextInput | null>(null);
  const navigation = useNavigation<Nav>();

  const onChangeEmail = useCallback(
    (text: string) => setEmail(text.trim()),
    [],
  );
  const onChangePassword = useCallback(
    (text: string) => setPassword(text.trim()),
    [],
  );

  const onClickNav = () => navigation.navigate('SignIn', { name: '야르' });

  const onSubmit = useCallback(() => {
    if (!email) return Alert.alert('알림', '이메일을 입력해주세요.');
    if (!password) return Alert.alert('알림', '비밀번호를 입력해주세요.');
    Alert.alert('알림', '회원가입 완료!');
    navigation.navigate('AlarmSettings', {
      email,
      password,
    });
  }, [email, password]);

  const canGoNext = email && password;

  return (
    <DismissKeyboardView>
      <View style={styles.container}>
        <MaskedTitle
          title="환영합니다"
          subSignInTitle="OIL과 시작하기"
          subSignInText="OIL에서 어릴 적 추억을 다시 느껴보세요."
        />
        <Input
          label="아이디"
          value={email}
          onChangeText={onChangeEmail}
          ref={emailRef}
          returnKeyType="next"
          onSubmitEditing={() => passwordRef.current?.focus()}
        />
        <Input
          label="비밀번호"
          value={password}
          onChangeText={onChangePassword}
          ref={passwordRef}
          secureTextEntry
          returnKeyType="send"
          onSubmitEditing={onSubmit}
        />
        <View style={styles.buttonZone}>
          <Link
            onPress={onClickNav}
            labelText="계정이 이미 있으신가요?"
            maskedText="로그인"
          />
          <Button onPress={onSubmit} disabled={!canGoNext} label="다음" />
        </View>
      </View>
    </DismissKeyboardView>
  );
}

const styles = StyleSheet.create({
  container: { paddingTop: 30, flex: 1 },
  buttonZone: {
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 40,
    paddingHorizontal: 30,
  },
});

export default SignUp;
