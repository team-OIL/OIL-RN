import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Star from '../../components/Star';
import { IMAGES } from '../../assets';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { RootStackParamList } from '../../../types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useRoute, RouteProp } from '@react-navigation/native';
import TaskModel from '../../components/model/taskModel';
import { completedListApi } from '../../api/Mission/completedList';
import { missionDetailApi } from '../../api/Mission/missionDetail';
import EncryptedStorage from 'react-native-encrypted-storage';

type Nav = NativeStackNavigationProp<RootStackParamList, 'AlarmPage'>;
type TaskPageRouteProp = RouteProp<RootStackParamList, 'BottomTabNavigator'>;
type TaskPageProps = {
  taskData: any;
  taskSuccess: boolean;
};

export default function TaskPage({ taskData, taskSuccess }: TaskPageProps) {
  const navigation = useNavigation<Nav>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [completedList, setCompletedList] = useState<
    { userMissionId: number; missionTitle: string }[]
  >([]);
  const [missionDetail, setMissionDetail] = useState<{
    missionContent: string;
    resultText: string;
    resultImageUrl: null;
    completedAt: string;
  }>({});

  console.log('taskData333', taskData);

  useEffect(() => {
    const fetchCompletedList = async () => {
      try {
        const auth = await EncryptedStorage.getItem('auth');
        if (!auth) return;
        const { accessToken } = JSON.parse(auth);
        const response = await completedListApi({ accessToken });
        setCompletedList(response.data);

        console.log('completedList', response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCompletedList();
  }, []);

  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  const onClickModel = async (userMissionId: number) => {
    const auth = await EncryptedStorage.getItem('auth');
    if (!auth) return;
    const { accessToken } = JSON.parse(auth);

    const missionDetailResponse = await missionDetailApi({
      accessToken,
      userMissionId,
    });
    setMissionDetail({
      missionContent: missionDetailResponse.data.missionContent,
      completedAt: missionDetailResponse.data.completedAt,
      resultImageUrl: missionDetailResponse.data.resultImageUrl,
      resultText: missionDetailResponse.data.resultText,
    });
    openModal();
  };

  const completedTaskList = completedList.slice(0, 5);

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
              <Text>{taskData?.missionContent}</Text>
            </View>
          </View>
          {/*완료한 과제 */}
          <Pressable style={style.completedTask}>
            <Text style={style.completedTaskText}>완료한 과제</Text>
            {completedTaskList.map(item => (
              <Pressable
                key={item.userMissionId}
                onPress={() => onClickModel(item.userMissionId)}
              >
                <View style={style.completedTaskContent}>
                  <View style={style.completedTaskContentItem}>
                    <Image source={IMAGES.checkGreen} />
                    <Text>{item.missionTitle}</Text>
                  </View>
                </View>
              </Pressable>
            ))}
          </Pressable>
        </View>
      </View>
      {isModalVisible && (
        <TaskModel
          taskTitle={missionDetail.missionContent}
          completionDate={missionDetail.completedAt}
          recordImageUrl={missionDetail.resultImageUrl}
          recordContent={missionDetail.resultText}
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
    backgroundColor: '#ffffffff',
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
