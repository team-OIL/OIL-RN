import { navigationRef } from '../navigation/NavigationService';

type PushData = {
  type?: 'ALARM' | 'MISSION';
  alarmId?: string;
};

export function handlePushNavigation(data?: PushData) {
  if (!data) return;
  if (!navigationRef.isReady()) return;

  switch (data.type) {
    case 'ALARM':
      navigationRef.navigate('BottomTabNavigator', { screen: 'Home' });
      break;

    case 'MISSION':
      navigationRef.navigate('BottomTabNavigator', { screen: 'Home' });
      break;
  }
}
