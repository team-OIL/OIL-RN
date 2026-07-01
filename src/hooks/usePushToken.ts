import { useEffect } from 'react';
import { getFcmToken, onFcmTokenRefresh } from '../services/pushToken.service';
import EncryptedStorage from 'react-native-encrypted-storage';
import { setTokenApi } from '../api/pushtoken/setToken';

export function usePushToken() {
  useEffect(() => {
    const syncToken = async (token?: string | null) => {
      const auth = await EncryptedStorage.getItem('auth');
      if (!auth) return;

      const { accessToken } = JSON.parse(auth);
      const deviceToken = token ?? (await getFcmToken());
      if (!deviceToken) return;

      await setTokenApi({ accessToken, deviceToken });
    };

    syncToken().catch(error => {
      console.error('Failed to sync FCM token:', error);
    });

    const unsubscribe = onFcmTokenRefresh(token => {
      syncToken(token).catch(error => {
        console.error('Failed to refresh FCM token:', error);
      });
    });
    return unsubscribe;
  }, []);
}
