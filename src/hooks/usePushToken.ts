import { useEffect } from 'react';
import { getFcmToken, onFcmTokenRefresh } from '../services/pushToken.service';

export function usePushToken(onToken: (token: string) => void) {
  useEffect(() => {
    getFcmToken().then(token => {
      if (token) onToken(token);
    });

    const unsubscribe = onFcmTokenRefresh(onToken);
    return unsubscribe;
  }, [onToken]);
}
