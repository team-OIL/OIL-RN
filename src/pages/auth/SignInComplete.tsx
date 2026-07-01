import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Star from '../../components/Star';
import Button from '../../components/button/button';
import MaskedTitle from '../../components/Masked/MaskedTitle';
import type { RootStackParamList } from '../../../types/navigation';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

type Nav = NativeStackNavigationProp<RootStackParamList, 'SignInComplete'>;
type SignInCompleteRouteProp = RouteProp<RootStackParamList, 'SignInComplete'>;

function SignInComplete({ route }: { route: SignInCompleteRouteProp }) {
  const { nickname } = route.params;
  const navigation = useNavigation<Nav>();

  const onClickStart = () => {
    navigation.navigate('BottomTabNavigator', {});
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleZone}>
        <MaskedTitle title="반갑습니다" sudText={`${nickname}님`} />
      </View>
      <Star paddingBottom={150} />
      <View style={styles.buttonZone}>
        <Button
          label="시작"
          onPress={() => {
            onClickStart();
          }}
        />
      </View>
    </SafeAreaView>
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
