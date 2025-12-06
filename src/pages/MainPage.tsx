import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Star from '../components/Star';
import { Image } from 'react-native';
import { IMAGES } from '../assets';
import MainButton from '../components/mainButton';

const MainPage = () => {
  const onStartTask = () => {
    console.log('과제 시작');
    // 네비게이션 로직 또는 API 호출 로직 추가
  };

  return (
    <View style={styles.safeArea}>
      <View style={styles.container}>
        {/* 1. 상단 헤더 (배터리, 시간, 알림) */}
        <View style={styles.header}>
          {/* 상태바 영역 - 실제 앱에서는 시스템 상태바를 사용하거나 커스텀합니다. */}
          <View style={styles.statusBarPlaceholder}>
            <Image source={IMAGES.logo} />
            {/* 우측 알림 아이콘 */}
            <Image source={IMAGES.alarm} />
          </View>

          {/* 명언/메시지 영역 */}
          <View style={styles.quoteBox}>
            <Text style={styles.quoteText}>
              아름다운 사람이 머문 자리는 자리도 아름답다. - 남자 화장실 -
            </Text>
          </View>
        </View>

        {/* 2. 메인 컨텐츠 영역 */}
        <View style={styles.mainContent}>
          <Text style={styles.todayTaskLabel}>오늘의 과제</Text>
          <Text style={styles.taskName}>바람 느끼기</Text>

          <Star />

          <View style={styles.buttonZone}>
            <MainButton onPress={onStartTask} label="시작" />
          </View>
        </View>
      </View>
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
    // 실제 시간/배터리 정보는 RN에서 시스템적으로 처리됩니다.
  },
  logoPlaceholder: {
    width: 60,
    height: 20,
    backgroundColor: '#D8BFD8', // 이미지의 왼쪽 상단 로고 색상 근처
    borderRadius: 5,
  },
  notificationIcon: {
    fontSize: 24,
    color: '#000',
  },
  quoteBox: {
    backgroundColor: '#F5F5F5', // 밝은 배경색 (배경의 그림자 느낌)
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
    maxWidth: '90%',
  },
  quoteText: {
    fontSize: 12,
    color: '#555',
  },

  // --- 2. Main Content (중앙) 스타일 ---
  mainContent: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#fff',
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
});

export default MainPage;
