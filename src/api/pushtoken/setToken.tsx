import { api } from '../axios';

interface CompleteApi {
  accessToken: string;
  deviceToken: string;
}

export const setTokenApi = ({ accessToken, deviceToken }: CompleteApi) => {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  const data = {
    deviceToken,
  };
  return api.patch(`/push-token`, data, { headers });
};
