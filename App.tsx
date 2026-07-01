import React, { useEffect } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import { RootStackParamList } from './types/navigation';
import messaging from '@react-native-firebase/messaging';
import SignIn from './src/pages/auth/SignIn';
import SignUp from './src/pages/auth/SignUp';
import SignInComplete from './src/pages/auth/SignInComplete';
import AlarmSettings from './src/pages/auth/AlarmSettingsPage';
import NicknamePage from './src/pages/auth/NicknamePage';
import AlarmPage from './src/pages/main/AlarmPage';
import ChangeAlarmPage from './src/pages/main/ChangeAlarmPage';
import { useForegroundPush } from './src/hooks/useForegroundPush';
import {
  flushPendingPushNavigation,
  handlePushNavigation,
} from './src/hooks/handlePushNavigation';
import { navigationRef } from './src/navigation/NavigationService';
import { usePushToken } from './src/hooks/usePushToken';

export type LoggedInParamList = {
  Orders: undefined;
  Settings: undefined;
  Delivery: undefined;
  Complete: { orderId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  useForegroundPush();
  usePushToken();

  useEffect(() => {
    const unsubscribe = messaging().onNotificationOpenedApp(remoteMessage => {
      handlePushNavigation(remoteMessage.data);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          handlePushNavigation(remoteMessage.data);
        }
      });
  }, []);

  const MyTheme = {
    ...DefaultTheme,
    colors: { ...DefaultTheme.colors, background: '#fff' },
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer
        ref={navigationRef}
        theme={MyTheme}
        onReady={flushPendingPushNavigation}
      >
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
    </SafeAreaProvider>
  );
}

export default App;
