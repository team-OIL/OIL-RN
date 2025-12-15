import React, { useEffect } from 'react';
import { Text, Image, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainPage from '../pages/main/MainPage';
import TaskPage from '../pages/main/TaskPage';
import MyPage from '../pages/main/MyPage';
import { IMAGES } from '../assets';
import { useState } from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import { todayApi } from '../api/Mission/todayapi';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const focusedFontStyle = {
    fontSize: 12,
    fontWeight: 'bold' as const,
    color: '#000',
  };
  const unFocusedFontStyle = {
    fontSize: 12,
    fontWeight: 'normal' as const,
    color: '#888',
  };

  const [taskSuccess, setTaskSuccess] = useState(true);
  const [taskData, setTaskData] = useState<{
    userMissionId: number;
    missionContent: string;
    durationTime: number;
    assignedDate: string;
    completed: boolean;
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const auth = await EncryptedStorage.getItem('auth');
        if (!auth) return;

        const { accessToken } = JSON.parse(auth);
        const res = await todayApi({ accessToken });
        setTaskData(res.data);
        console.log('today', res.data);
      } catch (err: any) {
        if (err.response?.status === 404) {
          console.log('404');
          setTaskData(null);
        } else {
          console.log(err);
        }
      }
    };

    fetchData();
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
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
        tabBarLabelStyle: { fontSize: 12 },
        tabBarActiveTintColor: '#000', // 선택된 탭 글자색
        tabBarInactiveTintColor: '#888', // 선택 안 된 탭 글자색
        tabBarItemStyle: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        children={props => (
          <MainPage taskSuccess={taskSuccess} taskData={taskData} {...props} />
        )}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text style={focused ? focusedFontStyle : unFocusedFontStyle}>
              홈
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <Image source={focused ? IMAGES.homeBlack : IMAGES.home} />
          ),
        }}
      />

      <Tab.Screen
        name="Task"
        children={props => (
          <TaskPage taskData={taskData} taskSuccess={taskSuccess} {...props} />
        )}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text style={focused ? focusedFontStyle : unFocusedFontStyle}>
              과제
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <Image source={focused ? IMAGES.TaskBlack : IMAGES.Task} />
          ),
        }}
      />

      <Tab.Screen
        name="My"
        component={MyPage}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text style={focused ? focusedFontStyle : unFocusedFontStyle}>
              마이페이지
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <Image source={focused ? IMAGES.MyPageBlack : IMAGES.MyPage} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
