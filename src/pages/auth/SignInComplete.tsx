import { View, StyleSheet, Text, Alert } from 'react-native';
import Star from '../../components/Star';
import Button from '../../components/button/button';
import MaskedTitle from '../../components/Masked/MaskedTitle';
import type { RootStackParamList } from '../../../types/navigation';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

type Nav = NativeStackNavigationProp<RootStackParamList, 'SignIn'>;
type SignInCompleteRouteProp = RouteProp<RootStackParamList, 'SignInComplete'>;

function SignInComplete({ route }: { route: SignInCompleteRouteProp }) {
  const { name, isTaskStarted } = route.params;
  const navigation = useNavigation<Nav>();

  const onClickStart = () => {
    navigation.navigate('MainPage');
  };
  return (
    <View style={styles.container}>
      <View style={styles.titleZone}>
        <MaskedTitle title="반갑습니다" sudText={`${name}님`} />
      </View>
      <Star paddingBottom={150} isTaskStarted={isTaskStarted} />
      <View style={styles.buttonZone}>
        <Button
          label="시작"
          onPress={() => {
            onClickStart();
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  titleZone: { width: '100%', paddingTop: 80 },
  buttonZone: {
    width: '90%',
  },
});

export default SignInComplete;
