import { api } from '../axios';

export const todayApi = ({ accessToken }: { accessToken: string }) => {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  console.log('today', accessToken);
  return api.get('/missions/today', { headers });
};
