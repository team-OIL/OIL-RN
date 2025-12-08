import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Star from '../../components/Star';
import { IMAGES } from '../../assets';
import { Image } from 'react-native';

export default function MyPage() {
  return (
    <View style={style.safeArea}>
      <View style={style.container}>
        <View style={style.header}>
          <View style={style.statusBarPlaceholder}>
            <Image source={IMAGES.logo} />
            <Image source={IMAGES.alarm} />
          </View>
        </View>
        <View style={style.contentZone}>
          {/*당신의 색 */}
          <View style={style.yourColor}>
            <Text style={style.yourColorText}>당신의 색</Text>
            <View style={{ transform: [{ scale: 0.5 }], marginTop: -60 }}>
              <Star isTaskStarted={true} />
            </View>
          </View>
          {/*오늘의 과제 */}
          <View style={style.todayTask}>
            <Text style={style.todayTaskText}>오늘의 과제</Text>
            <View style={style.todayTaskContent}>
              <Image source={IMAGES.check} />
              <Text>바람 느끼기</Text>
            </View>
          </View>
          {/*완료한 과제 */}
          <View style={style.completedTask}>
            <Text style={style.completedTaskText}>완료한 과제</Text>
            <View style={style.completedTaskContent}>
              <View style={style.completedTaskContentItem}>
                <Image source={IMAGES.checkGreen} />
                <Text>바람 느끼기</Text>
              </View>
              <View style={style.completedTaskContentItem}>
                <Image source={IMAGES.checkGreen} />
                <Text>바람 느끼기</Text>
              </View>
              <View style={style.completedTaskContentItem}>
                <Image source={IMAGES.checkGreen} />
                <Text>바람 느끼기</Text>
              </View>
              <View style={style.completedTaskContentItem}>
                <Image source={IMAGES.checkGreen} />
                <Text>바람 느끼기</Text>
              </View>
              <View style={style.completedTaskContentItem}>
                <Image source={IMAGES.checkGreen} />
                <Text>바람 느끼기</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
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
    flex: 4,
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
