import { api } from '../axios';

export const reissueApi = (refresh_token: string) => {
  const headers = {
    refresh_token,
  };
  return api.post('/auth/reissue', { headers });
};
