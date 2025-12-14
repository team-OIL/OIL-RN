import { api } from '../axios';

export const signUpApi = ({
  email,
  password,
  userName,
  missionTime,
  isAlarmEnabled,
}: {
  email: string;
  password: string;
  userName: string;
  missionTime: string;
  isAlarmEnabled: boolean;
}) => {
  const data = {
    email,
    password,
    userName,
    missionTime,
    isAlarmEnabled,
  };
  console.log('gda', data);
  return api.post('/auth/sign-up', data);
};
