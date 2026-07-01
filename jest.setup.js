/* eslint-env jest */

jest.mock('react-native-reanimated', () => {
  const { View } = require('react-native');
  return {
    __esModule: true,
    default: { View },
    Easing: { ease: 'ease', out: easing => easing },
    runOnJS: callback => callback,
    useAnimatedStyle: callback => callback(),
    useSharedValue: initialValue => ({ value: initialValue }),
    withTiming: (value, _config, callback) => {
      callback?.(true);
      return value;
    },
  };
});

jest.mock('react-native-linear-gradient', () => {
  const React = require('react');
  const { View } = require('react-native');
  return props => React.createElement(View, props, props.children);
});

jest.mock('@react-native-community/blur', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    BlurView: props => React.createElement(View, props, props.children),
  };
});

jest.mock('react-native-encrypted-storage', () => ({
  getItem: jest.fn().mockResolvedValue(null),
  setItem: jest.fn().mockResolvedValue(undefined),
  removeItem: jest.fn().mockResolvedValue(undefined),
  clear: jest.fn().mockResolvedValue(undefined),
}));

jest.mock('@react-native-firebase/messaging', () => {
  const messagingInstance = {
    deleteToken: jest.fn().mockResolvedValue(undefined),
    getInitialNotification: jest.fn().mockResolvedValue(null),
    getToken: jest.fn().mockResolvedValue('test-token'),
    isDeviceRegisteredForRemoteMessages: true,
    onMessage: jest.fn(() => jest.fn()),
    onNotificationOpenedApp: jest.fn(() => jest.fn()),
    onTokenRefresh: jest.fn(() => jest.fn()),
    registerDeviceForRemoteMessages: jest.fn().mockResolvedValue(undefined),
    requestPermission: jest.fn().mockResolvedValue(1),
    unregisterDeviceForRemoteMessages: jest.fn().mockResolvedValue(undefined),
  };
  const messaging = jest.fn(() => messagingInstance);
  messaging.AuthorizationStatus = { AUTHORIZED: 1, PROVISIONAL: 2 };
  return messaging;
});

jest.mock('react-native-image-picker', () => ({
  launchImageLibrary: jest.fn(),
}));

jest.mock('react-native-config', () => ({
  API_BASE_URL: 'https://api.example.com',
}));

jest.mock('@react-native-masked-view/masked-view', () => {
  const React = require('react');
  const { View } = require('react-native');
  return props => React.createElement(View, props, props.children);
});
