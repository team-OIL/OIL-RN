import { api } from '../axios';

export const setTokenApi = (accessToken: string, pushToken: string) => {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  const data = {
    pushToken,
  };
  return api.patch('/auth/push-token', data, { headers });
};
