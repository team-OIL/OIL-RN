import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Pressable, Modal } from 'react-native';
import Star from '../../components/Star';
import { Image } from 'react-native';
import { IMAGES } from '../../assets';
import MainButton from '../../components/button/mainButton';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import type { RootStackParamList } from '../../../types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useRoute, RouteProp } from '@react-navigation/native';
import useTimer from '../../hooks/useTimer';
import { TaskStage } from '../../../types/TaskStage';
import ImgModel from '../../components/model/imageModel';
import { BlurView } from '@react-native-community/blur';
import { adviceApi } from '../../api/advice/adviceApi';

type Nav = NativeStackNavigationProp<RootStackParamList, 'AlarmPage'>;
type MainPageRouteProp = RouteProp<RootStackParamList, 'BottomTabNavigator'>;
type Advice = {
  author: string;
  authorProfile: string;
  message: string;
};
type TaskPageProps = {
  taskData: any;
  taskSuccess: boolean;
};

const MainPage = ({ taskData }: TaskPageProps) => {
  const { second, setSecond, isPaused, setIsPaused, reset } = useTimer(300);
  const route = useRoute<MainPageRouteProp>();
  const { taskSuccess } = route.params || {};
  const navigation = useNavigation<Nav>();
  const [taskStage, setTaskStage] = useState<TaskStage>('idle');

  const minutes = Math.floor(second / 60);
  const seconds = second % 60;

  const timeText = `${minutes}: ${seconds.toString().padStart(2, '0')}`;

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [advice, setAdvice] = useState<Advice | null>(null);

  useEffect(() => {
    const fetchAdvice = async () => {
      try {
        const response = await adviceApi();
        const adviceData: Advice = response.data;
        console.log('advice', adviceData);
        setAdvice(adviceData);
      } catch (error) {
        console.log('API 호출 에러:', error);
      }
    };

    fetchAdvice();
  }, []);

  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  const onStartTask = () => {
    Alert.alert('알림', '과제를 시작합니다.');
    if (isPaused && second === 0) {
      setSecond(300);
    }
    if (taskStage === 'idle') {
      setTaskStage('progress');
    } else if (taskStage === 'progress') {
      setTaskStage('idle');
    } else if (taskStage === 'done') {
      Alert.alert('알림', '과제를 완료했습니다.');
      return;
    }
    setIsPaused(prev => !prev);
    // 네비게이션 로직 또는 API 호출 로직 추가
  };

  const litleTitle = () => {
    if (taskStage === 'done')
      return '과제를 해결 하셨으면 빛나는 행성을 눌러주세요';
    if (taskStage === 'progress')
      return '빛이 끝날 때 까지 과제를 진행해주세요.';
    return '오늘의 과제';
  };

  useEffect(() => {
    if (taskStage === 'done') {
      navigation.setOptions({
        tabBarStyle: { display: 'none' },
      } as any);
    } else {
      navigation.setOptions({
        tabBarStyle: {
          height: 100,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: '#ffffffff',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
        },
      } as any);
    }
  }, [taskStage, navigation]);

  useEffect(() => {
    if (taskStage === 'done') {
      const timer = setTimeout(() => {
        setIsModalVisible(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [taskStage]);

  let content;

  if (taskStage === 'done') {
    content = (
      <>
        <View style={styles.DoneContent}>
          <LinearGradient
            colors={['#FFFFFF', '#858585ff']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 3 }}
            style={styles.gradientBox}
          >
            <View style={{ height: 300 }}>
              <Star
                taskStage={taskStage}
                setTaskStage={setTaskStage}
                second={second}
              />
            </View>

            <View style={styles.textGroup}>
              <View style={{ alignItems: 'center' }}>
                <Text style={styles.subText}>과제를 완료하셨군요.</Text>
                <Text style={styles.subText}>당신의 색을 찾고있습니다.</Text>
              </View>
              <Text style={styles.doneText}>
                {taskData?.missionContent} 완료
              </Text>
            </View>
          </LinearGradient>
        </View>
        {isModalVisible && (
          <BlurView
            style={StyleSheet.absoluteFill} // 화면 전체를 덮도록 설정
            blurType="dark" // 어두운 블러 타입
            blurAmount={15} // 블러 강도
            reducedTransparencyFallbackColor="#FFFFFF"
          />
        )}

        {/* 3. 모달 컴포넌트 */}
        <Modal
          animationType="fade"
          transparent={true} // 블러 뷰가 보이도록 투명하게 설정
          visible={isModalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalOverlay}>
            {/* PostCompletionScreen에 닫기 함수 전달 */}
            <ImgModel
              onClose={closeModal}
              setTaskStage={setTaskStage}
              taskData={taskData}
            />
          </View>
        </Modal>
      </>
    );
  } else {
    content = (
      <>
        <View style={styles.header}>
          {/* 상태바 영역 - 실제 앱에서는 시스템 상태바를 사용하거나 커스텀합니다. */}
          <View style={styles.statusBarPlaceholder}>
            <Image source={IMAGES.logo} />
            {/* 우측 알림 아이콘 */}
            <Pressable
              onPress={() => navigation.navigate('AlarmPage', { taskSuccess })}
            >
              <Image source={IMAGES.alarm} />
            </Pressable>
          </View>

          {/* 명언/메시지 영역 */}
          <View style={styles.quoteBox}>
            <Text style={styles.quoteText}>
              {advice?.message} - {advice?.author}
            </Text>
          </View>
        </View>
        {/* 2. 메인 컨텐츠 영역 */}
        <LinearGradient
          colors={['#FFFFFF', '#E1E1E1']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.mainContent}
        >
          <Text style={styles.todayTaskLabel}>{litleTitle()}</Text>
          <Text style={styles.taskName}>
            {taskStage === 'idle' || taskStage === 'progress'
              ? taskData?.missionContent
              : '누르기'}
          </Text>

          <Star
            taskStage={taskStage}
            setTaskStage={setTaskStage}
            second={second}
          />

          <View style={styles.buttonZone}>
            <MainButton
              onPress={onStartTask}
              second={timeText}
              taskStage={taskStage}
            />
          </View>
        </LinearGradient>
      </>
    );
  }

  return (
    <View style={styles.safeArea}>
      <View style={styles.container}>{content}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    paddingTop: 0,
  },

  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
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
  logoPlaceholder: {
    width: 60,
    height: 20,
    backgroundColor: '#D8BFD8',
    borderRadius: 5,
  },
  notificationIcon: {
    fontSize: 24,
    color: '#000',
  },
  quoteBox: {
    backgroundColor: '#F5F5F5',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
    maxWidth: '90%',
  },
  quoteText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#555',
  },

  mainContent: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#fff',
  },

  DoneContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientBox: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },

  textGroup: {
    marginBottom: 50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    gap: 10,
  },

  doneText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },

  subText: {
    fontSize: 16,
    color: '#585858',
  },

  todayTaskLabel: {
    fontSize: 16,
    color: '#777',
    marginBottom: 5,
  },
  taskName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
  },
  buttonZone: {
    width: '100%',
    height: '30%',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
});

export default MainPage;
