import { api } from '../axios';

interface DeleteTokenApi {
  accessToken: string;
}

export const deleteTokenApi = ({ accessToken }: DeleteTokenApi) => {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  return api.delete(`/auth/push-token`, { headers });
};
