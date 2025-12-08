import React from 'react';
import { Text, Image, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainPage from '../pages/main/MainPage';
import TaskPage from '../pages/main/TaskPage';
import MyPage from '../pages/main/MyPage';
import { IMAGES } from '../assets';
import { useState } from 'react';

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
        component={MainPage}
        initialParams={{ taskSuccess }}
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
        component={TaskPage}
        initialParams={{ taskSuccess }}
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
