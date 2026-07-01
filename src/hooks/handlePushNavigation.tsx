import { navigationRef } from '../navigation/NavigationService';

type PushData = Record<string, unknown>;

let pendingPushData: PushData | undefined;

export function handlePushNavigation(data?: PushData) {
  if (!data) return;
  if (!navigationRef.isReady()) {
    pendingPushData = data;
    return;
  }

  const pushType = typeof data.type === 'string' ? data.type : undefined;

  switch (pushType) {
    case 'ALARM':
      navigationRef.navigate('BottomTabNavigator', { screen: 'Home' });
      break;

    case 'MISSION':
      navigationRef.navigate('BottomTabNavigator', { screen: 'Home' });
      break;
  }
}

export function flushPendingPushNavigation() {
  const data = pendingPushData;
  pendingPushData = undefined;
  handlePushNavigation(data);
}
