import messaging from '@react-native-firebase/messaging';
import EncryptedStorage from 'react-native-encrypted-storage';
import { PermissionsAndroid, Platform } from 'react-native';

/** 앱 내부 알림 동의 여부 */
export async function getAlarmAgreement(): Promise<boolean> {
  try {
    const value = await EncryptedStorage.getItem('alarm');
    if (!value) return false;
    const { isAgreedToReceive } = JSON.parse(value);
    return isAgreedToReceive;
  } catch (error) {
    console.error('Failed to get alarm agreement:', error);
    return false;
  }
}

/** OS 알림 권한 요청 */
export async function requestPushPermission(): Promise<boolean> {
  if (Platform.OS === 'android') {
    if (Number(Platform.Version) < 33) return true;

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    return status === PermissionsAndroid.RESULTS.GRANTED;
  }

  const authStatus = await messaging().requestPermission();
  const hasPermission =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (hasPermission && !messaging().isDeviceRegisteredForRemoteMessages) {
    await messaging().registerDeviceForRemoteMessages();
  }

  return hasPermission;
}

/** FCM 토큰 삭제 (알림 OFF 시) */
export async function disablePushToken(): Promise<void> {
  await messaging().deleteToken();

  if (
    Platform.OS === 'ios' &&
    messaging().isDeviceRegisteredForRemoteMessages
  ) {
    await messaging().unregisterDeviceForRemoteMessages();
  }
}

/** FCM 토큰 생성 */
export async function getFcmToken(
  agreementOverride?: boolean,
): Promise<string | null> {
  try {
    const isAgreed = agreementOverride ?? (await getAlarmAgreement());
    if (!isAgreed) return null;

    const hasPermission = await requestPushPermission();
    if (!hasPermission) return null;

    const token = await messaging().getToken();
    return token;
  } catch (error) {
    console.error('Failed to get FCM token:', error);
    return null;
  }
}

/** 토큰 갱신 감지 */
export function onFcmTokenRefresh(callback: (token: string) => void) {
  return messaging().onTokenRefresh(callback);
}
