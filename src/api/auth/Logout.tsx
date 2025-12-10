import { api } from '../axios';

export const logoutApi = (accessToken: string) => {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  return api.post('/auth/logout', { headers });
};
