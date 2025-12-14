import { api } from '../axios';

export const loginApi = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const data = {
    email,
    password,
  };
  console.log('loginApi', data);
  return api.post('/auth/login', data);
};
