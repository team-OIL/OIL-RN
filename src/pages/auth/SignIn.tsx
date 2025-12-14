import React, { useCallback, useRef, useState } from 'react';
import { Alert, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import DismissKeyboardView from '../../components/DismissKeyboardView';
import Input from '../../components/inputs';
import Button from '../../components/button/button';
import Link from '../../components/link';
import MaskedTitle from '../../components/Masked/MaskedTitle';
import type { RootStackParamList } from '../../../types/navigation';
import { RouteProp } from '@react-navigation/native';
import { loginApi } from '../../api/auth/LoginApi';

type Nav = NativeStackNavigationProp<RootStackParamList, 'SignIn'>;
type SignInCompleteRouteProp = RouteProp<RootStackParamList, 'SignInComplete'>;

function SignIn({ route }: { route: SignInCompleteRouteProp }) {
  const { name } = route.params || {};
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigation = useNavigation<Nav>();

  const onChangeEmail = useCallback(
    (text: string) => setEmail(text.trim()),
    [],
  );
  const onChangePassword = useCallback(
    (text: string) => setPassword(text.trim()),
    [],
  );

  const onClickNav = () => navigation.navigate('SignUp');

  const onSubmit = useCallback(async () => {
    if (!email) return Alert.alert('알림', '이메일을 입력해주세요.');
    if (!password) return Alert.alert('알림', '비밀번호를 입력해주세요.');
    try {
      const response = await loginApi({ email, password });
      if (response.status === 200) {
        Alert.alert('알림', '로그인 되었습니다.');
        navigation.navigate('SignInComplete', { name, isTaskStarted: true });
      } else {
        Alert.alert('알림', '로그인 실패: ' + response.data.message);
      }
    } catch (error) {
      Alert.alert('알림', '로그인 중 오류가 발생했습니다.');
      console.error(error);
    }
  }, [email, password]);

  const canGoNext = email && password;

  return (
    <DismissKeyboardView>
      <View style={styles.container}>
        <MaskedTitle
          title="환영합니다"
          subSignInTitle="OIL과 떠나기"
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
            labelText="계정이 없으신가요?"
            maskedText="회원가입"
          />
          <Button onPress={onSubmit} disabled={!canGoNext} label="로그인" />
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

export default SignIn;
