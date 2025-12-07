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

export type LoggedInParamList = {
  Orders: undefined;
  Settings: undefined;
  Delivery: undefined;
  Complete: { orderId: string };
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  const MyTheme = {
    ...DefaultTheme,
    colors: { ...DefaultTheme.colors, background: '#000' },
  };

  const [isTaskStarted, setIsTaskStarted] = useState(true);
  const [isLoggedIn, setLoggedIn] = useState(false);
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator>
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
          name="MainPage"
          component={BottomTabNavigator}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
