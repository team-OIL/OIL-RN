import { api } from '../axios';

export const logoutApi = (accessToken: string) => {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  console.log('logoutApi', accessToken);
  return api.delete('/auth/logout', { headers });
};
