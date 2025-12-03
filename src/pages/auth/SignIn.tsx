import React, { useCallback, useRef, useState } from 'react';
import { Alert, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import DismissKeyboardView from '../../components/DismissKeyboardView';
import Input from '../../components/inputs';
import Button from '../../components/button';
import Link from '../../components/like';
import MaskedTitle from '../../components/Masked/MaskedTitle';

type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};
type Nav = NativeStackNavigationProp<RootStackParamList, 'SignIn'>;

function SignIn() {
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

  const onSubmit = useCallback(() => {
    if (!email) return Alert.alert('알림', '이메일을 입력해주세요.');
    if (!password) return Alert.alert('알림', '비밀번호를 입력해주세요.');
    Alert.alert('알림', '로그인 되었습니다.');
    navigation.navigate('SignUpComplete');
  }, [email, password]);

  const canGoNext = email && password;

  return (
    <DismissKeyboardView>
      <View style={styles.container}>
        <MaskedTitle />
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
