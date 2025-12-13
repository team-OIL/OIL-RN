import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Star from '../../components/Star';
import { IMAGES } from '../../assets';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { RootStackParamList } from '../../../types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useRoute, RouteProp } from '@react-navigation/native';
import TaskModel from '../../components/model/taskModel';

type Nav = NativeStackNavigationProp<RootStackParamList, 'AlarmPage'>;
type TaskPageRouteProp = RouteProp<RootStackParamList, 'BottomTabNavigator'>;

export default function TaskPage() {
  const route = useRoute<TaskPageRouteProp>();
  const { taskSuccess } = route.params || {};
  const navigation = useNavigation<Nav>();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  const onClickModel = () => {
    setIsModalVisible(true);
  };

  const completedTaskList = [
    { id: 1, content: '10분 산책하기' },
    { id: 2, content: '물 2잔 마시기' },
    { id: 3, content: '스트레칭 5분' },
    { id: 4, content: '스트레칭 5분' },
    { id: 5, content: '스트레칭 5분' },
  ];
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
        <View style={style.contentZone}>
          {/*당신의 색 */}
          <View style={style.yourColor}>
            <Text style={style.yourColorText}>당신의 색</Text>
            <View style={{ transform: [{ scale: 0.5 }], marginTop: -60 }}>
              <Star paddingBottom={30} />
            </View>
          </View>
          {/*오늘의 과제 */}
          <View style={style.todayTask}>
            <Text style={style.todayTaskText}>오늘의 과제</Text>
            <View style={style.todayTaskContent}>
              <Image source={taskSuccess ? IMAGES.checkGreen : IMAGES.check} />
              <Text>바람 느끼기</Text>
            </View>
          </View>
          {/*완료한 과제 */}
          <Pressable style={style.completedTask} onPress={onClickModel}>
            <Text style={style.completedTaskText}>완료한 과제</Text>
            {Array.from(
              { length: completedTaskList.length },
              (_, index) => index,
            ).map(index => (
              <View key={index} style={style.completedTaskContent}>
                <View style={style.completedTaskContentItem}>
                  <Image source={IMAGES.checkGreen} />
                  <Text>{completedTaskList[index].content}</Text>
                </View>
              </View>
            ))}
          </Pressable>
        </View>
      </View>
      {isModalVisible && (
        <TaskModel
          taskTitle="오늘의 과제"
          completionDate="2025-12-13"
          recordImageUrl="https://via.placeholder.com/150"
          recordContent="오늘의 과제를 완료했습니다."
          onClose={closeModal}
        />
      )}
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
    paddingVertical: 30,
    backgroundColor: '#fff',
  },
  contentZone: {
    width: '100%',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#F9F9F9',
  },
  yourColor: {
    width: '100%',
    flex: 3.5,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  yourColorText: {
    fontSize: 26,
    fontWeight: '600',
    paddingTop: '30%',
  },
  todayTask: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#fff',
  },
  todayTaskText: {
    fontSize: 15,
  },
  todayTaskContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    gap: 10,
  },
  completedTask: {
    width: '100%',
    flex: 5,
    flexDirection: 'column',
    padding: 20,
    marginBottom: 50,
    backgroundColor: '#fff',
  },
  completedTaskText: {
    fontSize: 15,
    marginBottom: 10,
  },
  completedTaskContent: {
    flexDirection: 'column',
    gap: 10,
    backgroundColor: '#fff',
  },
  completedTaskContentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    marginBottom: 5,
    backgroundColor: '#ffffffff',
    borderRadius: 30,
  },
});
