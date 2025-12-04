import { View, StyleSheet } from 'react-native';
import Star from '../../components/Star';

function SignInComplete() {
  return (
    <View style={styles.container}>
      <Star />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default SignInComplete;
