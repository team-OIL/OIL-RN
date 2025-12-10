import { api } from '../axios';

export const adviceApi = () => {
  return api.get('https://korean-advice-open-api.vercel.app/api/advice');
};
