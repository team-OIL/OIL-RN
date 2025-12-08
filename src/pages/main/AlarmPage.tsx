import { View, Text, StyleSheet, Pressable } from 'react-native';
import { IMAGES } from '../../assets/index';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { RootStackParamList } from '../../../types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

type Nav = NativeStackNavigationProp<RootStackParamList, 'AlarmPage'>;
type AlarmPageRouteProp = RouteProp<RootStackParamList, 'AlarmPage'>;

export default function AlarmPage({
  route,
}: {
  route: AlarmPageRouteProp;
}) {
  const { taskSuccess } = route.params;
  const navigation = useNavigation<Nav>();
  const onClickBack = () => {
    navigation.goBack();
  };

  const taskList = [
    { id: 1, title: '오늘의 과제', content: '10분 산책하기' },
    { id: 2, title: '오늘의 과제', content: '물 2잔 마시기' },
    { id: 3, title: '오늘의 과제', content: '스트레칭 5분' },
  ]; // 더미값

  const taskDate = '2025.12.08';

  return (
    <View style={styles.container}>
      <View style={styles.headerZone}>
        <Pressable onPress={onClickBack}>
          <Image source={IMAGES.arrowLeft} />
        </Pressable>
      </View>
      <View style={styles.titleZone}>
        <Text style={styles.titleText}>오늘의 과제 알림함</Text>
      </View>
      <View style={styles.contentZone}>
        {Array.from({ length: taskList.length }).map((_, index) => (
          <View key={index} style={styles.contentZoneItem}>
            <View style={styles.contentZoneItemTextZone}>
              <Text style={styles.TextItemText}>
                {index === 0 ? taskList[index].title : `${taskDate} 과제`}
              </Text>
              <Image
                source={
                  index != 0 || taskSuccess ? IMAGES.checkGreen : IMAGES.check
                }
              />
            </View>
            <Text style={styles.contentZoneItemText}>
              {taskList[index].content}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    gap: 5,
  },
  headerZone: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  titleZone: {
    width: '100%',
    height: 50,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 22,
    color: '#585858',
  },
  contentZone: {
    width: '100%',
    height: 50,
    paddingHorizontal: 20,
  },
  contentZoneItem: {
    width: '100%',
    height: 50,
    marginBottom: 20,
  },
  contentZoneItemTextZone: {
    width: '100%',
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  TextItemText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  contentZoneItemText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#585858',
    marginTop: -10,
  },
});
