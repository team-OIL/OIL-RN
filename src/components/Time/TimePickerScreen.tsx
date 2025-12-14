import React, { useState } from 'react';
import { View, StyleSheet, Text, Platform } from 'react-native';
import TimePickerWheel from './TimePickerWheel';

// 항목 높이 및 휠 높이 정의
const ITEM_HEIGHT = 50; // 각 숫자/항목의 높이
const WHEEL_HEIGHT = ITEM_HEIGHT * 3; // 화면에 5칸 (패딩 포함)이 보이도록 설정

// 데이터 생성 헬퍼 함수
const generateNumbers = (start: number, end: number) => {
  const numbers = [];
  for (let i = start; i <= end; i++) {
    numbers.push(String(i).padStart(2, '0'));
  }
  return numbers;
};

// 시간/분 데이터
const HOURS = generateNumbers(1, 12); // 12시간 형식 (1~12)
const MINUTES = generateNumbers(0, 59); // 00분~59분
const AMPM = ['오전', '오후'];

interface TimePickerScreenProps {
  ampm: string;
  hour: string;
  minute: string;
  setAmpm: (value: string) => void;
  setHour: (value: string) => void;
  setMinute: (value: string) => void;
}

function TimePickerScreen({
  ampm,
  hour,
  minute,
  setAmpm,
  setHour,
  setMinute,
}: TimePickerScreenProps) {
  return (
    <View style={styles.container}>
      <View style={styles.pickerWrapper}>
        {/* 1. 오전/오후 휠 */}
        <TimePickerWheel
          data={AMPM}
          selectedValue={ampm}
          onValueChange={setAmpm}
          height={WHEEL_HEIGHT}
          itemHeight={ITEM_HEIGHT}
        />

        {/* 2. 시간 휠 */}
        <TimePickerWheel
          data={HOURS}
          selectedValue={hour}
          onValueChange={setHour}
          height={WHEEL_HEIGHT}
          itemHeight={ITEM_HEIGHT}
        />

        {/* 콜론 구분자 */}
        <View style={styles.separatorContainer}>
          <Text style={styles.separator}>:</Text>
        </View>

        {/* 3. 분 휠 */}
        <TimePickerWheel
          data={MINUTES}
          selectedValue={minute}
          onValueChange={setMinute}
          height={WHEEL_HEIGHT}
          itemHeight={ITEM_HEIGHT}
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
    padding: 20,
  },
  pickerWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  separatorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  separator: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
  },
});

export default TimePickerScreen;
