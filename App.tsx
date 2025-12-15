import * as React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import { useState } from 'react';
import { RootStackParamList } from './types/navigation';
import SignIn from './src/pages/auth/SignIn';
import SignUp from './src/pages/auth/SignUp';
import SignInComplete from './src/pages/auth/SignInComplete';
import AlarmSettings from './src/pages/auth/AlarmSettingsPage';
import NicknamePage from './src/pages/auth/NicknamePage';
import AlarmPage from './src/pages/main/AlarmPage';
import ChangeAlarmPage from './src/pages/main/ChangeAlarmPage';

export type LoggedInParamList = {
  Orders: undefined;
  Settings: undefined;
  Delivery: undefined;
  Complete: { orderId: string };
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  console.log('App 렌더링됨');
  const MyTheme = {
    ...DefaultTheme,
    colors: { ...DefaultTheme.colors, background: '#fff' },
  };

  const [isTaskStarted, setIsTaskStarted] = useState(true);
  const [isLoggedIn, setLoggedIn] = useState(false);
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator id="stack">
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SignInComplete"
          component={SignInComplete}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="BottomTabNavigator"
          component={BottomTabNavigator}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AlarmSettings"
          component={AlarmSettings}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="NicknamePage"
          component={NicknamePage}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AlarmPage"
          component={AlarmPage}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ChangeAlarmPage"
          component={ChangeAlarmPage}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
